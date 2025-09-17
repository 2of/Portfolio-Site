import { useEffect, useRef, useState } from "react";

const StickyObserver = ({ top = 0, children }) => {
  const stickyRef = useRef(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const rect = stickyRef.current.getBoundingClientRect();
      setIsStuck(rect.top <= top);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [top]);

  return (
    <div ref={stickyRef} style={{ position: "sticky" }}>
      {typeof children === "function" ? children(isStuck) : children}
    
    {isStuck ? "YES " : " no"}
    </div>
  );
};

export default StickyObserver;