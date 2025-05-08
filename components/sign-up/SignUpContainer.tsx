import styles from "@/modules/components/sign-up/SignUpContainer.module.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export default function SignUpContainer() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<SignUpForm> = async (data: SignUpForm) => {
    const { name, email, password, confirm } = data;

    try {
      const splitName = name.split(" ");
      if (splitName.length < 2) {
        setError("Please include your First and Last name.");
        return;
      }
      if (password !== confirm) {
        setError("Passwords must match!");
        return;
      }
      setError("");

      const resData = {
        firstName: splitName[0],
        lastName: splitName.slice(1).join(" "),
        email,
        password,
        role: "parent", // TODO: could be teacher, student, parent
      };

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resData),
      });

      const json = await response.json();

      if (json.Session) {
        router.push(`/sign-up/confirm?email=${email}`);
      } else {
        throw new Error(json.error);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.error || e?.error || e?.message);
    }
  };

  return (
    <Box className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.heading_text}>Welcome!</span>
        <span className={styles.subheading_text}>
          Sign up to start your child&apos;s homeschooling journey
        </span>
      </div>
      <span className={styles.error_text}>{error}</span>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.form_inputs}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} required label="Name" />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} required label="Email" />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Password" required type="password" />
            )}
          />
          <Controller
            name="confirm"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                required
                type="password"
              />
            )}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="large"
          className={styles.sign_up}
        >
          Sign Up
        </Button>
      </form>
      <span className={styles.sign_in}>
        Already have an account?
        <Link href="/sign-in" className="link_text">
          Sign In
        </Link>
      </span>
    </Box>
  );
}
