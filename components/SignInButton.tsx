import styles from "@/modules/SignInButton.module.css";
import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href={"/dashboard"}>
      <button className={styles.button}>Sign In</button>
    </Link>
  );
}
