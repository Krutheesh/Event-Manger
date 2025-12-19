"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import api from "@/lib/api"; // <-- your axios instance

export function useStoreUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (userId) return; // already stored

    async function storeUser() {
      try {
        setIsLoading(true);

        const res = await api({
          url: "/users/store",
          method: "POST",
        });

        setUserId(res.data.userId);
      } catch (error) {
        console.error("Failed to store user:", error);
      } finally {
        setIsLoading(false);
      }
    }

    storeUser();
  }, [isLoaded, isSignedIn]);

  return {
    isLoading: isLoading || (isSignedIn && userId === null),
    isAuthenticated: isSignedIn && userId !== null,
  };
}
