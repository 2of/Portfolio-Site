import { 
  FaHome, FaUser, FaCog, FaCircleNotch, 
  FaFileAlt, FaVideo, FaFilePdf, FaGithub, 
  FaTimes, FaStar, FaMoon, FaArrowLeft, 
  FaArrowRight, FaArrowCircleLeft, FaProjectDiagram, 
  FaInfoCircle, FaEnvelope, FaToolbox, FaTasks, 
  FaChevronCircleDown, FaChevronDown, FaChevronUp, FaChevronCircleUp,
  FaQuestionCircle, FaBars, FaArrowUp, FaArrowDown, 
  FaLinkedin, FaCode, FaRegEnvelope, FaExpandAlt, 
  FaFile, FaHandSpock, FaExternalLinkAlt,
  FaChess, FaDumbbell, FaFish, FaShareAlt, FaNewspaper,FaHandPointRight,
  FaTwitter, FaFacebook, FaReddit // Added missing social media icons
} from "react-icons/fa"; 

const getIcon = (iconName = "default") => {
  const iconMap = {
    home: <FaHome />,
    about: <FaInfoCircle />,
    user: <FaUser />,
    settings: <FaCog />,
    article: <FaFileAlt />,
    video: <FaVideo />,
    academic: <FaFilePdf />,
    code: <FaGithub />,
    projects: <FaCode />,
    contact: <FaEnvelope />,
    mail: <FaRegEnvelope />, // Kept FaRegEnvelope for 'mail'
    email: <FaRegEnvelope />, // Added 'email' alias pointing to FaRegEnvelope
    tools: <FaToolbox />,
    tasks: <FaTasks />,
    star: <FaStar />,
    moon: <FaMoon />,
    close: <FaTimes />,
    cross: <FaTimes />,
    return: <FaArrowLeft />,
    back: <FaArrowCircleLeft />,
    next: <FaArrowRight />,
    up: <FaArrowUp />,
    uparrow: <FaArrowUp />,
    down: <FaChevronDown />,
    downarrow: <FaArrowDown />,
    chevdown: <FaChevronCircleDown />,
    chevup: <FaChevronCircleUp />,
    overflow: <FaBars />,
    menu: <FaBars />,
    expand: <FaExpandAlt />,
    file: <FaFile />,
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    junk: <FaFish />,
    question: <FaQuestionCircle />,
    chess: <FaChess />,
    catalogue: <FaDumbbell/>,
    thesis: <FaProjectDiagram />,
    paper: <FaFile />,
    complete: <FaNewspaper />,
    share: <FaShareAlt />,
    external: <FaExternalLinkAlt/>,
    go: <FaHandPointRight/>,
    // Missing Social Media Icons
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    reddit: <FaReddit />
  };

  return iconMap[iconName.toLowerCase()] || <FaQuestionCircle />;
};

export default getIcon;