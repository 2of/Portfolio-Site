import React, { useState } from "react";
import { useProjects } from "../contexts/ContentContext";
import styles from "./JunkPage.module.scss";
import { RadialMenu } from "../components/RadialMenu";
import { DarkModeTile } from "../components/darkmodeTile";
import { useGlobalContext } from "../contexts/GlobalContext";
import TextOnPath from "../components/Misc/TextPath";
import FlowChartComponent from "../components/Misc/FlowChart";
import WigglyLine from "../components/Misc/WigglyLine";
import image from "../assets/images/default.png";
import image2 from "../assets/images/default_other.jpeg";
import { DarkModeWrapper } from "../components/UI/DarkModeWrapper";
import ProgressBar from "../components/UI/ProgressBar";
import ImageHandle from "../components/Handlers/ImageHandle";
import Loader from "../components/Loader";
import { StandardDropdown } from "../components/UI/StandardDropDown";
import { StandardTextField } from "../components/UI/StandardTextField";
import { StandardCollapsableRow } from "../components/UI/CollapsableSection";
import getIcon from "../utils/Iconifier";
import { useAlertMenu } from "../contexts/AlertMenuContext";

export const JunkPage = () => {
  const { alertState, showAlert, hideAlert, alertVisible } = useAlertMenu();
  const { getSkills } = useProjects();
  const skills = getSkills();
  
  const [currentPath, setCurrentPath] = useState([]);
  const [currpathPoint, setCurrPathPoint] = useState(0);
  const [selected, setSelected] = useState("apple");
  const [text, setText] = useState("blah blah");
  
  const {
    openShareSheet,
    shareSheetVisible,
    shareSheetData,
           showScrollIndicator,
        hideScrollIndicator,
        scrollIndicatorStatus
  } = useGlobalContext();

  const testData = {
    nodes: [
      { id: '1', label: 'Input' },
      { id: '2', label: 'Process' },
      { id: '3', label: 'Validate' },
      { id: '4', label: 'Complete' }
    ],
    links: [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
      { source: '3', target: '4' }
    ]
  };

  const triggerAlert = () => {
    showAlert({
      title: "Hello!",
      message: "This is a test alert.",
  
    });
  };

  return (
    <div className={styles.page}>
      {/* Header Section */}
      <div className={`${styles.chunk} ${styles.centered}`}>
        <h1>Junk Page</h1>
        <h2>Welcome 🔨👷🏻‍♂️</h2>
        <p>This is the 'miscellaneous' page full of random components and tests (woohoo!)</p>
        <p>It's just here for fun :)</p>
      </div>

      {/* Alert System Section */}
      <div className={styles.chunk}>
        <h3>Alert System</h3>
        <div>
          <p>Open: {alertState.open ? "Yes" : "No"}</p>
          <p>Title: {alertState.title || "(none)"}</p>
          <p>Message: {alertState.message || "(none)"}</p>
          <p>Buttons: {alertState.buttons.length}</p>
          <button onClick={triggerAlert}>Show Alert</button>
        </div>

        {alertVisible ? "YES " : "no"}alertVisible
      </div>

      {/* Share Sheet Section */}
      <div className={styles.chunk}>
        <h3>Share Sheet</h3>
        <button
          onClick={() =>
            openShareSheet(
              "https://example.com",
              "twitter",
              "Testing description",
              "Test title"
            )
          }
        >
          Share This
        </button>
        <p>Share Sheet is {shareSheetVisible ? "Open" : "Closed"}</p>
        <p>URL: {shareSheetData.URL}</p>
        <p>Description: {shareSheetData.initialDescription}</p>
        <p>Title: {shareSheetData.title}</p>
        <button onClick={() => console.log(shareSheetData)}>
          Log Share Sheet Data
        </button>
      </div>

      <div className={styles.chunk}>


        <button onClick={showScrollIndicator}>
          show scroll indicator
        </button>



        <button onClick={hideScrollIndicator}>
          hide scroll indicator
        </button>
      </div>
        
      {/* UI Components Section */}
      <div className={styles.chunk}>
        <h3>UI Components</h3>
        
        <div className={styles.subChunk}>
          <h4>Progress Bars</h4>
          <ProgressBar
            style="linear"
            animated
            val={68}
            lowerBound={50}
            upperBound={100}
            showVal
            showBounds
          />
          <ProgressBar
            style="round"
            animated
            val={199}
            lowerBound={50}
            upperBound={550}
            showVal
            showBounds
          /> 
          <ProgressBar
            style="linear"
            animated
            val={6833}
            lowerBound={50}
            upperBound={10033}
            showVal
            showBounds
          />
        </div>
        
        <div className={styles.subChunk}>
          <h4>Loader</h4>
          <Loader/>
        </div>
        
        <div className={styles.subChunk}>
          <h4>Dropdown</h4>
          <StandardDropdown
            label="Select a fruit"
            name="fruits"
            selectedValue={selected}
            onChange={setSelected}
            options={[
              { value: "apple", label: "Apple" },
              { value: "banana", label: "Banana" },
              { value: "mystery", label: "???" },
            ]}
            variant="icon"
          />
        </div>
        
        <div className={styles.subChunk}>
          <h4>Text Fields</h4>
          <StandardTextField
            name="bio"
            label="Bio (Default)"
            value={text}
            onChange={setText}
            placeholder="Tell us a little about yourself..."
            type="default"
          />
          <StandardTextField
            name="bio"
            label="Bio (Multiline Flat)"
            value={text}
            onChange={setText}
            multiline
            rows={5}
            placeholder="Tell us a little about yourself..."
            type="flat"
          />
          <StandardTextField
            name="title"
            label="Page Title"
            value={text}
            onChange={setText}
            placeholder="Big H1-style field"
            type="header"
          />
        </div>
      </div>

      {/* Collapsable Sections */}
      <div className={styles.chunk}>
        <h3>Collapsable Sections</h3>
        <StandardCollapsableRow 
          title="Basic Section"
          defaultOpen={false}
        >
          <div style={{ padding: "1rem", background: "#f8f8f8" }}>
            This is the content of a basic collapsable section
          </div>
        </StandardCollapsableRow>

        <StandardCollapsableRow
          key={1}
          title={"Advanced Section"}
          buttons={[
            { label: "delete", callback: () => console.log("Delete") },
            { label: "arrowUp", callback: () => console.log("Move up") },
            { label: getIcon("smile"), callback: () => console.log("Smile") }
          ]}
        >
          <div style={{ padding: "1rem", background: "#f8f8f8" }}>
            This section has action buttons
          </div>
        </StandardCollapsableRow>
      </div>

      {/* Radial Menu Section */}
      <div className={`${styles.chunk} ${styles.centered}`}>
        <h3>Radial Menu</h3>
        <RadialMenu
          data={skills}
          isRoot={true}
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
          initialRadius={150}
        />
        <p>The above is rendered using recursive component rendering from the following JSON</p>
        <pre><code>{JSON.stringify(skills, null, 2)}</code></pre>
      </div>

      {/* Visual Components Section */}
      <div className={styles.chunk}>
        <h3>Visual Components</h3>
        
        <div className={styles.subChunk}>
          <h4>Dark Mode Tile</h4>
          <DarkModeTile grayscale={false} />
        </div>
        
        <div className={styles.subChunk}>
          <h4>Flow Chart</h4>
          <FlowChartComponent data={testData} />
        </div>
        
        <div className={styles.subChunk}>
          <h4>Text on Path</h4>
          <TextOnPath
            position={currpathPoint}
            pathData="M10,60 Q40,90 70,60 T130,60 T190,60 T250,60"
            text="Follow me!"
            width={200}
            height={100}
          />
          <button onClick={() => setCurrPathPoint((prev) => prev + 0.01)}>
            Animate Path
          </button>
        </div>
        
        <div className={styles.subChunk}>
          <h4>Wiggly Line</h4>
          <WigglyLine />
        </div>
        
        <div className={styles.subChunk}>
          <h4>Dark Mode Wrapper</h4>
          <DarkModeWrapper/>
        </div>
      </div>

      {/* Image Handling Section */}
      <div className={styles.chunk}>
        <h3>Image Handling</h3>
        <ImageHandle src={image} alt="test" />
        <ImageHandle src={image} alt="test" />
        <ImageHandle src={image2} alt="test" />
      </div>

      {/* IFrame Test Section */}
      <div className={styles.chunk}>
        <h3>IFrame Test</h3>
        <iframe
          src="/"
          width="100%"
          height="500px"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};