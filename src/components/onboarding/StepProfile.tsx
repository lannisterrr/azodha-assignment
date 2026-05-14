import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { bumpStep, patchProfile } from "@/features/onboardingSlice";
import { Button, ButtonRow, EmptyState, FileField, FormAlert, SectionTitle, TextField } from "@/ui";

export default function StepProfile() {
  const dispatch = useAppDispatch();
  const prof = useAppSelector((s) => s.onboarding.profile);

  const [f, setF] = useState(prof);
  const [bad, setBad] = useState<string | null>(null);

  const onPic = (file: File | null) => {
    if (!file) {
      setF((x) => ({ ...x, pic: "" }));
      dispatch(patchProfile({ pic: "" }));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const data = String(reader.result ?? "");
      setF((x) => ({ ...x, pic: data }));
      dispatch(patchProfile({ pic: data }));
    };
    reader.readAsDataURL(file);
  };

  const goNext = () => {
    setBad(null);
    if (!f.fullName.trim() || !f.email.includes("@")) {
      setBad("Enter your full name and email.");
      return;
    }
    if (!String(f.age).trim()) {
      setBad("Enter your age.");
      return;
    }
    const ageNum = Number(f.age);
    if (Number.isNaN(ageNum) || ageNum <= 0 || ageNum > 130) {
      setBad("Enter a valid age.");
      return;
    }
    dispatch(patchProfile(f));
    dispatch(bumpStep(1));
  };

  return (
    <div>
      <SectionTitle>Personal profile</SectionTitle>

      <TextField
        id="ob-name"
        label="Full name"
        autoComplete="name"
        value={f.fullName}
        onChange={(e) => setF({ ...f, fullName: e.target.value })}
      />
      <TextField
        id="ob-age"
        label="Age"
        type="number"
        inputMode="numeric"
        min={1}
        value={f.age}
        onChange={(e) => setF({ ...f, age: e.target.value })}
      />
      <TextField
        id="ob-email"
        label="Email"
        type="email"
        autoComplete="email"
        value={f.email}
        onChange={(e) => setF({ ...f, email: e.target.value })}
      />

      <FileField
        label="Profile photo"
        hint="Optional. Saved with your profile on this device."
        onChange={onPic}
      />

      {!f.pic ? (
        <EmptyState
          title="No photo"
          description="You can upload an image above."
        />
      ) : (
        <img className="ui-pic-preview" src={f.pic} alt="Profile preview" />
      )}

      {bad ? <FormAlert message={bad} /> : null}

      <ButtonRow>
        <Button type="button" variant="primary" onClick={goNext}>
          Next
        </Button>
      </ButtonRow>
    </div>
  );
}
