import React from "react";
import camera from "..//assets/camera.png"

export default function CameraPicker({ onClick }) {
  return (
    <div className="icon-circle" style={{ position: "relative" }}>
      <img src={camera} 
      alt="camera"
      style={{ cursor: "pointer" }} 
      onClick={onClick}
      />
    </div>
  )
}














// import React, { useRef, useState } from "react";
// import camera from "../assets/camera.png";
// import CameraBox from "./CameraBox.jsx";

// export default function CameraPicker({
//   showModal,
//   setShowModal,
//   onAccepted,
//   onRequestCamera,
// }) {
//   const [permission, setPermission] = useState(null);
//   const videoRef = useRef(null);

//   const handleCameraClick = () => {
//     if (onRequestCamera) {
//       onRequestCamera();
//     } else {
//       setShowModal(true);
//     }
//   };

//   const handleAllow = async () => {
//     setShowModal(false);
//     if (onAccepted) onAccepted();
//   };

//   const handleDeny = () => {
//     setShowModal(false);
//     setPermission("denied");
//   };

//   return (
//     <div className="icon-circle" style={{ position: "relative" }}>
//       <img
//         src={camera}
//         alt="camera"
//         style={{ cursor: "pointer" }}
//         onClick={handleCameraClick}
//       />
//       {showModal && <CameraBox onAllow={handleAllow} onDeny={handleDeny} />}
//       {permission === "granted" && (
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           width={240}
//           height={180}
//           style={{
//             display: "block",
//             margin: "16px auto 0",
//             borderRadius: 8,
//           }}
//         />
//       )}
//     </div>
//   );
// }
