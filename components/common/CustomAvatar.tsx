// import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { CircleUserRound } from "lucide-react";

interface AvatarProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function CustomAvatar({
  width,
  height,
  className = "",
}: AvatarProps) {
  // TODO: either use session or fetch to get avatar image

  const avatarSrc = (
    <Avatar
      className={className}
      src="/static/test-avatar.jpg"
      sx={{ width, height }}
    />
  );

  return <>{avatarSrc || <CircleUserRound size={width} />}</>;
}
