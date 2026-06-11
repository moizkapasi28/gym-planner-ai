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

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  notes?: string;
  alternatives?: string[];
}

export interface PlanOverview {
  goal: string;
  frequency: string;
  split: string;
  notes: string;
}

export interface DaySchedule {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface TrainingPlan {
  id: string;
  userId: string;
  overview: PlanOverview;
  weeklySchedule: DaySchedule[];
  progression: string;
  version: string;
  createdAt: string;
}
