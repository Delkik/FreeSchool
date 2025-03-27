"use client";

import { useSearchParams } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import capitalizeString from "@/utils/capitalizeString";

import styles from "@/modules/app/dashboard/profile/table/Table.module.css";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (_, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
];

export default function TablePage() {
  const searchParams = useSearchParams();
  const table = searchParams.get("table") || "documents";

  return (
    <div className={styles.container}>
      <Link className={styles.return} href="/dashboard/profile">
        {"<"} Back to User Page
      </Link>
      <div>
        <h1 className={styles.title}>{capitalizeString(table)}</h1>
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            minHeight: "400px",
            maxHeight: "800px",
          }}
        >
          <DataGrid rows={rows} columns={columns} />
        </Paper>
      </div>
    </div>
  );
}
