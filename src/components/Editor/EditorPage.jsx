import React, { useState } from "react";
import styles from "./styles/editor.module.scss";
import HeaderForm from "./HeaderForm";
import { TitleSectionPortable, Article } from "../Article/Article";
import { StandardCollapsableRow } from "../UI/CollapsableSection";
import { StandardButton } from "../UI/StandardButton";
import getIcon from "../../utils/Iconifier";
import { SectionEditor } from "./SectionsEditor";
import { useEffect } from "react";
import WigglyLine from "../Misc/WigglyLine";
import { Modal } from "../Modal";
import { useAlertMenu } from "../../contexts/AlertMenuContext";
import useScreenSize from "../../utils/screensize";
export const EditorPage = () => {

  const { alertState, showAlert, hideAlert, alertVisible } = useAlertMenu();
  const screenSize = useScreenSize();
  const [hasShownWarning, sethasShownWarning] = useState(false)


    const triggerAlert = () => {
      if (hasShownWarning) return;
    showAlert({
      title: "A small FYI",
      message: "This page has no mobile view, but it's enabled for fun :)",
  
    });
    sethasShownWarning(1)
  };


useEffect(() => {
  const timer = setTimeout(() => {
    if (screenSize === "sm") {
      triggerAlert({
        title: "Small screen detected",
        message: "You're using a small device!",
        buttons: [{ label: "OK" }],
      });
    }
  }, 2000); // 2 seconds

  return () => clearTimeout(timer);
}, [screenSize]);
  const [article, setArticle] = useState({
    name: "sample-name",
    title: "Sample Project Title",
    subtitle: "Sample project subtitle description",
    heroImage: "/sample-path/hero.png",
    shortDesc: "Sample short description for SEO/social sharing",
    author: "Sample Author",
    date: "Month 20XX",
    tools: ["sample-tool-1", "sample-tool-2"],
    extratext: "Sample achievement text",
    heroLinks: [
      { text: "Sample link 1", url: "#", icon: "sample-icon" },
      { text: "Sample link 2", url: "#", icon: "sample-icon" },
    ],
    sections: [],
    link: { text: "Sample back link", url: "#" },
  });

  const handleHeaderChange = (updatedMetadata) => {
    setArticle((prev) => ({
      ...prev,
      ...updatedMetadata,
    }));
  };

   const [isModalOpen, setIsModalOpen] = useState(false);


 const handleShowRender = () => {
        setIsModalOpen(true);
 }

  const handleCloseRender = () => {
    setIsModalOpen(false);

  };
  const handleSectionUpdate = (index, newData) => {
    const updated = [...article.sections];
    updated[index] = { ...updated[index], ...newData };
    setArticle((prev) => ({ ...prev, sections: updated }));
  };

  const handleAddSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      type: "plaintext",
      content: "",
    };
    setArticle((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const deleteSection = (idToDelete) => {
    setArticle((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== idToDelete),
    }));
  };

  const moveSectionUp = (index) => {
    if (index <= 0) return; // Already at top
    setArticle((prev) => {
      const updated = [...prev.sections];
      const temp = updated[index - 1];
      updated[index - 1] = updated[index];
      updated[index] = temp;
      return { ...prev, sections: updated };
    });
  };

  const moveSectionDown = (index) => {
    if (index >= article.sections.length - 1) return; // Already at bottom
    setArticle((prev) => {
      const updated = [...prev.sections];
      const temp = updated[index + 1];
      updated[index + 1] = updated[index];
      updated[index] = temp;
      return { ...prev, sections: updated };
    });
  };

  return (

    <>
    {isModalOpen && ( 
  <Modal
          component={<Article fixeddata={article}/>}
          onClose={handleCloseRender}
          size="large"
          title="test"
          isOpen={isModalOpen}
        />)}

    <div className={styles.pageWrapper}>
      <div className={styles.layoutGrid}>
        {/* Left Column - Content */}
        <div className={styles.contentColumn}>
          <h1>Article ✍️  Editor 🕵🏻‍♀️</h1>

          <p className={styles.subtitle}>Exists purely because I am lazy</p>


          {/* Header Section */}
          <h2>Header and Metadata</h2>
          <StandardCollapsableRow title="header" useStandardStyle>
            <div className={styles.sidebysidecells}>
              <div className={styles.inputBox}>
      
                <HeaderForm
                  initialData={article}
                  onChange={handleHeaderChange}
                />
              </div>
         
            </div>
          </StandardCollapsableRow>

          <div className={styles.controlsRow}>

          
            <span> Currently  {article.sections.length} section </span>
            <WigglyLine/>          <StandardButton  fillContainer type="basic_Expand" label="Preview" callback={handleShowRender}/>
              <StandardButton  fillContainer type="basic_Expand" label = "+ Section" callback={handleAddSection}/>
          </div>
          {article.sections.map((section, i) => (
            <StandardCollapsableRow
              key={section.id}
              title={section.name || `Section ${i + 1}`}
              buttons={[
                {
                  label: "🗑️ delete",
                  callback: () => deleteSection(section.id),
                },
                {
                  label: "⬆️ up",
                  callback: () => moveSectionUp(i),
                },
                {
                  label: "⬇️ down",
                  callback: () => moveSectionDown(i),
                },
              ]}
              useStandardStyle
            >
              <div className={styles.sidebysidecells}>
                {/* You can insert a section content form here later */}

                <SectionEditor
                  section={section}
                  onChange={(newData) => handleSectionUpdate(i, newData)}
                />
              </div>
            </StandardCollapsableRow>
          ))}
        </div>

        {/* Right Column - JSON */}
        <div className={styles.jsonColumn}>
          <div className={styles.jsonBox}>
            <h4>🧾 JSON Output</h4>
            <pre className={styles.jsonOutput}>
              {JSON.stringify(article, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>

        </>
  );
};
