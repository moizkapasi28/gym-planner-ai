import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const auth = useAuth();
  const user = auth?.user;
  const isLoading = auth?.loading;
  const plan = true;

  if (user && !isLoading) return <Navigate to="/profile" replace />;

  if (!plan) return <Navigate to="/onboarding" replace />;

  return (
    <div className="home">
      <h1>Welcome to the AI Gym Planner</h1>
      <p>
        This application helps you create personalized workout plans using AI.
        Get started by creating an account and setting up your profile!
      </p>
    </div>
  );
}
