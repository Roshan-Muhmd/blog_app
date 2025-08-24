'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Loader2, Users, Eye } from 'lucide-react';

export default function TestRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [testUsers, setTestUsers] = useState<any>(null);
  const [adminForm, setAdminForm] = useState({
    name: 'admin',
    email: 'admin@test.com',
    password: 'Admin@123'
  });
  const [adminResult, setAdminResult] = useState<any>(null);

  const handleBulkRegister = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/test/register-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error during bulk registration:', error);
      setResults({ error: 'Failed to register users' });
    } finally {
      setLoading(false);
    }
  };

  const handleViewTestUsers = async () => {
    try {
      const response = await fetch('/api/test/register-users');
      const data = await response.json();
      setTestUsers(data);
    } catch (error) {
      console.error('Error fetching test users:', error);
    }
  };

  const handleCreateAdmin = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/test/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminForm),
      });

      const data = await response.json();
      setAdminResult(data);
    } catch (error) {
      console.error('Error creating admin:', error);
      setAdminResult({ error: 'Failed to create admin user' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test User Registration
          </h1>
          <p className="text-gray-600">
            Register 25 test users with predefined credentials
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Bulk Registration */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="mr-2" size={20} />
              Bulk User Registration
            </h2>
            
            <p className="text-gray-600 mb-4">
              Register all 25 test users from the JSON file. Users that already exist will be skipped.
            </p>
            
            <button
              onClick={handleBulkRegister}
              disabled={loading}
              className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={16} />
                  Registering Users...
                </>
              ) : (
                <>
                  <Users size={16} className="mr-2" />
                  Register All Test Users
                </>
              )}
            </button>

            {results && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-gray-900 mb-2">Results:</h3>
                <p className="text-sm text-gray-600 mb-2">{results.message}</p>
                {results.results && (
                  <div className="text-sm text-gray-600">
                    <p>✅ Successful: {results.results.successful.length}</p>
                    <p>❌ Failed: {results.results.failed.length}</p>
                    <p>📊 Total: {results.results.total}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* View Test Users */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="mr-2" size={20} />
              View Test Users
            </h2>
            
            <p className="text-gray-600 mb-4">
              View the list of test users that will be registered.
            </p>
            
            <button
              onClick={handleViewTestUsers}
              className="w-full btn btn-secondary flex items-center justify-center"
            >
              <Eye size={16} className="mr-2" />
              View Test Users
            </button>

            {testUsers && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">Test Users ({testUsers.count}):</h3>
                <div className="max-h-60 overflow-y-auto">
                  {testUsers.users.map((user: any, index: number) => (
                    <div key={index} className="text-sm text-gray-600 py-1 border-b border-gray-100">
                      <span className="font-medium">{user.name}</span> - {user.email}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

           {/* Create Admin User */}
           <div className="card">
             <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
               <Users className="mr-2" size={20} />
               Create Admin User
             </h2>
             
             <p className="text-gray-600 mb-4">
               Create an admin user to test admin privileges like deleting any post.
             </p>
             
             <div className="space-y-3 mb-4">
               <input
                 type="text"
                 placeholder="Admin Name"
                 value={adminForm.name}
                 onChange={(e) => setAdminForm({...adminForm, name: e.target.value})}
                 className="input"
               />
               <input
                 type="email"
                 placeholder="Admin Email"
                 value={adminForm.email}
                 onChange={(e) => setAdminForm({...adminForm, email: e.target.value})}
                 className="input"
               />
               <input
                 type="password"
                 placeholder="Admin Password"
                 value={adminForm.password}
                 onChange={(e) => setAdminForm({...adminForm, password: e.target.value})}
                 className="input"
               />
             </div>
             
             <button
               onClick={handleCreateAdmin}
               disabled={loading}
               className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
             >
               {loading ? (
                 <>
                   <Loader2 className="mr-2 animate-spin" size={16} />
                   Creating Admin...
                 </>
               ) : (
                 <>
                   <Users size={16} className="mr-2" />
                   Create Admin User
                 </>
               )}
             </button>

             {adminResult && (
               <div className="mt-4 p-4 bg-gray-50 rounded-md">
                 <h3 className="font-medium text-gray-900 mb-2">Admin Creation Result:</h3>
                 <p className="text-sm text-gray-600 mb-2">{adminResult.message}</p>
                 {adminResult.user && (
                   <div className="text-sm text-gray-600">
                     <p>✅ Admin created: {adminResult.user.name}</p>
                     <p>📧 Email: {adminResult.user.email}</p>
                     <p>👑 Role: {adminResult.user.role}</p>
                   </div>
                 )}
               </div>
             )}
           </div>
         </div>

        {/* Test User Credentials */}
        <div className="mt-8 card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Test User Credentials
          </h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Format:</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Username: username1, username2, ..., username25</li>
              <li>• Email: username1@test.com, username2@test.com, ..., username25@test.com</li>
              <li>• Password: Password@1, Password@2, ..., Password@25</li>
            </ul>
            <p className="text-sm text-gray-500 mt-3">
              You can use these credentials to test login functionality after registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
