import React from "react";
import { Link } from "react-router-dom";
import "../Styling/Select.css";
import LeftDiamond from "../assets/RightArrow.png";
import RightDiamond from "../assets/LeftArrow.png";

export default function Select() {
  return (
    <div className="select-page">
      <div className="header">
        <div>
          <Link to="/" className="skinstric-link">
            <span className="skinstric-bold">SKINSTRIC</span>
          </Link>
          <span className="landing-intro">[ INTRO ]</span>
          <div className="Test-subtitle">A.I. ANALYSIS</div>
          <div className="select-subtext">
            A.I. HAS ESTIMATED THE FOLLOWING.
            <br />
            FIX ESTIMATED INFORMATION IF NEEDED.
          </div>
        </div>
        <button className="landing-code-btn">ENTER CODE</button>
      </div>

      <div className="diamond-border-wrap">
        <div className="diamond-matrix">
          <div class="diamond-center">
            <div class="diamond-grid-fixed">
              <Link to="/Summary" className="diamond-fixed diamond-top">
                <span>DEMOGRAPHICS</span>
              </Link>
              <div class="diamond-fixed diamond-left side-diamond">
                <span>
                  COSMETIC
                  <br />
                  CONCERNS
                </span>
              </div>
              <div class="diamond-fixed diamond-right side-diamond">
                <span>SKIN TYPE DETAILS</span>
              </div>
              <div class="diamond-fixed diamond-bottom">
                <span>WEATHER</span>
              </div>
              <div className="diamond-border-outline"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-row">
        <Link to="/Results" className="back-btn">
          <span className="Back-btn-wrapper">
            <img src={LeftDiamond} alt="Left" className="Back-diamond-icon" />
          </span>
          <span className="back-text">BACK</span>
        </Link>
        <Link to="/Summary" className="select-next-btn">
          <span className="next-text">GET SUMMARY</span>
          <span className="Back-btn-wrapper">
            <img src={RightDiamond} alt="Right" className="Back-diamond-icon" />
          </span>
        </Link>
      </div>
    </div>
  );
}
