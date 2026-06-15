import { site } from "@/content";

export default function Footer() {
  return (
    <footer className="border-t border-black/[.06] dark:border-white/[.08]">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} {site.name}. Built with Next.js &amp;
        Tailwind.
      </div>
    </footer>
  );
}
