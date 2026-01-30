import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "./field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import {
  IconEye,
  IconEyeOff,
  IconLockPassword,
  IconMail,
  IconNumber123,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { forgotPass, sendOtp } from "@/lib/api/auth.api";
import { toast } from "sonner";

type ForgotFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export const ForgotForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [otpFieldVisible, setOtpFieldVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>();
  const password = watch("password");
  const email = watch("email");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSendOtp = async (email: string) => {
    return toast.promise(
      sendOtp(email, "forgot").then((data) => {
        setOtpFieldVisible(true);
        return data;
      }),
      {
        position: "top-center",
        loading: "Sending OTP...",
        success: (data) => data.message,
        error: (err) => err.message ?? "Failed to send OTP",
      },
    );
  };

  const forgotPassword = async (data: ForgotFormData) => {
    return toast.promise(
      forgotPass(data).then((res) => {
        router.replace("/");
        return res;
      }),
      {
        position: "top-center",
        loading: "Changing Password...",
        success: (res) => res.message,
        error: (err) => err.message ?? "Forgot Password failed",
      },
    );
  };

  const onSubmit = async (data: ForgotFormData) => {
    try {
      if (!otpFieldVisible) {
        await handleSendOtp(data.email);
        return;
      }
      await forgotPassword(data);
      
      setOpen(false);
      reset();
      setOtpFieldVisible(false);
      setPasswordVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Forgot ?</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <DialogHeader>
              <DialogTitle>Forgot</DialogTitle>
              <DialogDescription>
                Enter your email to change password
              </DialogDescription>
            </DialogHeader>
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
            </FieldGroup>
            {otpFieldVisible && (
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
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
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      type={`${passwordVisible ? "text" : "password"}`}
                      id="confirmPassword"
                      placeholder="enter your password"
                      className="placeholder:text-xs"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value == password || "Password do not match",
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
                  {errors.confirmPassword && (
                    <FieldError>{errors.confirmPassword.message} </FieldError>
                  )}
                </Field>
                <div className="flex">
                  <Field>
                    <div className="flex justify-between">
                      <FieldLabel htmlFor="otp">OTP</FieldLabel>
                      <span
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          handleSendOtp(email);
                        }}
                      >
                        Resend
                      </span>
                    </div>
                    <InputGroup>
                      <InputGroupInput
                        type="text"
                        id="otp"
                        placeholder="enter your otp"
                        className="placeholder:text-xs"
                        {...register("otp", {
                          required: "OTP is required",
                          minLength: {
                            value: 6,
                            message: "Invalid OTP<6",
                          },
                          maxLength: {
                            value: 6,
                            message: "Invalid OTP>6",
                          },
                        })}
                      />
                      <InputGroupAddon align="inline-start">
                        <IconNumber123 />
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.otp && (
                      <FieldError>{errors.otp.message}</FieldError>
                    )}
                  </Field>
                </div>
              </FieldGroup>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Loading..."
                ) : (
                  <span> {otpFieldVisible ? "Submit" : "Send OTP"}</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
