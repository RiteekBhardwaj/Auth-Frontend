"use client";

import { useState } from "react";
import { LoginForm } from "../ui/LoginForm";
import { SignUpForm } from "../ui/SignUpForm";

export const Auth = () => {
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div>
      {loginForm ? (
        <LoginForm setLoginForm={setLoginForm} />
      ) : (
        <SignUpForm setLoginForm={setLoginForm} />
      )}
    </div>
  );
};
