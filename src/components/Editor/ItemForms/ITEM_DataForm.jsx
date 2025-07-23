export const DataItem = ({ item, onChange }) => {
  const handleTypeChange = (e) => {
    onChange({ type: e.target.value });
  };

  const handleLabelChange = (index, newLabel) => {
    const updated = [...(item.datapoints || [])];
    updated[index] = { ...updated[index], label: newLabel };
    onChange({ datapoints: updated });
  };

  const handleValueChange = (index, newValue) => {
    const updated = [...(item.datapoints || [])];
    updated[index] = { ...updated[index], value: Number(newValue) };
    onChange({ datapoints: updated });
  };

  const handleUpperChange = (index, newVal) => {
    const updated = [...(item.datapoints || [])];
    updated[index] = { ...updated[index], upperBound: Number(newVal) };
    onChange({ datapoints: updated });
  };

  const handleLowerChange = (index, newVal) => {
    const updated = [...(item.datapoints || [])];
    updated[index] = { ...updated[index], lowerBound: Number(newVal) };
    onChange({ datapoints: updated });
  };

  const handleCurveChange = (e) => {
    onChange({ curve: e.target.value });
  };

  return (
    <div>
      <label>
        Data type:
        <input value={item.type || ""} onChange={handleTypeChange} />
      </label>

      <label>
        Curve:
        <select value={item.curve || ""} onChange={handleCurveChange}>
          <option value="">Select curve</option>
          <option value="linear">Linear</option>
          <option value="round">Round</option>
        </select>
      </label>

      {(item.datapoints || []).map((dp, i) => (
        <div key={i}>
          <label>
            Label:
            <input
              value={dp.label || ""}
              onChange={(e) => handleLabelChange(i, e.target.value)}
            />
          </label>

          <label>
            Value:
            <input
              type="number"
              value={dp.value || ""}
              onChange={(e) => handleValueChange(i, e.target.value)}
            />
          </label>

          <label>
            Upper Bound:
            <input
              type="number"
              value={dp.upperBound || ""}
              onChange={(e) => handleUpperChange(i, e.target.value)}
            />
          </label>

          <label>
            Lower Bound:
            <input
              type="number"
              value={dp.lowerBound || ""}
              onChange={(e) => handleLowerChange(i, e.target.value)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};