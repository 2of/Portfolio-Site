export const baseTheme = {
  "--padding-small": "10px",
  "--padding-medium": "15px",
  "--padding-large": "36px",
  "--spacing-small": "10px",

  "--font-size-base": "16px",
  "--font-size-lg": "18px",
  "--font-weight-bold": "600",

  "--navHeight": "4rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "82px",
  "--maxWidth": "1400px",

  "--border-radius": "24px",
  "--blur-radius": "15px",
};

export const lightTheme = {
  "--bg": "#f4f4f4ff",
  "--bg-l1": "#e5e4e3",
  "--bg-l2": "#bababa",
  "--bg-l3": "#a1a09f",
  "--bg-transparent": "#f8f7f6c1",

  "--text-color": "#2E2E2E",
  "--secondary-text": "#6C6C6C",
  "--card-bg": "#FFFFFF",
  "--border-color": "#474747",
  "--accent": "#d44742",
  "--accent-color": "#d44742",
  "--link": "#4A90E2",
  "--herobg": "rgb(175, 93, 100)",
  "--drop-shadow":
    "0 6px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06)",

  "--inverse-transparent": "#121212d3", // dark-bg-transparent
  "--inverse-shadow":
    "0 6px 16px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)",
};


export const darkTheme = {
  "--bg": "#121212",
  "--bg-l1": "#727272",
  "--bg-l2": "#302f2f",
  "--bg-l3": "#666464",
  "--bg-transparent": "#121212d3",

  "--text-color": "#f2f0e3",
  "--secondary-text": "#A0A0A0",
  "--card-bg": "#262626",
  "--border-color": "#404040",
  "--accent": "#d44742",
  "--accent-color": "#d44742",
  "--link": "#6BB9F0",
  "--herobg": "#456882",
  "--drop-shadow":
    "0 6px 16px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)",

  "--inverse-transparent": "#f8f7f6c1", // light-bg-transparent
  "--inverse-shadow":
    "0 6px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06)",
};  

export const inlineNavHeight = { 

  "--navHeight": "4rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "82px",
}

export const hiddenNavHeight = { 

  "--navHeight": "0rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "82px",
}