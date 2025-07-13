import React from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import style from './darkmodeToggleSmallInline.module.scss'; 
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle = ({mobile = true}) => {
  const { isDarkMode, toggleTheme } = useGlobalContext();

  return (
    <div className={` ${mobile ? style.pill : style.box} ${style.darkmodeToggle}`} onClick={toggleTheme}>
      <input
        type="checkbox"
        className={style.toggleCheckbox}
        checked={isDarkMode}
        readOnly
      />
      <div className={style.toggleSlider}>
        <span className={style.toggleIcon + " " + style.moonIcon}>
          <FaMoon />
        </span>
        <span className={style.toggleIcon + " " + style.sunIcon}>
          <FaSun />
        </span>
      </div>
    </div>
  );
};

export default DarkModeToggle;
