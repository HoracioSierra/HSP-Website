useEffect(() => {
  let timeoutId;

  const schedulePause = () => {
    const randomWait = Math.floor(Math.random() * 12000) + 12000;
    const randomPauseLength = Math.floor(Math.random() * 2500) + 2500;

    timeoutId = setTimeout(() => {
      const poses = [
        "sit",
        "sit",
        "sleep",
        "lick",
        "play",
        "scared",
        "jump",
        "big-jump"
      ];

      const randomPose = poses[Math.floor(Math.random() * poses.length)];

      setIdlePose(randomPose);
      setPaused(true);

      setTimeout(() => {
        setPaused(false);
        schedulePause();
      }, randomPauseLength);
    }, randomWait);
  };

  schedulePause();

  return () => clearTimeout(timeoutId);
}, []);