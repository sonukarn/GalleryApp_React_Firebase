import React, { useEffect, useState } from "react";
import "./App.css";
import UploadImage from "./components/UploadImage";
import Gallery from "./components/Gallery";
import ImageModal from "./components/ImageModal";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "./firebase";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch images form Firebase storage
  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, "gallery/");
      const result = await listAll(storageRef);
      const imageUrls = await Promise.all(
        result.items.map((item) => getDownloadURL(item))
      );
      setImages(imageUrls);
    };
    fetchImages();
  }, []);

  const handleUploadComplete = (newImageUrl) => {
    setImages((prevImages) => [...prevImages, newImageUrl]);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <div className="App min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Responsive Image Gallery</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      {/* Pass the handleUploadComplete to UploadImage */}
      <UploadImage onUploadComplete={handleUploadComplete} />
      <Gallery images={images} onImageClick={(url) => setSelectedImage(url)} />
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default App;
