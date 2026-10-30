import { NextResponse } from "next/server";

export const revalidate = 1800; // Cache on server for 30 minutes

function formatCount(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get("repo") || "aradhyas8/Plume_Launcher";

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-github-stats-fetcher",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [repoRes, releasesRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}`, {
        headers,
        next: { revalidate: 1800 },
      }),
      fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, {
        headers,
        next: { revalidate: 1800 },
      }),
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
        stars,
        starsFormatted: stars !== null ? `${formatCount(stars)} stars` : "280+ stars",
        downloads,
        downloadsFormatted: downloads !== null ? `${formatCount(downloads)} downloads` : "7.8k downloads",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        stars: 280,
        starsFormatted: "280+ stars",
        downloads: 7780,
        downloadsFormatted: "7.8k downloads",
      },
      { status: 200 }
    );
  }
}
