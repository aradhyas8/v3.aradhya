"use client";

import { useEffect, useState } from "react";

type LiveStatsProps = {
  repo: string;
  defaultStars: string;
  defaultDownloads: string;
  stargazersUrl: string;
  releasesUrl: string;
};

export default function LiveStats({
  repo,
  defaultStars,
  defaultDownloads,
  stargazersUrl,
  releasesUrl,
}: LiveStatsProps) {
  const [stars, setStars] = useState(defaultStars);
  const [downloads, setDownloads] = useState(defaultDownloads);

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `gh_stats_${repo}`;

    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        // 15-minute client-side session cache
        if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
          if (parsed.starsFormatted) setStars(parsed.starsFormatted);
          if (parsed.downloadsFormatted) setDownloads(parsed.downloadsFormatted);
          return;
        }
      }
    } catch {
      // Ignore session storage errors
    }

    fetch(`/api/github-stats?repo=${encodeURIComponent(repo)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data) return;
        if (data.starsFormatted) setStars(data.starsFormatted);
        if (data.downloadsFormatted) setDownloads(data.downloadsFormatted);

        try {
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ ...data, timestamp: Date.now() })
          );
        } catch {
          // Ignore session storage write errors
        }
      })
      .catch(() => {
        // Gracefully keep defaults on fetch error
      });

    return () => {
      isMounted = false;
    };
  }, [repo]);

  return (
    <div className="project-stats" aria-label="Live project metrics">
      <a
        className="stat-pill stat-pill-star"
        href={stargazersUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={stars}
      >
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
        </svg>
        <span>{stars}</span>
      </a>
      <a
        className="stat-pill stat-pill-download"
        href={releasesUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={downloads}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 2.5v8m-3.5-3.5L8 10.5l3.5-3.5M3 13.5h10" />
        </svg>
        <span>{downloads}</span>
      </a>
    </div>
  );
}
