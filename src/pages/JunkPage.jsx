import React, { useState } from "react";
import { useProjects } from "../contexts/ContentContext";
import styles from "./JunkPage.module.scss";
import { RadialMenu } from "../components/RadialMenu";
import { BackGround } from "../components/Misc/Background";
import ImageHandle from "../components/ImageHandle";
import { DarkModeTile } from "../components/darkmodeTile";
import { useGlobalContext } from "../contexts/GlobalContext";
import TextOnPath from "../components/Misc/TextPath";
import FlowChartComponent from "../components/Misc/FlowChart";
import WigglyLine from "../components/Misc/WigglyLine";
import image from "../assets/images/default.png";
import image2 from "../assets/images/default_other.jpeg";
import { DarkModeWrapper } from "../components/UI/DarkModeWrapper";

export const JunkPage = () => {
  const { getSkills } = useProjects();
  const skills = getSkills();
  const [currentPath, setCurrentPath] = useState([]);
  const [currpathPoint, setCurrPathPoint] = useState(0);

  const {
    openShareSheet,
    shareSheetVisible,
    shareSheetData,
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

  return (
    <div className={styles.page}>
      
      <div className={`${styles.chunk} ${styles.centered}`}>
        <h1>junk page</h1>
        <h1>Welcome 🔨👷🏻‍♂️</h1>
        <h2>This is the 'miscellaneous' page full of random components and tests (woohoo!)</h2>


        <h1>It's just here for fun :) </h1>
      </div>

      <div className={styles.chunk}>
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

      <div className={`${styles.chunk} ${styles.centered}`}>
        <RadialMenu
          data={skills}
          isRoot={true}
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
          initialRadius={150}
        />
      </div>

      <div className={`${styles.chunk} ${styles.centered}`}>
        <p>The above is rendered using recursive component rendering from the following JSON</p>
        <pre><code>{JSON.stringify(skills, null, 2)}</code></pre>
      </div>

      <div className={`${styles.chunk} ${styles.centered}`}>
        <BackGround />
      </div>

      <div className={`${styles.chunk} ${styles.centered}`}>
        <DarkModeTile grayscale={false} />
      </div>

      <div className={styles.chunk}>
        <FlowChartComponent data={testData} />
      </div>

      <div className={styles.chunk}>
        <iframe
          src="/"
          width="100%"
          height="500px"
          style={{ border: "none" }}
        />
      </div>

      <div className={styles.chunk}>
        <p>test</p>
      </div>

      <div className={styles.chunk}>
        <p>test test test</p>
      </div>

      <div className={styles.chunk}>
        <ImageHandle src={image} alt="test" />
        <ImageHandle src={image} alt="test" />
        <ImageHandle src={image2} alt="test" />
      </div>

      <div className={`${styles.chunk} ${styles.centered}`}>
        <TextOnPath
          position={currpathPoint}
          pathData="M10,60 Q40,90 70,60 T130,60 T190,60 T250,60"
          text="Follow me!"
          width={200}
          height={100}
        />
        <button onClick={() => setCurrPathPoint((prev) => prev + 0.01)}>
          test
        </button>
      </div>

      <div className={styles.chunk}>
        <FlowChartComponent data={testData} />
      </div>

      <div className={styles.chunk}>
        <h1>test</h1>
        <WigglyLine />

        <DarkModeWrapper/>
      </div>

    </div>
  );
};