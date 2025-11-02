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

  "--border-radius": "2px",
  "--blur-radius": "12px",
  "--text-dark": "#2c3e50",
  "--darkbg": "#0d1324dd",
  "--lighttext": "#d1cfc0",
};

export const lightTheme = {
  // Technical drawing paper - crisp blueprints
  "--bg": "#F8FAFB", // clean drafting vellum
  "--bg-l1": "#F0F4F8", // tracing paper overlay
  "--bg-l2": "#E6EDF3", // layered drafts
  "--bg-l3": "#D9E4ED", // blueprint edge
  "--bg-transparent": "rgba(248, 250, 251, 0.92)",

  // Technical pen strokes - precise and elegant
  "--text-color": "#1E3A52", // fine liner black-blue
  "--secondary-text": "#64748B", // light pencil marks

  // Drafting surfaces
  "--card-bg": "#FFFFFF", // clean paper sheet
  "--border-color": "#CBD9E6", // grid lines, subtle
  
  // Blueprint grid system
  "--grid-color": "#E0EBF5", // light technical grid
  "--guide-color": "#A8C5DD", // construction guides
  "--dimension-line": "#7BA5C9", // dimension/measurement lines

  // Technical blue - architect's pen
  "--accent": "#5B9DD1", // soft technical blue
  "--accent-color": "#5B9DD1",

  // Interactive technical marks
  "--link": "#4A86B8", // deeper technical blue
  "--hover-accent": "#6BA8D9", // highlighted measurement

  // Featured sections - frosted tracing paper
  "--herobg": "#EDF6FC", // light blueprint wash
  "--feature-bg": "#E3F2FD", // technical overlay
  
  // Precise, architectural shadows
  "--drop-shadow": 
    "0 1px 2px rgba(30, 58, 82, 0.04), 0 2px 4px rgba(30, 58, 82, 0.02)",
  "--card-shadow": 
    "0 2px 4px rgba(30, 58, 82, 0.06), 0 4px 8px rgba(30, 58, 82, 0.03)",
  "--elevated-shadow":
    "0 4px 12px rgba(30, 58, 82, 0.08), 0 2px 6px rgba(30, 58, 82, 0.04)",

  // Inverse for overlays
  "--inverse-transparent": "rgba(30, 58, 82, 0.88)",
  "--inverse-shadow": 
    "0 8px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)",
};

export const darkTheme = {
  // Deep cosmic workspace - architect's midnight studio
  "--bg": "#0B0F16", // deep space black
  "--bg-l1": "#151A23", // drafting table surface
  "--bg-l2": "#1F2531", // elevated drawing boards
  "--bg-l3": "#2A3140", // highest workspace
  "--bg-transparent": "rgba(11, 15, 22, 0.95)",

  // Luminous technical text - glowing blueprints
  "--text-color": "#E8EDF2", // bright drafting clarity
  "--secondary-text": "#8FA3B8", // subtle annotations

  // Workshop surfaces
  "--card-bg": "#13181F", // matte drafting surface
  "--border-color": "#2D3848", // defined edges
  
  // Technical grid - glowing in darkness
  "--grid-color": "#1F2836", // subtle dark grid
  "--guide-color": "#3A4556", // construction guides
  "--dimension-line": "#4A6078", // measurement lines

  // Luminous technical blue - neon drafting light
  "--accent": "#6BB6FF", // bright architect's blue
  "--accent-color": "#6BB6FF",

  // Interactive glowing marks
  "--link": "#7EC4FF", // highlighted technical blue
  "--hover-accent": "#5AA8F0", // focused measurement

  // Featured areas - illuminated drafting zones
  "--herobg": "#1A2332", // dark blueprint base
  "--feature-bg": "#1C2738", // technical focus area
  
  // Dramatic studio lighting shadows
  "--drop-shadow": 
    "0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.25)",
  "--card-shadow": 
    "0 4px 16px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.35)",
  "--elevated-shadow":
    "0 8px 32px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(107, 182, 255, 0.08)",

  // Light overlay for modals
  "--inverse-transparent": "rgba(248, 250, 251, 0.92)",
  "--inverse-shadow": 
    "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
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