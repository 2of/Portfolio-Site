import { 
  FaHome, FaUser, FaCog, FaQuestion, 
  FaFileAlt, FaVideo, FaFilePdf, FaGithub, 
  FaTimes, FaStar, FaMoon, FaArrowLeft, 
  FaArrowRight, FaArrowCircleLeft, FaProjectDiagram, 
  FaInfoCircle, FaEnvelope, FaToolbox, FaTasks, 
  FaBars, FaArrowUp // Importing up arrow icon
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
      projects: <FaProjectDiagram />,
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
      overflow: <FaBars /> // Added hamburger menu icon
  };

  return iconMap[iconName] || <FaQuestion />; // Default to FaQuestion if not found
};

export default getIcon;