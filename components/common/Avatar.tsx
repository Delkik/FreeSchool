// import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import styles from "@/modules/components/common/Avatar.module.css";

interface AvatarProps {
  width?: string | number;
  height?: string | number;
}

export default function Avatar({ width, height }: AvatarProps) {
  // TODO: either use session or fetch to get avatar image

  // TODO: change to Next/Image
  const avatarSrc = (
    <img
      src={"test-avatar.jpg"}
      width={width ?? 64}
      height={height ?? 64}
      alt="avatar"
      className={styles.avatar}
    />
  );

  return <>{avatarSrc || <CircleUserRound size={width} />}</>;
}
