import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Navbar from "./components/layout/Navbar";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { authClient } from "./lib/auth";
import AuthProvider from "./context/AuthContext";
function App() {
  return (
    <>
      <NeonAuthUIProvider emailOTP authClient={authClient as any}>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/onboarding" element={<OnBoarding />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/auth/:pathname" element={<Auth />} />
                  <Route path="/account/:pathname" element={<Account />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </NeonAuthUIProvider>
    </>
  );
}

export default App;
