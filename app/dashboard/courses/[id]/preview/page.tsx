"use client";

import Box from "@mui/material/Box";
import styles from "@/modules/app/dashboard/courses/preview/Preview.module.css";
import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/schemas/Course";
import axios from "axios";
import clsx from "clsx";
import EnrollModal from "@/components/dashboard/courses/preview/EnrollModal";
import { useSession } from "next-auth/react";

export default function PreviewPage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const idRegex = /courses\/(.+)\/preview/;
  const courseId = idRegex.exec(pathname)?.[1];

  const [courseData, setCourseData] = useState<Course>();
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [borrow, setBorrow] = useState(false);

  useEffect(() => {
    const fetchInitialCourseData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`
        );
        setCourseData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchInitialCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box className={styles.top_container}>
        <Box className={styles.header}>
          <div className={styles.class_title}>{courseData?.courseName}</div>
          <div className={styles.class_actions}>
            <div className={styles.class_desc}>{courseData?.description}</div>
            <Box className={styles.enroll_buttons_container}>
              <Button
                variant="contained"
                className={styles.enroll_button}
                disabled={
                  !session?.user?.children?.length ||
                  session?.user?.role !== "parent"
                }
                onClick={() => {
                  setBorrow(false);
                  setEnrollOpen(true);
                }}
              >
                Enroll
              </Button>
              <Button
                variant="contained"
                className={styles.enroll_button}
                disabled={
                  !session?.user?.children?.length ||
                  session?.user?.role !== "parent"
                }
                onClick={() => {
                  setBorrow(true);
                  setEnrollOpen(true);
                }}
              >
                Borrow Class
              </Button>
              <EnrollModal
                open={enrollOpen}
                handleClose={() => setEnrollOpen(false)}
                borrow={borrow}
                course={courseData}
              />
            </Box>
          </div>
        </Box>
        <Box className={styles.top_space}></Box>
        <Box className={styles.quick_info_container}>
          <Box className={styles.quick_info}>
            <span className={styles.bar_info}>
              {courseData?.rating || 5} stars
            </span>
            <span className={styles.bar_info}>
              {courseData?.maxCount} seats available
            </span>
            <span className={styles.bar_info}>
              {courseData?.subject || "Math"}
            </span>
            <span className={clsx(styles.bar_info, styles.last)}>
              Grade {courseData?.grade}
            </span>
          </Box>
        </Box>
      </Box>
      <div>{courseData?.extraInfo || "hi"}</div>
    </Box>
  );
}
