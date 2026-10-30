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
        if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
          if (parsed.starsFormatted) setStars(parsed.starsFormatted);
          if (parsed.downloadsFormatted) setDownloads(parsed.downloadsFormatted);
          return;
        }
      }
    } catch {
      // Ignore sessionStorage unavailability
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
          // Ignore storage quota
        }
      })
      .catch(() => {
        // Fallback remains active
      });

    return () => {
      isMounted = false;
    };
  }, [repo]);

  const starsCount = stars.replace(/\s*stars?$/i, "");
  const downloadsCount = downloads.replace(/\s*downloads?$/i, "");

  return (
    <div className="stage-stats-badge" aria-label="GitHub stars and downloads">
      <a
        className="stage-stat-item"
        href={stargazersUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`${starsCount} stars on GitHub`}
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
        </svg>
        <span>{starsCount}</span>
      </a>
      <span className="stage-stat-sep" aria-hidden="true">•</span>
      <a
        className="stage-stat-item"
        href={releasesUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`${downloadsCount} total APK downloads`}
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 2v8.5m-3.5-3.5L8 10.5l3.5-3.5M3 13.5h10" />
        </svg>
        <span>{downloadsCount}</span>
      </a>
    </div>
  );
}
