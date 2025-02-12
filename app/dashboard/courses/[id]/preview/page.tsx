import Box from "@mui/material/Box";
import styles from "@/modules/app/dashboard/courses/preview/Preview.module.css";
import Button from "@mui/material/Button";

export default function PreviewPage() {
  return (
    <Box>
      <Box className={styles.top_container}>
        <Box className={styles.header}>
          <div className={styles.class_title}>Arithmetic 1</div>
          <div className={styles.class_desc}>
            I love math!!! Join us for this fun little math stuff
          </div>
          {/* TODO: disabled: this is not gonna be available by the presentation most likely */}
          <Box className={styles.enroll_buttons_container}>
            <Button
              variant="contained"
              disabled
              className={styles.enroll_button}
            >
              Enroll
            </Button>
            <Button variant="contained" className={styles.enroll_button}>
              Borrow Class
            </Button>
          </Box>
        </Box>
        <Box className={styles.top_space}></Box>
        <Box className={styles.quick_info_container}>yoooo</Box>
      </Box>
      This is the bottom info
    </Box>
  );
}
