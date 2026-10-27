import { notFound } from "next/navigation";
import { hasLocale, messages, type Locale } from "../../../lib/i18n";
import { pageMetadata } from "../../../lib/site";
import ImageWithPlaceholder from "../../../components/ImageWithPlaceholder";

type BioProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: BioProps) {
  const { locale: value } = await params;
  if (!hasLocale(value)) notFound();
  const t = messages[value];
  return pageMetadata(t.titles.bio, t.descriptions.bio, `/${value}/bio/`, true);
}
function Photo({ name, alt }: { name: string; alt: string }) {
  return (
    <ImageWithPlaceholder
      src={`/images/${name}-1280.webp`}
      sources={[
        {
          type: "image/avif",
          srcSet: `/images/${name}-640.avif 640w, /images/${name}-1280.avif 1280w`,
        },
        {
          type: "image/webp",
          srcSet: `/images/${name}-640.webp 640w, /images/${name}-1280.webp 1280w`,
        },
      ]}
      sizes="(max-width: 650px) 100vw, 50vw"
      width={1280}
      height={853}
      alt={alt}
      className="photo-image"
    />
  );
}
export default async function Bio({ params }: BioProps) {
  const { locale: value } = await params;
  if (!hasLocale(value)) notFound();
  return <BioContent locale={value} />;
}

function BioContent({ locale }: { locale: Locale }) {
  const t = messages[locale];
  return (
    <main id="main" className="section bio">
      <h1>{t.aboutArtist}</h1>
      <p>{t.bioParagraphs[0]}</p>
      <div className="photo-grid">
        <Photo
          name="looking-up-from-stairs"
          alt="Alexx Eon looking up from a staircase"
        />
        <Photo name="happy" alt="Portrait of Alexx Eon smiling" />
      </div>
      <p>{t.bioParagraphs[1]}</p>
      <div className="photo-grid">
        <Photo
          name="playing-with-microphone"
          alt="Alexx Eon with a microphone"
        />
        <Photo name="thinker" alt="Portrait of Alexx Eon in thought" />
      </div>
      <p>{t.bioParagraphs[2]}</p>
      <div className="photo-grid">
        <Photo name="mystery-green-door" alt="Alexx Eon beside a green door" />
        <Photo name="thinker-right" alt="Side portrait of Alexx Eon" />
      </div>
    </main>
  );
}
