import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import styles from "@/modules/components/dashboard/CourseCard.module.css";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

interface CourseCardProps {
  image: string;
  courseTitle: string;
  courseDesc: string;
  alt?: string;
  grade: number;
}

export default function CourseCard({
  image,
  courseDesc,
  courseTitle,
  alt = "Course Image",
}: CourseCardProps) {
  const onCardClick = () => {
    console.log(`I've been clicked! ${courseTitle}`);
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
