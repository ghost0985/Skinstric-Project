import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styling/Summary.css";
import LeftDiamond from "../assets/RightArrow.png";
import RightDiamond from "../assets/LeftArrow.png";

function safeArr(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => {
    const label = item.label ?? item.lable ?? "--";
    const value = Number(item.value ?? item.Value ?? 0);
    return { label, value: Math.round(value) };
  });
}

function sortAges(arr) {
  if (!arr) return [];
  return [...arr].sort((a, b) => {
    if (a.label.endsWith("+")) return 1;
    if (b.label.endsWith("+")) return -1;
    const getStart = (label) => {
      if (!label) return 9999;
      const m = label.match(/^(\d+)/);
      return m ? parseInt(m[1], 10) : 9999;
    };
    return getStart(a.label) - getStart(b.label);
  });
}

const TABS = [
  { key: "race", label: "RACE", sideLabel: "RACE" },
  { key: "age", label: "AGE", sideLabel: "AGE" },
  { key: "gender", label: "SEX", sideLabel: "SEX" },
];

export default function Summary() {
  const [data, setData] = useState({ race: [], age: [], gender: [] });
  const [selectedTab, setSelectedTab] = useState("race");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const local = localStorage.getItem("skinstric-analysis");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        setData({
          race: safeArr(parsed.race),
          age: sortAges(safeArr(parsed.age)),
          gender: safeArr(parsed.gender),
        });
      } catch {
        setData({ race: [], age: [], gender: [] });
      }
    } else {
      setData({ race: [], age: [], gender: [] });
    }
    setSelectedTab("race");
    setSelectedIndex(0);
    setLoading(false);
  }, [location]);

  const tabData = data[selectedTab] || [];
  const mainValue = tabData[selectedIndex] || null;
  let mainLabel = mainValue ? mainValue.label : "--";
  if (selectedTab === "age" && mainValue) mainLabel += " y.o.";

  const tabHeaders = {
    race: ["RACE", "A.I. CONFIDENCE"],
    age: ["AGE", "A.I. CONFIDENCE"],
    gender: ["SEX", "A.I. CONFIDENCE"],
  };

  if (loading) return <div className="summary-page">Loading...</div>;
  if (!mainValue) return <div className="summary-page">No data found.</div>;

  return (
    <div className="summary-page">
      <header className="header">
        <div>
          <Link to="/" className="skinstric-link">
            <span className="skinstric-bold">SKINSTRIC</span>
          </Link>
          <span className="landing-intro">[ INTRO ]</span>
          <div className="summary-subtitle">A.I. ANALYSIS</div>
          <div className="summary-demo">DEMOGRAPHICS</div>
          <div className="summary-subtext">PREDICTED RACE & AGE</div>
        </div>
        <button className="landing-code-btn">ENTER CODE</button>
      </header>

      <main className="summary-main-grid">
        <nav className="summary-side-panel" aria-label="Select analysis category">
          {TABS.map((tab) => (
            <div
              key={tab.key}
              className={`summary-side-block${selectedTab === tab.key ? " active" : ""}`}
              tabIndex={0}
              role="button"
              aria-pressed={selectedTab === tab.key}
              onClick={() => {
                setSelectedTab(tab.key);
                setSelectedIndex(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedTab(tab.key);
                  setSelectedIndex(0);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="summary-main-label">
                {(data[tab.key][0] && data[tab.key][0].label) || "--"}
              </div>
              <div className="summary-side-type">{tab.sideLabel}</div>
            </div>
          ))}
        </nav>

        <section className="summary-center-content">
          <div className={"summary-center-title" + (selectedTab === "gender" ? " center-title-uppercase" : "")}>
            {mainLabel}
          </div>
          <div className="summary-donut-wrapper">
            <Donut value={mainValue.value} />
          </div>
          <div className="center-bottom-text">
            If A.I. estimate is wrong, select the correct one.
          </div>
        </section>

        <aside className="summary-table-panel">
          <div className="summary-table-head">
            <span>{tabHeaders[selectedTab][0]}</span>
            <span>{tabHeaders[selectedTab][1]}</span>
          </div>
          <div className="summary-table-body">
            {tabData.map((item, i) => (
              <div
                key={`${item.label}-${i}`}
                className={`summary-table-row${i === selectedIndex ? " selected" : ""}`}
                onClick={() => setSelectedIndex(i)}
                tabIndex={0}
                aria-pressed={i === selectedIndex}
                role="button"
                style={{ cursor: "pointer" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedIndex(i);
                }}
              >
                <span className="summary-race">
                  <span className="bullet">
                    <span className={`diamond-indaction${i === selectedIndex ? " selected" : ""}`}>
                      <span className="inner-diamond-gap">
                        {i === selectedIndex && <span className="inner-indaction-diamond"></span>}
                      </span>
                    </span>
                  </span>
                  <span className={"summary-label" + (selectedTab === "gender" ? " uppercase-gender-label" : "")}>
                    {item.label}
                  </span>
                </span>
                <span className="summary-confidence">{Number.isFinite(item.value) ? item.value : 0}%</span>
              </div>
            ))}
          </div>
        </aside>
      </main>

      <Link to="/Select" className="back-btn">
        <span className="Back-btn-wrapper">
          <img src={LeftDiamond} alt="Left Diamond" className="Back-diamond-icon" />
        </span>
        <span className="back-text">BACK</span>
      </Link>
      <Link to="/" className="select-next-btn">
        <span className="next-text">Home</span>
        <span className="Back-btn-wrapper">
          <img src={RightDiamond} alt="Right" className="Back-diamond-icon" />
        </span>
      </Link>
    </div>
  );
}

function Donut({ value }) {
  let percent = Math.round(Number(value));
  if (!Number.isFinite(percent) || percent < 0) percent = 0;
  const radius = 200;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = circumference * (1 - percent / 100);

  return (
    <svg width={radius * 2} height={radius * 2} className="summary-donut" aria-label={`Confidence: ${percent}%`}>
      <circle
        className="donut-bg"
        stroke="#d7d7d7"
        fill="none"
        strokeWidth={stroke}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
      />
      <circle
        className="donut-fg"
        stroke="#232323"
        fill="none"
        strokeWidth={stroke}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        strokeDasharray={circumference}
        strokeDashoffset={progress}
        strokeLinecap="butt"
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".1em" className="summary-donut-text">
        {percent}%
      </text>
    </svg>
  );
}
