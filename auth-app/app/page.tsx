// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">GROUP D work</h1>
        <div className="text-center">
          <Link href="/login">
            <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Go to Login
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
