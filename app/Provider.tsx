"use client";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { UserResource } from "@clerk/types";
import { UserDetails, UserDetailsType } from "./_context/UserDetails";

function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);

  // Use useCallback to memoize the function and resolve dependency issues
  const saveUserInfo = useCallback(async (userData: UserResource) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: userData.fullName,
          primaryEmailAddress: {
            emailAddress: userData.primaryEmailAddress?.emailAddress,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user info");
      }

      const result = await response.json();
      setUserDetails(result.user);
      // console.log("User saved/retrieved:", result);
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  }, []); // Empty dependency array as the function doesn't depend on external variables

  useEffect(() => {
    // Only call saveUserInfo if user exists
    if (user) {
      saveUserInfo(user);
    }
  }, [user, saveUserInfo]); // Add saveUserInfo to dependency array

  return (
    <>
      <UserDetails.Provider value={{ userDetails, setUserDetails }}>
        {children}
      </UserDetails.Provider>
    </>
  );
}

export default Provider;
