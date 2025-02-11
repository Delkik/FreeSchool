import PreviewTable from "@/components/profile/PreviewTable";
import ProfileBar from "@/components/profile/ProfileBar";
import Box from "@mui/material/Box";

export default function ProfilePage() {
  // NOTE: should this conditionally render based on child? or make a new page?

  return (
    <Box className="flex flex-col gap-10">
      <ProfileBar title="Parent" name="Daniel Elkik" />
      <Box className="flex gap-5 justify-evenly">
        <PreviewTable title="Documents" />
        <PreviewTable title="Children" />
      </Box>
    </Box>
  );
}
