export const baseTheme = {
  "--padding-small": "10px",
  "--padding-medium": "15px",
  "--padding-large": "36px",
  "--spacing-small": "10px",

  "--font-size-base": "16px",
  "--font-size-lg": "18px",
  "--font-weight-bold": "600",

  "--navHeightDESKTOP": "5rem",

  "--content-heightDESKTOP": "calc(100vh - var(--navHeightDESKTOP)",
  "--navHeight": "4rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "82px",
  "--maxWidth": "1480px",

  "--border-radius": "24px",
  "--blur-radius": "15px",
  "--text-dark": "#2c3e50",
  "--darkbg": "#0d1324dd",
  "--lighttext": "#d1cfc0",
};

export const lightTheme = {
  "--bg": "#FDFCF7", // pristine cream paper
  "--bg-l1": "#F7F5ED", // soft ivory
  "--bg-l2": "#F1EEE3", // gentle aged tone
  "--bg-l3": "#EBE7D9", // vintage cream
  "--bg-transparent": "rgba(253, 252, 247, 0.88)",

  // Text - lighter blue ink (like gel pen)
  "--text-color": "#2C5278", // medium blue ink
  "--secondary-text": "#5B7C9B", // light faded ink

  // Surfaces
  "--card-bg": "#FFFFFF", // bright white page
  "--border-color": "#A3BDD8", // very light blue ruling

  // Accent - bright blue ink
  "--accent": "#3D7AC7", // vibrant blue ink
  "--accent-color": "#3D7AC7",

  // Interactive
  "--link": "#2C5278", // matching medium blue

  // Hero/Feature areas
  "--herobg": "#EEE9DD", // subtle paper texture

  // Shadows - very subtle
  "--drop-shadow":
    "0 2px 6px rgba(44, 82, 120, 0.06), 0 1px 2px rgba(44, 82, 120, 0.03)",

  // Inverse elements
  "--inverse-transparent": "rgba(44, 82, 120, 0.82)",
  "--inverse-shadow":
    "0 5px 14px rgba(44, 82, 120, 0.35), 0 2px 4px rgba(44, 82, 120, 0.18)",
};

export const darkTheme = {
  // Background layers - rich, deep progression
  "--bg": "rgba(7, 7, 7, 1)", // deep blue-black, modern and sophisticated
  "--bg-l1": "#1A1F26", // slightly lighter slate
  "--bg-l2": "#252B35", // elevated surfaces
  "--bg-l3": "#2F3540", // highest elevation
  "--bg-transparent": "rgba(15, 20, 25, 0.92)",

  // Text - warm and comfortable for dark mode
  "--text-color": "#E8E6E3", // soft off-white, easy on eyes
  "--secondary-text": "#9CA3AF", // balanced grey with good contrast

  // Surfaces
  "--card-bg": "#1C2128", // subtle distinction from background
  "--border-color": "#30363D", // visible but not harsh

  // Accent - slightly brighter for dark backgrounds
  "--accent": "#EF5350", // vibrant coral-red that pops
  "--accent-color": "#EF5350",

  // Interactive
  "--link": "#60A5FA", // bright blue that's readable on dark

  // Hero/Feature areas
  "--herobg": "#8B3A3A", // deep burgundy with richness

  // Shadows - dramatic depth for dark mode
  "--drop-shadow":
    "0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)",

  // Light mode elements
  "--inverse-transparent": "rgba(250, 250, 249, 0.88)",
  "--inverse-shadow":
    "0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)",
};
export const inlineNavHeight = {
  "--navHeight": "4rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "82px",
};

export const hiddenNavHeight = {
  "--navHeight": "0rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "82px",
};
