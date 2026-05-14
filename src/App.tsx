import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import { AppShell } from "@/ui";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import OnboardingPage from "@/pages/OnboardingPage";

function RootRedirect() {
  const logged = useAppSelector((s) => s.auth.loggedIn);
  const done = useAppSelector((s) => s.onboarding.complete);
  if (!logged) return <Navigate to="/login" replace />;
  if (done) return <Navigate to="/home" replace />;
  return <Navigate to="/onboarding" replace />;
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
