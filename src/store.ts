import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice";
import onboardingReducer from "@/features/onboardingSlice";
import { loadFromDisk, mergeWithDefaults, saveToDisk, type PersistShape } from "@/utils/storage";

const boot = mergeWithDefaults(loadFromDisk());

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
  },
  preloadedState: {
    auth: boot.auth,
    onboarding: boot.onboarding,
  },
});

store.subscribe(() => {
  const st = store.getState();
  const blob: PersistShape = {
    auth: { loggedIn: st.auth.loggedIn },
    onboarding: {
      ...st.onboarding,
      profile: { ...st.onboarding.profile },
      payment: { ...st.onboarding.payment },
      songs: [...st.onboarding.songs],
    },
  };
  saveToDisk(blob);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
