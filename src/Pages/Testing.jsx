import React, { useState } from "react";
import LeftDiamond from "../assets/RightArrow.png";
import RightDiamond from "../assets/LeftArrow.png";
import "../Styling/Testing.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = `https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne`;

const Testing = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [proceedReady, setProceedReady] = useState(false);

  const navigate = useNavigate();

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step === 1 && name.trim()) {
        setStep(2);
      } else if (step === 2 && location.trim()) {
        await handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    setProcessing(true);
    setProceedReady(false);
    try {
      const res = await axios.post(API_URL, {
        name,
        location,
      });
    } catch (err) {
      setApiResponse({
        error: err?.response?.data || "Error connecting to API...",
      });
    }
    setTimeout(() => {
      setProcessing(false);
      setProceedReady(true);
    }, 2500);
  };

  const handleProceed = () => {
    navigate("/Results");
  };

  return (
    <div className="Test-container">
      <div className="header">
        <div>
          <Link to="/" className="skinstric-link">
            <span className="skinstric-bold">SKINSTRIC</span>
          </Link>
          <span className="landing-intro">[ INTRO ]</span>
          <div className="Test-subtitle">TO START ANALYSIS</div>
        </div>
        <button className="landing-code-btn">ENTER CODE</button>
      </div>

      <div className="testing-diamond-stack">
        <div className="testing-diamond testing-diamond1"></div>
        <div className="testing-diamond testing-diamond2"></div>
        <div className="testing-diamond testing-diamond3"></div>
      </div>

      <div className="Test-center">
        {!processing && !proceedReady && (
          <>
            <div className="Test-small">CLICK TO TYPE</div>
            <div className="Test-headline">
              {step === 1 ? (
                <input
                  className="Test-input"
                  value={name}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z]/g, "");
                    setName(value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Introduce Yourself"
                  disabled={processing}
                  autoFocus
                />
              ) : step === 2 ? (
                <input
                  className="Test-input"
                  value={location}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z]/g, "");
                    setLocation(value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Your city name"
                  disabled={processing}
                  autoFocus
                />
              ) : null}
            </div>
          </>
        )}

        {processing && (
          <div className="processing-block">
            <div className="processing-text">Processing Submission</div>
            <div className="dot-loader">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
          </div>
        )}

        {proceedReady && (
          <div className="thank-you-block">
            <div className="thank-you-text">Thank you!</div>
            <div className="thank-you-next">Proceed for the next step</div>
          </div>
        )}
      </div>

      <Link to="/" className="back-btn">
        <span className="Back-btn-wrapper">
          <img
            src={LeftDiamond}
            alt="Left Diamond"
            className="Back-diamond-icon"
          />
        </span>
        <span className="back-text">BACK</span>
      </Link>

      {proceedReady && (
        <button
          to="/Results"
          key="process-btn"
          className="test-proceed-btn"
          onClick={handleProceed}
          disabled={processing}
          type="button"
        >
          <span className="proceed-text">PROCEED</span>
          <span className="Back-btn-wrapper">
            <img src={RightDiamond} alt="Proceed" />
          </span>
        </button>
      )}
    </div>
  );
};

export default Testing;
