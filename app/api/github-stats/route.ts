import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function formatCount(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

const FALLBACKS: Record<string, { stars: number; downloads: number; starsFormatted: string; downloadsFormatted: string }> = {
  "aradhyas8/Alder": {
    stars: 143,
    downloads: 2505,
    starsFormatted: "143 stars",
    downloadsFormatted: "2.5k downloads",
  },
  "aradhyas8/Plume_Launcher": {
    stars: 288,
    downloads: 7788,
    starsFormatted: "288 stars",
    downloadsFormatted: "7.8k downloads",
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get("repo") || "aradhyas8/Plume_Launcher";
  const fallback = FALLBACKS[repo] || FALLBACKS["aradhyas8/Plume_Launcher"];

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-github-stats-fetcher",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // In dev: no-store for instant updates. In prod: 60s cache so GitHub rate limit (60 req/hr unauth) is respected.
    const fetchOptions: RequestInit =
      process.env.NODE_ENV === "development"
        ? { headers, cache: "no-store" }
        : { headers, next: { revalidate: 60 } };

    const [repoRes, releasesRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}`, fetchOptions),
      fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, fetchOptions),
    ]);

    let stars: number | null = null;
    let downloads: number | null = null;

    if (repoRes.ok) {
      const repoData = await repoRes.json();
      if (typeof repoData.stargazers_count === "number") {
        stars = repoData.stargazers_count;
      }
    }

    if (releasesRes.ok) {
      const releasesData = await releasesRes.json();
      if (Array.isArray(releasesData)) {
        let apkTotal = 0;
        releasesData.forEach((rel) => {
          if (Array.isArray(rel.assets)) {
            rel.assets.forEach((asset: { name?: string; download_count?: number }) => {
              if (asset.name?.endsWith(".apk") && typeof asset.download_count === "number") {
                apkTotal += asset.download_count;
              }
            });
          }
        });
        if (apkTotal > 0) {
          downloads = apkTotal;
        }
      }
    }

    return NextResponse.json(
      {
        stars: stars ?? fallback.stars,
        starsFormatted: stars !== null ? `${formatCount(stars)} stars` : fallback.starsFormatted,
        downloads: downloads ?? fallback.downloads,
        downloadsFormatted: downloads !== null ? `${formatCount(downloads)} downloads` : fallback.downloadsFormatted,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch {
    return NextResponse.json(fallback, { status: 200 });
  }
}
