"use client";
import PreviewTable from "@/components/dashboard/profile/PreviewTable";
import ProfileBar from "@/components/dashboard/profile/ProfileBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  // NOTE: should this conditionally render based on child? or make a new page?

  const onSignOut = async () => {
    await signOut();
  };

  return (
    <Box className="flex flex-col gap-10">
      <ProfileBar title="Parent" name="Daniel Elkik" />
      <Box className="flex gap-5 justify-evenly">
        <PreviewTable title="Documents" />
        <PreviewTable title="Children" />
      </Box>
      <Button onClick={onSignOut}>Sign Out</Button>
    </Box>
  );
}
