import { BaseUser } from "@/schemas/User";
import capitalizeString from "@/utils/capitalizeString";
import CourseGrid from "./CourseGrid";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import styles from "@/modules/components/dashboard/ChildCourse.module.css";

interface ChildCourseProps {
  child: BaseUser;
}

export default function ChildCourse({ child }: ChildCourseProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div className={styles.child_header}>
        <h2 className={styles.child_header_text}>
          {capitalizeString(child.firstName)}&apos;s Courses
        </h2>
        <button>
          {isOpen ? (
            <ChevronUp onClick={() => setOpen(false)} />
          ) : (
            <ChevronDown onClick={() => setOpen(true)} />
          )}
        </button>
      </div>
      {isOpen && <CourseGrid userId={child.id} />}
    </div>
  );
}
