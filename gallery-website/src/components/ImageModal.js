import React from "react";

const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative">
        <img
          src={imageUrl}
          alt="Full size"
          className="max-h-screen rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-white text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
