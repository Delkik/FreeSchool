import styles from "@/modules/components/dashboard/profile/ProfileBar.module.css";
import Box from "@mui/material/Box";
import CustomAvatar from "@/components/common/CustomAvatar";

interface ProfileBarProps {
  role?: string;
  title: string;
  name: string;
}

const AVATAR_SIZE = 144;

export default function ProfileBar({ name, title }: ProfileBarProps) {
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
