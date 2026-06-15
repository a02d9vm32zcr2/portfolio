import type { SiteContent } from "@/content";

export default function Projects({ content }: { content: SiteContent }) {
  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-black/[.06] dark:border-white/[.08]"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Projects
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {content.projects.map((project) => (
            <a
              key={project.title}
              href={project.link || "#"}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              className="group rounded-2xl border border-black/[.08] p-6 transition-colors hover:border-black/[.2] dark:border-white/[.1] dark:hover:border-white/[.25]"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {project.title}
                {project.link && (
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                )}
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
