import React, { useState } from "react";
import styles from "./styles/HeaderForm.module.scss";
import { StandardTextField } from "../UI/StandardTextField";
import { StandardButton } from "../UI/StandardButton";
import { StandardDropdown } from "../UI/StandardDropDown";
import getIcon from "../../utils/Iconifier";

const iconOptions = [
  { value: "code", label: "code" },
  { value: "paper", label: "Paper" },
  { value: "complete", label: "Complete" },
  { value: "link", label: "Link" },
];

const typeOptions = [
  { value: "internal_link", label: "Internal Link" },
  { value: "external_link", label: "External Link" },
];

// Moved out of HeaderForm to preserve focus
const HeaderForm = ({ workingJSON = {}, onChange = () => {} }) => {
  const [formData, setFormData] = useState({
    name: workingJSON.name || "",
    title: workingJSON.title || "",
    subtitle: workingJSON.subtitle || "",
    heroImage: workingJSON.heroImage || "",
    heroLinks: workingJSON.heroLinks || [],
    shortDesc: workingJSON.shortDesc || "",
    author: workingJSON.author || "",
    date: workingJSON.date || "",
    tools: workingJSON.tools || [],
    extratext: workingJSON.extratext || "",
  });

  const handleFieldChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const setHeroLinks = (heroLinks) => {
    handleFieldChange("heroLinks", heroLinks);
  };

return (
  <div className={styles.headerForm}>

    <fieldset className={styles.fieldGroup}>
      <legend>Identification</legend>
      <StandardTextField
        name="name"
        label="Article ID"
        value={formData.name}
        onChange={(val) => handleFieldChange("name", val)}
        placeholder="exampleProject"
          type="flat"
      />
      <StandardTextField
        name="title"
        label="Page Title"
        value={formData.title}
        onChange={(val) => handleFieldChange("title", val)}
   type="flat"
      />
      <StandardTextField
        name="subtitle"
        label="Subtitle"
        value={formData.subtitle}
        onChange={(val) => handleFieldChange("subtitle", val)}
        placeholder="Extra context or a short blurb"
   type="flat"
      />
    </fieldset>

    <fieldset className={styles.fieldGroup}>
      <legend>Hero Section</legend>
      <StandardTextField
        name="heroImage"
        label="Hero Image URL"
        value={formData.heroImage}
        onChange={(val) => handleFieldChange("heroImage", val)}
        placeholder="/assets/images/example-hero.png"
       type="flat"
      />
      <StandardTextField
        name="shortDesc"
        label="Short Description"
        value={formData.shortDesc}
        onChange={(val) => handleFieldChange("shortDesc", val)}
        placeholder="Optional — displayed in preview cards"
     type="flat"
      />
    </fieldset>

    <fieldset className={styles.fieldGroup}>
      <legend>Meta Info</legend>
      <StandardTextField
        name="author"
        label="Author"
        value={formData.author}
        onChange={(val) => handleFieldChange("author", val)}
        placeholder="Your name"
    type="flat"
      />
      <StandardTextField
        name="date"
        label="Date"
        value={formData.date}
        onChange={(val) => handleFieldChange("date", val)}
        placeholder="Month Year (e.g. February 2025)"
   type="flat"
      />
      <StandardTextField
        name="tools"
        label="Tools Used"
        value={formData.tools.join(", ")}
        onChange={(val) =>
          handleFieldChange("tools", val.split(",").map((s) => s.trim()))
        }
        placeholder="Comma-separated list (e.g. PyTorch, Colab, ResNet50)"
     type="flat"
      />
    </fieldset>

    <fieldset className={styles.fieldGroup}>
      <legend>Notes</legend>
      <StandardTextField
        name="extratext"
        label="Extra Notes"
        value={formData.extratext}
        onChange={(val) => handleFieldChange("extratext", val)}
        placeholder="Any post-script or optional comment"
        type="flat"
      />
    </fieldset>

    <fieldset className={styles.fieldGroup}>
      <legend>Hero Links</legend>
      <HeroLinkHandler heroLinks={formData.heroLinks} setHeroLinks={setHeroLinks} />
    </fieldset>
  </div>
);
};



const HeroLinkHandler = ({ heroLinks, setHeroLinks }) => {
  const addHeroLink = () => {
    setHeroLinks([...heroLinks, { title: "", type: "", to: "", icon: "" }]);
  };

  const updateHeroLink = (index, field, value) => {
    const updatedLinks = [...heroLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setHeroLinks(updatedLinks);
  };

  const removeHeroLink = (index) => {
    const updatedLinks = heroLinks.filter((_, i) => i !== index);
    setHeroLinks(updatedLinks);
  };

  return (
    <>
      <p>Hero Link Count: {heroLinks.length}</p>
      <StandardButton
        label="Add Hero Link"
        type="article"
        callback={addHeroLink}
      />
      {heroLinks.map((data, i) => (
        <div key={i} className={styles.heroLinkItem}>
          <h4>Hero Link {i + 1}</h4>

          <StandardTextField
            name={`hero-link-title-${i}`}
            label="Title"
            value={data.title}
            onChange={(val) => updateHeroLink(i, "title", val)}
            placeholder="e.g. Code Repository"
      type="flat"
          />

          <StandardTextField
            name={`hero-link-to-${i}`}
            label="Destination URL"
            value={data.to}
            onChange={(val) => updateHeroLink(i, "to", val)}
            placeholder="https://example.com"
            type="flat"
          />

          <StandardDropdown
            label="Link Type"
            name={`hero-link-type-${i}`}
            selectedValue={data.type}
            onChange={(val) => updateHeroLink(i, "type", val)}
            options={typeOptions}
            variant="icon"
          />

          <StandardDropdown
            label="Icon"
            name={`hero-link-icon-${i}`}
            selectedValue={data.icon}
            onChange={(val) => updateHeroLink(i, "icon", val)}
            options={iconOptions}
            variant="icon"
          />

          <StandardButton
            label="Remove"
        type="flat"
            callback={() => removeHeroLink(i)}
          />
        </div>
      ))}
    </>
  );
};
export default HeaderForm;
