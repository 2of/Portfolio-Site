// ItemForms/HighlightItem.jsx
import React from "react";
import { StandardTextField } from "../../UI/StandardTextField";

export const HighlightItem = ({ item, onChange }) => {
  return (
    <StandardTextField
      label="Highlight"
      value={item.text}
      onChange={(text) => onChange({ ...item, text })}
      tooltip="This text will be visually emphasized in the article."
    />
  );
};