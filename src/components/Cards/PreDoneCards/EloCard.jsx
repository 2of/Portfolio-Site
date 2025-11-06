import React, { useEffect, useRef } from "react";
import styles from "./EloCard.module.scss";
import { StandardButton } from "../../UI/StandardLib/StandardButton.jsx";
import getIcon from "../../../utils/Iconifier";
import ParticleBackground from "../../Background/Particles";

const EloCard = () => {
  const tags = [
    "Machine Learning",
    "Neural Networks",
    "Python",
    "TensorFlow",
    "Chess AI",
  ];

  const links = [
    {
      label: "Writeup",
      icon: "→",
      primary: true,
      to: "/proj/chessEloEstimator",
    },
    { label: "Actual Tool", icon: getIcon("chess"), to: "/ChessEloEsimator" },
    {
      label: "Code",
      icon: getIcon("github"),
      to: "https://github.com/2of/ELO-Estimator-Machine-Learning-Chess",
    },
  ];

  return (
    <div className={styles.eloCard}>
      <div className={styles.bgCanvas}>
        {/*<ParticleBackground />*/}
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.subtitle}>Machine Learning Project</div>
          <h1 className={styles.title}>Chess Elo Estimator</h1>
        </div>

        <p className={styles.description}>
          Rudimentary Machine Learning models generated from 30m+ Chess games
          and exposed through a React front end.
        </p>

        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.links}>
          {links.map((link) => (
            <StandardButton
              key={link.label}
              label={link.label}
              icon={link.icon}
              type="rounded_label"
              link={link.to}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EloCard;
