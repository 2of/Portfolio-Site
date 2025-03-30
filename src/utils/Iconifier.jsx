import { 
  FaHome, FaUser, FaCog, FaCircleNotch, 
  FaFileAlt, FaVideo, FaFilePdf, FaGithub, 
  FaTimes, FaStar, FaMoon, FaArrowLeft, 
  FaArrowRight, FaArrowCircleLeft, FaProjectDiagram, 
  FaInfoCircle, FaEnvelope, FaToolbox, FaTasks, 
  FaChevronCircleDown, FaQuestionCircle,
  FaBars, FaArrowUp, FaLinkedin, FaCode, FaRegEnvelope,FaChevronDown,
  FaExpandAlt, FaFile, FaArrowDown, FaHandSpock // Importing FaCode
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
      code: <FaGithub />, // Replacing projects with code
      contact: <FaEnvelope />,
      tools: <FaToolbox />,
      tasks: <FaTasks />,
      cross: <FaTimes />,
      star: <FaStar />,
      moon: <FaMoon />,
      close: <FaTimes />,
      return: <FaArrowLeft />,
      back: <FaArrowCircleLeft />,
      next: <FaArrowRight />,
      up: <FaArrowUp />, // Added up arrow icon
      overflow: <FaBars />, // Added hamburger menu icon
      linkedin: <FaLinkedin />, // Added LinkedIn icon
      github: <FaGithub />, // GitHub icon
      projects:<FaCode />, // Added FaCode icon
      mail:<FaRegEnvelope/>,
      chevdown:<FaChevronCircleDown/>,
      expand: <FaExpandAlt/>,
      file: <FaFile/>,
      down: <FaChevronDown/>,
      downarrow: <FaArrowDown/>,
      junk: <FaHandSpock/>
  };

  return iconMap[iconName.toLocaleLowerCase()] || <FaQuestionCircle />; // Default to FaQuestion if not found
};

export default getIcon;