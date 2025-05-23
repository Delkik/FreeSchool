import { Assignment } from "@/schemas/Assignment";
import styles from "@/modules/components/dashboard/courses/CourseTab.module.css";
import Link from "next/link";

interface CourseTabProps {
  sectionNumber: number;
  assignments?: Assignment[];
  childId?: string;
}

export default function CourseTab({
  sectionNumber,
  assignments,
  childId,
}: CourseTabProps) {
  if (!assignments) {
    return;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Section {sectionNumber}</h2>
      <ul>
        {assignments.map((assignment, index) => (
          <li key={index} className={styles.assignmentRow}>
            <Link
              href={`/dashboard/courses/${assignment.courseId}/assignments/${
                assignment.id
              }${childId ? `?child=${childId}` : ""}`}
            >
              <span>{assignment.name}</span>
              <div className={styles.bottomSection}>
                <span>{assignment.due}</span>
                <span>{assignment.maxGrade} pts</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
