// ============================================================================
//  EDIT ME  👇
//  This is the ONLY file you need to change to make the site yours.
//  Your name, links, and projects all live here. Save the file and the
//  browser refreshes automatically.
//
//  (Soon you'll also be able to edit this content from the browser after
//   signing in — this file then becomes the starting/fallback content.)
// ============================================================================

export const site = {
  name: "Yesukhei Baatar",
  role: "Aspiring Programmer",
  // One or two sentences that introduce you:
  tagline:
    "Aspiring programmer from Ulaanbaatar, heading toward cybersecurity and AI engineering. I like figuring out how systems work — and how to build them to be secure and smart.",
  location: "Ulaanbaatar, Mongolia",
  email: "sharshuwuu@gmail.com", // shown publicly on the site — change or hide anytime

  // Profile links. Leave any value as "" (empty) to hide that link.
  socials: {
    github: "https://github.com/a02d9vm32zcr2",
    linkedin: "", // empty = hidden
    twitter: "", // empty = hidden
  },

  // The "About" section — each string becomes its own paragraph.
  about: [
    "I'm an aspiring programmer based in Ulaanbaatar, Mongolia. I'm especially drawn to cybersecurity and AI engineering — understanding how systems work, where they break, and how to build them to be secure and intelligent.",
    "Right now I'm building my foundations across the web stack and learning by shipping real projects like this site. I'm looking for opportunities to grow as an engineer.",
  ],

  // Shown as little pills in the About section.
  skills: [
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Git",
    "Linux",
    "Networking",
  ],

  // Your projects. Add or remove entries freely — the grid adjusts itself.
  projects: [
    {
      title: "This Portfolio",
      description:
        "The site you're looking at — built with Next.js, Tailwind, and Supabase, deployed on Vercel with a browser-based content editor.",
      tags: ["Next.js", "Tailwind", "Supabase", "Vercel"],
      link: "https://portfolio-ochre-xi-29.vercel.app/",
    },
    {
      title: "Project Two",
      description:
        "Replace this with something you've built — a security tool, a script, a game, anything. Even a small experiment counts.",
      tags: ["Python", "Security"],
      link: "",
    },
    {
      title: "Project Three",
      description:
        "And one more. Swap in a real project and a link to the repo or demo.",
      tags: ["AI", "TypeScript"],
      link: "",
    },
  ],
};

export type SiteContent = typeof site;
