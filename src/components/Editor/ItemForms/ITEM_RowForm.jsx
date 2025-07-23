import React from "react";
import styles from "./itemforms.module.scss";

export const GridItem = ({ item, onChange }) => {
  const rows = item.rows || [];

  const handleLabelChange = (index, newLabel) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], label: newLabel };
    onChange({ rows: updatedRows });
  };

  const handleValueChange = (index, newValue) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      value: Number(newValue),
    };
    onChange({ rows: updatedRows });
  };

  const handleAddRow = () => {
    const updatedRows = [...rows, { label: "", value: 0 }];
    onChange({ rows: updatedRows });
  };

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    onChange({ rows: updatedRows });
  };

  return (
    <div className={styles.gridItem}>
      {rows.map((row, index) => (
        <div key={index} className={styles.row}>
          <label>
            Label:
            <input
              className={styles.input}
              value={row.label || ""}
              onChange={(e) => handleLabelChange(index, e.target.value)}
            />
          </label>

          <label>
            Value:
            <input
              className={styles.input}
              type="number"
              value={row.value || 0}
              onChange={(e) => handleValueChange(index, e.target.value)}
            />
          </label>

          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => handleDeleteRow(index)}
          >
            ✕
          </button>
        </div>
      ))}

      <button type="button" className={styles.addButton} onClick={handleAddRow}>
        + Add Row
      </button>
    </div>
  );
};