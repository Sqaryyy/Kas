import Image from "next/image";
import Link from "next/link";
import { Coffee } from "lucide-react";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={s.hero}>
      <div className={s.heroContent}>
        <div className={s.heroEyebrow}>
          <div className={s.heroEyebrowBlink} aria-hidden="true" />
          Beograd · Subota 12–16h
        </div>

        <h1 className={s.heroTitle}>
          Dođi da <br />
          se <span className={s.heroTitleHighlight}>ne složimo</span>.
        </h1>

        <p className={s.heroSub}>
          <strong> Bez svađe.</strong> Samo kafa sa nekim ko misli potpuno
          drugačije. Iznenadi se.
        </p>

        <div className={s.heroBtns}>
          <Link className={s.btnBig} href="#prijava">
            Prijavi se
          </Link>
          <Link className={s.btnOutline} href="#kako">
            Kako to izgleda? →
          </Link>
        </div>

        <div className={s.heroStats}>
          <div className={s.stat}>
            <span className={s.statNum}>18–26</span>
            <span className={s.statLabel}>godina</span>
          </div>
          <div className={s.stat}>
            <span className={s.statNum}>
              <Coffee size={22} strokeWidth={1.75} color="var(--orange-500)" />
            </span>
            <span className={s.statLabel}>kafić, ne slušaonica</span>
          </div>
          <div className={s.stat}>
            <span className={s.statNum}>100%</span>
            <span className={s.statLabel}>besplatno</span>
          </div>
        </div>
      </div>

      <div className={s.heroVisual}>
        <div className={s.heroPhotoFrame}>
          <Image
            src="/novo3.jpeg"
            alt="Dvoje mladih razgovaraju uz kafu"
            fill
            priority
            sizes="(max-width: 900px) 0px, 50vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 80%",
              filter: "saturate(0.88)",
            }}
          />
          <div className={s.heroPhotoOverlay} aria-hidden="true" />
          <div className={s.heroPhotoTag}>
            <Coffee size={20} strokeWidth={1.75} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
