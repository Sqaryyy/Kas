import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles["nav-logo"]} />

      <ul className={styles["nav-links"]}>
        <li>
          <Link href="#kako">Kako funkcioniše?</Link>
        </li>
        <li>
          <Link href="#teme">Teme</Link>
        </li>
        <li>
          <Link href="#prijava">Prijavi se</Link>
        </li>
      </ul>

      <Link href="#prijava" className={styles["btn-cta"]}>
        Prijavi se →
      </Link>
    </nav>
  );
}
