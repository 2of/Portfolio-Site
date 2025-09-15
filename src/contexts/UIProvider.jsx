import React from "react";

//TO DO:
// refactor the global context for below

export const UIProvider = ({ children }) => {
return ;
}

// export const UIContext = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isBlurPage, setBlurPage] = useState(true);
//   const [isMenuOpenforNav, setisMenuOpenforNav] = useState(false);
//   const [floatingNavisOnRight, setFloatingNavisOnRight] = useState(true);
//   const [prefersCol, setPrefersCol] = useState(true);
//   const [themeoverride, setThemeOverride] = useState(false);
//   const [animatebg, setAnimateBg] = useState(true);
//   const [solidNavBar, setSolidNavBar] = useState(false);
//   const [shareSheetVisible, setShareSheetVisible] = useState(false);
//   const [shareURL, setShareURL] = useState("");
//   const [shareService, setShareService] = useState(null);



//   const toggleAnimateBg = () => { 
//     setAnimateBg((prevmode) => !prevmode);
//   };

//   const toggleTheme = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };
//   const toggleThemeOverride = () => {
//     setThemeOverride((prevMode) => !prevMode);
//   };
//   const togglePrefersColumnView = () => {
//     setPrefersCol((prev) => !prev);
//   };



//   useEffect(() => {
//     if (isDarkMode) {
//       document.body.setAttribute("data-theme", "dark");
//     } else {
//       document.body.removeAttribute("data-theme");
//     }
//   }, [isDarkMode]);

//   const getLink = (linktitle) => {
//     return linksdict[linktitle] || null;
//   };




//   // Set popup disable with opt callback
//   const setDisableForPopupEnhanced = (isDisabled, clickOffCallback = null) => {
//     setDisableForPopupState(isDisabled);
//     if (clickOffCallback) {
//       setDisablePopupClickOffCallback(() => clickOffCallback);
//     } else {
//       setDisablePopupClickOffCallback(null);
//     }
//   };

//   // Clear the click-off callback
//   const clearDisablePopupClickOffCallback = () => {
//     setDisablePopupClickOffCallback(null);
//   };



//     const handlePopupClickOff = () => {
//     if (disablePopupClickOffCallback) {
//       disablePopupClickOffCallback();
//       setDisablePopupClickOffCallback(null);
//       setDisableForPopupState(false);
//     }
//   };

//   const openShareSheet = (url, service = null, desc, title) => {
//     //  setDisableForPopupEnhanced(true, () => console.log(test));
//     setShareURL(url);
//     setShareSheetData({
//       URL: url,
//       initialDescription: desc,
//       title: title,
//     });

//     setShareSheetVisible(true);
//     // setDisableForPopupEnhanced(true, () => closeShareSheet); // also blocks background + adds click-off
//   };

//   const closeShareSheet = () => {
//     setShareSheetVisible(false);
//     setShareURL("");
//     toggleDisableForPopUp();
//     setShareService(null);
//     clearDisablePopupClickOffCallback(); // optional safety  I guess
//     setDisableForPopupState(false);
//   };


//     return {
//         isDarkMode,
//         toggleTheme,
//         isBlurPage,
//         setBlurPage,
//         isMenuOpenforNav,
//         setisMenuOpenforNav,
//         floatingNavisOnRight,
//         setFloatingNavisOnRight,
//         prefersCol,
//         togglePrefersColumnView,
//         themeoverride,
//         toggleThemeOverride,
//         animatebg,
//         toggleAnimateBg,
//         solidNavBar,
//         setSolidNavBar,
//         disableForPopup,
//         toggleDisableForPopUp,
//         setDisableForPopupEnhanced,
//         handlePopupClickOff,
//         shareSheetVisible,
//         openShareSheet,
//         closeShareSheet,
//         shareURL,
//         shareService,
//         setShareService,
//         getLink,
//     };
// };
