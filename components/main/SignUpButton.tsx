import styles from "@/modules/components/main/SignUpButton.module.css";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function SignUpButton() {
  return (
    <Link href={"/sign-up"}>
      <Button
        className={styles.button}
        style={{
          backgroundColor: "var(--doe-green)",
          color: "black",
        }}
        size="large"
        variant="contained"
      >
        Sign Up
      </Button>
    </Link>
  );
}
