import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { storage } from "../firebase";

const UploadImage = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (!file) return;
    const storageRef = ref(storage, `gallery/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploading(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at ", downloadUrl);
        onUploadComplete(downloadUrl);
        setUploading(false);
      }
    );
  };
  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default UploadImage;
