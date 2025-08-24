import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { requireAuth, getCurrentUser } from '@/lib/auth';

// GET - Get single post (public)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const post = await Post.findById(params.id).populate('author', 'name email');
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error: any) {
    console.error('Get post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update post (authenticated - author or admin only)
export const PUT = requireAuth(async (
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();

    const { title, content } = await req.json();

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    if (title.length > 200) {
      return NextResponse.json(
        { error: 'Title cannot exceed 200 characters' },
        { status: 400 }
      );
    }

    // Find post
    const post = await Post.findById(params.id);
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check authorization (author or admin)
    if (post.author.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized to update this post' },
        { status: 403 }
      );
    }

    // Update post
    post.title = title;
    post.content = content;
    await post.save();

    // Populate author information
    await post.populate('author', 'name email');

    return NextResponse.json({
      message: 'Post updated successfully',
      post,
    });
  } catch (error: any) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

// DELETE - Delete post (authenticated - author or admin only)
export const DELETE = requireAuth(async (
  req: NextRequest,
  user: any,
  { params }: { params: { id: string } }
) => {
  try {
    await dbConnect();

    // Find post
    const post = await Post.findById(params.id);
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check authorization (author or admin)
    if (post.author.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Not authorized to delete this post' },
        { status: 403 }
      );
    }

    // Delete post
    await Post.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: 'Post deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
