import React, { useEffect, useRef, useState } from "react";
import styles from "./PagedScroll.module.scss";

export const PagedScrollContainer = ({ children }) => {
  const scrollRef = useRef();
  const sectionRefs = useRef([]);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollTop(scrollRef.current.scrollTop);
      }
    };

    const el = scrollRef.current;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={scrollRef} className={styles.pagedScroll}>
      {React.Children.map(children, (child, i) => {
        const bgImage = child.props?.bgImage;
        const sectionHeight = child.props?.sectionHeight || "full";

        if (!sectionRefs.current[i]) sectionRefs.current[i] = React.createRef();
        const el = sectionRefs.current[i].current;
        let offsetY = 0;

        if (el) {
          const sectionTop = el.offsetTop;
          offsetY = (scrollTop - sectionTop) * 0.3;
        }

        return (
          <div
            ref={sectionRefs.current[i]}
            key={i}
            className={`${styles.pagedSection} ${
              sectionHeight === "half" ? styles.halfSection : ""
            }`}
          >
            {bgImage && (
              <div
                className={styles.bgImage}
                style={{
                  backgroundImage: `url(${bgImage})`,
                  transform: `translateY(${offsetY}px)`,
                }}
              />
            )}
            <div className={styles.pageContent}>{child}</div>
          </div>
        );
      })}
    </div>
  );
};