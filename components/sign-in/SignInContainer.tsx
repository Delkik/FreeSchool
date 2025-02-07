import styles from "@/modules/components/sign-in/SignInContainer.module.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInContainer() {
  const router = useRouter();

  const onSignIn = () => {
    router.push("/dashboard");
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
      <Box className={styles.form_inputs}>
        <TextField label="Email" />
        <TextField label="Password" type="password" />
      </Box>
      <Button
        variant="contained"
        size="large"
        className={styles.sign_in}
        onClick={onSignIn}
      >
        Sign In
      </Button>
      <span className={styles.sign_up}>
        Don&apos;t have an account?
        <Link href="/sign-up" className="link_text">
          Sign Up
        </Link>
      </span>
    </Box>
  );
}
