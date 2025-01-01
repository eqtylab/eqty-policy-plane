const animateLine = (line: string, tl: GSAPTimeline) => {
  const paths = [...document.querySelectorAll(line)] as SVGPathElement[];

  if (!paths || !paths.length) return;

  const pathLength = paths[0].getTotalLength();

  // Set initial stroke-dasharray to 0, so the path starts invisible
  paths.forEach((path) => {
    path.style.strokeDasharray = `0 ${pathLength}`;
    path.style.strokeDashoffset = `0`;
  });

  return tl.to(line, {
    strokeDasharray: `${pathLength} ${pathLength}`,
    duration: 1,
    ease: "power1.inOut",
  });
};

const pulsateLine = (line: string, tl: GSAPTimeline) => {
  const paths = [...document.querySelectorAll(line)] as SVGPathElement[];

  if (!paths || !paths.length) return;

  // perform a pulsate animation using gsap

  return tl.to(line, {
    opacity: 0,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
};

export { animateLine, pulsateLine };
