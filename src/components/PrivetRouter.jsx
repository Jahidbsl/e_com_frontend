"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PrivateRoute({ children, redirectTo = "/login" }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace(redirectTo);
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router, redirectTo]);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return isAuthenticated ? children : null;
}