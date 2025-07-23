import React from "react";
import { HighlightItem } from "./ItemForms/ITEM_HighlightForm";
import { ParagraphItem } from "./ItemForms/ITEM_ParagraphForm";
import { DataItem } from "./ItemForms/ITEM_DataForm";  // <- import it
import { GridItem } from "./ItemForms/ITEM_RowForm";

export const itemTypes = [
  { type: "plaintext", label: "Plain Text" },
  { type: "highlight", label: "Highlight" },
  { type: "quote", label: "Quote" },
  { type: "code", label: "Code Snippet" },
  { type: "data", label: "Data" }, 
  {type: "grid", label : "GRID"} // <- add to list
];

// Returns the right item form based on the item.type
export const ProcureItem = ({ item, onChange }) => {
  switch (item.type) {
    case "highlight":
      return <HighlightItem item={item} onChange={onChange} />;
    case "plaintext":
      return <ParagraphItem item={item} onChange={onChange} />;
    case "data":
      return <DataItem item={item} onChange={onChange} />;
    case "quote":
      return <div>Quote form not implemented</div>;
      case "grid":
  return <GridItem item={item} onChange={onChange} />;
    case "code":
      return <div>Code snippet form not implemented</div>;
    default:
      return <div>Unknown item type: {item.type}</div>;
  }
};