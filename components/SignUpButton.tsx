import styles from "@/modules/SignUpButton.module.css";
import Link from "next/link";

export default function SignUpButton() {
  return (
    <Link href={"/dashboard"}>
      <button className={styles.button}>Sign Up</button>
    </Link>
  );
}
