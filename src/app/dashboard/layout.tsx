"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>){
    const pathname = usePathname();

    return (
        <div className="flex flex-col min-h-screen mt-20 bg-gray-50 dark:bg-gray-900">
          <div className="flex-1 flex flex-col md:flex-row">
            <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md p-4">
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                Admin Dashboard
              </h2>
              <nav className="space-y-2">
                <Link
                  href="/dashboard"
                  className={`block py-2 px-4 rounded-md transition-colors ${
                    pathname === "/dashboard"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/product"
                  className={`block py-2 px-4 rounded-md transition-colors ${
                    pathname === "/dashboard/product"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Product Management
                </Link>
                <Link
                  href="/"
                  className={`block py-2 px-4 rounded-md transition-colors`}
                >
                  Back to Home
                </Link>
              </nav>
            </aside>
    
            {/* Main content */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      );
}