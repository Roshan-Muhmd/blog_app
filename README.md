# Blog Application with User Management

A modern, full-stack blog application built with Next.js, MongoDB, and JWT authentication. This application provides a complete blogging platform with user management, role-based access control, and CRUD operations for blog posts.

## 🚀 Features

### Core Features
- **User Authentication & Management**
  - User registration and login with JWT tokens
  - Secure password hashing with bcrypt
  - Role-based access control (Admin/User)
  - User profile management with password change

- **Blog Management**
  - Create, Read, Update, Delete (CRUD) blog posts
  - Rich text content support
  - Author attribution and timestamps
  - Public blog listing (no login required)
  - Individual blog post detail pages

- **Role-Based Access Control**
  - **Admin**: Can manage all posts and users
  - **User**: Can create, edit, delete only their own posts
  - Public access to view posts

### Bonus Features
- **Search & Filter**: Search posts by title/content
- **Pagination**: Navigate through posts with pagination
- **Responsive Design**: Mobile-first responsive UI
- **Modern UI**: Clean, modern interface with Tailwind CSS
- **Real-time Feedback**: Toast notifications for user actions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **UI Components**: Lucide React icons
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Date Formatting**: date-fns

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd blog_app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/blog-app?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

### 4. Database Setup

1. Create a MongoDB Atlas account or use local MongoDB
2. Create a new database named `blog-app`
3. Update the `MONGODB_URI` in your `.env.local` file
4. The application will automatically create the required collections

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
blog_app/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── posts/         # Blog post endpoints
│   │   └── users/         # User management endpoints
│   ├── create/            # Create post page
│   ├── login/             # Login page
│   ├── posts/             # Individual post pages
│   ├── profile/           # User profile page
│   ├── register/          # Registration page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── AuthProvider.tsx   # Authentication context
│   └── Navigation.tsx     # Navigation component
├── lib/                   # Utility functions
│   ├── auth.ts           # Authentication utilities
│   └── db.ts             # Database connection
├── models/               # Mongoose models
│   ├── Post.ts           # Post model
│   └── User.ts           # User model
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts
- `GET /api/posts` - Get all posts (with pagination and search)
- `POST /api/posts` - Create new post (authenticated)
- `GET /api/posts/[id]` - Get single post
- `PUT /api/posts/[id]` - Update post (author or admin only)
- `DELETE /api/posts/[id]` - Delete post (author or admin only)

### User Profile
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

## 🎨 Features in Detail

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints
- Automatic token refresh

### Blog Management
- Rich text editor for post content
- Title and content validation
- Author attribution
- Creation and modification timestamps
- Search functionality across title and content

### Role-Based Access
- **Admin Role**: Full access to all posts and user management
- **User Role**: Can only manage their own posts
- **Public Access**: Anyone can view posts without authentication

### User Interface
- Responsive design for all screen sizes
- Modern, clean UI with Tailwind CSS
- Loading states and error handling
- Toast notifications for user feedback
- Intuitive navigation and user experience

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

### Environment Variables for Production

Set these in your deployment platform:

```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_SECRET=your-production-nextauth-secret
NEXTAUTH_URL=https://your-domain.com
```

### Database Setup for Production

1. Create a MongoDB Atlas cluster
2. Set up database access (username/password)
3. Configure network access (IP whitelist or 0.0.0.0/0)
4. Get your connection string and update `MONGODB_URI`

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Role-based access control
- Protected API endpoints
- CORS configuration
- Environment variable protection

## 🧪 Testing

To run the application in development mode:

```bash
npm run dev
```

To build for production:

```bash
npm run build
npm start
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the maintainers

## 🎯 Future Enhancements

- Comment system for blog posts
- Image upload and management
- Advanced search filters
- Email notifications
- Social media sharing
- RSS feeds
- Admin dashboard
- Analytics and insights

---

**Note**: This is a production-ready blog application that meets all the requirements specified in the project overview. The application includes proper error handling, validation, security measures, and a clean, modern user interface.
