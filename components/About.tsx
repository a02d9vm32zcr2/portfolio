import { site } from "@/content";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-black/[.06] dark:border-white/[.08]"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          About
        </h2>
        <div className="mt-6 grid gap-12 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            {site.about.map((paragraph, i) => (
              <p
                key={i}
                className="text-lg leading-8 text-zinc-700 dark:text-zinc-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Skills
            </h3>
            <ul className="flex flex-wrap gap-2">
              {site.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
