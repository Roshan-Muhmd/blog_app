'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/components/AuthProvider';
import { ArrowLeft, Edit, Trash2, Calendar, User, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Post not found');
      }

      setPost(data.post);
      setEditTitle(data.post.title);
      setEditContent(data.post.content);
    } catch (error: any) {
      console.error('Error fetching post:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditTitle(post?.title || '');
    setEditContent(post?.content || '');
  };

  const handleSave = async () => {
    if (!post) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle.trim(),
          content: editContent.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update post');
      }

      setPost(data.post);
      setEditing(false);
      toast.success('Post updated successfully!');
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete post');
      }

      toast.success('Post deleted successfully!');
      router.push('/');
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  const canEdit = user && (user._id === post?.author._id || user.role === 'admin');
  const canDelete = user && (user._id === post?.author._id || user.role === 'admin');

  if (loading) {
    return (
      <div>
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {editing ? 'Edit Post' : post.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  {post.author.name}
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
            
            {!editing && (canEdit || canDelete) && (
              <div className="flex space-x-2">
                {canEdit && (
                  <button
                    onClick={handleEdit}
                    className="btn btn-secondary flex items-center"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="btn btn-danger flex items-center disabled:opacity-50"
                  >
                    <Trash2 size={16} className="mr-2" />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="card">
          {editing ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  id="edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="input"
                  maxLength={200}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {editTitle.length}/200 characters
                </p>
              </div>

              <div>
                <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  id="edit-content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={12}
                  className="input resize-none"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancelEdit}
                  className="btn btn-secondary flex items-center"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn btn-primary flex items-center disabled:opacity-50"
                >
                  <Save size={16} className="mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          ) : (
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {post.content}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
