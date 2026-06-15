// ============================================================================
//  EDIT ME  👇
//  This is the ONLY file you need to change to make the site yours.
//  Your name, links, and projects all live here. Save the file and the
//  browser refreshes automatically.
// ============================================================================

export const site = {
  name: "Your Name", // <- put your real name here
  role: "Aspiring Software Developer", // shows above your name in the hero
  // One or two sentences that introduce you:
  tagline:
    "I build things for the web. Right now I'm learning Next.js, TypeScript, and everything in between.",
  location: "Ulaanbaatar, Mongolia",
  email: "you@example.com", // your contact email

  // Profile links. Leave any value as "" (empty) to hide that link.
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "", // empty = hidden
  },

  // The "About" section — each string becomes its own paragraph.
  about: [
    "Write a short paragraph about who you are and what you like building.",
    "Add a second one about what you're learning or what kind of work you're looking for.",
  ],

  // Shown as little pills in the About section.
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Supabase",
    "Git",
  ],

  // Your projects. Add or remove entries freely — the grid adjusts itself.
  projects: [
    {
      title: "Project One",
      description:
        "A short sentence about what this project does and what you built it with.",
      tags: ["Next.js", "Tailwind"],
      link: "https://github.com/yourusername/project-one", // live demo or repo (or "" for none)
    },
    {
      title: "Project Two",
      description:
        "Another project. Swap in something you've made — even a small experiment counts.",
      tags: ["TypeScript", "API"],
      link: "",
    },
    {
      title: "This Portfolio",
      description:
        "The site you're looking at, built with Next.js, Tailwind, and deployed on Vercel.",
      tags: ["Next.js", "Tailwind", "Vercel"],
      link: "",
    },
  ],
};
