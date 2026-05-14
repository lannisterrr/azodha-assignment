const LS_KEY = "onb_app_state_v1";

export type PersistShape = {
  auth: { loggedIn: boolean };
  onboarding: {
    step: number;
    complete: boolean;
    profile: {
      fullName: string;
      age: string;
      email: string;
      pic: string;
    };
    songs: string[];
    payment: {
      card: string;
      expiry: string;
      cvv: string;
    };
  };
};

const defaultOnb = (): PersistShape["onboarding"] => ({
  step: 1,
  complete: false,
  profile: { fullName: "", age: "", email: "", pic: "" },
  songs: [""],
  payment: { card: "", expiry: "", cvv: "" },
});

export function loadFromDisk(): Partial<PersistShape> | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(LS_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PersistShape>;
    return parsed;
  } catch {
    return null;
  }
}

export function saveToDisk(state: PersistShape) {
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Storage write failed", e);
  }
}

export function wipeStorage() {
  window.localStorage.removeItem(LS_KEY);
}

export function mergeWithDefaults(partial: Partial<PersistShape> | null): PersistShape {
  const base: PersistShape = {
    auth: { loggedIn: false },
    onboarding: defaultOnb(),
  };
  if (!partial) return base;

  const merged: PersistShape = {
    auth: {
      loggedIn: !!partial.auth?.loggedIn,
    },
    onboarding: {
      ...base.onboarding,
      ...partial.onboarding,
      profile: { ...base.onboarding.profile, ...partial.onboarding?.profile },
      payment: { ...base.onboarding.payment, ...partial.onboarding?.payment },
      songs:
        partial.onboarding?.songs && partial.onboarding.songs.length > 0
          ? [...partial.onboarding.songs]
          : [""],
      step: partial.onboarding?.step ?? 1,
      complete: !!partial.onboarding?.complete,
    },
  };
  return merged;
}
