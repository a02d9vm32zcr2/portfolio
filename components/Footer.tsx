import type { SiteContent } from "@/content";

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-black/[.06] dark:border-white/[.08]">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} {content.name}. Built with Next.js &amp;
        Tailwind.
      </div>
    </footer>
  );
}
