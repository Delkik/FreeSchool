import { Assignment } from "@/schemas/Assignment";
import styles from "@/modules/components/dashboard/courses/CourseTab.module.css";
import Link from "next/link";

interface AssignmentsTabProps {
  assignments?: Assignment[];
  childId?: string;
}

export default function AssignmentsTab({
  assignments,
  childId,
}: AssignmentsTabProps) {
  if (!assignments) {
    return;
  }

  const today = new Date();
  const pastAssignments = assignments
    .filter((assignment) => {
      const dueDate = new Date(assignment.due || today);
      return dueDate < today;
    })
    .sort(
      (a, b) =>
        new Date(a.due || today).getTime() - new Date(b.due || today).getTime()
    );

  const dueAssignments = assignments
    .filter((assignment) => {
      const dueDate = new Date(assignment.due || today);
      return dueDate >= today;
    })
    .sort(
      (a, b) =>
        new Date(a.due || today).getTime() - new Date(b.due || today).getTime()
    );

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Assignments</h2>
        <ul>
          {dueAssignments.map((assignment, index) => (
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

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Past Assignments</h2>
        <ul>
          {pastAssignments.map((assignment, index) => (
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
    </div>
  );
}
