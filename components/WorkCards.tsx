import CardMotion from "@/components/CardMotion";
import LiveStats from "@/components/LiveStats";
import { projects } from "@/components/projects";

type Link = { label: string; href: string };

type CardItem = {
  name: string;
  desc: string;
  links: Link[];
  status?: string;
  liveStats?: {
    repo: string;
    defaultStars: string;
    defaultDownloads: string;
    stargazersUrl: string;
    releasesUrl: string;
  };
  stage: React.ReactNode;
};

// Selected Work: three equal cards per row. Each stage shows the product doing its one thing, rebuilt as UI
// so it stays sharp at any size; the last card lists the rest of the archive.
// Every stage is finished at rest. CardMotion plays its story on scroll-in and hover (see .work-card in portfolio.css).
const selected: CardItem[] = [
  {
    name: "Alder",
    desc: "Custom Android TV client for Stremio with smart stream selection.",
    links: [{ label: "GitHub", href: "https://github.com/aradhyas8/Alder" }],
    stage: <AlderStage />,
  },
  {
    name: "Plume",
    desc: "Minimal, ad-free Android TV launcher with zero bloat.",
    links: [
      { label: "Website", href: "#" },
      { label: "GitHub", href: "https://github.com/aradhyas8/Plume_Launcher" },
    ],
    liveStats: {
      repo: "aradhyas8/Plume_Launcher",
      defaultStars: "280+ stars",
      defaultDownloads: "7.8k downloads",
      stargazersUrl: "https://github.com/aradhyas8/Plume_Launcher/stargazers",
      releasesUrl: "https://github.com/aradhyas8/Plume_Launcher/releases",
    },
    stage: <PlumeStage />,
  },
  {
    name: "Hushfield",
    desc: "Ambient audio for sleep, focus and quiet.",
    links: [
      { label: "iOS", href: "https://apps.apple.com/app/id6802781534" },
      { label: "Android", href: "https://play.google.com/store/apps/details?id=com.inethan18.hushfield" },
    ],
    stage: <HushfieldStage />,
  },
  {
    name: "QueryIO",
    desc: "Context engine for your AI agents.",
    links: [{ label: "Try QueryIO", href: "https://queryiomcp.vercel.app/" }],
    stage: <QueryIOStage />,
  },
  {
    name: "PageMind",
    desc: "Read and understand research papers with AI.",
    links: [{ label: "Try PageMind", href: "https://www.pagemind.app" }],
    stage: <PageMindStage />,
  },
];

const others = projects
  .filter((p) => !selected.some((s) => s.name === p.name))
  .sort((a, b) => Number(b.year) - Number(a.year));

function AlderStage() {
  return (
    <div className="stage stage-alder">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative cover inside an aria-hidden stage */}
      <img src="/static/Images/alder-cover.webp" alt="" loading="lazy" />
    </div>
  );
}

function PlumeStage() {
  return (
    <div className="stage stage-plume">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative cover inside an aria-hidden stage */}
      <img src="/static/Images/plume-cover.jpg" alt="" loading="lazy" />
    </div>
  );
}

function HushfieldStage() {
  return (
    <div className="stage stage-hush">
      <div className="hush-scene" />
      <div className="hush-rain" />
      <div className="hush-shade" />
      <div className="hush-phone">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative screenshot inside an aria-hidden stage */}
        <img src="/static/Images/hushfield/home.jpg" alt="" loading="lazy" />
      </div>
      <div className="hush-np">
        <span className="hush-eq"><i /><i /><i /><i /></span>
        <span>Corner Table, Rain Outside<small>Café murmur and rain</small></span>
      </div>
    </div>
  );
}

// The product's investigate panel: an agent answering a support case from real rows.
function QueryIOStage() {
  return (
    <div className="stage stage-qio">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative cover inside an aria-hidden stage */}
      <img src="/static/Images/queryio-cover.png" alt="" loading="lazy" />
    </div>
  );
}

function PageMindStage() {
  return (
    <div className="stage stage-pm">
      <div className="pm-ui">
        <div className="pm-doc">
          <h4>The Apology and Crito</h4>
          <p><mark>The most important of them was Plato, who founded the Academy</mark> and recorded his teacher&apos;s trial in the Apology.</p>
          <p>Charged with impiety and with corrupting the young, Socrates chose to defend himself before a jury of five hundred citizens.</p>
        </div>
        <div className="pm-chat">
          <p className="pm-q">In one sentence, who was Plato?</p>
          <p className="pm-a"><span className="pm-stream">Socrates&apos; student, who founded the Academy.</span> <span className="pm-src">p. 2</span></p>
          <p className="pm-typing"><i /><i /><i /></p>
        </div>
      </div>
    </div>
  );
}

// The list is rendered twice so the scroll loop can wrap without a seam.
function ArchiveStage() {
  const rows = (pass: number) => others.map((p) => (
    <li key={`${pass}-${p.name}`}><span className="arc-y">{p.year}</span><span className="arc-n">{p.name}</span></li>
  ));
  return (
    <div className="stage stage-arc">
      <div className="arc-ledger"><ol>{rows(1)}{rows(2)}</ol></div>
    </div>
  );
}

// The name links to the card's main destination and its hit area covers the whole card; secondary links sit above it.
function WorkCard({ name, desc, links, status, liveStats, stage }: CardItem) {
  // If the first link is a placeholder like '#', prioritize the next real link for the card click target
  const primary = links.find((l) => l.href && l.href !== "#") ?? links[0];
  const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});
  return (
    <li className="work-card" data-reveal="up">
      <div className="stage-frame" aria-hidden="true">
        {stage}
        <div className="stage-spot" />
      </div>
      <div className="work-cap">
        <div className="work-cap-top">
          <h3 className="work-name">{primary ? <a href={primary.href} {...ext(primary.href)}>{name}</a> : name}</h3>
          {status ? <span className="project-status"><span className="live-dot" aria-hidden="true" />{status}</span> : null}
          {liveStats ? <LiveStats {...liveStats} /> : null}
        </div>
        <p className="work-desc">{desc}</p>
        <p className="work-links">
          {links.map((l) => (
            <a key={l.label + l.href} className="text-link" href={l.href} {...ext(l.href)}>
              {l.label}
            </a>
          ))}
        </p>
      </div>
    </li>
  );
}

export default function WorkCards() {
  return (
    <>
      <ol className="work-grid">
        {selected.map((p) => <WorkCard key={p.name} {...p} />)}
        <WorkCard
          name="More projects"
          desc={`${others.length} more, from ${others[others.length - 1].year} to now.`}
          links={[{ label: "Project archive", href: "/project_archive" }]}
          stage={<ArchiveStage />}
        />
      </ol>
      <CardMotion />
    </>
  );
}
