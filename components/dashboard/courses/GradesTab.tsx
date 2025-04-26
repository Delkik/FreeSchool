import { Assignment } from "@/schemas/Assignment";
import { Grade } from "@/schemas/Grade";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models/colDef";

interface GradesTabProps {
  grades?: Grade[];
  assignments?: Assignment[];
}

export default function GradesTab({ grades, assignments }: GradesTabProps) {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Assignment Name", width: 400 },
    {
      field: "due",
      headerName: "Due Date",
      width: 200,
      sortComparator: (a, b) => {
        const aDate = new Date(a);
        const bDate = new Date(b);
        console.log(bDate, aDate);
        return aDate.getDate() - bDate.getDate();
      },
    },
    {
      field: "grade",
      headerName: "Grade",
      width: 200,
      valueGetter: (_, row) =>
        `${row.numberGrade || "?"} / ${row.maxGrade || ""}`,
      sortable: false,
    },
  ];

  const g = [...(grades || [])].sort((a, b) =>
    b?.courseId.localeCompare(a?.courseId)
  );
  const a = [...(assignments || [])].sort((a, b) => b?.id.localeCompare(a?.id));

  const rows = a?.map((value, index) => {
    return { ...value, ...g?.[index] };
  });
  console.log(rows);

  return (
    <div>
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
  );
}
