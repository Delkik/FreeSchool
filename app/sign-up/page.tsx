import SignUpContainer from "@/components/sign-up/SignUpContainer";
import styles from "@/modules/app/sign-up/SignUp.module.css";

export default function SignUp() {
  const leftContainer = <div className={styles.left_container}></div>;
  const rightContainer = (
    <div className={styles.right_container}>
      <SignUpContainer />
    </div>
  );

  return (
    <div className={styles.page_container}>
      {leftContainer}
      {rightContainer}
    </div>
  );
}
