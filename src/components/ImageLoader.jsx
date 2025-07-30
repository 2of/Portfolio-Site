import React, { useState, useEffect } from "react";
import Loader from "./Loader";

export const ImageLoader = ({ src, alt = "", fallback = null, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

useEffect(() => {
  setLoaded(false);
  setFailed(false);

  const img = new Image();
  img.src = src;

  img.onload = () => setLoaded(true);

  img.onerror = (e) => {
    console.error(`Image failed to load: ${src}`);
    console.error("Error event:", e);
    setFailed(true);
  };

  return () => {
    img.onload = null;
    img.onerror = null;
  };
}, [src]);
  if (failed) {
    // Show fallback component or default error message
    return fallback || <div style={{ color: "red" }}>Failed to load image</div>;
  }

  return loaded ? (
    <img src={src} alt={alt} {...props} />
  ) : (
    <Loader />
  );
};