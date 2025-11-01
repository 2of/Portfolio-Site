import React, { useState, useEffect } from "react";
import styles from "./GeoCard.module.scss";
// Make sure you import the image correctly
import newyorkimage from "../../../assets/Images/NewYork.png";
import { StandardButton } from "../../UI/StandardButton";
import getIcon from "../../../utils/Iconifier";
import { style } from "framer-motion/m";
const tags = [
  "Machine Learning",
  "Tensorflow",
  "Transfer Learning",
  "Regression Analysis",
  "Model Analysis",
  "Pytorch",
  "Object Detection",
  "Embeddings",
  "Large Data Processing",
  "Heuristic Analysis",
  "Attention Models",
  "Convolutional Neural Networks",
  "Neural Networks",
  "Cooking my GPU",
  "Psuedo Model Ensemble",
  "Clustering Analysis",
];
const MainPin = ({ x, y, size, color }) => {
  return (
    <div
      className={styles.mainpin}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
      }}
    ></div>
  );
};

const Pin = ({ id, x, y, size, color, onRemove, toRemove, isMidPin }) => {
  const [exiting, setExiting] = useState(false);

  // Handle clicking on a pin manually
  const handleClick = () => {
    startExit();
  };

  // Trigger exit animation if `toRemove` flag becomes true
  useEffect(() => {
    if (toRemove) {
      startExit();
    }
  }, [toRemove]);

  const startExit = () => {
    setExiting(true);
    setTimeout(() => onRemove(id), 250); // match CSS popOut duration
  };

  return (
    <div
      className={`${styles.pin} ${exiting ? styles.exit : ""}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        border: isMidPin ? "3px solid #f1c40f" : "none", // Add a border for mid pin
        boxShadow: isMidPin ? "0 0 15px rgba(255, 223, 0, 0.7)" : "none", // Shadow effect for mid pin
      }}
      onClick={handleClick}
    >
      <div className={styles.pulse}></div>
    </div>
  );
};

const GeoCard = () => {
  const [pins, setPins] = useState([]);

  const movePins = () => {
    setPins((prevPins) =>
      prevPins.map((p) => ({
        ...p,
        x: Math.min(Math.max(p.x + (Math.random() * 10 - 5), 0), 90),
        y: Math.min(Math.max(p.y + (Math.random() * 10 - 5), 0), 90),
      })),
    );
  };

  const removeRandomPin = () => {
    setPins((prevPins) => {
      if (prevPins.length === 0) return prevPins;
      const randomIndex = Math.floor(Math.random() * prevPins.length);
      // Return a new array where the random pin has `toRemove: true`
      return prevPins.map((pin, i) =>
        i === randomIndex ? { ...pin, toRemove: true } : pin,
      );
    });
  };

  const RandomUpdate = () => {
    // If there are fewer than 3 pins, always add a new pin
    if (pins.length < 3) {
      createPin();
    }
    // If there are more than 7 pins, only remove a pin
    else if (pins.length > 7) {
      removeRandomPin();
    }
    // If there are between 3 and 7 pins, randomly add or remove a pin
    else {
      if (Math.random() < 0.5) {
        createPin();
      } else {
        removeRandomPin();
      }
    }
  };

  // Automatically remove or add random pins every 1s
  useEffect(() => {
    const interval = setInterval(RandomUpdate, 1000);
    return () => clearInterval(interval);
  }, [pins]); // run every time pins change

  const createPin = () => {
    // Only create a new pin if we have fewer than 7
    if (pins.length < 7) {
      const newPin = {
        id: Date.now(),
        x: Math.random() * 90,
        y: Math.random() * 90,
        size: 60,
        toRemove: false,
      };
      setPins((prev) => [...prev, newPin]);
    }
  };

  const removePin = (id) => {
    setPins((prev) => prev.filter((p) => p.id !== id));
  };

  // Calculate the average position (x, y) of all the pins
  const calculateAveragePosition = () => {
    if (pins.length === 0) return { x: 50, y: 50 }; // Default to the center if no pins

    const totalX = pins.reduce((acc, pin) => acc + pin.x, 0);
    const totalY = pins.reduce((acc, pin) => acc + pin.y, 0);

    return {
      x: totalX / pins.length, // average x position
      y: totalY / pins.length, // average y position
    };
  };

  const MidPin = () => {
    if (pins.length === 0) return null; // Handle case when there are no pins

    const { x, y } = calculateAveragePosition(); // Get average position
    const midPin = {
      id: "midPin",
      x,
      y,
      size: 80, // Mid pin size can be larger
      toRemove: false,
    };

    return <MainPin key={midPin.id} {...midPin} onRemove={removePin} />;
  };

  return (
    <div className={styles.cardcontainer}>
      {/* <button onClick={createPin}>Make a pin</button>
      <button onClick={movePins}>Move pins</button>*/}

      <div
        className={styles.maparea}
        style={{
          position: "relative",
          backgroundImage: `url(${newyorkimage})`, // Set the New York image as the background
          backgroundSize: "cover", // Ensure it covers the container fully
          backgroundPosition: "center", // Center the image
        }}
      >
        {pins.map((p) => (
          <Pin key={p.id} {...p} onRemove={removePin} />
        ))}
        {/* {MidPin()} {/* Render the mid pin */}*/}
      </div>
      <div className={styles.gradientbg} />

      <div className={styles.content}>
        {" "}
        <div className={styles.top}>
          <h3>
            Machine Learning for Geolocalization of street level imagery using
            {/* Machine Learning, Transfer learning, Clustering Analysis, Attention
          Models and Deep Learning*/}
          </h3>
          <p className={styles.subtitle}>Call it a GuoGuessr Bot</p>
          {/* <div className={styles.description}>This is a GeoCard component.</div>*/}
        </div>
        <div className={styles.bottom}>
          <div className={styles.tagsContainer}>
            {tags.map((tagi, i) => {
              return (
                <p className={styles.tag} key={i}>
                  {tagi}
                </p>
              );
            })}
          </div>
          <div className={styles.buttonsContainer}>
            <StandardButton
              label="Open Writeup"
              type="subtle"
              icon={getIcon("article")}
            />
            <StandardButton
              label="Open Thesis"
              type="subtle"
              icon={getIcon("article")}
            />
            <StandardButton
              label="Code Repo"
              type="subtle"
              icon={getIcon("github")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoCard;
