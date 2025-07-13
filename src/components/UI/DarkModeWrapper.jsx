import React from "react";
import StandardToggle from "./StandardToggle";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { FaMoon, FaSun } from "react-icons/fa";
import getIcon from "../../utils/Iconifier";

export const DarkModeWrapper = ({type = "box"}) => {
  const { isDarkMode, toggleTheme } = useGlobalContext();

  return (

    <>
    
    
    {/* <div onClick={toggleTheme}>test </div> */}
    <StandardToggle
      type={type}
      checked={isDarkMode}
      callback={() => toggleTheme}
      firsticon={getIcon("moon")}
      secondicon={getIcon("sun")}
    />

    
</>
  );
};