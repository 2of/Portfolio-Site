import React from "react";
import useScreenSize from "../utils/screensize";
import { GlobalProvider } from "../contexts/GlobalContext";
import styles from './HomePage2.module.scss'; // Import SCSS module
import getIcon from "../utils/Iconifier";
export const HomePage2 = () => { 
    return (
      <div className={styles.HomePageContainer}>

        <div className={styles.HeroSection}>

            <div className={styles.HeroTextSection}>
            <div className={styles.HeroTitle}>
            <h1>Howdy</h1>
          </div>
          <div className={styles.HeroSubtitle}>
            <p>I do things.</p>
          </div>
          <div className={styles.HeroP}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dolore recusandae odio natus alias quo, sequi nemo molestias unde officia excepturi! Voluptatibus, voluptatum aut? Unde veritatis repellat hic praesentium nemo.</p>
          </div>
          <ul className={styles.socials}>
       
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">{getIcon("linkedin")}</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer"> {getIcon("github")}</a></li>

            </ul>

         
          </div>
          <div className={styles.HeroArt}>
          <img src="https://picsum.photos/seed/picsum/200/300" alt="Hero Art" />
        </div>
        </div>

   

        <div className={styles.ProjSection}>
          <h2>Featured Projects</h2>
          <div className={styles.ProjectCards}>
            <div className={styles.ProjectCard}>
              <h3>Project One</h3>
              <p>Short description of project one.</p>
            </div>
            <div className={styles.ProjectCard}>
              <h3>Project Two</h3>
              <p>Short description of project two.</p>
            </div>
            <div className={styles.ProjectCard}>
              <h3>Project Three</h3>
              <p>Short description of project three.</p>
            </div>
          </div>
        </div>

      </div>
    );
};