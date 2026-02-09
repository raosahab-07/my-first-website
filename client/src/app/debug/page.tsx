'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function DebugPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          setError(authError.message);
          return;
        }

        if (user) {
          setUserData({
            id: user.id,
            email: user.email,
            displayName: user.user_metadata?.display_name || 'Not set',
            avatarUrl: user.user_metadata?.avatar_url || 'Not set',
            bio: user.user_metadata?.bio || 'Not set',
            appearance: user.user_metadata?.appearance || 'Not set'
          });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Debug Information</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6">
            <h2 className="font-bold mb-2">Error:</h2>
            <p>{error}</p>
          </div>
        )}

        {userData ? (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">User Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-foreground/40 text-sm">User ID:</span>
                  <p className="text-white">{userData.id}</p>
                </div>
                <div>
                  <span className="text-foreground/40 text-sm">Email:</span>
                  <p className="text-white">{userData.email}</p>
                </div>
                <div>
                  <span className="text-foreground/40 text-sm">Display Name:</span>
                  <p className="text-white">{userData.displayName}</p>
                </div>
                <div>
                  <span className="text-foreground/40 text-sm">Avatar URL:</span>
                  <p className="text-white break-all">{userData.avatarUrl}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-foreground/40 text-sm">Bio:</span>
                  <p className="text-white">{userData.bio}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-foreground/40 text-sm">Appearance:</span>
                  <pre className="text-white bg-black/20 p-3 rounded mt-1 overflow-x-auto">
                    {JSON.stringify(userData.appearance, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {userData.avatarUrl && userData.avatarUrl !== 'Not set' && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Avatar Preview</h2>
                <img 
                  src={userData.avatarUrl} 
                  alt="User Avatar" 
                  className="w-32 h-32 rounded-full object-cover border-2 border-primary"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 p-4 rounded-lg">
            <h2 className="font-bold mb-2">No User Data</h2>
            <p>No user is currently logged in.</p>
          </div>
        )}
      </div>
    </div>
  );
}