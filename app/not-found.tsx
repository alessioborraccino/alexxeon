import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="section">
      <h1>Page not found</h1>
      <p>This page does not exist or has moved.</p>
      <Link className="button" href="/">
        Back to music
      </Link>
    </main>
  );
}
