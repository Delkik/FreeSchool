import styles from "@/modules/components/main/SignInButton.module.css";
import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href={"/sign-in"}>
      <button className={styles.button}>Sign In</button>
    </Link>
  );
}
