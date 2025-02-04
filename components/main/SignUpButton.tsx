import styles from "@/modules/components/main/SignUpButton.module.css";
import Link from "next/link";

export default function SignUpButton() {
  return (
    <Link href={"/sign-up"}>
      <button className={styles.button}>Sign Up</button>
    </Link>
  );
}
