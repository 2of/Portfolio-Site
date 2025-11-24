import React, { useEffect, useRef, useState, useMemo } from "react";

const rand = (min, max) => Math.random() * (max - min) + min;

// Direction map
function directionVector(direction) {
    const dirs = {
        n:  { dx: 0, dy: -1 },
        s:  { dx: 0, dy: 1 },
        e:  { dx: 1, dy: 0 },
        w:  { dx: -1, dy: 0 },
        ne: { dx: 1, dy: -1 },
        nw: { dx: -1, dy: -1 },
        se: { dx: 1, dy: 1 },
        sw: { dx: -1, dy: 1 },
        random: null,
    };
    return dirs[direction] || null;
}

// Spawn point depending on direction
function spawnPoint(direction, w, h) {
    const dirs = {
        n:  () => ({ x: rand(0, w), y: h + 150 }),
        s:  () => ({ x: rand(0, w), y: -150 }),
        e:  () => ({ x: -150, y: rand(0, h) }),
        w:  () => ({ x: w + 150, y: rand(0, h) }),
        ne: () => ({ x: -150, y: h + 150 }),
        nw: () => ({ x: w + 150, y: h + 150 }),
        se: () => ({ x: -150, y: -150 }),
        sw: () => ({ x: w + 150, y: -150 }),
        random: () => ({ x: rand(0, w), y: rand(0, h) }),
    };
    return (dirs[direction] || dirs.random)();
}

function randomInside(w, h) {
    return { x: rand(0, w), y: rand(0, h) };
}

function createFloatingImage(images, w, h, direction, speed, sizeRange, inside = false, depthRange = [1,3]) {
    const imgSrc = images[Math.floor(Math.random() * images.length)];
    const vec = directionVector(direction);

    // Normalize vector speed
    const dx = vec ? vec.dx * speed : Math.cos(Math.random() * Math.PI * 2) * speed;
    const dy = vec ? vec.dy * speed : Math.sin(Math.random() * Math.PI * 2) * speed;

    const { x, y } = inside ? randomInside(w, h) : spawnPoint(direction, w, h);
    const width = rand(sizeRange[0], sizeRange[1]);
    const depth = rand(depthRange[0], depthRange[1]);
    const rotation = rand(-15,15);

    return {
        id: Math.random().toString(36).slice(2),
        src: imgSrc,
        x, y, dx, dy, width, height: "auto",
        opacity: 0,
        rotation,
        rotationSpeed: rand(-0.03,0.03),
        depth,
        fadingIn: true,
    };
}

// ----------------------------------------------------------------------
// 1. MEMOIZED CHILD COMPONENT
//    Extracting this helps separate the render logic.
// ----------------------------------------------------------------------
const FloatingImage = React.memo(({ img }) => {
    // Memoize the style object so we don't create a new object unless data changes
    const style = useMemo(() => ({
        position: "absolute",
        left: img.x,
        top: img.y,
        width: img.width,
        height: img.height,
        transform: `translate(-50%, -50%) rotate(${img.rotation}deg) scale(${img.depth})`,
        transition: "opacity 0.1s linear",
        filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.25))",
        willChange: "transform, left, top", // Hardware acceleration hint
    }), [img.x, img.y, img.width, img.height, img.rotation, img.depth]);

    return <img src={img.src} style={style} alt="" />;
}, (prevProps, nextProps) => {
    // Custom comparison (optional): Return true if re-render is NOT needed.
    // Since x/y change every frame, strict equality is usually fine here,
    // but explicit comparison can sometimes save CPU cycles if data is identical.
    return prevProps.img === nextProps.img;
});

// ----------------------------------------------------------------------
// 2. MAIN COMPONENT
// ----------------------------------------------------------------------
const MovingImagesBackground = ({
                                    images = [],
                                    spawnRate = 2000,
                                    maxImages = 8,
                                    style = {},
                                    direction = "n",
                                    speed = 1.0,
                                    initialScatter = true,
                                    sizeRange = [120, 260],
                                    depthRange = [1,3],
                                    fps = 60,
                                }) => {
    const containerRef = useRef(null);
    const [floating, setFloating] = useState([]);

    // Stabilize images array dependency
    // (Prevents reset if parent passes a new array reference ['a.png'] every render)
    const imagesRef = useRef(images);
    useEffect(() => { imagesRef.current = images; }, [images]);

    // ---------------------------------------
    // INITIAL SCATTER
    // ---------------------------------------
    useEffect(() => {
        if (!initialScatter) return;
        const container = containerRef.current;
        if (!container) return;
        const { clientWidth, clientHeight } = container;

        const initial = Array.from({ length: maxImages }, () =>
            createFloatingImage(imagesRef.current, clientWidth, clientHeight, direction, speed, sizeRange, true, depthRange)
        );

        setFloating(initial);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxImages, direction, speed, initialScatter]);

    // ---------------------------------------
    // SPAWN LOOP
    // ---------------------------------------
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const { clientWidth, clientHeight } = container;

        function addImage() {
            setFloating(prev => {
                if (prev.length >= maxImages) return prev;
                const newImg = createFloatingImage(imagesRef.current, clientWidth, clientHeight, direction, speed, sizeRange, false, depthRange);

                // Simple collision check
                const safe = prev.every(img => Math.hypot(img.x - newImg.x, img.y - newImg.y) > 80);
                if (!safe) return prev;

                return [...prev, newImg];
            });
        }

        const interval = setInterval(addImage, spawnRate);
        return () => clearInterval(interval);
    }, [spawnRate, maxImages, direction, speed, sizeRange, depthRange]);

    // ---------------------------------------
    // ANIMATION LOOP
    // ---------------------------------------
    useEffect(() => {
        let raf;
        let last = performance.now();
        const frameDuration = 1000 / fps;

        function animate(now) {
            const delta = now - last;

            if (delta >= frameDuration) {
                last = now - (delta % frameDuration);

                setFloating(prev => {
                    const container = containerRef.current;
                    if (!container) return prev;
                    const { clientWidth, clientHeight } = container;

                    // Optimization: Use a regular loop or reduce instead of map+filter
                    // to reduce garbage collection, but map/filter is cleaner to read.
                    return prev.map(img => {
                        let { x, y, rotation, opacity, fadingIn } = img;

                        x += img.dx;
                        y += img.dy;
                        rotation += img.rotationSpeed;

                        if (fadingIn) {
                            opacity += 0.02;
                            if (opacity >= 1) { opacity = 1; fadingIn = false; }
                        }

                        // Return new object reference only if changed (always true here)
                        return { ...img, x, y, rotation, opacity, fadingIn };
                    }).filter(img =>
                        img.x > -400 && img.x < clientWidth + 400 &&
                        img.y > -400 && img.y < clientHeight + 400
                    );
                });
            }
            raf = requestAnimationFrame(animate);
        }

        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [fps]);

    return (
        <div
            ref={containerRef}
            style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                zIndex: 1,
                pointerEvents: "none",
                ...style,
            }}
        >
            {floating.map(img => (
                <FloatingImage key={img.id} img={img} />
            ))}
        </div>
    );
};

// ----------------------------------------------------------------------
// 3. MEMOIZED EXPORT
//    Protects the component from re-rendering if Parent updates
//    unrelated props.
// ----------------------------------------------------------------------
export default React.memo(MovingImagesBackground);