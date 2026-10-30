import { NextResponse } from "next/server";

export const revalidate = 1800; // 30 minutes on server

function formatCount(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 10_000) {
    // 13k downloads to match GitHub release badges
    return Math.round(num / 1_000) + "k";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

const FALLBACKS: Record<string, { stars: number; downloads: number; starsFormatted: string; downloadsFormatted: string }> = {
  "aradhyas8/Alder": {
    stars: 143,
    downloads: 2641,
    starsFormatted: "143 stars",
    downloadsFormatted: "2.6k downloads",
  },
  "aradhyas8/Plume_Launcher": {
    stars: 288,
    downloads: 13281,
    starsFormatted: "288 stars",
    downloadsFormatted: "13k downloads",
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
    const fetchOptions: RequestInit =
      process.env.NODE_ENV === "development"
        ? { headers, cache: "no-store" }
        : { headers, next: { revalidate: 1800 } };

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
        let total = 0;
        releasesData.forEach((rel) => {
          if (Array.isArray(rel.assets)) {
            rel.assets.forEach((asset: { name?: string; download_count?: number }) => {
              if (typeof asset.download_count === "number") {
                total += asset.download_count;
              }
            });
          }
        });
        if (total > 0) {
          downloads = total;
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
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json(fallback, { status: 200 });
  }
}
