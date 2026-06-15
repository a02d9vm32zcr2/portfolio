import { createClient } from "@supabase/supabase-js";
import { site, type SiteContent } from "@/content";

// Reads the single editable content row (id = 1) from Supabase and merges it
// over the defaults in content.ts. If the env isn't set, the table doesn't
// exist yet, or anything fails, the site simply falls back to the content.ts
// defaults — so the page never breaks.
export async function getSiteContent(): Promise<SiteContent> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return site;

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false },
    });
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data?.data) return site;

    // DB content wins; any missing field falls back to the defaults.
    return { ...site, ...(data.data as Partial<SiteContent>) };
  } catch {
    return site;
  }
}
