import CoursePreview from "@/components/dashboard/search/CoursePreview";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchPage() {
  return (
    <Box>
      <TextField className="" label="Search" />
      <CoursePreview />
    </Box>
  );
}
