"use client";

import { Assignment } from "@/schemas/Assignment";
import { Course } from "@/schemas/Course";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
// import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CoursePage() {
  // const { data: session } = useSession();

  const pathname = usePathname();
  const idRegex = /courses\/(.+)(\?borrowed=)?/;
  const courseId = idRegex.exec(pathname)?.[1];

  const [courseData, setCourseData] = useState<Course>();
  const [assignments, setAssignments] = useState<Assignment[]>();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchInitialCourseData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`
        );
        setCourseData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/assignments`
        );
        setAssignments(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchInitialCourseData();
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(assignments);

  return (
    <div>
      <h1>{courseData?.courseName}</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Course" />
        <Tab label="Assignments" />
        <Tab label="People" disabled />
        <Tab label="Grades" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        Section 1
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Coming Up
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Huh
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Grades
      </CustomTabPanel>
    </div>
  );
}
