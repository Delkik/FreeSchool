"use client";

import Box from "@mui/material/Box";
import styles from "@/modules/components/dashboard/profile/PreviewTable.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getTable from "@/utils/getTable";
import { useSession } from "next-auth/react";
import capitalizeString from "@/utils/capitalizeString";

interface PreviewTableProps {
  title: "courses" | "grades" | "children" | "documents";
  data?: Record<string, string | number | boolean>;
}

export default function PreviewTable({ title }: PreviewTableProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleOnClick = () => {
    router.push(`/dashboard/profile/table?table=${title}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);

  // TODO: Switch case for tables

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) {
        return;
      }
      const data = await getTable({
        table: title,
        userId: session?.user?.id,
        preview: true,
      });
      setTableData(data);
      console.log(data);
    };
    fetchData();
  }, [session?.user?.id, title]);

  return (
    <Box className={styles.container}>
      <div className={styles.table_title}>{capitalizeString(title)}</div>
      {/* TODO: list some data */}

      <ul>
        {tableData.map((row, index) => (
          <li key={`row-${index}`}>
            <div>
              {Object.keys(row).map((rowKey, index) => {
                console.log(row[rowKey]);
                return <span key={`not-row-${index}`}>{row[rowKey]}</span>;
              })}
            </div>
          </li>
        ))}
      </ul>

      {/* TODO: link to the table page, use query parameters to know data? */}
      <Button variant="outlined" onClick={handleOnClick}>
        See More
      </Button>
    </Box>
  );
}
