import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";

import styles from "@/modules/components/common/BaseModal.module.css";
import clsx from "clsx";

interface BaseModalProps extends React.PropsWithChildren {
  open: boolean;
  handleClose: () => void;
  title: string;
  className?: string;
}

export default function BaseModal({
  open,
  handleClose,
  children,
  title,
  className,
}: BaseModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalContainer}>
        <div className={clsx(styles.modalContent, className)}>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </div>
      </Box>
    </Modal>
  );
}
