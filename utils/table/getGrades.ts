import { Grade } from "@/schemas/Grade";
import axios from "axios";

export default async function getGrades(
  userId: string,
  preview: boolean
): Promise<Grade[] | Partial<Grade>[]> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/grades/`
    );

    const data: Grade[] = res.data.grades;
    if (preview) {
      const previewData: Partial<Grade>[] = data.map((grade) => {
        if (grade.assignmentName) {
          return {
            type: grade.type,
            assignmentName: grade.assignmentName,
            numberGrade: grade.numberGrade,
          };
        }
        return {
          type: grade.type,
          courseName: grade.courseName,
          numberGrade: grade.numberGrade,
        };
      });
      return previewData;
    }

    return data;
  } catch {
    return [];
  }
}
