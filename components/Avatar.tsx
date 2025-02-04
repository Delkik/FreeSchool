// import Image from "next/image";

interface AvatarProps {
  width?: string | number;
  height?: string | number;
}

export default function Avatar({ width, height }: AvatarProps) {
  return (
    // TODO: change to Next/Image
    <img
      src={"globe.svg"}
      width={width ?? 64}
      height={height ?? 64}
      alt="avatar"
    />
  );
}
