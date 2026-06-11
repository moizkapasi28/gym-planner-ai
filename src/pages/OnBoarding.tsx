import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Text-area";
import { useAuth } from "../context/AuthContext";
import type { UserProfile } from "../types";

const goalOptions = [
  { value: "bulk", label: "Build Muscle (Bulk)" },
  { value: "cut", label: "Lose Fat (Cut)" },
  { value: "recomp", label: "Body Recomposition" },
  { value: "strength", label: "Body Strength" },
  { value: "endurance", label: "Build Endurance" },
];

const experienceOptions = [
  { value: "beginner", label: "Beginner(0-1 years)" },
  { value: "intermediate", label: "Intermediate(1-3 years)" },
  { value: "advanced", label: "Advanced(3+ years)" },
];

const daysOptions = [
  { value: "2", label: "2 days/week" },
  { value: "3", label: "3 days/week" },
  { value: "4", label: "4 days/week" },
  { value: "5", label: "5 days/week" },
  { value: "6", label: "6 days/week" },
];

const sessionOPtions = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
];

const equipmentOptions = [
  { value: "none", label: "No Equipment" },
  { value: "basic", label: "Basic Equipment (Dumbbells, Resistance Bands)" },
  { value: "full", label: "Full Gym Access" },
  { value: "home", label: "Home Gym" },
  { value: "dumbells", label: "Only Dumbbells" },
];

const splitOptions = [
  { value: "fullbody", label: "Full Body" },
  { value: "upperlower", label: "Upper/Lower Split" },
  { value: "pushpulllegs", label: "Push/Pull/Legs Split" },
  { value: "custom", label: "Let AI decide" },
];

export default function OnBoarding() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    goal: "bulk",
    experience: "beginner",
    days: "3",
    session: "45",
    equipment: "none",
    split: "fullbody",
    injuries: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  if (!auth || !auth.user) return <RedirectToSignIn />;

  const user = auth.user;
  const saveProfile = auth.saveProfile;
  const generatePlan = auth.generatePlan;

  const handleUpdateForm = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profile: Omit<UserProfile, "userId" | "createdAt" | "updatedAt"> = {
      goal: data.goal as UserProfile["goal"],
      experience: data.experience as UserProfile["experience"],
      days: parseInt(data.days) as UserProfile["days"],
      session: parseInt(data.session) as UserProfile["session"],
      equipment: data.equipment as UserProfile["equipment"],
      split: data.split as UserProfile["split"],
      injuries: data.injuries as UserProfile["injuries"],
    };
    try {
      await saveProfile(profile);
      setIsGenerating(true);
      await generatePlan();
      navigate("/profile");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save profile",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (!user) return <RedirectToSignIn />;

  return (
    <SignedIn>
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-xl mx-auto">
          {!isGenerating ? (
            <Card variant="bordered">
              <h1 className="text-2xl font-bold mb-2">
                Tell us about yourself
              </h1>
              <p className="text-muted mb-6">
                Help us create a perfect plan for you
              </p>
              <form className="space-y-5">
                <Select
                  id="goal"
                  label="What is your primary fitness goal?"
                  options={goalOptions}
                  value={data.goal}
                  onChange={(e) => handleUpdateForm("goal", e.target.value)}
                  className="mb-4"
                />
                <Select
                  id="experience"
                  label="How experienced are you?"
                  options={experienceOptions}
                  value={data.experience}
                  onChange={(e) =>
                    handleUpdateForm("experience", e.target.value)
                  }
                  className="mb-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    id="days"
                    label="How many days per week can you train?"
                    options={daysOptions}
                    value={data.days}
                    onChange={(e) => handleUpdateForm("days", e.target.value)}
                    className="mb-4"
                  />
                  <Select
                    id="session"
                    label="How long are your training sessions?"
                    options={sessionOPtions}
                    value={data.session}
                    onChange={(e) =>
                      handleUpdateForm("session", e.target.value)
                    }
                    className="mb-4"
                  />
                </div>
                <Select
                  id="equipment"
                  label="What type of equipment do you have?"
                  options={equipmentOptions}
                  value={data.equipment}
                  onChange={(e) =>
                    handleUpdateForm("equipment", e.target.value)
                  }
                  className="mb-4"
                />
                <Select
                  id="split"
                  label="What type of split do you want?"
                  options={splitOptions}
                  value={data.split}
                  onChange={(e) => handleUpdateForm("split", e.target.value)}
                  className="mb-4"
                />

                <Textarea
                  id="injuries"
                  label="Any injuries or special considerations we should know about?"
                  placeholder="Eg: Knee pain, lower back issues, etc."
                  rows={3}
                  className="mb-4"
                  value={data.injuries}
                  onChange={(e) => handleUpdateForm("injuries", e.target.value)}
                />
              </form>
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="flex-1 gap-2"
                  onClick={handleSubmit}
                >
                  Generate My Plan{" "}
                  <ArrowRight className="flex self-center w-4 h-4" />
                </Button>
              </div>
            </Card>
          ) : (
            <Card variant="bordered" className="text-center py-16">
              <Loader2 className="w-12 h-12 text-accent mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-bold">Creating Your Plan</h1>
              <p>Our AI is creating generalised training Program</p>
            </Card>
          )}
        </div>
      </div>
    </SignedIn>
  );
}
