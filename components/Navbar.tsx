import type { SiteContent } from "@/content";

export default function Navbar({ content }: { content: SiteContent }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[.06] bg-white/80 backdrop-blur dark:border-white/[.08] dark:bg-black/70">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {content.name}
        </a>
        <ul className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            <a className="hover:text-zinc-900 dark:hover:text-zinc-50" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="hover:text-zinc-900 dark:hover:text-zinc-50" href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a className="hover:text-zinc-900 dark:hover:text-zinc-50" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
