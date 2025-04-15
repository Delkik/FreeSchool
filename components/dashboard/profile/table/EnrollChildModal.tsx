import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "@/modules/components/dashboard/profile/table/EnrollChildModal.module.css";
import EnrollChildForm from "./EnrollChildForm";

interface EnrollChildModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function EnrollChildModal({
  open,
  handleClose,
}: EnrollChildModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <h1 className={styles.title}>Enroll a Child</h1>
          <EnrollChildForm />
        </div>
      </Box>
    </Modal>
  );
}
