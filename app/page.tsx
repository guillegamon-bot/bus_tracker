"use client";

import { useEffect, useState } from "react";

type Departure = {
  id: string;
  line: string;
  destination: string;
  minutes: number;
  route: string;
};

const demoDepartures: Departure[] = [
  { id: "m36a", line: "M36", destination: "WESTBAHNHOF", minutes: 4, route: "M36 → Westbahnhof" },
  { id: "30a", line: "30", destination: "UNFALLKLINIK", minutes: 9, route: "30 → Unfallklinik" },
  { id: "m36b", line: "M36", destination: "WESTBAHNHOF", minutes: 16, route: "M36 → Westbahnhof" },
  { id: "30b", line: "30", destination: "UNFALLKLINIK", minutes: 23, route: "30 → Unfallklinik" }
];

function DepartureBoard({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState(new Date());
  const [departures, setDepartures] = useState(demoDepartures);

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    // Demo-only simulation: the minutes tick down locally; this is not live transit data.
    const countdown = window.setInterval(() => {
      setDepartures((current) =>
        current.map((d) => ({ ...d, minutes: d.minutes > 0 ? d.minutes - 1 : 0 }))
      );
    }, 60000);
    return () => {
      window.clearInterval(clock);
      window.clearInterval(countdown);
    };
  }, []);

  return (
    <section className={`board ${compact ? "board-compact" : ""}`} aria-label="Departure board">
      {!compact && (
        <div className="board-topline">
          <span>ELISABETHENSTRASSE</span>
          <span>FRANKFURT AM MAIN</span>
        </div>
      )}
      <div className="column-head">
        <span>LINE</span>
        <span>DIRECTION</span>
        <span className="departure-label">DEPARTURE</span>
      </div>
      {departures.slice(0, compact ? 3 : 4).map((d, i) => (
        <div className="departure-row" key={d.id}>
          <div className="line-number">{d.line}</div>
          <div className="destination">
            <strong>{d.destination}</strong>
            {!compact && <small>BUS</small>}
          </div>
          <div className="minutes">
            <strong>{d.minutes}</strong><small>MIN</small>
          </div>
          {!compact && <span className="row-index">{String(i + 1).padStart(2, "0")}</span>}
        </div>
      ))}
      <div className="board-footer">
        <span className="live"><i /> DEMO</span>
        <span>UPDATED {now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </section>
  );
}

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <main className="page">
      <div className="eyebrow">PERSONAL TRANSIT DISPLAY / FRANKFURT</div>
      <header className="page-header">
        <div>
          <div className="kicker">NOW DEPARTING</div>
          <h1>Elisabethenstraße</h1>
        </div>
        <div className="clock">
          {new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </header>

      <div className="layout">
        <div className="main-panel">
          <DepartureBoard />
          <div className="caption-row">
            <span>01 — YOUR STOP</span>
            <span>M36 / 30 · CHRONOLOGICAL</span>
          </div>
        </div>

        <aside className="widget-column">
          <div className="widget-heading">
            <div>
              <div className="kicker">HOME SCREEN CONCEPT</div>
              <h2>Widget</h2>
            </div>
            <span className="preview-label">PREVIEW</span>
          </div>
          <div className="widget-frame">
            <DepartureBoard compact />
          </div>
          <p className="widget-caption">Next departures, in a compact format.</p>
          <button className="info-button" onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? "HIDE PROJECT NOTES −" : "PROJECT NOTES +"}
          </button>
          {showInfo && (
            <div className="project-notes">
              <p><b>Lines</b> M36 → Westbahnhof · 30 → Unfallklinik</p>
              <p><b>Data</b> Sample departures only. No RMV connection yet.</p>
              <p><b>Next</b> Verify the stop ID and available real-time feed.</p>
            </div>
          )}
        </aside>
      </div>
      <footer className="page-footer">
        <span>BUS PANEL / VERSION 0.1</span>
        <span>DEMO DATA — NOT LIVE DEPARTURES</span>
      </footer>
    </main>
  );
}
