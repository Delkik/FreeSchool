import Box from "@mui/material/Box";
import styles from "@/modules/components/dashboard/profile/PreviewTable.module.css";

interface PreviewTableProps {
  title: string;
}

export default function PreviewTable({ title }: PreviewTableProps) {
  return (
    <Box className={styles.container}>
      <div className={styles.table_title}>{title}</div>
      {/* TODO: list some data */}

      {/* TODO: link to the table page, use query parameters to know data? */}
    </Box>
  );
}
