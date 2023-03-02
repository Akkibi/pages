gsap.from(".slide-in-last-left", {
  opacity: 0,
  x: 500,
  y: -100,
  duration: 2,
  delay: 0.8,
  ease: "power2.out",
});
gsap.from(".slide-in-last-right", {
  opacity: 0,
  x: -500,
  duration: 2,
  delay: 0.8,
  ease: "power2.out",
});

gsap.from(".letter-appear", {
  rotation: 45,
  opacity: 0,
  y: 200,
  duration: 0.5,
  delay: 0,
  ease: "power2.out",
  stagger: 0.1,
});
