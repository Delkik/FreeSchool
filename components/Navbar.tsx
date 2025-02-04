import styles from "@/modules/Navbar.module.css";
import { House } from "lucide-react";
import Link from "next/link";
import { ArrowRightFromLine } from "lucide-react";
import { ArrowLeftFromLine } from "lucide-react";
import { useState } from "react";
import { Search } from "lucide-react";
import { MessageCircle } from "lucide-react";
import Avatar from "./Avatar";

const ICON_SIZE = 48;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openIcon = (
    <button>
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
        <Link href={""}>
          <House size={ICON_SIZE} />
        </Link>
        <Link href={""}>
          <Search size={ICON_SIZE} />
        </Link>
        <Link href={""}>
          <MessageCircle size={ICON_SIZE} />
        </Link>
        <Link href={""}>
          <Avatar width={ICON_SIZE} height={ICON_SIZE} />
        </Link>
      </div>
    </div>
  );
}
