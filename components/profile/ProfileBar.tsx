import styles from "@/modules/components/profile/ProfileBar.module.css";
import Box from "@mui/material/Box";
import CustomAvatar from "../common/CustomAvatar";

interface ProfileBarProps {
  role?: string;
  title: string;
  name: string;
}

const AVATAR_SIZE = 128;

export default function ProfileBar({
  role = "default",
  name,
  title,
}: ProfileBarProps) {
  return (
    <Box className={styles.container}>
      <Box className={styles.titles}>
        <div className={styles.user_name}>{name}</div>
        <div className={styles.user_title}>{title}</div>
      </Box>
      <CustomAvatar
        className={styles.user_icon}
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
      />
    </Box>
  );
}
