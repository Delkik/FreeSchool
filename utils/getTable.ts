import { Role } from "@/schemas/User";
import getGrades from "./table/getGrades";
import getChildren from "./table/getChildren";
import getCourses from "./table/getCourses";

interface GetTableProps {
  table: "courses" | "grades" | "children" | "documents";
  preview?: boolean;
  userId: string;
  role?: Role;
}

export default async function getTable({
  table,
  userId,
  preview = false,
}: GetTableProps) {
  switch (table) {
    case "courses":
      return await getCourses(userId, preview); // TODO: get teacher courses
    case "children":
      return await getChildren(userId, preview);
    case "documents":
      return [];
    case "grades":
      return await getGrades(userId, preview);
  }
}
