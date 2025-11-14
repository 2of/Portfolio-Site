import React, { useEffect, useRef, useState } from "react";
import styles from "./PagedScroll.module.scss";

export const PagedScrollContainer = ({ children, borders, totalSections, conductnext ,    conductprev}) => {
    const scrollRef = useRef();
    const sectionRefs = useRef([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageVisibilities, setPageVisibilities] = useState([]);


    useEffect(() => {
        if (conductprev > 0) {
            scrollToPrev();
        }
    }, [conductprev]);


    useEffect(() => {
        if (conductnext > 0) {
            scrollToNext();
        }
    }, [conductnext]);


    useEffect(() => {
        const handleScroll = () => {
            if (!scrollRef.current) return;

            const scrollY = scrollRef.current.scrollTop;
            const viewportHeight = scrollRef.current.clientHeight;
            setScrollTop(scrollY);

            const sectionTops = sectionRefs.current.map((ref) => ref?.current?.offsetTop || 0);
            const sectionHeights = sectionRefs.current.map((ref) => ref?.current?.offsetHeight || 1);

            const currentIndex = sectionTops.findIndex((top, i) => {
                const nextTop = sectionTops[i + 1] || Infinity;
                return scrollY >= top && scrollY < nextTop;
            });

            if (currentIndex !== -1 && currentIndex !== currentPage) {
                setCurrentPage(currentIndex);
            }

            const visibilities = sectionRefs.current.map((ref) => {
                const el = ref?.current;
                if (!el) return 0;

                const elTop = el.offsetTop;
                const elHeight = el.offsetHeight;
                const elBottom = elTop + elHeight;

                const visibleTop = Math.max(elTop, scrollY);
                const visibleBottom = Math.min(elBottom, scrollY + viewportHeight);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                return Math.min(1, visibleHeight / elHeight);
            });

            setPageVisibilities(visibilities);
        };

        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => el.removeEventListener("scroll", handleScroll);
    }, [currentPage]);

    // 🚀 Scroll to the next section
    const scrollToNext = () => {
        const nextIndex = Math.min(currentPage + 1, sectionRefs.current.length - 1);
        const nextSection = sectionRefs.current[nextIndex]?.current;
        if (nextSection && scrollRef.current) {
            scrollRef.current.scrollTo({
                top: nextSection.offsetTop,
                behavior: "smooth",
            });
        }
    };


    const scrollToPrev = () => {
        const prevIndex = Math.max(currentPage - 1, 0);
        const prevSection = sectionRefs.current[prevIndex]?.current;

        if (prevSection && scrollRef.current) {
            scrollRef.current.scrollTo({
                top: prevSection.offsetTop,
                behavior: "smooth",
            });
        }
    };


    const allChildren = React.Children.toArray(children);

    return (
        <div className={styles.wrapper}>
            <div ref={scrollRef} className={styles.pagedScroll}>
                {allChildren.map((child, i) => {
                    const props = child.props || {};
                    const bgImage = props.bgImage;
                    const sectionHeight = props.sectionHeight || "full";

                    if (!sectionRefs.current[i]) sectionRefs.current[i] = React.createRef();
                    const el = sectionRefs.current[i]?.current;
                    const percentVisible = pageVisibilities[i] || 0;

                    let offsetY = 0;
                    if (el) {
                        const sectionTop = el.offsetTop;
                        offsetY = (scrollTop - sectionTop) * 0.3 * percentVisible;
                    }

                    let content;
                    if (typeof props.children === "function") {
                        content = props.children({ percentVisible });
                    } else {
                        content = React.cloneElement(props.children, { percentVisible });
                    }

                    return (
                        <div
                            ref={sectionRefs.current[i]}
                            key={i}
                            className={`${styles.pagedSection} ${
                                sectionHeight === "half" ? styles.halfSection : ""
                            } ${borders ? styles.bottomBorder : ""}`}
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
                            <div className={styles.pageContent}>{content}</div>

                            {/* ✅ Use passed-in section count to show the button */}

                        </div>
                    );
                })}
            </div>
        </div>
    );
};
