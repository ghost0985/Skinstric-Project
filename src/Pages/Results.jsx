import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeftDiamond from "../assets/RightArrow.png";
import GalleryPicker from "../Components/GalleryPicker";
import CameraPicker from "../Components/CameraPicker";
import "../Styling/Results.css";
import LoadingOverlay from "../Components/LoadingOverlay";
import LoadingOverLayCamera from "../Components/LoadingOverLayCamera";
import axios from "axios";
import CameraBox from "../Components/CameraBox";

async function uploadImageBase64(base64String) {
  const url =
    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";
  return axios.post(url, { image: base64String });
}

export default function Results() {
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const successTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const [showCameraPermission, setShowCameraPermission] = useState(false);

  const closeSuccess = () => {
    setShowSuccess(false);
    setLoading(false);
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    navigate("/Select");
  };

  if (cameraLoading) {
    return <LoadingOverLayCamera />;
  }

  return (
    <div className="Results-container">
      {(loading || showSuccess) && <LoadingOverlay />}
      {showSuccess && (
        <div className="custom-alert-overlay">
          <div className="custom-alert-box">
            <div className="custom-alert-title">skinstric says</div>
            <div className="custom-alert-message">
              Image analyzed successfully!
            </div>
            <button className="custom-alert-btn" onClick={closeSuccess}>
              OK
            </button>
          </div>
        </div>
      )}

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

      <div className="results-preview-block">
        <div className="results-preview-label">Preview</div>
        <div className="results-preview-box">
          {previewImg && (
            <img
              src={previewImg}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "2px",
              }}
            />
          )}
        </div>
      </div>

      <div className="center-row">
        <div className="results-diamond-card">
          <div className="diamond-stack-results">
            <div className="diamond-results results-diamond1"></div>
            <div className="diamond-results results-diamond2"></div>
            <div className="diamond-results results-diamond3"></div>
          </div>
          <div className="icon-and-arrow">
            <div className="icon-circle">
              <CameraPicker onClick={() => setShowCameraPermission(true)} />
            </div>
            <svg
              className="card-arrow camera"
              width="320"
              height="480"
              viewBox="-20 0 320 480"
              style={{ position: "absolute", left: "150px", top: "48px" }}
            >
              <line x1="70" y1="115" x2="130" y2="60" />
              <circle cx="130" cy="60" r="4" />
            </svg>
            <div
              className="card-label camera"
            >
              ALLOW A.I.
              <br />
              TO SCAN YOUR FACE
            </div>
          </div>
        </div>

        <div
          className={`results-diamond-card${
            showCameraPermission ? " dimmed" : ""
          }`}
        >
          <div className="diamond-stack-results">
            <div className="diamond-results results-diamond1"></div>
            <div className="diamond-results results-diamond2"></div>
            <div className="diamond-results results-diamond3"></div>
          </div>
          <div className="icon-and-arrow">
            <div
              className={`icon-circle${showCameraPermission ? " dimmed" : ""}`}
            >
              <GalleryPicker
                onFileSelected={(file) => {
                  if (file) {
                    setLoading(true);
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                      const base64String = reader.result;
                      setPreviewImg(base64String);
                      try {
                        const response = await uploadImageBase64(base64String);
                        const d = response.data.data;
                        function objectToSortedArray(obj) {
                          return Object.entries(obj)
                            .map(([label, value]) => ({
                              label,
                              value: +(value * 100).toFixed(2),
                            }))
                            .sort((a, b) => b.value - a.value);
                        }
                        const raceArray = objectToSortedArray(d.race);
                        const ageArray = objectToSortedArray(d.age);
                        const genderArray = objectToSortedArray(d.gender);
                        const summary = {
                          race: raceArray,
                          age: ageArray,
                          gender: genderArray,
                        };
                        localStorage.setItem(
                          "skinstric-analysis",
                          JSON.stringify(summary)
                        );
                        setShowSuccess(true);
                        successTimeoutRef.current = setTimeout(
                          closeSuccess,
                          6000
                        );
                      } catch (err) {
                        console.error("Failed to upload your pic:", err);
                        setLoading(false);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <svg
              className="card-arrow gallery"
              width="200"
              height="160"
              viewBox="0 0 200 160"
              style={{ position: "absolute", left: "20px", top: "205px" }}
            >
              <line x1="130" y1="20" x2="60" y2="90" />
              <circle cx="56" cy="93" r="4" />
            </svg>
            <div
              className="card-label gallery"
            >
              ALLOW A.I.
              <br />
              ACCESS GALLERY
            </div>
          </div>
        </div>
      </div>

      {showCameraPermission && (
        <CameraBox
          onAllow={() => {
            setShowCameraPermission(false);
            setCameraLoading(true);
          }}
          onDeny={() => setShowCameraPermission(false)}
        />
      )}

      <Link to="/Testing" className="back-btn">
        <span className="Back-btn-wrapper">
          <img
            src={LeftDiamond}
            alt="Left Diamond"
            className="Back-diamond-icon"
          />
        </span>
        <span className="back-text">BACK</span>
      </Link>
    </div>
  );
}
