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
        // 15-minute client session cache
        if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
          if (parsed.starsFormatted) setStars(parsed.starsFormatted);
          if (parsed.downloadsFormatted) setDownloads(parsed.downloadsFormatted);
          return;
        }
      }
    } catch {
      // Ignore sessionStorage errors
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
          // Ignore storage errors
        }
      })
      .catch(() => {
        // Keep fallback values
      });

    return () => {
      isMounted = false;
    };
  }, [repo]);

  return (
    <div className="work-stats-row" aria-label="Plume repository statistics">
      <a
        className="work-stat-item"
        href={stargazersUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`${stars} on GitHub`}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
        <span>{stars}</span>
      </a>
      <span className="work-stat-dot" aria-hidden="true">•</span>
      <a
        className="work-stat-item"
        href={releasesUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`${downloads} total APK downloads`}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 2v8.5m-3.5-3.5L8 10.5l3.5-3.5M3 13.5h10" />
        </svg>
        <span>{downloads}</span>
      </a>
    </div>
  );
}
