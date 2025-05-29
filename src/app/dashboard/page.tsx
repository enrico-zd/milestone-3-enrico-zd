"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const {data: session} = useSession();

  return (
    <div className="bg-white p-4 py-20 mt-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with tabs */}
        <div className="border-b text-3xl">
          <h1>
            {session?.user?.role ? 
            (session.user.role.charAt(0).toUpperCase() + session.user.role.slice(1)) 
            : 'User'} Profile
          </h1>
        </div>

        {/* Profile Content */}
        <div className="mt-8">
          <h1 className="text-xl font-medium text-gray-900">Welcome, {session?.user?.name}</h1>
          
          {/* Profile Picture Section */}
          <div className="mt-6">
            <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full overflow-hidden">
              <div className="relative w-full h-full">
                <img src={session?.user?.avatar} />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="block text-sm font-medium text-gray-700">Nama</h3>
              <div className="mt-1 flex items-center">
                <p>{session?.user?.name}</p>
              </div>
            </div>

            <div>
              <h3 className="block text-sm font-medium text-gray-700">Email</h3>
              <div className="mt-1 flex items-center">
                <p>{session?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}