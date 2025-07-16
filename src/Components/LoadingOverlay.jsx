import React from "react";
import "../Styling/LoadingOverlay.css";

export default function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loading-diamond-stack">
        <div className="loading-diamond loading-diamond1"></div>
        <div className="loading-diamond loading-diamond2"></div>
        <div className="loading-diamond loading-diamond3"></div>
      </div>
      <div className="loading-message">
        PREPARING YOUR ANALYSIS
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
