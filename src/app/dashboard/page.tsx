"use client";

import { capitalize } from "@/utils/Function";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "customer") {
      router.replace("/profile");
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
    <div className="bg-white p-4 py-20 mt-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with tabs */}
        <div className="border-b text-3xl">
          <h1>
            {session?.user?.role ? 
            capitalize(session?.user?.role)
            : 'User'} Profile
          </h1>
        </div>

        {/* Profile Content */}
        <div className="mt-8">
          <h1 className="text-xl font-medium text-gray-900">Welcome, {capitalize(session?.user?.name || "Guess")}</h1>
          
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
                <p>{capitalize(session?.user?.name || "Guess")}</p>
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