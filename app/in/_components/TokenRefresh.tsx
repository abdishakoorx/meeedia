"use client"

import { useState, useEffect, useContext, useCallback } from 'react';
import { UserDetails } from '@/app/_context/UserDetails';
import { Progress } from "@/components/ui/progress";
import { Coins } from "lucide-react";

const TokenRefresh = ({ isCollapsed = false, isMobile = false }) => {
  const { userDetails } = useContext(UserDetails);
  const [refreshTimeRemaining, setRefreshTimeRemaining] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkTokenRefresh = useCallback(async () => {
    const email = userDetails?.email;
    const credits = userDetails?.credits ?? 0;
    const refreshFunction = userDetails?.refreshUserDetails;

    if (!email || credits >= 3 || isRefreshing) {
      return;
    }

    try {
      setIsRefreshing(true);
      const response = await fetch("/api/user/refresh-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.result) {
        await refreshFunction?.();
        setRefreshTimeRemaining(null);
      } else if (data.timeRemaining) {
        setRefreshTimeRemaining(data.timeRemaining);
      }
    } catch (error) {
      console.error("Error checking token refresh:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, userDetails?.email, userDetails?.credits, userDetails?.refreshUserDetails]);

  useEffect(() => {
    // Only check when credits first drop below 3 and we don't have a timer running
    const credits = userDetails?.credits ?? 0;
    if (credits < 3 && refreshTimeRemaining === null && !isRefreshing) {
      checkTokenRefresh();
    }
  }, [userDetails?.credits, refreshTimeRemaining, isRefreshing, checkTokenRefresh]);

  useEffect(() => {
    if (!refreshTimeRemaining) return;

    const timer = setInterval(() => {
      setRefreshTimeRemaining(prevTime => {
        if (prevTime === null) return null;
        
        const newTime = prevTime - 60000; // Decrease by one minute
        if (newTime <= 0) {
          // Time's up, trigger token refresh
          checkTokenRefresh();
          return null;
        }
        return newTime;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, [refreshTimeRemaining, checkTokenRefresh]);

  const formatTimeRemaining = (ms: number): string => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-4 border-t border-gray-300 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        {!isMobile && isCollapsed ? (
          <Coins className="h-6 w-6 text-yellow-500" />
        ) : (
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-yellow-500" />
            <p className="text-base font-bold text-gray-600 dark:text-gray-300">
              Tokens
            </p>
          </div>
        )}
      </div>

      <Progress
        value={(userDetails?.credits ?? 0) * 10}
        className="h-3 rounded-full bg-gray-200 dark:bg-gray-600"
      >
        <span className="sr-only">
          {(userDetails?.credits ?? 0) * 10}% Tokens Used
        </span>
      </Progress>

      {!isMobile && isCollapsed ? null : (
        <>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {10 - (userDetails?.credits ?? 0)} tokens used
          </p>
          {(userDetails?.credits ?? 0) < 3 && (
            <div className="mt-1 space-y-1">
              <p className="text-xs text-red-500 dark:text-red-400">
                Low tokens remaining!
              </p>
              {refreshTimeRemaining && refreshTimeRemaining > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tokens refresh in: {formatTimeRemaining(refreshTimeRemaining)}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TokenRefresh;