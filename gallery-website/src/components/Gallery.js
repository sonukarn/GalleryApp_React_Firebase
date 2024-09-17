// import React, { useEffect, useState } from "react";
// import { ref, listAll, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebase";
const Gallery = ({ images, onImageClick }) => {
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const storageRef = ref(storage, "gallery/");
  //     const result = await listAll(storageRef);
  //     const imageUrls = await Promise.all(
  //       result.items.map((item) => getDownloadURL(item))
  //     );
  //     setImages(imageUrls);
  //   };
  //   fetchImages();
  // }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((url, index) => {
        return (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Gallery image ${index}`}
              className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform transform group-hover:scale-105"
              onClick={() => onImageClick(url)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
