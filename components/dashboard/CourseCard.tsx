import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import styles from "@/modules/components/dashboard/CourseCard.module.css";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  image: string;
  courseTitle: string;
  courseDesc: string;
  id: string;
  childId?: string;
  borrowed: boolean;
  alt?: string;
  grade: number;
}

export default function CourseCard({
  image,
  courseDesc,
  courseTitle,
  id,
  childId,
  borrowed,
  alt = "Course Image",
}: CourseCardProps) {
  const router = useRouter();
  const onCardClick = () => {
    router.push(
      `/dashboard/courses/${id}?borrowed=${borrowed}${
        childId ? `&child=${childId}` : ""
      }`
    );
  };

  return (
    <Card className={styles.course}>
      <CardActionArea
        sx={{ height: "100%", position: "relative" }}
        onClick={onCardClick}
      >
        {/* //TODO: */}
        {/* <Badge className={styles.course_grade}>{grade}%</Badge> */}
        <CardMedia
          component="img"
          image={image}
          title={alt}
          className={styles.course_media}
        />
        <CardContent className={styles.course_content}>
          <span className={styles.course_title}>{courseTitle}</span>
          <span className={styles.course_desc}>{courseDesc}</span>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
