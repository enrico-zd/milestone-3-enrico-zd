"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
      if (status === "authenticated" && session?.user?.role === "admin") {
        router.replace("/dashboard");
        return;
      }
    }, [session, status, router])
  
    // Show loading state while checking authentication
    if (status === "loading") {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      );
    }

  return (
    <div className="my-20 bg-white p-4">
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
                <button className="ml-3 text-sm text-green-600 hover:text-green-700">
                  Ubah
                </button>
              </div>
            </div>

            <div>
              <h3 className="block text-sm font-medium text-gray-700">Email</h3>
              <div className="mt-1 flex items-center">
                <p>{session?.user?.email}</p>
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Terverifikasi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}