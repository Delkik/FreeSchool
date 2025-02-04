import styles from "@/modules/Navbar.module.css";

interface NavbarProps {
  hey?: string;
}

export default function Navbar({}: NavbarProps) {
  return (
    <div className={styles.container}>
      <p>hi</p>
    </div>
  );
}
