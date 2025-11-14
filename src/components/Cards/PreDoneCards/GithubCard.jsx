import React, { useEffect, useState } from "react";
import styles from "./styles/GithubCard.module.scss";
import { FaGithub, FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaBook } from "react-icons/fa";
import { StandardButton } from "../../UI/StandardLib/StandardButton.jsx";
import { fetchGithubProfile } from "../../../utils/githubFetch";
import Loader from "../../UI/StandardLib/Loader.jsx";
import getIcon from "../../../utils/Iconifier";

const GithubCard = ({ username }) => {
  const [loadingState, setLoadingState] = useState("unloaded"); // "unloaded" | "loading" | "loaded" | "error"
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!username) return;

    const loadProfile = async () => {
      try {
        setLoadingState("loading");
        const profile = await fetchGithubProfile(username);
        setData(profile);
        setLoadingState("loaded");
      } catch (err) {
        console.error("Error fetching GitHub profile:", err);
        setLoadingState("error");
      }
    };

    loadProfile();
  }, [username]);

  if (loadingState === "loading") {
    return (
      <div className={styles.githubCard}>
      <Loader/>
      </div>
    );
  }

  if (loadingState === "error" || !data) {
    return (
      <div className={styles.githubCard}>
        <div className={styles.errorState}>Error loading GitHub profile.</div>
      </div>
    );
  }

  const {
    name,
    avatar_url,
    html_url,
    bio,
    followers,
    following,
    public_repos,
    location,
    created_at,
    login,
  } = data;

  const joined = new Date(created_at).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "short",
  });

  return (
    <div className={styles.githubCard}>

     <span className={`${styles.bgIcon} ${styles.L1}`}>

        {getIcon("code")}
      </span>

        {/* <span className={`${styles.bgIcon} ${styles.L2}`}>

        {getIcon("portfolio")}
      </span>
        <span className={`${styles.bgIcon} ${styles.L3}`}>

        {getIcon("portfolio")}
      </span> */}


      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            <img src={avatar_url} alt={`${login}'s profile`} />
          </div>
          <div className={styles.userInfo}>
            <h2>{name || login}</h2>
            <p className={styles.handle}>@{login}</p>
                        {bio && <p className={styles.bio}>{bio}</p>}
          </div>


        </div>
        <FaGithub className={styles.icon} />
      </div>

      {/* Bio */}
    

      {/* Stats Section */}
      <div className={styles.stats}>
        {/* {followers !== undefined && (
          <div className={styles.stat}>
            <FaUsers />
            <span>{followers} followers</span>
          </div>
        )} */}
        {following !== undefined && (
          <div className={styles.stat}>
            <FaUsers />
            <span>{following} following</span>
          </div>
        )}
        {public_repos !== undefined && (
          <div className={styles.stat}>
            <FaBook />
            <span>{public_repos} repos</span>
          </div>
        )}
      </div>

      {/* Location + Join date */}
      <div className={styles.meta}>
        {location && (
          <div className={styles.metaItem}>
            <FaMapMarkerAlt />
            <span>{location}</span>
          </div>
        )}
        {created_at && (
          <div className={styles.metaItem}>
            <FaCalendarAlt />
            <span>Joined {joined}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <StandardButton
          label="View on GitHub"
          tooltip="Open GitHub Profile"
          type="modern_unfilled"
          icon={<FaGithub />}
          link={html_url}
        />
      </div>
    </div>
  );
};

export default GithubCard;