import { BaseUser } from "./User";

export interface CoursePreview {
  courseId: string; // this is the id that parents will use in their IHIP
  title: string;
  description: string;
  count: number;
  subject: string;
}

export interface Course extends CoursePreview {
  id: string; // to differentiate between different versions of the same course
  instructor: BaseUser;
}
