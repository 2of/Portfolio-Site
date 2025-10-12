import React from "react";
import { ProjectProvider } from "./ContentContext";
import { AlertMenuProvider } from "./AlertMenuContext";
import { ScreenSizeProvider, useScreenSize } from "./ScreenSizeProvider";
import { TooltipProvider } from "./tooltip";
import { GlobalProvider } from "./GlobalContext";
import { RouteProvider, useIsMenuFloatingDesktop } from "./RouteContext";
import { DarkModeProvider, useDarkMode } from "./DarkModeContext";
import {
  baseTheme,
  darkTheme,
  hiddenNavHeight,
  inlineNavHeight,
  lightTheme,
} from "../styles/Themes";
import { ThemeProvider } from "./ThemeProvider";
import { ModalMenuProvider } from "./ModalContext";
import { NavStackProvider } from "./NavStackContext";
function InnerThemeWrapper({ children }) {
  const { darkMode: isDark } = useDarkMode();
  const floatingNav = useIsMenuFloatingDesktop();
  const screenSize = useScreenSize();

  const theme = React.useMemo(() => {
    let navTheme;
    if (floatingNav) {
      navTheme = hiddenNavHeight;
    } else {
      navTheme = screenSize !== "sm" ? hiddenNavHeight : inlineNavHeight;
    }

    const result = {
      ...baseTheme,
      ...navTheme,
      ...(isDark ? darkTheme : lightTheme),
    };

    console.log("%c[Theme Updated]", "color: hotpink; font-weight: bold;", {
      floatingNav,
      screenSize,
      isDark,
      theme: result,
    });

    return result;
  }, [screenSize, floatingNav, isDark]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export const ContextWrapper = ({ children }) => {
  const screenSize = useScreenSize();
  return (
    <GlobalProvider>
      <DarkModeProvider>
        <NavStackProvider>
          <ProjectProvider>
            <RouteProvider>
              <TooltipProvider>
                <ModalMenuProvider>
                  <AlertMenuProvider>
                    <ScreenSizeProvider>
                      <InnerThemeWrapper>{children}</InnerThemeWrapper>
                    </ScreenSizeProvider>
                  </AlertMenuProvider>
                </ModalMenuProvider>
              </TooltipProvider>
            </RouteProvider>
          </ProjectProvider>
        </NavStackProvider>
      </DarkModeProvider>
    </GlobalProvider>
  );
};
