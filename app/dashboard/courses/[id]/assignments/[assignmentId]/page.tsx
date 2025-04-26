"use client";

import { Assignment, UserAssignment } from "@/schemas/Assignment";
import { Grade } from "@/schemas/Grade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AssignmentPage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const idRegex = /courses\/(.+)\/assignments\/(.+)(\?borrowed=)?/;
  const childRegex = /child=(.+)/;
  const courseId = idRegex.exec(pathname)?.[1];
  const assignmentId = idRegex.exec(pathname)?.[2];
  const childId = childRegex.exec(window.location.search)?.[1];
  const userId = childId || session?.user?.id;

  const [assignment, setAssignment] = useState<Assignment>();
  const [submission, setSubmission] = useState<UserAssignment>();
  const [textSubmission, setTextSubmission] = useState<string>("");
  const [grade, setGrade] = useState<Grade | undefined>();

  const handleSubmission = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/assignments/${assignmentId}/user/${session?.user?.id}/submit`,
        {
          submission: textSubmission,
        }
      );
      setSubmission({
        submission: textSubmission,
        userId: session!.user!.id!,
        submitDate: new Date().toISOString(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/assignments/${assignmentId}`
        );
        const assignmentData: Assignment = res.data;
        setAssignment(assignmentData);
        fetchSubmission();
      } catch (e) {
        console.log(e);
      }
    };
    const fetchSubmission = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/assignments/${assignmentId}/user/${userId}`
        );
        if (res.data.message) {
          console.log("No Submission found");
          return;
        }
        const assignmentData: UserAssignment = res.data;
        setSubmission(assignmentData);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchGrade = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/grades/courses/${courseId}/assignments/${assignmentId}`
        );
        if (res.data.message) {
          console.log("No Submission found");
          return;
        }
        const gradeData: Grade = res.data;
        setGrade(gradeData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAssignment();
    fetchGrade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  return (
    <div>
      <div>
        <h1>{assignment?.name}</h1>
        <div>
          <span>{submission ? "Submitted" : "Not Submitted"}</span>
          <span>
            {grade ? grade.numberGrade : "?"}/{assignment?.maxGrade}
          </span>
          <span>Due: {assignment?.due}</span>
          {grade && <span>Graded: {grade?.gradeDate}</span>}
        </div>
        <div>{assignment?.description}</div>
        {submission && (
          <div>
            <span>{submission.submission}</span>
          </div>
        )}
        {!submission && (
          <div>
            <TextField
              id="outlined-textarea"
              placeholder="Enter your answer here..."
              variant="outlined"
              value={textSubmission || submission}
              disabled={!!submission || !!childId}
              minRows={8}
              maxRows={12}
              onChange={(e) => setTextSubmission(e.target.value)}
              multiline
            />
            <Button
              variant="contained"
              disabled={!textSubmission || !!childId}
              onClick={handleSubmission}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
