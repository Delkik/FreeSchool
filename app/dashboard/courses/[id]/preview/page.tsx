"use client";

import Box from "@mui/material/Box";
import styles from "@/modules/app/dashboard/courses/preview/Preview.module.css";
import Button from "@mui/material/Button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/schemas/Course";
import axios from "axios";
import clsx from "clsx";
import { useSession } from "next-auth/react";

export default function PreviewPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const idRegex = /courses\/(.+)\/preview/;
  const courseId = idRegex.exec(pathname)?.[1];

  const [courseData, setCourseData] = useState<Course>();
  const [isLoading, setIsLoading] = useState(false);

  const onBorrowEnrollClick = async (borrow: boolean) => {
    setIsLoading(true);
    try {
      const url = `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/courses/${courseId}/user/${session?.user?.id}/${
        borrow ? "borrow" : "enroll"
      }`;
      const res = await axios.post(url, {
        title: courseData?.courseName,
        description: courseData?.description,
      });
      if (res.data?.message) {
        throw new Error(res.data.message);
      }
      console.log(res);
      router.push(`/dashboard/courses/${courseId}?borrowed=${borrow}`);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

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
          <div className={styles.class_desc}>{courseData?.description}</div>
          {/* TODO: disabled: this is not gonna be available by the presentation most likely */}
          <Box className={styles.enroll_buttons_container}>
            <Button
              variant="contained"
              disabled={isLoading}
              className={styles.enroll_button}
              onClick={() => onBorrowEnrollClick(false)}
            >
              Enroll
            </Button>
            <Button
              variant="contained"
              className={styles.enroll_button}
              onClick={() => onBorrowEnrollClick(true)}
              disabled={isLoading}
            >
              Borrow Class
            </Button>
          </Box>
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
