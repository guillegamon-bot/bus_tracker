"use client";

import { useEffect, useState } from "react";

type Departure = { id: string; line: string; destination: string; minutes: number };

const demoDepartures: Departure[] = [
  { id: "m36a", line: "M36", destination: "WESTBAHNHOF", minutes: 4 },
  { id: "30a", line: "30", destination: "UNFALLKLINIK", minutes: 9 },
  { id: "m36b", line: "M36", destination: "WESTBAHNHOF", minutes: 16 },
  { id: "30b", line: "30", destination: "UNFALLKLINIK", minutes: 23 },
];

function clockText(date: Date) {
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function DepartureBoard({ compact = false, now }: { compact?: boolean; now: Date }) {
  return (
    <section className={`board ${compact ? "board-compact" : ""}`} aria-label="Departure board">
      {!compact && <div className="board-topline"><span>HALTESTELLE / 0183</span><span>FRANKFURT AM MAIN</span></div>}
      <div className="column-head"><span>LINIE</span><span>FAHRTRICHTUNG</span><span className="departure-label">ABFAHRT</span></div>
      {demoDepartures.slice(0, compact ? 3 : 4).map((d) => (
        <div className="departure-row" key={d.id}>
          <div className="line-number">{d.line}</div>
          <div className="destination"><strong>{d.destination}</strong>{!compact && <small>BUS · ELISABETHENSTRASSE</small>}</div>
          <div className="minutes"><strong>{String(d.minutes).padStart(2, "0")}</strong><small>MIN</small></div>
        </div>
      ))}
      <div className="board-footer"><span className="live"><i /> DEMO-DATEN</span><span>AKTUALISIERT {clockText(now)}</span></div>
    </section>
  );
}

export default function Home() {
  const [now, setNow] = useState<Date | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const time = now ? clockText(now) : "--:--";

  return (
    <main className="page">
      <nav className="masthead"><span className="masthead-mark">BP<span>—</span>01</span><span>PERSONAL TRANSIT DISPLAY</span><span>FRANKFURT / DE</span></nav>
      <header className="page-header">
        <div className="header-copy">
          <div className="kicker"><span className="kicker-line" /> YOUR DAILY DEPARTURES</div>
          <h1>Elisabethenstraße<span className="title-period">.</span></h1>
          <p className="subheading">A small, personal departure board for the way home.</p>
        </div>
        <div className="clock-block"><span className="clock-label">LOCAL TIME</span><time className="clock">{time}</time><span className="clock-city">FRANKFURT AM MAIN</span></div>
      </header>
      <div className="section-rule"><span>01 / DEPARTURES</span><span>LINES M36 + 30</span></div>
      <div className="layout">
        <section className="main-panel" aria-label="Departures at Elisabethenstraße">
          {now && <DepartureBoard now={now} />}
          <div className="caption-row"><span>ELISABETHENSTRASSE</span><span>DEMO DATA · NOT LIVE</span></div>
        </section>
        <aside className="widget-column">
          <div className="widget-heading"><div><div className="kicker"><span className="kicker-line" /> FUTURE IOS WIDGET</div><h2>At a glance<span className="title-period">.</span></h2></div><span className="preview-label">CONCEPT / 01</span></div>
          <div className="phone-widget-wrap"><div className="phone-widget"><div className="phone-widget-top"><span>ELISABETHENSTR.</span><span>{time}</span></div>{now && <DepartureBoard compact now={now} />}</div></div>
          <p className="widget-caption">A compact version of the same board, designed as a reference for the future iOS home-screen widget.</p>
          <button className="info-button" onClick={() => setShowInfo((v) => !v)} aria-expanded={showInfo}><span>{showInfo ? "−" : "+"}</span>{showInfo ? "CLOSE PROJECT NOTES" : "OPEN PROJECT NOTES"}</button>
          {showInfo && <div className="project-notes"><p><b>Routes</b><span>M36 → Westbahnhof<br />30 → Unfallklinik</span></p><p><b>Data</b><span>Sample departures only. No live RMV connection yet.</span></p><p><b>Next step</b><span>Identify the stop ID and verify an available real-time departure feed.</span></p></div>}
        </aside>
      </div>
      <footer className="page-footer"><span>BUS PANEL <b>—</b> VERSION 0.2</span><span>CONCEPT IN PROGRESS / LIVE DATA NOT CONNECTED</span></footer>
    </main>
  );
}
