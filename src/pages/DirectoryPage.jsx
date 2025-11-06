import React from "react";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import { CenteredContainer } from "../components/Containers/Scroll/CenteredContainer";
import { ScrollableVerticalView } from "../components/Containers/Scroll/ScrollableViews/ScrollableVerticalView";
import RowView from "../components/UI/RowView";
import getIcon from "../utils/Iconifier";
import useScreenSize from "../utils/screensize";
import { StandardButton } from "../components/UI/StandardLib/StandardButton.jsx";

export const DirectoryPage = () => {
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const mobile = screenSize === "sm";

  // Helper to stringify route info
  const stringifyRouteInfo = (route) => {
    const { path, label, icon, hideDesktop, bg, fullscreenDesktop, fullscreenMobile, element } = route;
    return `Path: ${path}, Label: ${label}, Icon: ${icon || "none"}, HideDesktop: ${hideDesktop || false}, BG: ${bg || "none"}, FullscreenDesktop: ${fullscreenDesktop || false}, FullscreenMobile: ${fullscreenMobile || false}`;
  };

  // Map each route to a RowView row
const mappedRoutes = [
      {
    label: "Entire Directory",
    paragraph: "",
    component: null, // No interactive component for a label
  },

      {
    label: "Why is there so much Junk here?",
    paragraph: "I like to keep the deprecated pages around, there's no guarantee they work (i.e. changed a bunch of frameworks in here...., but for the most part they should be fine.. and it's fun to look back on....)",
    // disable: true,
    component: null, // No interactive component for a label
  },

  {
    label: "All Routes",
    paragraph: "",
    component: null, // No interactive component for a label
  },

  


  ...routes.map((route) => ({
    label: route.path,
    // paragraph: stringifyRouteInfo(route),
    disable: false,
    component: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

        {/* <button
          style={{ cursor: "pointer" }}
          onClick={() => navigate(route.path)}
        >





          
          Go
        </button> */}

            <StandardButton
            label={route.label}
            type="article"
            icon={getIcon(route.icon)}
            callback={() => navigate(route.path)}
          />
      </div>
    ),
  })),
];

  return screenSize === "sm" ? (
    <ScrollableVerticalView alignCenter={screenSize !== "sm"}>
      <RowView mobile={mobile} rows={mappedRoutes} />
    </ScrollableVerticalView>
  ) : (
    <CenteredContainer>
      <div style={{ width: "100%", maxWidth: 800 }}>
        <RowView mobile={mobile} rows={mappedRoutes} />
      </div>
    </CenteredContainer>
  );
};