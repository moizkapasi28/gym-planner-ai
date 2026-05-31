import { AuthView } from "@neondatabase/neon-js/auth/react/ui";
import { useParams } from "react-router-dom";

export default function Auth() {
  const { pathname } = useParams();
  return (
    <div className="min-h-screen flex pt-24 pb-12 px-6 items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <AuthView pathname={pathname} />
      </div>
    </div>
  );
}
