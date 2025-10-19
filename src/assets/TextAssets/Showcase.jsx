import React from "react";
import AboutCard from "../../components/Cards/PreDoneCards/AboutCard";
import GithubCard from "../../components/Cards/PreDoneCards/GithubCard";
import LinkedinCard from "../../components/Cards/PreDoneCards/LinkedInCard";
import ProjectCard from "../../components/Cards/ProjectCard";
import getIcon from "../../utils/Iconifier";
import WelcomeCard from "../../components/Cards/PreDoneCards/WelcomeCard";
// import avatar1 from '../assets/userimage.jpeg';
import linkedinimage from "../../assets/linkedinbg.jpeg";
import avatar1 from "../../assets/userimage.jpeg";
import { LinkCard } from "../../components/Cards/PreDoneCards/Linkscard";
export const ShowcasecardStack = {
  welcome: {
    title: "Howdy!",
    subtitle:
      "This is my little project catalogue and portfolio website. Use the stack to sorta get a 'me in a nutshell'",
    card: <WelcomeCard />,
  },

  intro: {
    title: "The short of it is... I know my stuff",
    subtitle: "There's projects here that show web, full stack development, machine learning design and implementation (and all the data processing that comes with that)... as well as odds and ends like verison control, sql... I make things when not making them feels like work...",
    card: (
      <AboutCard
        name="Hi, I'm Noah"
        subtitle="I'm an IT Engineer and a Graduate Developer"
        about="I’ve done a bit of everything in the IT world. Nowadays I'm focused on new technologies and development. I build things to solve problems (really, most things start with being bothered by something!), Yep Im open to work for Development roles across the board!"
        qualifications={[
          "BSc Computer Science – University of Canterbury",
          "Master of Artificial Intelligence – University of Canterbury",
        ]}

                heroImage={linkedinimage}
          tags1title = "This is what I Do"
        tags1={[
          "python",
          "C/ ++",
          "HTML + CSS",
          "JS",
          "Full Stack Web",
          "SQL",
          "Node",
          "REACT",
          "Vue",
          "GIT",
          "Java",
          "TensorFlow",
          "PyTorch",
          "Scala / Spark (pyspark)",
          "Hadoop DFS",
          "Large Data Processing",
          "R",
          "Machine Learning",
          "Artificial Intelligence",
          "Data Modelling",
          "Regression Analysis",
          "Heuristic Model Analysis",
          "Neural Net Design",
        ]}
       
        // image="/images/noahking.jpg"
        cvLink="https://github.com/2of/2of/blob/main/docs/CV_all.pdf"
      />
    ),
  },
   IT: {
    title: "Yeah.. I've done a bunch of IT work too ",
    subtitle: "I've done IT work everywhere from Homes to small Businesses to Education to Major  Supermarkets to 100k+ Seat Government Organizations.. I've been around... And TBH im pretty good at it. ",
    card: (
      <AboutCard
        name="Work History, What I've Done"
        subtitle="I've done a bunch of IT work..."
        about="I'm  a reaosnably experienced IT support Engineer (Service Desk Analyst, IT guy... whatever term goes for you!)
        I cut my teeth installing TV's and Computers for New Zealand's analogy to Geek Squad and then as a full time IT Tech for Education and <100 seat businesses.
        
        I've recently been a Tier 2 Support Engineer (not a protected term in NZ) for a major public service IT conversion project"
        // qualifications={[
        //   "BSc Computer Science – University of Canterbury",
        //   "Master of Artificial Intelligence – University of Canterbury",
        // ]}
        tags1title = "This is what I've done"
        tags1={[
          "Network Administration",
          "Network Design + Business Case Analysis",
          "Ubiquti, Grandstream",
          "Azure AD",
          "MS Cloud Admin (and all that entails)",
          "Tier 2 IT support",
          "Google Admin",
          "Network Deployment",
          "Hardware Repair",
          "Apple MDM",
          "Win Server",
          "Azure Appliance (deployment, integration)"
          
        ]}
        image="/images/noahking.jpg"
        cvLink="https://noahking.dev/cv"
      />
    ),
  },

  project: {
    title: "Github stuff",
    subtitle: "You should follow me on Github. I post code there. Sometimes it's big, cool projects leveraging Machine Learning and so on ... and sometimes it's just powershell scripts for migrating distribution lists between tenants or vba to convert decades of all-over-the-place email addresses into a coherrent new convention",
    card: (
      <GithubCard
        username="2of"
        url="www.github.com/2of"
        profilePic={avatar1}
        bio="I'm a recent grad in Otautahi CHCH NZ 🌍, with a focus on data science, large data handling, data processing, and presenting information in intuitive ways for those of us who don't ha..."
      />
    ),
  },
  LinkedIn: {
    title: "Professional Networking?",
    subtitle: "Add me on linkedin. I'm not a big social media poster, but please feel absolutely free to flick me a pm on linkedin. Im open to everything from job offers (I like those) to tea & biscuits ",
    card: (
      <LinkedinCard
        name="Noah King"
        title="Tier 2 Escalation Support"
        company="TeWhatuOra Health New Zealand"
        summary="I'm a recent grad in Otautahi CHCH NZ 🌍, with a focus on data science, large "
        profilePic={avatar1}
        bannerPic={linkedinimage}
        url={"https://www.linkedin.com/in/nking11111/"}
      />
    ),
  },
  Mastesproj: {
    title: "Here's my mini thesis",
    subtitle: "Perhaps my Master's project would entice you? I decided dealing with 150k images was a smart thesis to go with. We emulate GeoGuessr players by creating a (psuedo) ensemble of different machine learning approaches... it did noticably improve on the image distribution... but the issues are left to you to read... here... now...",
    card: (
      <ProjectCard
        image="public/Writeups/GEO/thumb.gif"
        tags={["AI", "Machine Learning", "Model Design" , "Heuristic Analyis", "Large Data Processing"]}
        title="Geolocalization of Street level Imagery with Machine Learning"
        subtitle="Master's Project @ UC 2025"
        description="A city-scale model combining satellite imagery and LLM reasoning to predict geographic coordinates."
        authorString="by Noah King"

        icon={getIcon("projects")}
        id="geo"
        // background="linear-gradient(135deg, #0D1117, #161B22)"
      />
    ),
  },
  chess: {
    title: "Too cheap for Chess.com",
    subtitle: "I made this a while ago but finally got around to making a front end. The short of it is, Chess.com charge to estimate your ELO... so we should just use machine learning to do it for free. It's trained on 33m chess games... break down of the models are available on the page",
    card: (
      <ProjectCard
        image="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
        tag="AI Project"
        title="Free Chess ELO Estimator"
        subtitle="LLM-driven GeoLocalization"
        description="A city-scale model combining satellite imagery and LLM reasoning to predict geographic coordinates."
        authorString="by Noah King"
        link="/ChessEloEsimator"
        icon={getIcon("projects")}
        id="chessEloEstimator"
        // background="linear-gradient(135deg, #0D1117, #161B22)"
      />
    ),
  },
  links1: {
    title: "...",
    subtitle: "Anyway thanks for checking out my stack of things. Check out projects or about to learn more. Im open to all forms of collaboration. I can give advice (on things in here if you need? although coming ot my portfolio for it is weird) ... Also I made that darkmode toggle when I was first learning react and I thought it was cool.. so I bought it over ",
    card: <LinkCard />,
  },
};
