import BaseModal from "@/components/common/BaseModal";
import { Course } from "@/schemas/Course";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "@/modules/components/dashboard/courses/preview/EnrollModal.module.css";

interface EnrollModal {
  open: boolean;
  handleClose: () => void;
  borrow: boolean;
  course?: Course;
}

export default function EnrollModal({
  open,
  handleClose,
  borrow,
  course,
}: EnrollModal) {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onBorrowEnroll = async (userId: string) => {
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${
        course?.id
      }/user/${userId}/${borrow ? "borrow" : "enroll"}`;
      const res = await axios.post(url, {
        title: course?.courseName,
        description: course?.description,
        teacherId: borrow ? session?.user?.id : "",
      });
      if (res.data?.message) {
        throw new Error(res.data.message);
      }
      console.log(res);
      router.push(
        `/dashboard/courses/${course?.id}${borrow ? "?borrowed=true" : ""}`
      );
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const title = borrow
    ? `Borrow ${course?.courseName} for a Child?`
    : `Enroll a Child in ${course?.courseName}?`;

  const children = session?.user?.children;

  return (
    <BaseModal title={title} handleClose={handleClose} open={open}>
      <ul>
        {children?.map((child) => (
          <li key={child.id} className={styles.borrow_row}>
            <div>
              {child.firstName} {child.lastName}
            </div>
            <Button
              loading={loading}
              variant="outlined"
              onClick={() => onBorrowEnroll(child.id)}
            >
              {borrow ? "Borrow" : "Enroll"}
            </Button>
          </li>
        ))}
      </ul>
    </BaseModal>
  );
}
