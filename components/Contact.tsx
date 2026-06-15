import { site } from "@/content";

export default function Contact() {
  const links = [
    { label: "GitHub", href: site.socials.github },
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "Twitter", href: site.socials.twitter },
  ].filter((link) => link.href); // hide any with an empty URL

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-black/[.06] dark:border-white/[.08]"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Contact
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          Want to work together, or just want to say hi? My inbox is open.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-6 inline-block text-2xl font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          {site.email}
        </a>
        {links.length > 0 && (
          <div className="mt-8 flex gap-5 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-900 dark:hover:text-zinc-50"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
