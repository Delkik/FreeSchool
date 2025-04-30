import { BaseUser } from "@/schemas/User";
import axios from "axios";

export default async function getChildren(userId: string, preview: boolean) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/children`
    );

    const data: BaseUser[] = res.data;

    if (preview) {
      const previewData: Partial<BaseUser>[] = data.map((child) => {
        return {
          firstName: child.firstName,
          grade: `Grade: ${child.grade}`,
        };
      });
      return previewData;
    }

    return data;
  } catch {
    return [];
  }
}
