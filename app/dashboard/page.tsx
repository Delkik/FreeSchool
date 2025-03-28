"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import styles from "@/modules/app/dashboard/Dashboard.module.css";
import Grid from "@mui/material/Grid2";
import CourseCard from "@/components/dashboard/CourseCard";
import Calendar from "react-calendar";
import Stack from "@mui/material/Stack";
import { useSession } from "next-auth/react";
import capitalizeString from "@/utils/capitalizeString";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const { data: session } = useSession();

  const name = session?.user?.firstName;
  const [courses, setCourses] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    const fetchInitialCourses = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/courses/user/${session?.user?.id}`;
        const res = await axios.get(url);
        setCourses(res.data);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchInitialCourses();
  }, [session?.user?.id]);

  return (
    <Box>
      <div className={styles.full_page}>
        {/* Left */}
        <div className={styles.main_section}>
          <span className={styles.welcome_text}>
            Welcome Back, {capitalizeString(name || "")}!
          </span>
          <Grid container spacing={1} rowSpacing={4}>
            <>
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
            </>
          </Grid>
        </div>

        {/* Right */}
        <div className={styles.side_section}>
          <Stack>
            <span className={styles.notification_header}>Notifications</span>
            <Calendar className={styles.home_calendar} />
          </Stack>
        </div>
      </div>
    </Box>
  );
}
