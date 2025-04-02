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
  console.log(course);

  return (
    <Box className={styles.container} onClick={onPreviewClick}>
      <Box className={styles.image_preview}>
        <Image src="/static/test-avatar.jpg" fill alt="course preview" />
      </Box>
      <div>{course.courseName}</div>
      <div>{course.description}</div>
      <div>{course.subject}</div>
      <div>Grade {course.grade}</div>
      <div>{course.rating} rating</div>
    </Box>
  );
}
