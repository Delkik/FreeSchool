"use client";

import Box from "@mui/material/Box";
import styles from "@/modules/components/dashboard/search/CoursePreview.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CoursePreview() {
  const router = useRouter();

  const onPreviewClick = () => {
    router.push(`/dashboard/courses/${"123"}/preview`);
  };

  return (
    <Box className={styles.container} onClick={onPreviewClick}>
      <Box className={styles.image_preview}>
        <Image src="/static/test-avatar.jpg" fill alt="course preview" />
      </Box>
      <span>Arithmetic 1</span>
    </Box>
  );
}
