import { CatalogueCardCompact } from "../../components/Cards/CatalogueCards";
import SmallCard from "../../components/Cards/SmallCard";
import GlassPushOverlay from "../../components/UI/GlassContainer";
import styles from "./CatalogueSections.module.scss";

export const CatalogueHeroSection = ({ text }) => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.decorativeFrame}>
        <div className={styles.cornerOrnament} data-position="top-left" />
        <div className={styles.cornerOrnament} data-position="top-right" />
        <div className={styles.cornerOrnament} data-position="bottom-left" />
        <div className={styles.cornerOrnament} data-position="bottom-right" />
      </div>

      <div className={styles.inner}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>
            <span className={styles.titleInner}>
              {text.projHeader.projTitle}
            </span>
          </h1>

          <div className={styles.divider}>
            <span className={styles.dividerDiamond}>◆</span>
          </div>

          <div className={styles.subtitleGroup}>
            <p className={styles.subtitle}>{text.projHeader.projS1}</p>
            <p className={styles.subtitle}>{text.projHeader.projS2}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CatalogueGithubSection = ({
  projects,
  screenSize,
  styles_ref,
}) => {
  console.log("Githubcard", projects);
  return (
    <div className={styles_ref.LargeThumbGrid}>
      {projects.map((proj, id) => (
        <div
          key={id}
          className={`${styles_ref.ProjectCell} ${styles_ref.sm_25}`}
        >
          <CatalogueCardCompact
            type="compact_thumb"
            randomcolor={true}
            data={{
              title: proj.name,
              subtitle: proj.description,
              ext_url: proj.url,
            }}
            to={proj.url}
            EntireCardClickable
            isExternal={true}
            // fullLinkCallBack={() => navigate(proj.url)}
            //   asFS={screenSize === "sm"}
            // type={screenSize === "sm" ? "mobile_compact" : "compact_thumb"}
          />
          {/* test {proj.url} */}
        </div>
      ))}

      <CatalogueCardCompact
        size="small"
        randomcolor={true}
        data={{
          title: "See All Repos",
          subtitle: "github.com/2of",
        }}
        to="https://www.github.com/2of"
               EntireCardClickable
        isExternal={true}
        // fullLinkCallBack={() => navigate.to(project.url)}
        //   asFS={screenSize === "sm"}
        type={screenSize === "sm" ? "mobile_compact" : "compact_thumb"}
      />
    </div>
  );
};
