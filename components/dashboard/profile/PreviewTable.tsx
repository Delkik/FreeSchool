"use client";

import Box from "@mui/material/Box";
import styles from "@/modules/components/dashboard/profile/PreviewTable.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

interface PreviewTableProps {
  title: string;
  data?: Record<string, string | number | boolean>;
}

export default function PreviewTable({ title }: PreviewTableProps) {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/dashboard/profile/table?table=${title.toLowerCase()}`);
  };

  // TODO: Switch case for tables

  return (
    <Box className={styles.container}>
      <div className={styles.table_title}>{title}</div>
      {/* TODO: list some data */}

      {/* TODO: link to the table page, use query parameters to know data? */}
      <Button variant="outlined" onClick={handleOnClick}>
        See More
      </Button>
    </Box>
  );
}
