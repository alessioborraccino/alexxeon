import { Page, ImageWithPlaceholder } from "@/ui";
import { messages, type Locale } from "@/modules/i18n";

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
export default function BioPage({ locale }: { locale: Locale }) {
  const t = messages[locale];
  return (
    <Page className="section bio">
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
    </Page>
  );
}
