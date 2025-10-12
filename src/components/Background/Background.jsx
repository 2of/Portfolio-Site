import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import routes from "../../routes/routes";
import styles from "./Background.module.scss";
import BlurArtBackground from "./BlurBg";
import { useGlobalContext } from "../../contexts/GlobalContext";
import ParticleBackground from "./Particles";
import PhysicsShapes from "./PhysicsShapes";
import art from "../../assets/Images/default_big.jpg";
import FeatherTwoLayer from "../Misc/FeatherTwoLayer";


// Inside the same file or import from another file
const ImageBg = ({ url = art}) => {
  return (
    <div
      className={styles.imageBg}
      style={{
        backgroundImage: `url(${url || "/default-bg.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};



const Background = () => {
  const location = useLocation();
  const { animatebg } = useGlobalContext();


  // Memoize sorted routes to avoid sorting every render
  const sortedRoutes = useMemo(
    () => [...routes].sort((a, b) => b.path.length - a.path.length),
    []
  );

  function getBgFromPath(path) {
    const matchedRoute = sortedRoutes.find((r) => path.startsWith(r.path));
    return matchedRoute?.bg || "default";
  }

    const [bgType, setBgType] = useState(() => getBgFromPath(location.pathname));
  // Update bgType only if it changes
  useEffect(() => {
    const newBg = getBgFromPath(location.pathname);
    if (newBg !== bgType) setBgType(newBg);
  }, [location.pathname, bgType, sortedRoutes]);

  // Render only the active background
const renderBackground = () => {
  switch (bgType) {
    case "dots": 
    return <FeatherTwoLayer alwaysListen  radius={600} isbg = {true}/>

    case "bg2":
     return <div className={styles.bg2} />;
    case "darkbg":
     return <div className={styles.darkbg} />;
    
    case "herobg":
      return <div className={styles.herobg} />;
    case "particles":
      return <ParticleBackground />;
  case  "pattern1":
      return <div className={styles.pattern1} />;
    case "pattern2":
      return <div className={styles.pattern2}/>
    case  "lineargrad1":
      return <div className={styles.linearbg} />;
    case "blur":
      return animatebg ? <BlurArtBackground speed={0.1} /> : <div className={styles.regularbg} />;
    case "imagebg":
      // Pass in a URL if your routes have one; fallback will be used if undefined
      const imageUrl = sortedRoutes.find(r => location.pathname.startsWith(r.path))?.imageUrl;
      return <ImageBg url={imageUrl} />;

    case "shapes":
      return <PhysicsShapes />
    case "default":
    default:
      return <div className={styles.regularbg} />;
  }
};

  return <div className={styles.backgroundWrapper}>{renderBackground()}</div>;
};


export default Background;