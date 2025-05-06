"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Calendar from "react-calendar";
import Stack from "@mui/material/Stack";
import { useSession } from "next-auth/react";
import capitalizeString from "@/utils/capitalizeString";
import CourseGrid from "@/components/dashboard/CourseGrid";

import styles from "@/modules/app/dashboard/Dashboard.module.css";
import ChildCourse from "@/components/dashboard/ChildCourse";

export default function Dashboard() {
  const { data: session } = useSession();

  const name = session?.user?.firstName;

  const getCourseGrid = () => {
    let courseGrid = null;

    switch (session?.user?.role) {
      case "parent":
        courseGrid = session.user.children ? (
          <ul className={styles.childGrid}>
            {session.user.children.map((child) => (
              <li key={child.id}>
                <ChildCourse userId={session.user!.id} child={child} />
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Nothing to see here! Go to the user page to enroll a child to
            FreeSchool!
          </p>
        );
        break;
      case "student":
        courseGrid = <CourseGrid userId={session?.user?.id} />;
        break;
      case "teacher":
      default:
        courseGrid = null;
        break;
    }

    return courseGrid;
  };

  const grid = getCourseGrid();

  return (
    <Box>
      <div className={styles.full_page}>
        {/* Left */}
        <div className={styles.main_section}>
          <span className={styles.welcome_text}>
            Welcome Back, {capitalizeString(name || "")}!
          </span>
          <span className={styles.course_grid}>{grid}</span>
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
