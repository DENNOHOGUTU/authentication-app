import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from 'next/link';

// Define the type of the user data
interface UserData {
  username: string;
  email: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login if no token found
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
        {userData ? (
          <div className="text-center">
            <p className="text-lg mb-2">
              Welcome, <span className="font-semibold">{userData.username}</span>
            </p>
            <p className="mb-4">
              Email: <span className="font-semibold">{userData.email}</span>
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </main>
    </div>
  );
}
