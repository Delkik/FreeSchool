"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import styles from "@/modules/app/dashboard/Dashboard.module.css";
import Grid from "@mui/material/Grid2";
import CourseCard from "@/components/dashboard/CourseCard";
import Calendar from "react-calendar";
import Stack from "@mui/material/Stack";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  const name = session?.user?.firstName;

  if (!name) {
    return <div>Loading!</div>;
  }

  const courses = [
    {
      courseTitle: "Algebra 1",
      courseDesc:
        "Learn Algebra in this simple course where i say a lot of words and things to make this description longer",
    },
    {
      courseTitle: "Algebra 2",
      courseDesc:
        "Learn Algebra in this simple course where i say a lot of words and things to make this description longer",
    },
    {
      courseTitle: "Algebra 2",
      courseDesc:
        "Learn Algebra in this simple course where i say a lot of words and things to make this description longer",
    },
    {
      courseTitle: "Algebra 2",
      courseDesc:
        "Learn Algebra in this simple course where i say a lot of words and things to make this description longer",
    },
  ];

  return (
    <Box>
      <div className={styles.full_page}>
        {/* Left */}
        <div className={styles.main_section}>
          <span className={styles.welcome_text}>Welcome Back, {name}!</span>
          <Grid container spacing={1} rowSpacing={4}>
            <>
              {courses.map((course, index) => {
                return (
                  <Grid size={3} key={`course-${index}`}>
                    <CourseCard
                      image="/static/test-avatar.jpg"
                      courseDesc={course.courseDesc}
                      courseTitle={course.courseTitle}
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
