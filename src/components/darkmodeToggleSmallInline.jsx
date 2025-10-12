import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import style from './darkmodeToggleSmallInline.module.scss'; 
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = ({ size = "pill" }) => {
  const { isDarkMode, toggleTheme } = useGlobalContext();

  // Determine class based on size prop
  let sizeClass = style.pill;
  if (size === "box") sizeClass = style.box;
  else if (size === "largepill") sizeClass = style.largepill;

  return (
    <div className={`${sizeClass} ${style.darkmodeToggle}`} onClick={toggleTheme}>
      <input
        type="checkbox"
        className={style.toggleCheckbox}
        checked={isDarkMode}
        readOnly
      />
      <div className={style.toggleSlider}>
        <span className={`${style.toggleIcon} ${style.moonIcon}`}>
          <FaMoon />
        </span>
        <span className={`${style.toggleIcon} ${style.sunIcon}`}>
          <FaSun />
        </span>
      </div>
    </div>
  );
};

export default DarkModeToggle;