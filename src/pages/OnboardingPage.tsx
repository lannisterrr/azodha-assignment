import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import StepProfile from "@/components/onboarding/StepProfile";
import StepSongs from "@/components/onboarding/StepSongs";
import StepPayment from "@/components/onboarding/StepPayment";
import StepSuccess from "@/components/onboarding/StepSuccess";
import { PageCard, StepIndicator } from "@/ui";

export default function OnboardingPage() {
  const loggedIn = useAppSelector((s) => s.auth.loggedIn);
  const done = useAppSelector((s) => s.onboarding.complete);
  const step = useAppSelector((s) => s.onboarding.step);

  if (!loggedIn) return <Navigate to="/login" replace />;
  if (done) return <Navigate to="/home" replace />;

  let body: ReactNode;
  if (step === 1) body = <StepProfile />;
  else if (step === 2) body = <StepSongs />;
  else if (step === 3) body = <StepPayment />;
  else body = <StepSuccess />;

  return (
    <PageCard
      eyebrow="Setup"
      title="Onboarding"
      description={
        <>
          Step {step} of 4. Use Back and Next to move between steps. Your entries are saved in this browser.
        </>
      }
    >
      <StepIndicator current={step} />
      {body}
    </PageCard>
  );
}
