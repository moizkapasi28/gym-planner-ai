import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { UserButton } from "@neondatabase/neon-js/auth/react";

export default function Navbar() {
  const auth = useAuth();
  const user = auth?.user;
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <Dumbbell className="w-6 h-6 text-accent" />
          <span className="font-semibold text-lg">AI Gym Planner</span>
        </Link>

        <nav>
          {user ? (
            <>
              <div className="gap-6">
                <Link
                  to="/profile"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Button variant="ghost">My Plan</Button>
                </Link>
                <UserButton className="bg-accent" />
              </div>
            </>
          ) : (
            <>
              <ul className="flex items-center gap-6">
                <li>
                  <Link
                    to="/auth/sign-up"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Button variant="ghost">Sign Up</Button>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/sign-in"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Button>Sign In</Button>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
