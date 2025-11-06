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
import { ChessPage } from "../../pages/ChessRatingPage";
import { AboutCell } from "../../pages/Home/About";
import { NewAboutCell } from "../../pages/Home/NewAbout";
import { NewChessPage } from "../../pages/NewChess";
import TinderPage from "../../pages/TinderPage";
const DummyCard = ({ text }) => (
  <div
    style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}
  >
    <h3>{text}</h3>
    <p>This is a dummy card for demonstration purposes.</p>
  </div>
);
export const RichTabData = [
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
    richdata: <GeoCard />,
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
        { to: "#", label: "2of.io", icon: "book" },
        { to: "#", label: "Repo", icon: "dashboard" },
      ],
    },
    richdata: <PortfolioSiteCard />,
  },
  {
    name: "Elo Estimator",
    tabdata: {
      icon: "chart",
      title: "A free version of the Chess.com Elo Estimation tool",
      subtitle: "Machine Learning + Large Data",
      description:
        "300gb of lichess games later and we have some rudimentary models...",
      links: [
        { to: "#", label: "View Docs", icon: "book" },
        { to: "#", label: "Open Dashboard", icon: "dashboard" },
      ],
    },
    richdata: <EloCard text="Analytics Overview" />,
  },
];
