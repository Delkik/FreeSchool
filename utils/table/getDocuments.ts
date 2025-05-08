import { Document } from "@/schemas/Document";
import axios from "axios";

export default async function getDocuments(userId: string, preview: boolean) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/documents/`
    );

    const data: Document[] = res.data.documents;

    if (preview) {
      const previewData: Partial<Document>[] = data.map((document) => {
        return {
          title: document.title,
          description: document.description,
        };
      });
      return previewData;
    }

    return data;
  } catch {
    return [];
  }
}
