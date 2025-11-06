import React from "react";
import StandardToggle from "./StandardLib/StandardToggle.jsx";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { FaMoon, FaSun } from "react-icons/fa";
import getIcon from "../../utils/Iconifier";
import { useDarkMode } from "../../contexts/DarkModeContext";

export const DarkModeWrapper = ({type = "box"}) => {
  const { isDarkMode, toggleTheme } = useGlobalContext();
 const { darkMode, toggleDarkMode } = useDarkMode();

  return (

    <>
    
    
    {/* <div onClick={toggleTheme}>test </div> */}
    <StandardToggle
      type={type}
      checked={darkMode}
      callback={() => toggleDarkMode}
      firsticon={getIcon("moon")}
      secondicon={getIcon("sun")}
    />

    
</>
  );
};