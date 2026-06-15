"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { site, type SiteContent } from "@/content";

// Which Google accounts see the editor (comma-separated list in the env var).
// The real enforcement is the Supabase RLS policy — this just decides what UI
// to show.
const OWNER_EMAILS = (process.env.NEXT_PUBLIC_OWNER_EMAIL ?? "")
  .toLowerCase()
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

type ProjectForm = {
  title: string;
  description: string;
  tagsText: string;
  link: string;
};

type FormState = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  aboutText: string;
  skillsText: string;
  projects: ProjectForm[];
};

// Convert stored content -> editable form (arrays become text where simpler).
function toForm(c: SiteContent): FormState {
  return {
    name: c.name,
    role: c.role,
    tagline: c.tagline,
    location: c.location,
    email: c.email,
    github: c.socials.github,
    linkedin: c.socials.linkedin,
    twitter: c.socials.twitter,
    aboutText: c.about.join("\n"),
    skillsText: c.skills.join(", "),
    projects: c.projects.map((p) => ({
      title: p.title,
      description: p.description,
      tagsText: p.tags.join(", "),
      link: p.link,
    })),
  };
}

// Convert form -> content object to store in Supabase.
function fromForm(f: FormState): SiteContent {
  return {
    name: f.name,
    role: f.role,
    tagline: f.tagline,
    location: f.location,
    email: f.email,
    socials: { github: f.github, linkedin: f.linkedin, twitter: f.twitter },
    about: f.aboutText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    skills: f.skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    projects: f.projects.map((p) => ({
      title: p.title,
      description: p.description,
      tags: p.tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      link: p.link,
    })),
  };
}

function TextField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-black/[.12] bg-white px-3 py-2 text-zinc-900 outline-none focus:border-blue-500 dark:border-white/[.15] dark:bg-zinc-900 dark:text-zinc-50"
      />
      {hint ? <span className="mt-1 block text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-black/[.12] bg-white px-3 py-2 text-zinc-900 outline-none focus:border-blue-500 dark:border-white/[.15] dark:bg-zinc-900 dark:text-zinc-50"
      />
      {hint ? <span className="mt-1 block text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Track the auth session (also catches the redirect back from Google).
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const email = (session?.user?.email ?? "").toLowerCase();
  const isOwner = !!session && OWNER_EMAILS.includes(email);

  // Once we know the owner is signed in, load the current content into the form.
  useEffect(() => {
    if (!isOwner) {
      setForm(null);
      return;
    }
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", 1)
        .maybeSingle();
      if (!active) return;
      const current = (data?.data as SiteContent | undefined) ?? site;
      setForm(toForm({ ...site, ...current }));
    })();
    return () => {
      active = false;
    };
  }, [isOwner]);

  async function signIn() {
    setMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/admin` },
    });
    if (error) setMessage(`Sign-in error: ${error.message}`);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setForm(null);
    setMessage(null);
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  function updateProject(i: number, patch: Partial<ProjectForm>) {
    setForm((f) =>
      f
        ? {
            ...f,
            projects: f.projects.map((p, idx) =>
              idx === i ? { ...p, ...patch } : p,
            ),
          }
        : f,
    );
  }

  function addProject() {
    setForm((f) =>
      f
        ? {
            ...f,
            projects: [
              ...f.projects,
              { title: "", description: "", tagsText: "", link: "" },
            ],
          }
        : f,
    );
  }

  function removeProject(i: number) {
    setForm((f) =>
      f ? { ...f, projects: f.projects.filter((_, idx) => idx !== i) } : f,
    );
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    setMessage(null);
    const data = fromForm(form);
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: 1, data, updated_at: new Date().toISOString() });
    setSaving(false);
    setMessage(
      error
        ? `Could not save: ${error.message}`
        : "Saved. Refresh your homepage to see the changes.",
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Site editor
      </h1>

      {authLoading ? (
        <p className="mt-6 text-zinc-500">Loading…</p>
      ) : !session ? (
        <div className="mt-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            Sign in with the owner Google account to edit the site.
          </p>
          <button
            onClick={signIn}
            className="mt-4 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Sign in with Google
          </button>
          {message ? (
            <p className="mt-4 text-sm text-red-600">{message}</p>
          ) : null}
        </div>
      ) : !isOwner ? (
        <div className="mt-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            Signed in as{" "}
            <span className="font-medium">{session.user.email}</span>, which
            isn&rsquo;t the owner account, so you can&rsquo;t edit this site.
          </p>
          <button
            onClick={signOut}
            className="mt-4 rounded-full border border-black/[.12] px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-black/[.04] dark:border-white/[.15] dark:text-zinc-50 dark:hover:bg-white/[.06]"
          >
            Sign out
          </button>
        </div>
      ) : !form ? (
        <p className="mt-6 text-zinc-500">Loading editor…</p>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500">Signed in as {session.user.email}</p>
            <button
              onClick={signOut}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Sign out
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Name" value={form.name} onChange={(v) => set("name", v)} />
            <TextField label="Role" value={form.role} onChange={(v) => set("role", v)} />
          </div>
          <TextArea
            label="Tagline"
            rows={2}
            value={form.tagline}
            onChange={(v) => set("tagline", v)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Location"
              value={form.location}
              onChange={(v) => set("location", v)}
            />
            <TextField label="Email" value={form.email} onChange={(v) => set("email", v)} />
          </div>

          <TextArea
            label="About"
            rows={5}
            value={form.aboutText}
            onChange={(v) => set("aboutText", v)}
            hint="One paragraph per line."
          />
          <TextField
            label="Skills"
            value={form.skillsText}
            onChange={(v) => set("skillsText", v)}
            hint="Comma-separated, e.g. Python, React, Linux"
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <TextField
              label="GitHub URL"
              value={form.github}
              onChange={(v) => set("github", v)}
              hint="Blank to hide"
            />
            <TextField
              label="LinkedIn URL"
              value={form.linkedin}
              onChange={(v) => set("linkedin", v)}
              hint="Blank to hide"
            />
            <TextField
              label="Twitter URL"
              value={form.twitter}
              onChange={(v) => set("twitter", v)}
              hint="Blank to hide"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Projects
              </h2>
              <button
                onClick={addProject}
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                + Add project
              </button>
            </div>
            <div className="space-y-5">
              {form.projects.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-black/[.08] p-4 dark:border-white/[.1]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-500">
                      Project {i + 1}
                    </span>
                    <button
                      onClick={() => removeProject(i)}
                      className="text-xs font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-3">
                    <TextField
                      label="Title"
                      value={p.title}
                      onChange={(v) => updateProject(i, { title: v })}
                    />
                    <TextArea
                      label="Description"
                      rows={2}
                      value={p.description}
                      onChange={(v) => updateProject(i, { description: v })}
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField
                        label="Tags"
                        value={p.tagsText}
                        onChange={(v) => updateProject(i, { tagsText: v })}
                        hint="Comma-separated"
                      />
                      <TextField
                        label="Link"
                        value={p.link}
                        onChange={(v) => updateProject(i, { link: v })}
                        hint="Blank for none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-black/[.06] pt-6 dark:border-white/[.08]">
            <button
              onClick={save}
              disabled={saving}
              className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            {message ? (
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{message}</span>
            ) : null}
          </div>
        </div>
      )}
    </main>
  );
}
