import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styling/CameraCapture.css";
import LeftArrowWhite from "../assets/LeftArrow-white.png";
import CameraWhite from "../assets/Camera-White.png";

export default function CameraCapture() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [capturedImg, setCapturedImg] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showAnalyzing, setShowAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    let stream;
    if (!photoTaken) {
      (async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: "user" },
          });
          document.querySelectorAll(".spotlight-video-shared").forEach((v) => {
            v.srcObject = stream;
          });
        } catch {
          setCameraError(true);
          setTimeout(() => {
            if (window.opener) {
              window.close();
            } else {
              navigate(-1);
            }
          }, 2500);
        }
      })();
      return () => {
        if (stream) stream.getTracks().forEach((t) => t.stop());
      };
    }
  }, [photoTaken, navigate]);

  const handleTakePicture = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    if (video.srcObject) video.srcObject.getTracks().forEach((track) => track.stop());
    setCapturedImg(dataUrl);
    setPhotoTaken(true);
  };

  const handleRetake = () => {
    setCapturedImg(null);
    setPhotoTaken(false);
    localStorage.removeItem("photoDataUrl");
    localStorage.removeItem("skinstric-analysis");
    localStorage.removeItem("photoResult");
  };

  function objToArr(obj) {
    if (!obj) return [];
    return Object.entries(obj).map(([label, value]) => ({
      label,
      value: Math.round(Number(value) * 100),
    }));
  }

  const handleProceed = async () => {
    if (!capturedImg) return;
    setIsSending(true);
    setShowAnalyzing(true);
    try {
      const base64Image = capturedImg.replace(/^data:image\/\w+;base64,/, "");
      const response = await axios.post(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        { image: base64Image },
        { headers: { "Content-Type": "application/json" } }
      );
      const result = response.data;
      localStorage.setItem("photoResult", JSON.stringify(result));
      localStorage.setItem("photoDataUrl", capturedImg);

      const data = result.data || {};
      const summary = {
        race: objToArr(data.race),
        age: objToArr(data.age),
        gender: objToArr(data.gender),
      };
      localStorage.setItem("skinstric-analysis", JSON.stringify(summary));

      setTimeout(() => {
        setShowAnalyzing(false);
        navigate("/Select");
      }, 2500);
    } catch {
      alert("Failed to upload your photo!");
      setIsSending(false);
      setShowAnalyzing(false);
    }
  };

  return (
    <div className="cameraPage">
      <div className="cameraArea">
        {!photoTaken ? (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="blurryVideo spotlight-video-shared" />
            <div className="sharpVideoWrapper">
              <video autoPlay playsInline muted className="sharpVideo spotlight-video-shared" />
            </div>
          </>
        ) : (
          <>
            <div className="greatShotBanner">GREAT SHOT!</div>
            <img
              src={capturedImg}
              alt="Taken"
              className="sharpVideo takenPhoto"
              style={{
                objectFit: "cover",
                width: "100vw",
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </>
        )}
      </div>

      <div className="spotlight-cam-topbar">
        <div className="spotlight-cam-header-content">
          <Link to="/" className="skinstric-link">
            <span className="skinstric-bold">SKINSTRIC</span>
          </Link>
          <span className="landing-intro">[ INTRO ]</span>
        </div>
        <button className="landing-code-btn">ENTER CODE</button>
      </div>

      {!photoTaken && (
        <button className="takePictureButton" aria-label="Take picture" onClick={handleTakePicture}>
          <span className="takePicText">TAKE PICTURE</span>
          <span className="cameraImgIcon">
            <img src={CameraWhite} alt="Camera" />
          </span>
        </button>
      )}

      {photoTaken && (
        <div className="previewPanel">
          <div className="previewTitle">Preview</div>
          <div className="previewButtonGroup">
            <button className="retakeBtn" onClick={handleRetake} disabled={isSending}>Retake</button>
            <button className="usePhotoBtn" onClick={handleProceed} disabled={isSending}>
              {isSending ? "Uploading..." : "Use this photo"}
            </button>
          </div>
        </div>
      )}

      {!photoTaken && (
        <div className="tipsBottom">
          <div className="tipsMainText">TO GET BETTER RESULTS MAKE SURE TO HAVE</div>
          <div className="tipsList">
            <span>◇NEUTRAL EXPRESSION</span>
            <span>◇FRONTAL POSE</span>
            <span>◇ADEQUATE LIGHTING</span>
          </div>
        </div>
      )}

      <Link to="/Results" className={`back-btn${photoTaken ? " hide-on-mobile" : ""}`}>
        <span className="Back-btn-wrapper">
          <img src={LeftArrowWhite} alt="Left Diamond" className="Back-diamond-icon" />
        </span>
        <span className="back-text-camera">BACK</span>
      </Link>

      {showAnalyzing && (
        <div className="analyzing-overlay">
          <div className="analyzing-box">
            <div className="analyzing-text">Analyzing Image</div>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      {cameraError && (
        <div className="camera-error-overlay">
          <div className="camera-error-message">
            Unable to access camera.<br />Returning to previous page...
          </div>
        </div>
      )}
    </div>
  );
}
