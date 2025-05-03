// UploadImageBox.js or ImageUpload.js
import React, { useState } from "react";
import axios from "axios";
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadImageBox = ({ onUploadComplete }) => {
  const [images, setImages] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewURLs([...previewURLs, ...newPreviews]);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    try {
      const response = await axios.post("http://localhost:7000/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Images uploaded successfully!");
      const uploadedURLs = response.data.image_urls;

      // 👉 Send the URLs to the parent component
      if (onUploadComplete) {
        onUploadComplete(uploadedURLs);
      }

      setImages([]);
      setPreviewURLs([]);
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <div className="uploadBox relative flex flex-col items-center justify-center rounded-sm border-dashed border-1 border-gray-400 bg-gray-100 hover:bg-gray-200 cursor-pointer w-full h-[170px]">
      <MdOutlineCloudUpload className="text-[40px] opacity-35" />
      <h4 className="text-[14px]">Upload Images</h4>
      <input
        type="file"
        multiple
        accept="image/*"
        className="absolute top-0 left-0 w-full h-full opacity-0"
        onChange={handleFileChange}
      />

      <div className="flex gap-2 mt-4 flex-wrap">
        {previewURLs.map((url, index) => (
          <img key={index} src={url} alt={`preview-${index}`} className="w-20 h-20 object-cover rounded" />
        ))}
      </div>

      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Send Images
      </button>
    </div>
  );
};

export default UploadImageBox;
