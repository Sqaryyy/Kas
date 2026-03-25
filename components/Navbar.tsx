import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a
        href="https://www.kas.de/sr/web/serbien"
        target="_blank"
        rel="noopener noreferrer"
        className={styles["nav-kas"]}
      >
        <Image
          src="/KAS_LOGO.png"
          alt="Fondacija Konrad Adenauer"
          height={32}
          width={120}
          style={{ objectFit: "contain", objectPosition: "left" }}
        />
      </a>

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
