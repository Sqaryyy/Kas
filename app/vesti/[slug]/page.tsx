import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// This would usually come from a CMS or JSON file
const CONTENT = {
  "kada-nasilje-postane-normalno": {
    title: "Kada nasilje postane „normalno“",
    category: "Bezbednost",
    color: "var(--lilac-500)",
    date: "15. mart 2025",
    author: "Maša Vračar",
    image: "/ppl.png",
    text: [
      "Nekada nas je nasilje šokiralo. Danas ga sve češće samo registrujemo i nastavljamo dalje.",
      "Scrollujemo kroz snimke tuča, pretnji, targetiranja, govora mržnje i ponižavanja kao da su deo svakodnevice. U komentarima tražimo „ko je prvi počeo“. U školama, na internetu i na ulici agresija postaje način komunikacije. A mladi odrastaju u atmosferi u kojoj se granica između konflikta i nasilja sve više briše.",
      "Kada govorimo o nasilju, često zamišljamo samo fizički obračun. Ali nasilje nije samo udarac. Nasilje je i konstantno ponižavanje. Osećaj straha. Targetiranje na internetu. Curenje privatnih podataka. Govor mržnje. Pretnje zbog drugačijeg mišljenja. Pritisak da ćutiš kako ne bi postao meta.",
      "UNICEF upozorava da digitalno nasilje među mladima više nije izolovan problem interneta, već deo svakodnevnog iskustva mladih ljudi, sa ozbiljnim posledicama po mentalno zdravlje, samopouzdanje i osećaj sigurnosti. Savet Evrope dodatno ukazuje da se online govor mržnje i nasilje veoma lako prelivaju u offline prostor, posebno u društvima sa visokom polarizacijom i slabim poverenjem u institucije.",
      "Upravo na to ukazuje i KOMS-ov „Bezbednosni kompas“, koji pokazuje da mladi među najvećim pretnjama po svoju bezbednost vide političku polarizaciju, govor mržnje, kršenje građanskih prava i nasilje u digitalnom prostoru.",
      "To govori mnogo o društvu u kom živimo. Jer ako mladi kao najveću pretnju ne vide samo „opasnost na ulici“, već atmosferu u kojoj stalno moraju da budu oprezni, onda problem nije izolovan incident. Problem je klima.",
      "Posebno zabrinjava što istraživanja pokazuju i rast tolerancije prema nasilju među mladima. Istraživanja pokazuju da čak 44% mladih smatra da nasilje može biti opravdano u određenim situacijama. Posebno je zabrinjavajuće što mladi nasilje najčešće opravdavaju kada „država ili policija ne rade svoj posao“.",
      "Zato razgovor o nasilju ne može da bude samo razgovor o bezbednosti. To je razgovor o tome kakvo društvo gradimo. Društvo u kome se ljudi nadvikuju, ili društvo u kome se slušaju. Društvo u kome je agresija dominantan model ponašanja, ili društvo u kome neslaganje ne znači neprijateljstvo.",
    ],
  },
  "ostati-ili-otici": {
    title: "Ostati ili otići?",
    category: "Migracije",
    color: "var(--orange-500)",
    date: "8. mart 2025",
    author: "Maša Vračar",
    image: "/go.png",
    text: [
      "„Čim završim fakultet, idem.“ „Ovde nema budućnosti.“ „Videću gde mogu da pronađem bolju priliku.“",
      "Ovakve rečenice danas se među mladima u Srbiji čuju veoma često. Toliko često da je razgovor o odlasku postao deo svakodnevice, a ne velika životna prekretnica. I gotovo da ne postoji mlada osoba koja makar jednom nije razmišljala o tome kako bi joj život izgledao negde drugde.",
      "Ipak, priča o migracijama mladih mnogo je složenija od jednostavne podele na „ostati“ ili „otići“.",
      "Najčešće se govori o ekonomskim razlozima: boljim platama, stabilnijim poslovima, višem standardu ili kvalitetnijim uslovima rada. I zaista, istraživanja OECD-a i Evropske fondacije za obuku pokazuju da mladi iz regiona Zapadnog Balkana među glavnim razlozima za odlazak navode upravo bolje profesionalne mogućnosti, sigurnije tržište rada i kvalitet života.",
      "Ali migracije mladih nisu samo pitanje novca. Vrlo često su povezane i sa osećajem perspektive. Sa pitanjem da li mladi veruju da mogu da planiraju život, razvijaju ideje, menjaju poslove, greše, napreduju i budu vrednovani na osnovu svog rada.",
      "Jer odlazak ne mora nužno da znači odustajanje od svoje zemlje. Za mnoge mlade to je pokušaj da pronađu prostor za razvoj, iskustvo, obrazovanje ili drugačiji životni ritam. Isto tako, ostanak ne znači nužno manjak ambicije. Mnogi mladi žele da ostanu upravo zato što ovde vide porodicu, prijatelje, zajednicu i osećaj pripadnosti koji je teško izgraditi negde drugde.",
      "UNDP u svojim analizama o migracijama u Srbiji posebno naglašava da fokus ne bi trebalo da bude samo na sprečavanju odlaska, već i na stvaranju veza sa dijasporom, razmeni znanja i otvaranju prostora za povratak mladih koji žele da svoje iskustvo jednog dana donesu nazad.",
      "Možda je važnije pitanje: kako da mladi, bez obzira na to gde žive, ne izgube osećaj povezanosti sa društvom iz kog dolaze?",
    ],
  },
  "tehnologija-ko-kome-sluzi": {
    title: "Tehnologija — ko kome služi?",
    category: "Tehnologija",
    color: "var(--mint-700)",
    date: "1. mart 2025",
    author: "Maša Vračar",
    image: "/tech.png",
    text: [
      "Tehnologija je danas svuda. U telefonu koji proveravamo čim otvorimo oči. U algoritmima koji biraju šta ćemo gledati. I upravo zato pitanje više nije da li tehnologija utiče na nas. Pitanje je: da li mi kontrolišemo tehnologiju ili ona polako počinje da kontroliše nas?",
      "Poslednjih par godina posebno se govori o AI alatima poput ChatGPT-a. Za neke mlade oni predstavljaju veliku pomoć u učenju i razvijanju ideja. Za druge su izvor straha: da će poslovi nestati ili da će tehnologija zameniti ljude brže nego što društvo može da se prilagodi.",
      "OECD upozorava da će AI značajno promeniti tržište rada, ne nužno tako što će potpuno ukinuti poslove, već tako što će u velikoj meri promeniti veštine koje će biti potrebne mladima u budućnosti.",
      "Mladima danas informacije dolaze sa TikToka, YouTube-a, Instagrama i Reddita. Ali isto tako, internet je postao prostor u kome se veoma brzo šire dezinformacije, govor mržnje i manipulativni sadržaji.",
      "Podaci iz KOMS-ovog Alternativnog izveštaja 2025 pokazuju da se čak 76,7% mladih primarno informiše putem društvenih mreža. Istovremeno, 72% mladih navodi da se često susreće sa lažnim vestima, dok 71,9% ispitanika ne prepoznaje AI-generisani sadržaj.",
      "Zato pitanje nije kako da mlade potpuno udaljimo od tehnologije, već kako da razvijamo medijsku i digitalnu pismenost. Da mladi znaju da provere informaciju pre nego što je podele. Da umeju da koriste AI kao alat, a ne kao zamenu za sopstveno mišljenje.",
      "Da li ćemo koristiti tehnologiju da proširimo prostor za znanje, dijalog i povezivanje, ili ćemo dozvoliti da nas pretvori u generacije koje više gledaju u ekran nego jedne u druge?",
    ],
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = CONTENT[slug as keyof typeof CONTENT];

  if (!article) notFound();

  return (
    <>
      <style>{`
        .article-page {
          background: var(--cream);
          min-height: 100vh;
          padding: 120px 5vw;
        }

        .article-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--ink);
          text-decoration: none;
          font-family: var(--font-d);
          font-weight: 700;
          margin-bottom: 40px;
          font-size: 0.9rem;
        }

        .article-header {
          margin-bottom: 48px;
        }

        .article-cat {
          display: inline-block;
          font-family: var(--font-d);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.8rem;
          margin-bottom: 16px;
        }

        .article-title {
          font-family: var(--font-d);
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.9rem;
          color: var(--ink-60);
          border-top: var(--border);
          padding-top: 24px;
        }

        .article-hero {
          position: relative;
          width: 100%;
          height: 450px;
          border: var(--border);
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 10px 10px 0 var(--ink);
          margin-bottom: 64px;
        }

        .article-content {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--ink);
        }

        .article-content p {
          margin-bottom: 1.5em;
        }

        @media (max-width: 640px) {
          .article-hero {
            height: 300px;
          }
        }
      `}</style>
      <Navbar />
      <main className="article-page">
        <div className="article-container">
          <Link href="/" className="back-link">
            ← Nazad na početnu
          </Link>

          <header className="article-header">
            <span className="article-cat" style={{ color: article.color }}>
              {article.category}
            </span>
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <span>{article.date}</span>
              <span>•</span>
              <span>
                Piše: <strong>{article.author}</strong>
              </span>
            </div>
          </header>

          <div className="article-hero">
            <Image
              src={article.image}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <article className="article-content">
            {article.text.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
