import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/layout/Navbar";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { authClient } from "./lib/auth";
import AuthProvider from "./context/AuthContext";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const OnBoarding = lazy(() => import("./pages/OnBoarding"));
const Auth = lazy(() => import("./pages/Auth"));
const Account = lazy(() => import("./pages/Account"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <NeonAuthUIProvider emailOTP authClient={authClient as any}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />

          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen">
                    Loading...
                  </div>
                }
              >
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/onboarding" element={<OnBoarding />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/auth/:pathname" element={<Auth />} />
                  <Route path="/account/:pathname" element={<Account />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </NeonAuthUIProvider>
  );
}

export default App;
