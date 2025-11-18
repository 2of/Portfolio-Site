export const baseTheme = {
  "--padding-small": "10px",
  "--padding-medium": "15px",
  "--padding-large": "36px",
  "--spacing-small": "10px",

  "--font-size-base": "16px",
  "--font-size-lg": "18px",
  "--font-weight-bold": "600",

  "--navHeightDESKTOP": "4rem",

  "--content-heightDESKTOP": "calc(100vh - var(--navHeightDESKTOP)",
  "--navHeight": "4rem",
  "--content-height": "calc(100vh - var(--navHeight))",
  "--content-height-half": "calc(0.5 * (100vh - var(--navHeight)))",
  "--mobileTopNavSafeArea": "82px",
  "--maxWidth": "1480px",

  "--border-radius": "2px",
  "--blur-radius": "12px",
  "--text-dark": "#2c3e50",
  "--darkbg": "#0d1324dd",
  "--lighttext": "#d1cfc0",
};

export const lightTheme = {
  // Technical drawing paper - crisp blueprints with bold refinement
  "--bg": "#F8FAFC", // pristine drafting vellum with crisp clarity
  "--bg-l1": "#EFF4F9", // tracing paper overlay with bold blue presence
  "--bg-l2": "#E1ECF5", // layered drafts with strong definition
  "--bg-l3": "#D0E0ED", // blueprint edge with bold contrast
  "--bg-transparent": "rgba(248, 250, 252, 0.96)",

  // Technical pen strokes - bold and precise with strong contrast
  "--text-color": "#0F1E35", // bold fine liner black-blue with intensity
  "--secondary-text": "#4A5A6F", // refined pencil marks with clarity

  // Drafting surfaces - enhanced purity with bold definition
  "--card-bg": "#FFFFFF", // immaculate paper sheet
  "--border-color": "#B8CCE0", // bold grid lines with strong presence
  
  // Blueprint grid system - bold and sophisticated
  "--grid-color": "#DEE8F2", // strong technical grid
  "--guide-color": "#9FC4E0", // bold construction guides
  "--dimension-line": "#5A9BC7", // strong dimension/measurement lines

  // Technical blue - architect's pen with bold vibrancy
  "--accent": "#2E7FC8", // bold technical blue with intensity
  "--accent-color": "#FF5240", // vibrant coral accent with bold contrast

  // Interactive technical marks - bold and engaging
  "--link": "#1E6BA8", // deep technical blue with bold richness
  "--hover-accent": "#3D8FD9", // luminous highlighted measurement

  // Featured sections - bold tracing paper
  "--herobg": "#E6F3FF", // strong blueprint wash with presence
  "--feature-bg": "#D9EDFF", // bold technical overlay
  
  // Precise, architectural shadows with bold depth
  "--drop-shadow": 
    "0 3px 6px rgba(15, 30, 53, 0.08), 0 1px 3px rgba(15, 30, 53, 0.06), 0 0 1px rgba(15, 30, 53, 0.04)",
  "--card-shadow": 
    "0 6px 16px rgba(15, 30, 53, 0.12), 0 3px 8px rgba(15, 30, 53, 0.08), 0 1px 3px rgba(15, 30, 53, 0.06)",
  "--elevated-shadow":
    "0 12px 32px rgba(15, 30, 53, 0.16), 0 6px 16px rgba(15, 30, 53, 0.12), 0 3px 8px rgba(15, 30, 53, 0.08)",

  // Inverse for overlays - bold refined depth
  "--inverse-transparent": "rgba(15, 30, 53, 0.94)",
  "--inverse-shadow": 
    "0 16px 40px rgba(0, 0, 0, 0.20), 0 8px 20px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.12)",
};

export const darkTheme = {
  // Deep cosmic workspace - architect's midnight studio with bold refinement
  "--bg": "#080B10", // bold deep space black with strong blue undertone
  "--bg-l1": "#0F141A", // bold drafting table surface
  "--bg-l2": "#18202C", // elevated drawing boards with bold depth
  "--bg-l3": "#212A3A", // highest workspace with strong contrast
  "--bg-transparent": "rgba(8, 11, 16, 0.98)",

  // Luminous technical text - bold glowing blueprints
  "--text-color": "#F5F9FC", // brilliant drafting clarity with bold presence
  "--secondary-text": "#A8BDD2", // refined annotations with clarity

  // Workshop surfaces - bold sophistication
  "--card-bg": "#0D1117", // bold matte drafting surface
  "--border-color": "#364152", // strong defined edges
  
  // Technical grid - bold glowing in darkness
  "--grid-color": "#151C28", // strong subtle dark grid
  "--guide-color": "#455268", // bold construction guides
  "--dimension-line": "#5A6F8A", // strong measurement lines

  // Luminous technical blue - bold neon drafting light
  "--accent": "#4AA3FF", // bold vibrant architect's blue
  "--accent-color": "#4AA3FF",

  // Interactive glowing marks - bold and engaging
  "--link": "#5CB5FF", // bold luminous highlighted technical blue
  "--hover-accent": "#3A93F0", // focused measurement with bold intensity

  // Featured areas - bold illuminated drafting zones
  "--herobg": "#131A24", // bold dark blueprint base
  "--feature-bg": "#162030", // strong technical focus area
  
  // Dramatic studio lighting shadows with bold depth
  "--drop-shadow": 
    "0 6px 16px rgba(0, 0, 0, 0.5), 0 3px 8px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)",
  "--card-shadow": 
    "0 12px 32px rgba(0, 0, 0, 0.6), 0 6px 16px rgba(0, 0, 0, 0.5), 0 3px 8px rgba(0, 0, 0, 0.4)",
  "--elevated-shadow":
    "0 20px 60px rgba(0, 0, 0, 0.7), 0 10px 32px rgba(0, 0, 0, 0.6), 0 6px 16px rgba(74, 163, 255, 0.18)",

  // Light overlay for modals - bold refined elegance
  "--inverse-transparent": "rgba(248, 250, 252, 0.97)",
  "--inverse-shadow": 
    "0 12px 32px rgba(0, 0, 0, 0.16), 0 6px 16px rgba(0, 0, 0, 0.12), 0 3px 8px rgba(0, 0, 0, 0.08)",
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