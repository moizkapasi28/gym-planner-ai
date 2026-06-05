export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface UserProfile {
  userId: string;
  goal: "bulk" | "cut" | "recomp" | "strength" | "endurance";
  experience: "beginner" | "intermediate" | "advanced";
  days: number;
  session: number;
  equipment: "none" | "basic" | "full" | "home" | "dumbells";
  split: "fullbody" | "upperlower" | "pushpulllegs" | "custom";
  injuries: string;
  createdAt: string;
  updatedAt: string;
}
