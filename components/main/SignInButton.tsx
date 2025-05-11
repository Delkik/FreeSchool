import styles from "@/modules/components/main/SignInButton.module.css";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href={"/sign-in"}>
      <Button
        className={styles.button}
        style={{
          backgroundColor: "var(--doe-orange)",
          color: "black",
        }}
        size="large"
        variant="contained"
      >
        Sign In
      </Button>
    </Link>
  );
}
