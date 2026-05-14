import { useEffect, useRef, useState } from "react";

function PixelCat() {
  const [position, setPosition] = useState({
    x: 40,
    y: window.innerHeight - 140,
  });

  const [paused, setPaused] = useState(false);
  const [idlePose, setIdlePose] = useState("sit");
  const [direction, setDirection] = useState("right");

  const positionRef = useRef(position);
  const targetRef = useRef(position);
  const pausedRef = useRef(false);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let animationId;
    let pauseTimeoutId;

    const speed = 35;

    const poses = [
      "sit",
      "sit",
      "sit",
      "sit",
      "sleep",
      "sleep",
      "lick",
      "lick",
      "play",
      "scared",
      // "jump",
      // "big-jump",
    ];

    const getRandomTarget = () => {
      const padding = 120;

      return {
        x:
          Math.floor(Math.random() * (window.innerWidth - padding * 2)) +
          padding,
        y:
          Math.floor(Math.random() * (window.innerHeight - padding * 2)) +
          padding,
      };
    };

    const chooseIdlePose = () => {
      const randomPose = poses[Math.floor(Math.random() * poses.length)];
      const pauseLength = Math.floor(Math.random() * 2000) + 2000;

      setIdlePose(randomPose);
      setPaused(true);

      pauseTimeoutId = setTimeout(() => {
        setPaused(false);
        targetRef.current = getRandomTarget();
      }, pauseLength);
    };

    targetRef.current = getRandomTarget();

    const moveCat = () => {
      if (!pausedRef.current) {
        const current = positionRef.current;
        const target = targetRef.current;

        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 4) {
          const shouldPause = Math.random() < 0.35;

          if (shouldPause) {
            chooseIdlePose();
          } else {
            targetRef.current = getRandomTarget();
          }
        } else {
          const stepX = (dx / distance) * speed * 0.016;
          const stepY = (dy / distance) * speed * 0.016;

          const nextPosition = {
            x: current.x + stepX,
            y: current.y + stepY,
          };

          setDirection(dx < 0 ? "left" : "right");
          positionRef.current = nextPosition;
          setPosition(nextPosition);
        }
      }

      animationId = requestAnimationFrame(moveCat);
    };

    animationId = requestAnimationFrame(moveCat);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(pauseTimeoutId);
    };
  }, []);

  return (
    <div className={paused ? `cat-scene paused ${idlePose}` : "cat-scene"}>
      <div
        className="cat-pet"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div className={`cat-flip ${direction}`}>
          <div className="cat-scale">
            <div className="pixel-cat"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PixelCat;