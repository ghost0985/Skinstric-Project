import React, { useState } from "react";
import CameraLoadingOverlay from "./CameraLoadingOverlay";

export default function CameraSetup() {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <>
      {!showCamera && (
        <CameraLoadingOverlay onLoadingComplete={() => setShowCamera(true)} />
      )}
      {showCamera && <LiveCameraFeed />}
    </>
  );
}

function LiveCameraFeed() {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    let stream;
    async function enableCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (e) {
        alert("Could not access camera");
      }
    }
    enableCamera();

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="live-camera-feed">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 12,
          margin: "0 auto",
          display: "block",
        }}
      />
    </div>
  );
}
