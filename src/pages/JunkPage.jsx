import React, { useState } from "react";
import { useProjects } from "../contexts/ContentContext";
import styles from "./JunkPage.module.scss"; // Import SCSS for styling
import { RadialMenu } from "../components/RadialMenu";
import { BackGround } from "../components/Misc/Background";
import ImageHandle from "../components/ImageHandle";
import { StandardButton } from "../components/UI/StandardButton";
import image from "../assets/images/default.png"
import image2 from "../assets/images/default_other.jpeg"
import { DarkModeTile } from "../components/darkmodeTile";
import { DynamicNav } from "../layouts/MainLayout/MobileNav";
import TextOnPath from "../components/Misc/TextPath";
export const JunkPage = () => {
  const { getSkills } = useProjects();
  const skills = getSkills(); // Get nested skills
  const [currentPath, setCurrentPath] = useState([]); // Track the current path



  const [currpathPoint, setCurrPathPoint] = useState(0)

  return (
    <div className={styles.page}>
     <div className={styles.centered}>
     <h1>junk page</h1>
<h1> Welcome 🔨👷🏻‍♂️</h1>

<h2> this is the 'miscellaneous' page that's full of random components and test (woohoo!)</h2>

<h3>There's oodles of random components in here, feel free to poke around</h3>
    <h2>It's mostly exposed in the nav to prove i can make cool react stuff</h2>
<h1> its fine that it's broken</h1>
     </div>
    

        <div className={styles.centered}>
          <RadialMenu
            data={skills}
            isRoot={true}
            currentPath={currentPath} // Pass the current path
            setCurrentPath={setCurrentPath} // Pass the setter for current path
            initialRadius={150}
          />
        </div>

        <div className={styles.centered}>
          <p>the above is rendered using recursive component rendering from the following json</p>
          <pre>
            <code>
              {JSON.stringify(skills, null, 2)} {/* This adds 2 spaces for indentation */}
            </code>
          </pre>




      </div>
      <div className={styles.centered}>
      <BackGround/>
      </div>
      <div className={styles.centered}>
     <DarkModeTile grayscale={false}/>
      </div>
  


      <section>
          <h1>test</h1>

          <iframe
            src="/"
            width="100%"
            height="500px"
            style={{ border: "none" }}
          />
        </section>
        <section>
          test
        </section>
        
        <secton>

          <ImageHandle src={image} alt="test" />
          <ImageHandle src={image} alt="test" />
          <ImageHandle src={image2} alt="test" />
        
        </secton>

        <div className={styles.centered}>
        <TextOnPath 
      position={currpathPoint}  // Middle of the path
pathData="M10,60 Q40,90 70,60 T130,60 T190,60 T250,60"
      text="Follow me!"
      width={200}
      height={100}
    />

<button onClick={() => setCurrPathPoint((prev) => prev + 0.01)}>test</button>
      </div>
    </div>
  );
};

