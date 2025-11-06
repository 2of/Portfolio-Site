import React from "react";
import { StandardButton } from "../UI/StandardLib/StandardButton.jsx";
import getIcon from "../../utils/Iconifier";

export const MobileExtraButtonsContainer = ({ items = [] }) => {
  return (
    <ul
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        // background: "rgba(255, 0, 0, 0.2)",
        // border: "2px solid red",
        // borderRadius: "8px",
        // listStyle: "none",
        // padding: "12px",
        // margin: 0,
        // zIndex: 9999,
        display: "flex",
        gap:"1rem",
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            // color: "black",
            // background: "white",
            // padding: "6px 10px",
            // margin: "4px 0",
            // borderRadius: "4px",
            // fontWeight: "600",
            // border: "1px solid #ccc",
          }}
        >

            <StandardButton
            label="test"
            icon = {item.icon || getIcon("blank")}
            callback={item.callback}
            type="rounded"
            />
          {/* test {i + 1} {item.label} {item.icon} */}
        </li>
      ))}
    </ul>
  );
};