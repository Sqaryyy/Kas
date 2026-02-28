import Image from "next/image";
import Link from "next/link";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={s.hero}>
      <div className={s.heroBlobContainer} aria-hidden="true">
        <div className={`${s.heroBlob} ${s.heroBlob1}`} />
        <div className={`${s.heroBlob} ${s.heroBlob2}`} />
      </div>

      <div className={s.heroContent}>
        <div className={s.heroEyebrow}>
          <div className={s.heroEyebrowBlink} aria-hidden="true" />
          Beograd · Subote 12–16h · Besplatno
        </div>

        <h1 className={s.heroTitle}>
          Šta ako
          <br />
          pričaš sa nekim
          <br />
          ko se <span className={s.heroTitleHighlight}>ne slaže?</span>
        </h1>

        <p className={s.heroSub}>
          <strong>Bez debate. Bez svađe.</strong> Samo kafa sa nekim ko misli
          potpuno drugačije. Iznenadi se.
        </p>

        <div className={s.heroBtns}>
          <Link className={s.btnBig} href="#prijava">
            Prijavi se besplatno 🔥
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
            <span className={s.statNum}>☕</span>
            <span className={s.statLabel}>kafić, ne predavaonica</span>
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
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=80"
            alt="Dvoje mladih razgovaraju uz kafu"
            fill
            priority
            sizes="(max-width: 900px) 0px, 50vw"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              filter: "saturate(0.88)",
            }}
          />
          <div className={s.heroPhotoOverlay} aria-hidden="true" />
          <div className={s.heroPhotoTag}>☕</div>
          <div className={s.heroPhotoCaption}>
            <blockquote className={s.heroPhotoQuote}>
              „Nisam promenio mišljenje. Ali sam razumeo odakle dolazi njeno."
              <span>— Andrej, 26g · posle razgovora</span>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
