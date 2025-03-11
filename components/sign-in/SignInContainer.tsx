"use client";

import styles from "@/modules/components/sign-in/SignInContainer.module.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

interface SignInForm {
  email: string;
  password: string;
}

export default function SignInContainer() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState();

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;

      await axios.post(url, data);

      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      setError(e.response.data.error);
    }
  };

  return (
    <Box className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.heading_text}>Welcome back!</span>
        {/* TODO: change this */}
        <span className={styles.subheading_text}>
          Sign in to continue your child&apos;s homeschooling journey
        </span>
      </div>
      <span className={styles.error_text}>{error}</span>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.form_inputs}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <TextField {...field} label="Email" />}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Password" type="password" />
            )}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="large"
          className={styles.sign_in}
          // onClick={onSignIn}
        >
          Sign In
        </Button>
      </form>
      <span className={styles.sign_up}>
        Don&apos;t have an account?
        <Link href="/sign-up" className="link_text">
          Sign Up
        </Link>
      </span>
    </Box>
  );
}
