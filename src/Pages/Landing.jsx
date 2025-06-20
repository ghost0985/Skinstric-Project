import React, { useState } from "react";
import LeftDiamond from "../assets/LeftArrow.png";
import RightDiamond from "../assets/RightArrow.png";
import "../Styling/Landing.css";

const LandingPage = () => {
  const [headlinePosition, setHeadlinePosition] = useState("center");

  return (
    <div className="landing-container">
      <svg
        className="side-chevron left-chevron"
        width="38vw"
        height="100vh"
        viewBox="0 0 180 100"
        aria-hidden="true"
      >
        <polyline
          points="0,-30 80,50 0,130"
          stroke="#bbb"
          strokeWidth="0.2"
          fill="none"
        />
      </svg>
      <div className="chevron-content left-chevron-content">
        <button
          className={`side-btn${
            headlinePosition === "left" ? " sine-btn-hidden" : ""
          }`}
          onMouseEnter={() => setHeadlinePosition("right")}
          onMouseLeave={() => setHeadlinePosition("center")}
        >
          <span className="diamond-wrap">
            <img
              src={RightDiamond}
              alt="Right Diamond"
              className="diamond-icon"
            />
          </span>
          <span className="landing-side-text">DISCOVER A.I.</span>
        </button>
      </div>

      <svg
        className="side-chevron right-chevron"
        width="38vw"
        height="100vh"
        viewBox="0 0 180 100"
        aria-hidden="true"
      >
        <polyline
          points="180,-30 100,50 180,130"
          stroke="#bbb"
          strokeWidth="0.2"
          fill="none"
        />
      </svg>
      <div className="chevron-content right-chevron-content">
        <button
          className={`side-btn${
            headlinePosition === "right" ? " side-btn-hidden" : ""
          }`}
          onMouseEnter={() => setHeadlinePosition("left")}
          onMouseLeave={() => setHeadlinePosition("center")}
        >
          <span className="landing-side-text">TAKE TEST</span>
          <span className="diamond-wrap">
            <img
              src={LeftDiamond}
              alt="Left Diamond"
              className="diamond-icon"
            />
          </span>
        </button>
      </div>

      <div className="landing-header">
        <div className="landing-logo">
          <span className="skinstric-bold">SKINSTRIC</span>
          <span className="landing-intro">[ INTRO ]</span>
        </div>
        <button className="landing-code-btn">ENTER CODE</button>
      </div>

      <div className="landing-main">
        <h1
          className={
            headlinePosition === "center"
              ? ""
              : headlinePosition === "left"
              ? "move-left"
              : "move-right"
          }
        >
          Sophisticated <br />
          skincare
        </h1>
      </div>

      <div className="landing-desc">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br />
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO <br />
        WHAT YOUR SKIN NEEDS.
      </div>
    </div>
  );
};

export default LandingPage;
