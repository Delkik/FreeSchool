"use client";

import SignUpContainer from "@/components/sign-up/SignUpContainer";
import styles from "@/modules/app/sign-up/SignUp.module.css";
import Container from "@mui/material/Container";

export default function SignUp() {
  // TODO: Change this to have an image rather than css bg-image
  const leftContainer = <div className={styles.left_container}></div>;
  const rightContainer = (
    <Container className={styles.right_container}>
      <SignUpContainer />
    </Container>
  );

  return (
    <div className={styles.page_container}>
      {leftContainer}
      {rightContainer}
    </div>
  );
}
