import type { SiteContent } from "@/content";

export default function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue-600 dark:text-blue-400">
        {content.role}
      </p>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
        Hi, I&rsquo;m {content.name}.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        {content.tagline}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-black/[.1] px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-black/[.04] dark:border-white/[.15] dark:text-zinc-50 dark:hover:bg-white/[.06]"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
