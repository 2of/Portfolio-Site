import React from "react";
import useScreenSize from "../utils/screensize";
import { GlobalProvider } from "../contexts/GlobalContext";
import styles from './HomePage2.module.scss'; // Import SCSS module
// import { HeroSection } from "./HeroSection"; // Import the reusable HeroSection
import getIcon from "../utils/Iconifier";
import ColumnWithSections from "../components/Column/ColumnWithSections";
import { useProjects } from "../contexts/ContentContext";
import  ProgrammerSVG from '../assets/svgs/undraw_programmer_raqr.svg';
const HeroSection = ({ title, subtitle, description, socialLinks, heroArt, child }) => {
  return (
      <div className={styles.HeroSection}>
          <div className={styles.HeroTextSection}>
              <div className={styles.HeroTitle}>
                  {title}
              </div>
              <div className={styles.HeroSubtitle}>
                  <p>{subtitle}</p>
              </div>
              <div className={styles.HeroP}>
                  <p>{description}</p>
              </div>
              {socialLinks&& 
                <ul className={styles.socials}>
                {socialLinks.map((link, index) => (
                    <li
                        key={index}
                        style={{ background: link.color }}
                    >
                        {getIcon(link.icon)}
                    </li>
                ))}
            </ul>
              
              }
            {child}
          </div>
          <div className={styles.HeroArt}>
              <img src={heroArt} alt="Hero Art" />
          </div>
      </div>
  );
};


export const HomePage2 = () => {
    const socialLinks = [
        { icon: "linkedin", color: "#0a66c2" },
        { icon: "github", color: "#6f42c1" },
        { icon: "mail", color: "#FF7F50" },
    ];
    const { getArticle, getListOfArticles } = useProjects(); // 


    return (
        <div className={styles.HomePageContainer}>
            {/* Reusable HeroSection */}
            <HeroSection
                title="Howdy 👋"
                subtitle="This is my little project catalogue"
                description="This site is a little WIP, but have a poke around. Check out Projects below. The site is written in react and I've had some deployment issues so if something is brokem, that's it.
                
                I know of a few bugs and there's a lot of css issues around at the moment"
                socialLinks={socialLinks}
                heroArt={ProgrammerSVG}
                invert={false}
            
     
            />



{/* 
<HeroSection
                title="Featured "
                subtitle="I do things."
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dolore recusandae odio natus alias quo, sequi nemo molestias unde officia excepturi! Voluptatibus, voluptatum aut? Unde veritatis repellat hic praesentium nemo."
                // socialLinks={socialLinks}
                heroArt="https://picsum.photos/seed/picsum/200/300"
            
            
                child = {



                  <ColumnWithSections
                  data={getArticle('geolocate1', 'small')}
                  twoColumns={true}
                  fullLink={false}
                  AsArticle={true}
                  // extratext={selectedProject.extratext} // Pass the extratext prop if it exists
                  style="newspaper"
              />
     


                }
            
            /> */}
            {/* <div className={styles.ProjSection}>
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
            </div> */}
        </div>
    );
};