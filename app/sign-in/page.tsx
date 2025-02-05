"use client";

import SignInContainer from "@/components/sign-in/SignInContainer";
import styles from "@/modules/app/sign-in/SignIn.module.css";
import Container from "@mui/material/Container";

export default function SignIn() {
  const rightContainer = <div className={styles.right_container}></div>;
  const leftContainer = (
    <Container className={styles.left_container}>
      <SignInContainer />
    </Container>
  );

  return (
    <div className={styles.page_container}>
      {leftContainer}
      {rightContainer}
    </div>
  );
}
