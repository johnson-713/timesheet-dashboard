"use client";

import { FormProvider, useForm } from "react-hook-form";
import AppInput from "@/components/AppInput"; // update path as needed
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const formUtils = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values: LoginForm) => {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col justify-center px-16">
        <h2 className="mb-8 text-2xl font-semibold">Welcome back</h2>
        <FormProvider {...formUtils}>
          <form
            onSubmit={formUtils.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <AppInput
              label="Email"
              name="email"
              type="email"
              placeholder="name@example.com"
              formUtils={formUtils}
              rules={{ required: "Email is required" }}
            />
            <AppInput
              label="Password"
              name="password"
              type="password"
              placeholder="********"
              formUtils={formUtils}
              rules={{ required: "Password is required" }}
            />
            {/* {error && <p className="text-red-500">{error}</p>} */}
            <Button
              type="submit"
              className="w-full mt-4 bg-primary cursor-pointer"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </FormProvider>
      </div>
      <div className="hidden flex-1 bg-primary text-white md:flex flex-col justify-center items-start px-16">
        <h1 className="text-[40px] font-semibold mb-4">ticktock</h1>
        <p className="font-normal text-[16px]">
          Introducing ticktock, our cutting-edge timesheet web application
          designed to revolutionize how you manage employee work hours. With
          ticktock, you can effortlessly track and monitor employee attendance
          and productivity from anywhere, anytime, using any internet-connected
          device.
        </p>
      </div>
    </div>
  );
}
