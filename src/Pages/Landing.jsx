import React, { useEffect, useState } from "react";
import LeftDiamond from "../assets/LeftArrow.png";
import RightDiamond from "../assets/RightArrow.png";
import "../Styling/Landing.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [headlinePosition, setHeadlinePosition] = useState("center");
  const [mainVisable, setMainVisable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMainVisable(true), 350);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="landing-container">
      <svg
        className={`side-chevron left-chevron${
          headlinePosition === "left" ? " side-chevron-hidden" : ""
        }`}
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
            headlinePosition === "left" ? " side-btn-hidden" : ""
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
        className={`side-chevron right-chevron${
          headlinePosition === "right" ? " side-chevron-hidden" : ""
        }`}
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
        <Link
          to="/Testing"
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
        </Link>
      </div>

      <div className="header">
        <div className="landing-logo">
          <span className="skinstric-bold">SKINSTRIC</span>
          <span className="landing-intro">[ INTRO ]</span>
        </div>
        <button className="landing-code-btn">ENTER CODE</button>
      </div>

      <div
        className={`landing-main${mainVisable ? " landing-main-visable" : ""}`}
      >
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
          <span
            className={
              `headline-skincare` +
              (headlinePosition === "right"
                ? " skincare-move-left"
                : headlinePosition === "left"
                ? " skincare-move-right"
                : "")
            }
          >
            skincare
          </span>
        </h1>
      </div>

      <div className="landing-hero-mobile">
        <div className="diamond-outer">
          <div className="diamond-inner">
            <div className="hero-content">
              <div className="hero-headline">
                Sophisticated
                <br />
                skincare
              </div>
              <div className="hero-subtext">
                Skinstric developed an A.I. that creates a highly-personalized
                routine tailored to what your skin needs.
              </div>
              <Link to="/Testing" className="diamond-hero-btn">
                <span className="diamond-hero-btn-text">ENTER EXPERIENCE</span>
                <span className="diamond-hero-btn-icon">
                  <img src={LeftDiamond} alt="" />
                </span>
              </Link>
            </div>
          </div>
        </div>
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
