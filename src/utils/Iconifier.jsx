import { 
  FaHome, FaUser, FaCog, FaCircleNotch, 
  FaFileAlt, FaVideo, FaFilePdf, FaGithub, 
  FaTimes, FaStar, FaMoon, FaArrowLeft, 
  FaArrowRight, FaArrowCircleLeft, FaProjectDiagram, 
  FaInfoCircle, FaEnvelope, FaToolbox, FaTasks, 
  FaChevronCircleDown, FaChevronDown, FaChevronUp, FaChevronCircleUp,
  FaQuestionCircle, FaBars, FaArrowUp, FaArrowDown, 
  FaLinkedin, FaCode, FaRegEnvelope, FaExpandAlt, 
  FaFile, FaHandSpock 
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
    mail: <FaRegEnvelope />,
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
    junk: <FaHandSpock />,
    question: <FaQuestionCircle />
  };

  return iconMap[iconName.toLowerCase()] || <FaQuestionCircle />;
};

export default getIcon;