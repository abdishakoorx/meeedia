import { createContext, Dispatch, SetStateAction } from "react";

// Define the type for your user details
export interface UserDetailsType {
  id?: number;
  name?: string;
  email?: string;
  credits?: number;
  refreshUserDetails: () => Promise<void>;
}

// Define the context value type
interface UserDetailsContextType {
  userDetails: UserDetailsType | null;
  setUserDetails: Dispatch<SetStateAction<UserDetailsType | null>>;
}

// Provide a default value that matches the context type
export const UserDetails = createContext<UserDetailsContextType>({
  userDetails: null,
  setUserDetails: () => {}
});