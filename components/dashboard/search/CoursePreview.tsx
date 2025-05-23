"use client";

import Box from "@mui/material/Box";
import styles from "@/modules/components/dashboard/search/CoursePreview.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Course } from "@/schemas/Course";

interface CoursePreviewProps {
  course: Partial<Course>;
}

export default function CoursePreview({ course }: CoursePreviewProps) {
  const router = useRouter();

  const onPreviewClick = () => {
    router.push(`/dashboard/courses/${course.id}/preview`);
  };

  return (
    <Box className={styles.container} onClick={onPreviewClick}>
      <Box className={styles.image_preview}>
        <Image src="/static/test-avatar.jpg" fill alt="course preview" />
      </Box>
      <div className={styles.data}>
        <div className={styles.courseName}>{course.courseName}</div>
        <div className={styles.description}>
          {course.description!.length < 100
            ? course.description
            : course.description?.slice(0, 100) + "..."}
        </div>
        <div className={styles.subject}>{course.subject}</div>
        <div className={styles.grade}>Grade {course.grade}</div>
        <div className={styles.rating}>
          <span className={styles.ratingNumber}>{course.rating}</span>
          <span className={styles.starBack} />
          <span className={styles.star} />
        </div>
      </div>
    </Box>
  );
}
