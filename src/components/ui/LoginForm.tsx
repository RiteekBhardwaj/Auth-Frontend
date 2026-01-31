"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { login } from "@/lib/api/auth.api";
import {
  IconEye,
  IconEyeOff,
  IconLockPassword,
  IconMail,
} from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ForgotForm } from "./ForgotForm";

type LoginFormProps = {
  setLoginForm: (v: boolean) => void;
};

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginForm = ({ setLoginForm }: LoginFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const handleLogin = async (data: LoginFormData) => {
    return toast.promise(
      login(data).then((res) => {
        router.replace("/dashboard");
        return res;
      }),
      {
        position: "top-center",
        loading: "Loading...",
        success: (data) => `Welcome, ${data.username}!`,
        error: (err) => err.message ?? "Signup failed",
      },
    );
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (data) {
        await handleLogin(data);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Card className="md:w-1/2 max-w-72 mx-auto mt-10">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => {
                setLoginForm(false);
              }}
            >
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    id="email"
                    placeholder="enter your email"
                    className="placeholder:text-xs"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email",
                      },
                    })}
                  />
                  <InputGroupAddon align="inline-start">
                    <IconMail />
                  </InputGroupAddon>
                </InputGroup>
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>
              <Field>
                <div className="flex justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <InputGroup>
                  <InputGroupInput
                    type={`${passwordVisible ? "text" : "password"}`}
                    id="password"
                    placeholder="enter your password"
                    className="placeholder:text-xs"
                    {...register("password", {
                      required: "Password is reuired",
                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
                        message:
                          "Password must contain uppercase, lowercase, number, special character and minimum 8 character",
                      },
                    })}
                  />
                  <InputGroupAddon align="inline-start">
                    <IconLockPassword />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <Button
                      type="button"
                      variant="link"
                      className="p-0"
                      onClick={() => {
                        setPasswordVisible(!passwordVisible);
                      }}
                    >
                      {passwordVisible ? <IconEye /> : <IconEyeOff />}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>
              <Button disabled={isSubmitting} className="w-full">
                Login
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Separator />
          <span className="cursor-pointer hover:underline">
            <ForgotForm />
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
