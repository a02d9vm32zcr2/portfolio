import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/getSiteContent";

// Read fresh content from Supabase on every request so edits show up right away.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  return (
    <>
      <Navbar content={content} />
      <main className="flex-1">
        <Hero content={content} />
        <About content={content} />
        <Projects content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </>
  );
}
