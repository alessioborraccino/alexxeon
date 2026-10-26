import { pageMetadata } from "../../lib/site.mjs";
export const metadata = pageMetadata(
  "About Alexx Eon",
  "Meet Alexx Eon: an Italian-born musician blending piano, vocals, and electronic influences in personal interpretations of familiar songs.",
  "/bio/",
);
function Photo({ name, alt }) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/images/${name}-640.avif 640w, /images/${name}-1280.avif 1280w`}
        sizes="(max-width: 650px) 100vw, 50vw"
      />
      <img
        src={`/images/${name}-1280.webp`}
        srcSet={`/images/${name}-640.webp 640w, /images/${name}-1280.webp 1280w`}
        sizes="(max-width: 650px) 100vw, 50vw"
        width="1280"
        height="853"
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
export default function Bio() {
  return (
    <main id="main" className="section bio">
      <h1>About Alexx Eon</h1>
      <p>
        For Alexx, Music has always been there. Born and raised in the heart of
        Italy, Alexx loved music since childhood. When he was 9 years old, he
        asked for lessons to learn how to play his favourite instrument: the
        piano.
      </p>
      <div className="photo-grid">
        <Photo
          name="looking-up-from-stairs"
          alt="Alexx Eon looking up from a staircase"
        />
        <Photo name="happy" alt="Portrait of Alexx Eon smiling" />
      </div>
      <p>
        In the midst of learning how to play and starting to understand how to
        write songs as well, Alexx discovered the magic of Electronic music,
        which became the main influence on his music style. Carefully, Alexx
        listened to Dance, Trance, Techno, Hip Hop, RnB and Electronic music
        through the years. All these different styles made him wonder what
        certain songs would sound like with his own personal twist and thus, his
        interest for writing cover songs was born.
      </p>
      <div className="photo-grid">
        <Photo
          name="playing-with-microphone"
          alt="Alexx Eon with a microphone"
        />
        <Photo name="thinker" alt="Portrait of Alexx Eon in thought" />
      </div>
      <p>
        During the journey of writing cover songs, Alexx started singing as
        well, in order to convey a more personal feeling to his pieces.
      </p>
      <div className="photo-grid">
        <Photo name="mystery-green-door" alt="Alexx Eon beside a green door" />
        <Photo name="thinker-right" alt="Side portrait of Alexx Eon" />
      </div>
    </main>
  );
}
