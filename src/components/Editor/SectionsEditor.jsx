import React, { useState } from "react";
import { itemTypes, ProcureItem } from "./Items";
import { StandardDropdown } from "../UI/StandardDropDown";
import { StandardButton } from "../UI/StandardButton";
import { StandardCollapsableRow } from "../UI/CollapsableSection";
import { StandardTextField } from "../UI/StandardTextField";
import StandardToggle  from "../UI/StandardToggle";
import getIcon from "../../utils/Iconifier";

export const SectionEditor = ({ section, onChange }) => {
  const [newItemType, setNewItemType] = useState(itemTypes[0]?.type || "");

  const handleFieldChange = (field, value) => {
    onChange({ ...section, [field]: value });
  };

  const handleAddItem = () => {
    const newItem = {
      type: newItemType,
      content: "",
    };

    const updatedItems = [...(section.items || []), newItem];
    handleFieldChange("items", updatedItems);
  };

  const handleItemChange = (index, updatedItem) => {
    const updatedItems = [...(section.items || [])];
    updatedItems[index] = { ...updatedItems[index], ...updatedItem };
    handleFieldChange("items", updatedItems);
  };

  const handleBoostToggle = () => {
    onChange({ boost: !section.boost });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <StandardTextField
        name="section-name"
        label="Section Name"
        value={section.name || ""}
        onChange={(val) => handleFieldChange("name", val)}
        placeholder="e.g. Introduction"
        type="flat"
      />

      <StandardToggle
        type="flat"
        checked={!!section.boost}
        callback={handleBoostToggle}
        firsticon={getIcon("moon")}
        secondicon={getIcon("sun")}
      />

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <StandardDropdown
          label="New item type"
          name="newItemType"
          selectedValue={newItemType}
          onChange={setNewItemType}
          options={itemTypes.map((t) => ({ value: t.type, label: t.label }))}
          variant="icon"
        />
        <StandardButton label="Add Item" callback={handleAddItem} type="flat" />
      </div>

      <div>
        <h4>🧩 Items</h4>
        {(section.items || []).map((item, index) => (
          <div key={item.id || `${item.type}-${index}`} style={{ marginBottom: "12px" }}>
            <StandardCollapsableRow title={item.type}>
              <ProcureItem
                item={item}
                onChange={(newData) => handleItemChange(index, newData)}
              />
            </StandardCollapsableRow>
          </div>
        ))}
      </div>
    </div>
  );
};