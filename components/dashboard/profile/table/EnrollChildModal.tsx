import EnrollChildForm from "./EnrollChildForm";
import BaseModal from "@/components/common/BaseModal";

interface EnrollChildModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function EnrollChildModal({
  open,
  handleClose,
}: EnrollChildModalProps) {
  return (
    <BaseModal title="Enroll a Child" open={open} handleClose={handleClose}>
      <EnrollChildForm handlePostSubmit={handleClose} />
    </BaseModal>
  );
}
