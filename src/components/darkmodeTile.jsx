import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "./darkmodeTile.module.scss";
import { useGlobalContext } from "../contexts/GlobalContext";

import { FaExchangeAlt, FaMoon, FaSun } from "react-icons/fa";
import useDeviceType from "../utils/DeviceType"



const Light = ({ followMouse, animate, random = true }) => {
    const lightRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [angle, setAngle] = useState(0);
    const [randomDelay, setRandomDelay] = useState(0);
    const [randomSpeed, setRandomSpeed] = useState(0);
  
    useEffect(() => {
      if (random) {
        // Generate random delay (in ms) between 0s to 2s and random speed between 0.5s to 2s
        setRandomDelay(Math.random() * 2000); // Random delay between 0 to 2 seconds
        setRandomSpeed(10 + Math.random() * 30); // Random speed between 0.5s to 2s
      }
    }, [random]);
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        setCursorPosition({ x: clientX, y: clientY });
      };
  
      if (followMouse) {
        window.addEventListener('mousemove', handleMouseMove);
      }
  
      return () => {
        if (followMouse) {
          window.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }, [followMouse]);
  
    useEffect(() => {
      const friction = 0.1;
  
      const calculateAngle = () => {
        if (lightRef.current && cursorPosition) {
          const { x, y } = cursorPosition;
          const rect = lightRef.current.getBoundingClientRect();
          const lampCenterX = rect.left + rect.width / 2;
          const lampCenterY = rect.top + rect.height;
  
          const targetAngle = Math.atan2(y - lampCenterY, x - lampCenterX) * (180 / Math.PI);
          const currentAngle = angle;
          const newAngle = currentAngle + (targetAngle - currentAngle) * friction;
  
          setAngle(newAngle);
        }
      };
  
      if (followMouse) {
        const animationFrame = requestAnimationFrame(calculateAngle);
  
        if (lightRef.current) {
          lightRef.current.style.transform = `translateX(-50%) rotate(${angle + 90}deg)`;
        }
  
        return () => cancelAnimationFrame(animationFrame);
      }
    }, [cursorPosition, angle, followMouse]);
  
    return (
      <div className={styles.spotlightContainer}>
        <div className={styles.base}></div>
  
        <div
          className={`${styles.spotlightLight} ${animate ? styles.animateSpotlight : ''}`}
          style={{
          //   animationDelay: `${randomDelay}ms`, // Apply random delay
            animationDuration: `${randomSpeed}s`, // Apply random speed
          }}
        ></div>
      </div>
    );
  };




export const DarkModeTile = ({grayscale = false}) => {
  const { isDarkMode, toggleTheme } = useGlobalContext();
  const [localstate, setLocalstate] = useState(isDarkMode);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animdir, setAnimdir] = useState("none");
  const [isMouseOver, setIsMouseOver] = useState(false); // State to track mouse hover

  useEffect(() => {
    if (localstate !== isDarkMode) {
      // Determine animation direction
      if (localstate && !isDarkMode) {
        setAnimdir("dtol"); // Dark to Light
      } else if (!localstate && isDarkMode) {
        setAnimdir("ltod"); // Light to Dark
      }

      // Start animation
      setIsAnimating(true);

      // Stop animation after the duration
      const animationDuration = 500; // 2s duration for the animation
      const timer = setTimeout(() => {
        setIsAnimating(false); // Stop animation
        setLocalstate(isDarkMode); // Sync localstate after animation
        setAnimdir("none"); // Reset animation direction
      }, animationDuration);

      return () => clearTimeout(timer); // Cleanup on unmount or state change
    }
  }, [isDarkMode, localstate]);

  const handleClick = () => {
    if (animdir === "none") {
      toggleTheme();
    }
  };

  const handleMouseEnter = () => setIsMouseOver(true); // Mouse enters the container
  const handleMouseLeave = () => setIsMouseOver(false); // Mouse leaves the container
  const devicetype = useDeviceType()


  const [clouds, setClouds] = useState([]);


  useEffect(() => {
    // Create 5 initial clouds with random delays, speeds, heights, and top positions
    const initialClouds = Array.from({ length: 5 }, () => {
      const randomSpeed = Math.random() * 5 + 5; // Random speed between 5s and 10s
      const randomHeight = Math.random() * 30 + 150; // Random height between 30px and 60px
      const randomTop = Math.random() * 50; // Random top position between 0% and 50%
      const randomDelay = Math.random() * 2; // Random delay between 0s and 2s

      return {
        id: Date.now() + Math.random(), // Unique id for each cloud (ensures uniqueness even on re-render)
        speed: randomSpeed,
        height: randomHeight,
        top: randomTop,
        delay: randomDelay, // Random delay for each cloud
      };
    });

    setClouds(initialClouds);

    // Add new clouds every 2 seconds (this part remains as before)
    const intervalId = setInterval(() => {
      const randomSpeed = Math.random() * 5 + 5;
      const randomHeight = Math.random() * 30 + 30;
      const randomTop = Math.random() * 50;
      const randomDelay = Math.random() * 2;

      setClouds((prevClouds) => [
        ...prevClouds,
        {
          id: Date.now() + Math.random(),
          speed: randomSpeed,
          height: randomHeight,
          top: randomTop,
          delay: randomDelay,
        },
      ]);
    }, 5000); // Add new cloud every 2 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);


  return (
    <>
      <div
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={clsx(
          styles.container,
          styles.grayscale,
          { [styles.day]: !isDarkMode }, // Add dark mode class if active
          { [styles.night]: isDarkMode }
        )}
      >
       

{/* {devicetype === "mobile" && (
        <div
          className={clsx(styles.prompt_mobile)}
        >
          <h2> <FaMoon/> <FaExchangeAlt/> <FaSun/> </h2>
        </div>)} */}

        {devicetype === "desktop" && (
        <div
          className={clsx(styles.prompt, { [styles.showPrompt]: isMouseOver })}
        >
          <h2> <FaMoon/> <FaExchangeAlt/> <FaSun/> </h2>
        </div>)}

        <div className={clsx(styles.sky, { [styles.animateSky]: isAnimating })}>


        <div
            className={clsx(styles.clouds, {
              [styles.animateStandardEnter]: animdir === "dtol", // Apply enter animation for sun when ltod
              [styles.animateStandardExit]: animdir === "ltod", // Apply exit animation for sun when dtol
              [styles.hidden]: animdir === "none" && localstate === true,
            })}
          >
         {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className={clsx(styles.cloud, styles.move)}
          style={{
            animationDuration: `${cloud.speed}s`, // Set random speed for each cloud
            height: `${cloud.height}px`, // Set random height for each cloud
            top: `${cloud.top}%`, // Set random top position for each cloud
          }}
        />
      ))}
        
          </div>
          
          <div
            className={clsx(styles.sun, {
              [styles.animateSunEnter]: animdir === "dtol", // Apply enter animation for sun when ltod
              [styles.animateSunExit]: animdir === "ltod", // Apply exit animation for sun when dtol
              [styles.hidden]: animdir === "none" && localstate === true,
            })}
          ></div>
          <div
            className={clsx(styles.stars, {
              [styles.animateStandardEnter]: animdir === "ltod",
              [styles.animateStandardExit]: animdir === "dtol", // Apply exit animation for sun when dtol
              [styles.hidden]: animdir === "none" && localstate === false,
            })}
          >
            
          </div>
          
          <div
            className={clsx(styles.moon, {
              [styles.animateMoonEnter]: animdir === "ltod",
              [styles.animateMoonExit]: animdir === "dtol", // Apply exit animation for sun when dtol
              [styles.hidden]: animdir === "none" && localstate === false,
            })}
          ></div>
        </div>

        <div className={styles.land}>
            
          <div
            className={clsx(styles.CrowdContainer, {
              [styles.animateStandardEnter]: animdir === "ltod",
              [styles.animateStandardExit]: animdir === "dtol", // Apply exit animation for sun when dtol
              [styles.hidden]: animdir === "none" && localstate === false,
            })}
          >
            {/* <Crowd/> */}
          </div>
          
          <div
            className={clsx(styles.spotlights, {
              [styles.animateStandardEnter]: animdir === "ltod",
              [styles.animateStandardExit]: animdir === "dtol", // Apply exit animation for sun when dtol
              [styles.hidden]: animdir === "none" && localstate === false,
            })}
          >
            <Light followMouse={false} animate={true} random={true} />
            <Light followMouse={false} animate={true} random={true} />
            <Light followMouse={false} animate={true} random={true} />
            <Light followMouse={false} animate={true} random={true} />
          </div>

          <div className={styles.water} />
        </div>
      </div>
    </>
  );
};
