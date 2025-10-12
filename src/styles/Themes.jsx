export const baseTheme = {
  "--padding-small": "10px",
  "--padding-medium": "15px",
  "--padding-large": "36px",
  "--spacing-small": "10px",

  "--font-size-base": "16px",
  "--font-size-lg": "18px",
  "--font-weight-bold": "600",



  "--navHeightDESKTOP" : "5rem",

    "--content-heightDESKTOP": "calc(100vh - var(--navHeightDESKTOP)",
  "--navHeight": "4rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "82px",
  "--maxWidth": "1400px",

  "--border-radius": "24px",
  "--blur-radius": "15px",
  "--text-dark" : "#161616ff",
};

export const lightTheme = {
  "--bg": "#d1cfc0",      // soft warm off-white
  "--bg-l1": "rgba(206, 206, 206, 1)",       // gentle sage tint (slightly darker)
  "--bg-l2": "rgba(187, 190, 174, 1)",       // mid warm grey-green
  "--bg-l3": "rgba(156, 158, 144, 1)",       // deeper neutral olive

  "--bg-transparent": "rgba(231, 233, 225, 0.8)",

  "--text-color": "#1f1f1f",
  "--secondary-text": "#6C6C6C",
  "--card-bg": "#FFFFFF",
  "--border-color": "#474747",
  "--accent": "#d44742",
  "--accent-color": "#d44742",
  "--link": "#4A90E2",
  "--herobg": "#ffb914ff",
  "--drop-shadow":
    "0 6px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06)",

  "--inverse-transparent": "#121212d3",
  "--inverse-shadow":
    "0 6px 16px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)",
};

export const darkTheme = {
  "--bg": "#1f1f1f",
  "--bg-l1": "#3e3e3eff",
  "--bg-l2": "#302f2f",
  "--bg-l3": "#666464",
  "--bg-transparent": "#121212d3",

  "--text-color": "#f2f0e3",
  "--secondary-text": "#A0A0A0",
  "--card-bg": "#262626",
  "--border-color": "#404040",
  "--accent": "#d44742",
  "--accent-color": "#d44742",
  "--link": "#003153",
  "--herobg": "#688f73ff",
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