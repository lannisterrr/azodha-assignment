import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { bumpStep, patchPayment } from "@/features/onboardingSlice";
import {
  formatCardDisplay,
  formatCvvInput,
  formatExpiryDisplay,
  validateCardBasic,
  validateCvvThreeDigits,
  validateExpiryBasic,
} from "@/utils/cardFormat";
import { Button, ButtonRow, EmptyState, FormAlert, SectionTitle, TextField } from "@/ui";

export default function StepPayment() {
  const dispatch = useAppDispatch();
  const pay = useAppSelector((s) => s.onboarding.payment);

  const [card, setCard] = useState(() => formatCardDisplay(pay.card));
  const [exp, setExp] = useState(() => formatExpiryDisplay(pay.expiry.replace(/\D/g, "")));
  const [cvv, setCvv] = useState(() => formatCvvInput(pay.cvv));
  const [oops, setOops] = useState<string | null>(null);

  const saveSlice = () => {
    dispatch(patchPayment({ card, expiry: exp, cvv }));
  };

  const fwd = () => {
    setOops(null);
    const cardErr = validateCardBasic(card);
    if (cardErr) {
      setOops(cardErr);
      return;
    }
    const expErr = validateExpiryBasic(exp);
    if (expErr) {
      setOops(expErr);
      return;
    }
    const cvvErr = validateCvvThreeDigits(cvv);
    if (cvvErr) {
      setOops(cvvErr);
      return;
    }
    saveSlice();
    dispatch(bumpStep(1));
  };

  const back = () => {
    saveSlice();
    dispatch(bumpStep(-1));
  };

  return (
    <div>
      <SectionTitle>Payment information</SectionTitle>

      <EmptyState title="Payment" />

      <TextField
        id="ob-card"
        label="Card number"
        hint="Four-digit groups."
        autoComplete="cc-number"
        inputMode="numeric"
        maxLength={23}
        value={card}
        onChange={(e) => setCard(formatCardDisplay(e.target.value))}
      />
      <TextField
        id="ob-exp"
        label="Expiry"
        hint="Four digits; MM/YY format."
        placeholder="MM/YY"
        autoComplete="cc-exp"
        inputMode="numeric"
        maxLength={5}
        value={exp}
        onChange={(e) => setExp(formatExpiryDisplay(e.target.value))}
      />
      <TextField
        id="ob-cvv"
        label="CVV"
        hint="Three digits."
        type="password"
        autoComplete="cc-csc"
        inputMode="numeric"
        maxLength={3}
        value={cvv}
        onChange={(e) => setCvv(formatCvvInput(e.target.value))}
      />

      {oops ? <FormAlert message={oops} /> : null}

      <ButtonRow>
        <Button type="button" variant="ghost" onClick={back}>
          Back
        </Button>
        <Button type="button" variant="primary" onClick={fwd}>
          Next
        </Button>
      </ButtonRow>
    </div>
  );
}
