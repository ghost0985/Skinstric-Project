import React from "react";
import "../Styling/CameraBox.css";

export default function CameraBox({ onAllow, onDeny }) {
  return (
    <div className="camera-modal-overlay">
      <div className="camera-modal-box">
        <div className="camera-modal-title">
          ALLOW A.I. TO ACCESS YOUR CAMERA
        </div>
        <div className="camera-modal-actions">
          <button className="camera-modal-btn deny" onClick={onDeny}>
            DENY
          </button>
          <button className="camera-modal-btn allow" onClick={onAllow}>
            ALLOW
          </button>
        </div>
      </div>
    </div>
  );
}
