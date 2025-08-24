# Admin Functionality Documentation

## Overview
The blog application includes role-based access control where admin users have elevated privileges, including the ability to delete any user's posts.

## Admin Privileges

### ✅ **Current Admin Capabilities:**
1. **Delete Any Post**: Admin users can delete posts created by any user
2. **Edit Any Post**: Admin users can edit posts created by any user
3. **Create Posts**: Admin users can create their own posts
4. **View All Posts**: Admin users can view all posts in the system

### 🔒 **Authorization Logic:**
The application uses the following authorization checks:

```typescript
// For DELETE operations
if (post.author.toString() !== user._id.toString() && user.role !== 'admin') {
  return NextResponse.json(
    { error: 'Not authorized to delete this post' },
    { status: 403 }
  );
}

// For UPDATE operations  
if (post.author.toString() !== user._id.toString() && user.role !== 'admin') {
  return NextResponse.json(
    { error: 'Not authorized to update this post' },
    { status: 403 }
  );
}
```

## How to Test Admin Functionality

### 1. **Create an Admin User**
Navigate to `http://localhost:3000/test-register` and use the "Create Admin User" section:

**Default Admin Credentials:**
- Name: `admin`
- Email: `admin@test.com`
- Password: `Admin@123`

### 2. **Login as Admin**
1. Go to `http://localhost:3000/login`
2. Use the admin credentials created above
3. You should see "admin" displayed in the navigation

### 3. **Test Admin Privileges**
1. **Create some test posts** using regular users (use the bulk registration feature)
2. **Login as admin** user
3. **Navigate to any post** (even those created by other users)
4. **Verify you can see Edit and Delete buttons** on all posts
5. **Test deleting a post** created by another user

## API Endpoints

### Create Admin User
```bash
POST /api/test/create-admin
Content-Type: application/json

{
  "name": "admin",
  "email": "admin@test.com", 
  "password": "Admin@123"
}
```

### Delete Post (Admin can delete any post)
```bash
DELETE /api/posts/[post-id]
Authorization: Bearer [admin-jwt-token]
```

### Update Post (Admin can edit any post)
```bash
PUT /api/posts/[post-id]
Authorization: Bearer [admin-jwt-token]
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

## Frontend Implementation

### Post Detail Page (`app/posts/[id]/page.tsx`)
```typescript
const canEdit = user && (user._id === post?.author._id || user.role === 'admin');
const canDelete = user && (user._id === post?.author._id || user.role === 'admin');
```

### Navigation Component
The navigation shows the user's role and name when logged in.

## Security Features

1. **JWT Token Validation**: All admin operations require valid JWT tokens
2. **Role-Based Authorization**: Server-side validation of user roles
3. **Protected Routes**: API endpoints check user permissions
4. **Password Hashing**: Admin passwords are hashed using bcrypt

## Testing Scenarios

### ✅ **Admin Can Delete Any Post**
1. Create a post as a regular user
2. Login as admin
3. Navigate to the post
4. Click "Delete" button
5. Verify post is deleted successfully

### ✅ **Admin Can Edit Any Post**
1. Create a post as a regular user
2. Login as admin
3. Navigate to the post
4. Click "Edit" button
5. Modify title/content
6. Click "Save Changes"
7. Verify changes are saved

### ✅ **Regular Users Cannot Delete Others' Posts**
1. Create a post as user A
2. Login as user B
3. Navigate to user A's post
4. Verify no delete/edit buttons are visible

### ✅ **Regular Users Can Only Manage Their Own Posts**
1. Create a post as a regular user
2. Navigate to your own post
3. Verify edit/delete buttons are visible
4. Test editing and deleting your own post

## Database Schema

### User Model
```typescript
{
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}
```

### Post Model
```typescript
{
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}
```

## Future Enhancements

Potential admin features that could be added:
- User management (view, edit, delete users)
- Post moderation (approve/reject posts)
- Analytics dashboard
- Bulk operations
- Content management system
- User role management interface
