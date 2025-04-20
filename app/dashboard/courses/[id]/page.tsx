"use client";

import AssignmentsTab from "@/components/dashboard/courses/AssignmentsTab";
import CourseTab from "@/components/dashboard/courses/CourseTab";
import { Assignment } from "@/schemas/Assignment";
import { Course } from "@/schemas/Course";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
// import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { JSX, useEffect, useMemo, useState } from "react";
// import styles from "@/modules/app/dashboard/courses/Courses.module.css";

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
  const [sectionCount, setSectionCount] = useState(0);

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
      fetchAssignments();
    };
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/assignments`
        );
        const assignmentData: Assignment[] = res.data;
        setSectionCount(
          Math.max(...assignmentData.map((assignment) => assignment.section))
        );
        setAssignments(assignmentData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchInitialCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sections = useMemo(() => {
    const sect: JSX.Element[] = [];
    for (let i = 1; i <= sectionCount; i++) {
      const assignmentSection = assignments?.filter((assignment) => {
        return assignment.section === i;
      });
      sect.push(
        <CourseTab sectionNumber={i} assignments={assignmentSection} />
      );
    }
    return sect;
  }, [assignments, sectionCount]);

  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold">{courseData?.courseName}</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        className="w-full border-b"
      >
        <Tab label="Course" />
        <Tab label="Assignments" />
        <Tab label="People" disabled />
        <Tab label="Grades" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <ul>
          {sections.map((section, index) => (
            <li key={index} className="mb-10">
              {section}
            </li>
          ))}
        </ul>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AssignmentsTab assignments={assignments} />
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
