import React, { useRef } from "react";
import gallery from "../assets/gallery.png";

export default function GalleryPicker({ onFileSelected }) {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const hadleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onFileSelected) {
      onFileSelected(file);
    }
  };

  return (
    <div className="icon-circle">
      <img
        src={gallery}
        alt="gallery"
        style={{ cursor: "pointer" }}
        onClick={handleImageClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={hadleFileChange}
      />
    </div>
  );
}
