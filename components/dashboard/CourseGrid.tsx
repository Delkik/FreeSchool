import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/modules/components/dashboard/CourseGrid.module.css";

interface CourseGridProps {
  userId?: string;
  childId?: string;
}

export default function CourseGrid({ userId, childId }: CourseGridProps) {
  const [courses, setCourses] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    const fetchInitialCourses = async (id: string | undefined) => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/courses/user/${id}`;
        const res = await axios.get(url);
        setCourses(res.data);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchInitialCourses(childId || userId);
  }, [childId, userId]);

  return (
    <>
      {courses.length ? (
        <ul className={styles.container}>
          {courses.map((course, index) => {
            return (
              <li key={index} className={styles.item}>
                <CourseCard
                  image="/static/test-avatar.jpg"
                  courseDesc={course?.description || ""}
                  courseTitle={course?.courseName || ""}
                  id={course.courseId}
                  childId={childId}
                  borrowed={!!course?.borrowDate}
                  grade={100}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Nothing here D:</p>
      )}
    </>
  );
}
