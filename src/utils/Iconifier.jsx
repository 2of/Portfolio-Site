import { 
  FaHome, FaUser, FaCog, FaCircleNotch, 
  FaFileAlt, FaVideo, FaFilePdf, FaGithub, 
  FaTimes, FaStar, FaMoon, FaArrowLeft, 
  FaArrowRight, FaArrowCircleLeft, FaProjectDiagram, 
  FaInfoCircle, FaEnvelope, FaToolbox, FaTasks, 
  FaChevronCircleDown, FaChevronDown, FaChevronUp, FaChevronCircleUp,
  FaQuestionCircle, FaBars, FaArrowUp, FaArrowDown, 
  FaGrinBeamSweat,FaSmile,FaWrench,FaTheRedYeti,
  FaLinkedin, FaCode, FaRegEnvelope, FaExpandAlt, FaSlidersH, FaCodeBranch,
  FaFile, FaHandSpock, FaExternalLinkAlt,FaSun,FaWalking, FaChessKnight,
  FaChess, FaDumbbell, FaFish, FaShareAlt, FaNewspaper,FaHandPointRight,FaAddressCard,
  FaTwitter, FaFacebook, FaReddit, FaColumns, FaAlignCenter, // Added missing social media icons
  FaInfo, FaGraduationCap,
  FaMap,
  FaSkullCrossbones,
  FaAward,
  FaCheck,
  FaBan,
  FaTag
} from "react-icons/fa"; 
import { FaPencil } from "react-icons/fa6";

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
    projects: <FaWalking />,
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
    chess: <FaChessKnight />,
    catalogue: <FaWalking/>,
    thesis: <FaProjectDiagram />,
    paper: <FaFile />,
    complete: <FaNewspaper />,
    share: <FaShareAlt />,
    external: <FaExternalLinkAlt/>,
    go: <FaHandPointRight/>,
    // Missing Social Media Icons
    twitter: <FaTwitter />,
    facebook: <FaFacebook />,
    reddit: <FaReddit />,
    sun : <FaSun/>,
    columns: <FaColumns/>,
    listview: <FaAlignCenter/>,
    about:  <FaInfo/>,
    joke: <FaGrinBeamSweat/>,
    smile: <FaSmile/>,
    settings: <FaWrench/>,
    yeti: <FaTheRedYeti/>,
    school: <FaGraduationCap/>,
    misc: <FaMap/>,
    fail: <FaSkullCrossbones/>,
    award: <FaAward/>,
    grad: <FaUser-FaGraduationCap/>,
    editor: <FaPencil/>,
    tick: <FaCheck/>,
    cross: <FaBan/>,
    portfolio: <FaCode/>,
    tag: <FaTag/>
    
  };

  return iconMap[iconName.toLowerCase()] || <FaMap />;
};

export default getIcon;