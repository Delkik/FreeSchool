"use client";

import styles from "@/modules/components/main/Navbar.module.css";
import { House } from "lucide-react";
import Link from "next/link";
import { ArrowRightFromLine } from "lucide-react";
import { ArrowLeftFromLine } from "lucide-react";
import { JSX, useState } from "react";
import { Search } from "lucide-react";
import { MessageCircle } from "lucide-react";
import CustomAvatar from "@/components/common/CustomAvatar";
import clsx from "clsx";

const ICON_SIZE = 54;

interface IconMapper {
  item: string;
  href: string;
  icon: JSX.Element;
}

const iconMapper: IconMapper[] = [
  {
    item: "Home",
    href: "",
    icon: <House size={ICON_SIZE} />,
  },
  {
    item: "Search",
    href: "search",
    icon: <Search size={ICON_SIZE} />,
  },
  {
    item: "Message",
    href: "messaging",
    icon: <MessageCircle size={ICON_SIZE} />,
  },
  {
    item: "Profile",
    href: "profile",
    icon: <CustomAvatar width={ICON_SIZE} height={ICON_SIZE} />,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openIcon = (
    <button className={styles.icon}>
      {isOpen ? (
        <ArrowLeftFromLine size={ICON_SIZE} onClick={() => setIsOpen(false)} />
      ) : (
        <ArrowRightFromLine size={ICON_SIZE} onClick={() => setIsOpen(true)} />
      )}
    </button>
  );

  return (
    <div className={styles.container}>
      <div className={styles.icons_list}>
        {openIcon}
        {iconMapper.map((icon, index) => {
          const isLast = index == iconMapper.length - 1;
          return (
            <button
              className={clsx(styles.icon, isLast ? styles.last_icon : "")}
              key={`navbar-${index}`}
            >
              <Link href={`/dashboard/${icon.href}`}>{icon.icon}</Link>
              <span className={styles.icon_text}>{isOpen && icon.item}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
