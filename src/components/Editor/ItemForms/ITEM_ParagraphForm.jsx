// ItemForms/ParagraphItem.jsx
import React from "react";
import { StandardTextField } from "../../UI/StandardLib/StandardTextField.jsx";
export const ParagraphItem = ({ item, onChange }) => {
  return (
    <StandardTextField
      label="Paragraph Text"
      value={item.text}
      onChange={(text) => onChange({ ...item, text })}
      multiline
      rows={4}
      tooltip="Write your paragraph content here"
    />
  );
};