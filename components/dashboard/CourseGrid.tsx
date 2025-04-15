import Grid from "@mui/material/Grid2";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface CourseGridProps {
  userId: string | undefined;
}

export default function CourseGrid({ userId }: CourseGridProps) {
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
    fetchInitialCourses(userId);
  }, [userId]);

  return (
    <>
      {courses.length ? (
        <Grid container spacing={1} rowSpacing={4}>
          {courses.map((course, index) => {
            return (
              <Grid size={3} key={`course-${index}`}>
                <CourseCard
                  image="/static/test-avatar.jpg"
                  courseDesc={course?.description || ""}
                  courseTitle={course?.title || ""}
                  id={course.courseId}
                  borrowed={!!course?.borrowDate}
                  grade={100}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <p>Nothing here D:</p>
      )}
    </>
  );
}
