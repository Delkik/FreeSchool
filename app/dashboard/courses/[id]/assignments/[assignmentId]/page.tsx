"use client";

import { Assignment, UserAssignment } from "@/schemas/Assignment";
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
  const courseId = idRegex.exec(pathname)?.[1];
  const assignmentId = idRegex.exec(pathname)?.[2];

  const [assignment, setAssignment] = useState<Assignment>();
  const [submission, setSubmission] = useState<UserAssignment>();
  const [textSubmission, setTextSubmission] = useState<string>("");

  console.log(submission);

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
    if (!session?.user?.id) {
      return;
    }
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/assignments/${assignmentId}/user/${session?.user?.id}`
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
    fetchAssignment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  return (
    <div>
      <div>
        <h1>{assignment?.name}</h1>
        <div>
          <span>{submission ? "Submitted" : "Not Submitted"}</span>
          <span>?/{assignment?.maxGrade}</span>
          <span>Due: {assignment?.due}</span>
        </div>
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
              value={textSubmission}
              minRows={8}
              maxRows={12}
              onChange={(e) => setTextSubmission(e.target.value)}
              multiline
            />
            <Button
              variant="contained"
              disabled={!textSubmission}
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
