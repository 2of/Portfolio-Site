import ParticleBackground from "../../components/Background/Particles";
import AboutCard from "../../components/Cards/PreDoneCards/AboutCard";
import EloCard from "../../components/Cards/PreDoneCards/EloCard";
import GeoCard from "../../components/Cards/PreDoneCards/GeoCard";
import LinkedinCard from "../../components/Cards/PreDoneCards/LinkedInCard";
import { PortfolioSiteCard } from "../../components/Cards/PreDoneCards/PortfolioSiteCard";
import { DarkModeTile } from "../../components/UI/darkmodeTile.jsx";
import Loader from "../../components/UI/StandardLib/Loader.jsx";
import { TEST_AboutPage } from "../../components/Test/TestPages/TEST_About";
import { BouncyArrows } from "../../components/UI/DiscreteComponents/bouncyArrows.jsx";
import { DarkModeWrapper } from "../../components/UI/DarkModeWrapper";
import { ChessPage } from "../../pages/Legacy/ChessRatingPage_Legacy.jsx";
import { AboutCell } from "../../pages/Home/About";
import { HeroCard } from "../../components/Cards/PreDoneCards/HeroCard.jsx";
import { NewAboutCell } from "../../pages/Home/NewAbout";
import { NewChessPage } from "../../pages/NewChess";
import { StandardButton } from "../../components/UI/StandardLib/StandardButton.jsx";
import image1 from "../../../public/assets/images/monitorMinder/mm.gif"
import image2 from "../../../public/assets/images/monitorMinder/ss2.png"
import image3 from "../../../public/assets/images/monitorMinder/ss3.png"
import pfimage from "../../../public/assets/images/portfoliosite/simpsons.gif"
import getIcon from "../../utils/Iconifier.jsx";
import { GenericCardLarge } from "../../components/Cards/GenericLargeCard.jsx";
import TrackedGradientBG from "../../components/Background/TrackedGradientBg.jsx";
import GeoMapWidget from "../../components/UI/DiscreteComponents/GeoMapWidget.jsx";
// import TinderPage from "../../pages/TinderPage";
const DummyCard = ({ text }) => (
  <div
    style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}
  >
    <h3>{text}</h3>
    <p>This is a dummy card for demonstration purposes.</p>
  </div>
);



import { useNavigate } from "react-router-dom";
import { ModernButton } from "../../components/UI/StandardLib/Buttons/Button.jsx";
import { useGlobalContext } from "../../contexts/GlobalContext.jsx";
import PhysicsShapes from "../../components/Background/PhysicsShapes.jsx";

export const useRichTabData = () => {
  const navigate = useNavigate();
  const {getLink} = useGlobalContext();
  return [
    {
      name: "AI Assistant",
      tabdata: {
        icon: "school",
        title: " Machine Learning Street Level GeoLocalization Model(s)",
        subtitle: "Master's Project",
        description:
          "GeoLocalization Model (think GeoGuessr Bot) for street level imagery trained using a derived dataset from fine tuned object detection models, OCR, Colour space to a 1.3km accuracy from a 20km random, non uniform, distribution ",
        links: [
          { to: "https://openai.com", label: "Learn More", icon: "link" },
          { to: "#", label: "Try Demo", icon: "play" },
        ],
      },
      richdata: <GenericCardLarge
      title = " Machine Learning for CityScale Geolocalization"
      subtitle = "Call it a GeoGuessr Bot"
      description="Master's Project for The Master of Artificial Intelligence @ University of Canterbury. Clustering, attention, transfer learning and ensemble learning for geolocalization"
      tags={[
  "Machine Learning",
  "Tensorflow",
  "Transfer Learning",
  "Regression Analysis",
  "Model Analysis",
  "Pytorch",
  "Object Detection",
  "Embeddings",
  "Large Data Processing",
  "Heuristic Analysis",
  "Attention Models",
  "Convolutional Neural Networks",
  "Neural Networks",
  "Cooking my GPU",
  "Psuedo Model Ensemble",
  "Clustering Analysis",
]} 
  bgComponent={<GeoMapWidget />}
headertext = "mastersproj.json"
variant="floating"
  buttons = {[

     <ModernButton
              label="Open Writeup"
              variant="code_small"
              icon={getIcon("article")}
              fixeddarkmode
              callback={() => navigate("/proj/geo")}
            />,
            <ModernButton
              label="Open Thesis"
              variant="code_small"
              icon={getIcon("school")}
              fixeddarkmode
              link={getLink("geothesis")}
            />,
            <ModernButton
              label="Code Repo"
              variant="code_small"
              link={getLink("georepo")}
              icon={getIcon("github")}
              fixeddarkmode
              callback={() => { }}
            />


  ]}

/>,
    },
    {
      name: "Analytics Dashboard",
      tabdata: {
        icon: "chart",
        title: "Portfolio REACT site",
        subtitle: "Web + Front End",
        description:
          "That's this website, actually, It's written more or less from scratch in React with SCSS",
        links: [
          { to: "#", label: "thingies.dev", icon: "book" },
          { to: "#", label: "Repo", icon: "dashboard" },
        ],
      },
      richdata:     <GenericCardLarge
          title="Portfolio Website (this site)"
          subtitle="That's this website.... "
          description="React site with handling for custom markup, a custom UI lib and responsive mdoern design"
          tags={["REACT", "SCSS", "JS","Custom Hooks", "Custom UI LIB" , "Custom Markup Structure" ,"Custom Article Editor", "HTML + CSS + JS", "Rest API Consumption", "Hosted Entirely w/ Github Pages", "Support for external data loading"]}
          // bgComponent={<PhysicsShapes />}
          bgImage = {pfimage}
          headertext = "thiswebsite.json"
          buttons={
            [
               <ModernButton
                        label="thingies.dev"
                        variant="code_small"
                        icon={getIcon("right")}
                               fixeddarkmode
                        link="https://thingies.dev"
                    />,
                    <ModernButton
                        label="Open Writeup"
                                variant="code_small"
                                       fixeddarkmode
                        icon={getIcon("article")}
                        callback={() => navigate("/proj/portfoliosite")}
                    />,
                    <ModernButton
                        label="UI Library"
                        variant="code_small"
                        icon={getIcon("github")}
                               fixeddarkmode
                        link={getLink("uilibrepo")}
                    />,
                    <ModernButton
                        label="All Components"
                               fixeddarkmode
                                variant="code_small"
                        icon={getIcon("misc")}
                        callback={() => navigate("/allcomponents")}
                    />,
                    <ModernButton
                        label="Code"
                               fixeddarkmode
                   variant="code_small"
                        icon={getIcon("github")}
                        link={getLink("portfoliorepo")}
                    />
            ]
          }
        />,
    },
    {
      name: "MacMonitorThing",
      tabdata: {
        icon: "laptop",
        title: "MacOS Monitor Tool",
        subtitle: "Swift",
        description:
          "A menu bar utility that tracks monitor Configurations and lets users apply different MacOS UI settings depending on what they're plugged in to",
        links: [
          { to: "#", label: "thingies.dev", icon: "book" },
          { to: "#", label: "Repo", icon: "dashboard" },
        ],
      },
      richdata: (
        <HeroCard
          title="MacOS Monitor Configurator by Location Tool"
          subtitle="Swift"
          left
          images={[image2, image1,image3]}
          description="A menu bar utility that tracks monitor Configurations and automatically applies different MacOS UI settings depending on what they're plugged in to"
          buttons={[

                 <ModernButton
              label="Download Site"
              icon={getIcon("down")}
              variant="modern"
             link={getLink("monitormindersite")}
            />,
            <ModernButton
              label="GitHub"
              variant="github"
             link={getLink("monitorminderrepo")}
            />,
            // <ModernButton
            //   label="AppStore"
            //  variant="appstore"
            //   callback={() => window.open("https://apps.apple.com/us/app/monitor-minder/id6738386267", "_blank")}
            // />,
          ]}
        />
      ),
    },
    // {
    //   name: "OtherPortfolio",
    //   tabdata: {
    //     icon: "laptop",
    //     title: "This asdfsd",
    //     subtitle: "Swift",
    //     description:
    //       "A menu bar utility that tracks monitor Configurations and lets users apply different MacOS UI settings depending on what they're plugged in to",
    //     links: [
    //       { to: "#", label: "thingies.dev", icon: "book" },
    //       { to: "#", label: "Repo", icon: "dashboard" },
    //     ],
    //   },
    //   richdata: (
    //     <GenericCardLarge
    //       title="This asdfsd"
    //       subtitle="Swift"
    //       description="test"
    //       tags={["test", "test"]}
    //       bgComponent={<GeoMapWidget />}
    //       buttons={
    //         [
    //           <ModernButton
    //             label="Open Writeup"
    //             variant="code_small"
    //             icon={getIcon("article")}
    //             fixeddarkmode
    //             callback={() => navigate("/proj/geo")}
    //           />
    //         ]
    //       }
    //     />
    //   ),
    // },
    // {
    //   name: "Elo Estimator",
    //   tabdata: {
    //     icon: "chart",
    //     title: "A free version of the Chess.com Elo Estimation tool",
    //     subtitle: "Machine Learning + Large Data",
    //     description:
    //       "300gb of lichess games later and we have some rudimentary models...",
    //     links: [
    //       { to: "#", label: "View Docs", icon: "book" },
    //       { to: "#", label: "Open Dashboard", icon: "dashboard" },
    //     ],
    //   },
    //   richdata: <EloCard text="Analytics Overview" />,
    // },
  ];
};
