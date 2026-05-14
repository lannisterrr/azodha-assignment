import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/features/authSlice";
import { resetOnboarding } from "@/features/onboardingSlice";
import { wipeStorage } from "@/utils/storage";
import { Button, ButtonRow, EmptyState, PageCard } from "@/ui";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((s) => s.auth.loggedIn);
  const done = useAppSelector((s) => s.onboarding.complete);
  const name = useAppSelector((s) => s.onboarding.profile.fullName);

  if (!loggedIn) return <Navigate to="/login" replace />;
  if (!done) return <Navigate to="/onboarding" replace />;

  const clearSession = () => {
    wipeStorage();
    dispatch(logout());
    dispatch(resetOnboarding());
    window.location.href = "/login";
  };

  const displayName = name?.trim() || "there";

  return (
    <PageCard
      eyebrow="Welcome"
      title={`Hello, ${displayName}`}
      description="Onboarding is complete."
    >
      <EmptyState
        tone="success"
        title="Done"
        description="All steps are finished."
      />
      <ButtonRow>
        <Button type="button" variant="ghost" onClick={clearSession}>
          Sign out and clear data
        </Button>
      </ButtonRow>
    </PageCard>
  );
}
