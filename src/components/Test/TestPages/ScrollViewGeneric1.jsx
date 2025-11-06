import React, { useState } from "react";


import { ScrollableVerticalView } from "../../Containers/Scroll/ScrollableViews/ScrollableVerticalView";
import { PagedScrollContainer } from "../../Containers/Scroll/ScrollableViews/TikTokView";

export const TEST_ScrollViewGeneric = () => {
  const [usePaged, setUsePaged] = useState(false);

  const toggleView = () => setUsePaged((prev) => !prev);

  const content = [
    { id: 1, color: "#FFCCCC", text: "Section 1" },
    { id: 2, color: "#CCFFCC", text: "Section 2" },
    { id: 3, color: "#CCCCFF", text: "Section 3" },
    { id: 4, color: "#FFFFCC", text: "Section 4" },
        { id: 1, color: "#FFCCCC", text: "Section 1" },
    { id: 2, color: "#CCFFCC", text: "Section 2" },
    { id: 3, color: "#CCCCFF", text: "Section 3" },
    { id: 4, color: "#FFFFCC", text: "Section 4" },
        { id: 1, color: "#FFCCCC", text: "Section 1" },
    { id: 2, color: "#CCFFCC", text: "Section 2" },
    { id: 3, color: "#CCCCFF", text: "Section 3" },
    { id: 4, color: "#FFFFCC", text: "Section 4" },    { id: 1, color: "#FFCCCC", text: "Section 1" },
    { id: 2, color: "#CCFFCC", text: "Section 2" },
    { id: 3, color: "#CCCCFF", text: "Section 3" },
    { id: 4, color: "#FFFFCC", text: "Section 4" },    { id: 1, color: "#FFCCCC", text: "Section 1" },
    { id: 2, color: "#CCFFCC", text: "Section 2" },
    { id: 3, color: "#CCCCFF", text: "Section 3" },
    { id: 4, color: "#FFFFCC", text: "Section 4" },    { id: 1, color: "#FFCCCC", text: "Section 1" },
    { id: 2, color: "#CCFFCC", text: "Section 2" },
    { id: 3, color: "#CCCCFF", text: "Section 3" },
    { id: 4, color: "#FFFFCC", text: "Section 4" },    { id: 1, color: "#FFCCCC", text: "Section 1" },
    { id: 2, color: "#CCFFCC", text: "Section 2" },
    { id: 3, color: "#CCCCFF", text: "Section 3" },
    { id: 4, color: "#FFFFCC", text: "Section 4" },    { id: 1, color: "#FFCCCC", text: "Section 1" },
    { id: 2, color: "#CCFFCC", text: "Section 2" },
    { id: 3, color: "#CCCCFF", text: "Section 3" },
    { id: 4, color: "#FFFFCC", text: "Section 4" },
  ];

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <div
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 9999,
          background: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <button onClick={toggleView}>
          {usePaged ? "Use Standard Scroll" : "Use Paged Scroll"}
        </button>
      </div>

      {usePaged ? (
        <PagedScrollContainer>
          {content.map((item) => (
            <div
              key={item.id}
              style={{
                background: item.color,
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
              }}
            >
              {item.text}
            </div>
          ))}
        </PagedScrollContainer>
      ) : (
        <ScrollableVerticalView trackVelocity>
          {content.map((item) => (
            <div
              key={item.id}
              style={{
                background: item.color,
                padding: "4rem",
                borderRadius: "8px",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              {item.text}
            </div>
          ))}
        </ScrollableVerticalView>
      )}
    </div>
  );
};