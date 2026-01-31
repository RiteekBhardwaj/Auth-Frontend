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
import {
  IconBrandGoogle,
  IconEye,
  IconEyeOff,
  IconLockPassword,
  IconMail,
  IconNumber123,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { sendOtp, create } from "@/lib/api/auth.api";

type LoginFormProps = {
  setLoginForm: (v: boolean) => void;
};

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export const SignUpForm = ({ setLoginForm }: LoginFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [otpFieldVisible, setOtpFieldVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();
  const password = watch("password");
  const email = watch("email");
  const router = useRouter();

  const handleSendOtp = async (email: string) => {
    return toast.promise(
      sendOtp(email, "signup").then((data) => {
        setOtpFieldVisible(true);
        return data;
      }),
      {
        position: "top-center",
        loading: "Sending OTP...",
        success: (data) => data.message + ". CHECK YOUR SPAM FOLDER",
        error: (err) => err.message ?? "Failed to send OTP",
      },
    );
  };

  const createAccount = async (data: SignUpFormData) => {
    return toast.promise(
      create(data).then((res) => {
        router.replace("/dashboard");
        return res;
      }),
      {
        position: "top-center",
        loading: "Creating account...",
        success: (res) => `Welcome, ${res.username}!`,
        error: (err) => err.message ?? "Signup failed",
      },
    );
  };

  const onSubmit = async (data: SignUpFormData) => {
    try {
      if (!otpFieldVisible) {
        await handleSendOtp(data.email);
        return;
      }
      await createAccount(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Card className="md:w-1/2 max-w-72 mx-auto mt-10">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Enter your details below to create account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => {
                setLoginForm(true);
              }}
            >
              Login
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
              {otpFieldVisible && (
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
              )}
              <Button disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  "Loading..."
                ) : (
                  <span> {otpFieldVisible ? "Signup" : "Send OTP"}</span>
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
