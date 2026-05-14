import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PersistShape } from "@/utils/storage";

export type OnboardingState = PersistShape["onboarding"];

const blank: OnboardingState = {
  step: 1,
  complete: false,
  profile: { fullName: "", age: "", email: "", pic: "" },
  songs: [""],
  payment: { card: "", expiry: "", cvv: "" },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: blank,
  reducers: {
    setStep(s, a: PayloadAction<number>) {
      const n = a.payload;
      s.step = n < 1 ? 1 : n > 4 ? 4 : n;
    },
    bumpStep(s, a: PayloadAction<number>) {
      s.step += a.payload;
      if (s.step < 1) s.step = 1;
      if (s.step > 4) s.step = 4;
    },
    patchProfile(s, a: PayloadAction<Partial<OnboardingState["profile"]>>) {
      s.profile = { ...s.profile, ...a.payload };
    },
    setSongs(s, a: PayloadAction<string[]>) {
      const cleaned = a.payload.map((x) => x.trim()).filter(Boolean);
      s.songs = cleaned.length ? cleaned : [""];
    },
    patchPayment(s, a: PayloadAction<Partial<OnboardingState["payment"]>>) {
      s.payment = { ...s.payment, ...a.payload };
    },
    markFlowDone(s) {
      s.complete = true;
    },
    resetOnboarding() {
      return { ...blank };
    },
  },
});

export const {
  setStep,
  bumpStep,
  patchProfile,
  setSongs,
  patchPayment,
  markFlowDone,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
