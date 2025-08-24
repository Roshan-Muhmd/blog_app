import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';
import testUsers from '@/test-data/users.json';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const results = {
      successful: [] as any[],
      failed: [] as any[],
      total: testUsers.length
    };

    // Process each test user
    for (const userData of testUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
          results.failed.push({
            email: userData.email,
            reason: 'User already exists'
          });
          continue;
        }

        // Create new user
        const user = new User({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        });

        await user.save();

        // Generate token
        const token = generateToken(user);

        // Return user data without password
        const userResponse = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        };

        results.successful.push({
          user: userResponse,
          token
        });

      } catch (error: any) {
        results.failed.push({
          email: userData.email,
          reason: error.message || 'Registration failed'
        });
      }
    }

    return NextResponse.json({
      message: `Bulk registration completed. ${results.successful.length} users registered successfully, ${results.failed.length} failed.`,
      results
    }, { status: 200 });

  } catch (error: any) {
    console.error('Bulk registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to view test users (for reference)
export async function GET() {
  return NextResponse.json({
    message: 'Test users data',
    count: testUsers.length,
    users: testUsers.map(user => ({
      name: user.name,
      email: user.email
      // Don't include password in GET response
    }))
  });
}
