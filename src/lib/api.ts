import type { UserProfile } from "../types";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function post(path: string, body: object) {
  const response = await fetch(`${BASE_URL}/api/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw (
      new Error(await response.json().catch(() => ({}))).message ||
      "Request Failed"
    );
  }

  return response.json();
}

async function get(path: string) {
  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export const api = {
  saveProfile: (
    userId: string,
    profile: Omit<UserProfile, "userId" | "createdAt" | "updatedAt">,
  ) => {
    return post("profile", { userId, ...profile });
  },
};
