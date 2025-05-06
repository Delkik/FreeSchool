"use client";

import { useSearchParams } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import capitalizeString from "@/utils/capitalizeString";

import styles from "@/modules/app/dashboard/profile/table/Table.module.css";
import { useEffect, useMemo, useState } from "react";
import EnrollChildButton from "@/components/dashboard/profile/table/EnrollChildButton";
import getTable from "@/utils/getTable";
import { useSession } from "next-auth/react";
import { camelCaseToSpaces } from "@/utils/camelCaseToSpaces";
import { getUniqueKeys } from "@/utils/getUniqueKeys";

export default function TablePage() {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const table: any = searchParams.get("table") || "documents";

  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) {
        return;
      }

      setIsLoading(true);

      const d = await getTable({ table, userId: session?.user?.id });
      setData(d);

      setIsLoading(false);
    };
    fetchData();
  }, [session?.user?.id, table]);

  const cols = useMemo(() => {
    if (!data) {
      return [];
    }
    if (!data.length) {
      return [];
    }
    return getUniqueKeys(data)
      .sort()
      .filter((key) => {
        return !(
          key === "PK" ||
          key === "SK" ||
          key.toLowerCase().includes("id")
        );
      })
      .map((key) => {
        const col: GridColDef = {
          field: key,
          headerName: camelCaseToSpaces(key),
          width: 160,
        };
        return col;
      });
  }, [data]);

  const rows = useMemo(() => {
    return data.map((d, index) => ({
      id: index,
      ...d,
    }));
  }, [data]);

  return (
    <div className={styles.container}>
      <Link className={styles.return} href="/dashboard/profile">
        {"<"} Back to User Page
      </Link>
      <h1 className={styles.title}>{capitalizeString(table)}</h1>
      <div className={styles.table}>
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            minHeight: "300px",
            maxHeight: "600px",
          }}
        >
          <DataGrid
            loading={isLoading}
            rows={rows || []}
            columns={cols}
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#e0f7fa",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #ddd",
              },
              "& .MuiDataGrid-columnHeaders .MuiDataGrid-filler, .MuiToolbar-root, .MuiDataGrid-columnHeader":
                {
                  backgroundColor: "var(--doe-green)",
                },
            }}
          />
        </Paper>
        {table === "children" && <EnrollChildButton />}
      </div>
    </div>
  );
}
