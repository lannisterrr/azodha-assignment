import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { bumpStep, markFlowDone } from "@/features/onboardingSlice";
import { Button, ButtonRow, EmptyState } from "@/ui";

export default function StepSuccess() {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const back = () => {
    dispatch(bumpStep(-1));
  };

  const toHome = () => {
    dispatch(markFlowDone());
    nav("/home", { replace: true });
  };

  return (
    <div>
      <EmptyState tone="success" title="Onboarding complete" />

      <ButtonRow>
        <Button type="button" variant="ghost" onClick={back}>
          Back
        </Button>
        <Button type="button" variant="primary" onClick={toHome}>
          Continue to home
        </Button>
      </ButtonRow>
    </div>
  );
}
