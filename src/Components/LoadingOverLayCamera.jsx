import React, { useEffect, useState } from "react";
import camera from "../assets/camera.png";
import "../Styling/LoadingOverlayCamera.css";
import { useNavigate } from "react-router-dom";

export default function CameraLoadingOverlay() {
  const totalSteps = 10;
  const totalDuration = 3500;
  const stepDuration = totalDuration / totalSteps;
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setStep(0);
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < totalSteps) {
          return prev + 1;
        } else {
          clearInterval(interval);
          navigate("/CameraCapture");
          return prev;
        }
      });
    }, stepDuration);
    return () => clearInterval(interval);
  }, [navigate, stepDuration, totalSteps]);

  const widthPercent = 100 - (step / totalSteps) * 100;

  return (
    <div className="camera-loading-overlay">
      <div className="loading-diamond-stack">
        <div className="loading-diamond loading-diamond1"></div>
        <div className="loading-diamond loading-diamond2"></div>
        <div className="loading-diamond loading-diamond3"></div>
        <div className="camera-loading-center-content">
          <img
            className="camera-loading-center-img camera-fade"
            src={camera}
            alt="camera-logo"
          />
          <div
            className="camera-loading-center-text camera-fade"
          >
            SETTING UP CAMERA ...
          </div>
        </div>
      </div>
      <div className="camera-loading-hints">
        TO GET BETTER RESULTS MAKE SURE TO HAVE
        <br />
        <span className="camera-loading-points">
          <span>◇NEUTRAL EXPRESSION</span>
          <span>◇FRONTAL POSE</span>
          <span>◇ADEQUATE LIGHTING</span>
        </span>
      </div>
      <div className="camera-loading-bar-outer">
        <div
          className="camera-loading-bar-inner camera-loading-bar-step"
          style={{ width: `${widthPercent}%` }}
        ></div>
      </div>
    </div>
  );
}
