"use client";
import PreviewTable from "@/components/dashboard/profile/PreviewTable";
import ProfileBar from "@/components/dashboard/profile/ProfileBar";
import capitalizeString from "@/utils/capitalizeString";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { signOut, useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  const user = session?.user;

  const firstName = user?.firstName || "John";
  const lastName = user?.lastName || "Doe";
  const name = capitalizeString(firstName) + " " + capitalizeString(lastName);

  const role = user?.role || "student";

  const onSignOut = async () => {
    await signOut();
  };

  const getTables = () => {
    let tables = null;
    switch (user?.role) {
      case "parent":
        tables = (
          <>
            <PreviewTable title="documents" />
            <PreviewTable title="children" />
          </>
        );
        break;
      case "teacher":
        tables = (
          <>
            <PreviewTable title="documents" />
            <PreviewTable title="courses" />
          </>
        );
        break;
      case "student":
        tables = (
          <>
            <PreviewTable title="grades" />
            <PreviewTable title="courses" />
          </>
        );
        break;
    }
    return tables;
  };

  return (
    <Box className="flex flex-col gap-10">
      <ProfileBar title={capitalizeString(role)} name={name} />
      <Box className="flex gap-5 justify-evenly">{getTables()}</Box>
      <Button onClick={onSignOut}>Sign Out</Button>
    </Box>
  );
}
