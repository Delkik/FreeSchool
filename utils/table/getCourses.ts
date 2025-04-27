import { Course } from "@/schemas/Course";
import axios from "axios";

export default async function getCourses(userId: string, preview: boolean) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses/user/${userId}`
    );

    const data: Course[] = res.data;

    if (preview) {
      const previewData: Partial<Course>[] = data.map((course) => {
        return {
          courseName: course.courseName,
          description: course.description,
        };
      });
      return previewData;
    }

    return data;
  } catch {
    return [];
  }
}
