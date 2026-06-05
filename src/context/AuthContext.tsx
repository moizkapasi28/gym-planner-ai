import { createContext, useContext, useEffect, useState } from "react";
import type { User, UserProfile } from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  saveProfile: (
    profile: Omit<UserProfile, "userId" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [neonUser, setNeonUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await authClient.getSession();
        if (!response || !response.data || !response.data.session) {
          setNeonUser(null);
          return;
        } else {
          setNeonUser(response.data.user as unknown as User);
        }
      } catch (error) {
        setNeonUser(null);
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  async function saveProfile(
    profileData: Omit<UserProfile, "userId" | "createdAt" | "updatedAt">,
  ) {
    if (!neonUser) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(neonUser.id, profileData);
  }

  return (
    <AuthContext.Provider value={{ user: neonUser, loading, saveProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
