import Button from "@mui/material/Button";
import { useState } from "react";
import EnrollChildModal from "./EnrollChildModal";

export default function EnrollChildButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" size="large" onClick={handleOpen}>
        Enroll Child
      </Button>
      <EnrollChildModal open={open} handleClose={handleClose} />
    </>
  );
}
