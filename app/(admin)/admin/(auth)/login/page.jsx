"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";

import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),

      password: Yup.string().required("Required"),
    }),
    validateOnChange: false,

    onSubmit: (values) => {
      const validUser =
        values?.email === "admin@admin.com" && values?.password === "admin123";
      console.log(values, validUser);
      if (validUser) {
        sessionStorage.setItem("auth", "true");
        router.replace("/admin/campaigns");
      } else {
        setError(true);
      }
    },
  });

  useEffect(() => {
    if (sessionStorage.getItem("auth")) {
      router.replace("/admin/campaigns");
    }

    return () => {};
  }, [router]);

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name={"email"}
              placeholder="m@example.com"
              value={form.values?.email}
              onChange={(value) =>
                form.setFieldValue("email", value.target.value)
              }
            />
            <p className="px-1 text-xs text-red-600">{form.errors?.email}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={form.values?.password}
              onChange={form.handleChange}
            />
            {form?.errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {form.errors?.password}
              </p>
            )}
          </div>
          {error && <Alert severity="error">Invalid credentials</Alert>}
          <Button type="submit" onClick={form.handleSubmit} className="w-full">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
