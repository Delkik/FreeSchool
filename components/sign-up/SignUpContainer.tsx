import styles from "@/modules/components/sign-up/SignUpContainer.module.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpContainer() {
  const router = useRouter();

  const onSignUp = () => {
    router.push("/dashboard");
  };

  return (
    <Box className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.heading_text}>Welcome!</span>
        <span className={styles.subheading_text}>
          Sign up to start your child&apos;s learning
        </span>
      </div>
      <Box className={styles.form_inputs}>
        <TextField label="Name" />
        <TextField label="Email" />
        <TextField label="Password" type="password" />
        <TextField label="Confirm Password" type="password" />
      </Box>
      <Button
        variant="contained"
        size="large"
        className={styles.sign_up}
        onClick={onSignUp}
      >
        Sign Up
      </Button>
      <span className={styles.sign_in}>
        Already have an account?
        <Link href="/sign-in" className="link_text">
          Sign In
        </Link>
      </span>
    </Box>
  );
}
