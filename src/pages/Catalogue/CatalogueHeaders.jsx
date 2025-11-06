// const CatalogueStandardHeaderDesktop = ({ title, subtitle, icon }) => (
//   <div className={styles.StandardHeaderDesktop}>
//     <GlassPushOverlay spiciness={0} showShine>
//       {/* <AnimatedHeader title={title} icon={icon} subtitle={subtitle} /> */}
//       <h1 className={styles.title}>
//         {icon} {title}
//       </h1>
//       {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
//     </GlassPushOverlay>
//   </div>
// );

// const TextSectionHero = () => {
//   return (
//     <section className={styles.TextSectionHero}>
//       {/* Animated background layers */}
//       {/* <div className={styles.bgDecor}>
//       <div className={styles.gradientLayer} />
//       <div className={`${styles.shape} ${styles.shape1}`} />
//       <div className={`${styles.shape} ${styles.shape2}`} />
//       <div className={`${styles.shape} ${styles.shape3}`} />
//       <div className={`${styles.shape} ${styles.shape4}`} />
//     </div> */}

//       {/* <TrackedGradientBG interactive={true} /> */}

//       {/* Foreground text */}
//       <div className={styles.inner}>
//         <h1 className={styles.title}>{text.projHeader.projTitle}</h1>
//         <div className={styles.subtitleGroup}>
//           <p className={styles.subtitle}>{text.projHeader.projS1}</p>
//           <p className={styles.subtitle}>{text.projHeader.projS2}</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// const CatalogueStandardHeaderMobile = ({
//   title,
//   subtitle,
//   customComponent,
//   bgImage,
// }) => (
//   <div className={styles.StandardHeaderMobileWrapper}>
//     {bgImage && (
//       <div
//         className={styles.headerBg}
//         style={{ backgroundImage: `url(${bgImage})` }}
//       />
//     )}
//     <div className={styles.StandardHeaderMobile}>
//       <h2 className={styles.title}>{title}</h2>
//       {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
//       {customComponent}
//     </div>
//   </div>
// );
import { BouncyArrows } from "../../components/UI/DiscreteComponents/bouncyArrows.jsx";
import styles from "./CatalogueHeaders.module.scss";

export const CatalogueLargeTextHeader = ({ text1, highlight, text2 }) => {
  return (
    <span className={styles.LargeTextHeader}>
      <p>{text1}</p>
      <p className={styles.highlight}>{highlight}</p>
      <p>{text2}</p>
    </span>
  );
};

export const CatalogueRegularTextHeader = ({ text1, highlight, text2 }) => {
  return (
    <span className={styles.RegularHeader}>
      <p>{text1}</p>
      <p className={styles.highlight}>{highlight}</p>
      <p>{text2}</p>
    </span>
  );
};



export const CatalogueMainHeaderMobile = () => {
    return (
      <div className={styles.MainHeaderMobileWrapper}>
        <div className={styles.ArcSVGWrapper}>
          <svg viewBox="0 0 300 100" className={styles.CurvedTextSVG}>
            <defs>
              <path
                id="curve"
                d="M 10,90 A 140,90 0 0,1 290,90"
                fill="transparent"
              />
            </defs>
            <text width="100%" className={styles.CurvedText}>
              <textPath
                xlinkHref="#curve"
                startOffset="50%"
                textAnchor="middle"
              >
                ★ Featured Work ★
              </textPath>
            </text>
          </svg>
        </div>

        <p className={styles.heroSubtitle}>A selection. Scroll to explore.</p>

        <BouncyArrows numArrows={3} direction="down" speed="normal" />
      </div>
    );
  };


export const CatalogueStandardHeaderMobile = ({
      title,
      subtitle,
      customComponent,
      bgImage,
    }) => (
      <div className={styles.StandardHeaderMobileWrapper}>
        {bgImage && (
          <div
            className={styles.headerBg}
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className={styles.StandardHeaderMobile}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {customComponent}
        </div>
      </div>
    );