import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { login } from "@/features/authSlice";
import { Button, ButtonRow, EmptyState, FormAlert, PageCard, TextField } from "@/ui";

const OK_USER = "user123";
const OK_PASS = "password123";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const loggedIn = useAppSelector((s) => s.auth.loggedIn);
  const done = useAppSelector((s) => s.onboarding.complete);

  const [u, setU] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  if (loggedIn && done) return <Navigate to="/home" replace />;
  if (loggedIn) return <Navigate to="/onboarding" replace />;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (u === OK_USER && pw === OK_PASS) {
      dispatch(login());
      nav("/onboarding", { replace: true });
      return;
    }
    setMsg("Invalid username or password.");
  };

  return (
    <PageCard
      eyebrow="Account"
      title="Sign in"
      description="Enter your username and password."
    >
      <EmptyState
        title="Credentials"
        description={
          <>
            Username: <strong>user123</strong>
            <br />
            Password: <strong>password123</strong>
          </>
        }
      />

      <form onSubmit={onSubmit} noValidate>
        <TextField
          id="login-user"
          label="Username"
          autoComplete="username"
          value={u}
          onChange={(e) => setU(e.target.value)}
        />
        <TextField
          id="login-pass"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        {msg ? <FormAlert message={msg} /> : null}
        <ButtonRow>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </ButtonRow>
      </form>
    </PageCard>
  );
}
