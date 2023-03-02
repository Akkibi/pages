gsap.from("#slide-in-last-left", {
  opacity: 0,
  x: 500,
  duration: 2,
  delay: 0.8,
  ease: "power2.out",
});
gsap.from("#slide-in-last-right", {
  opacity: 0,
  x: -500,
  duration: 2,
  delay: 0.8,
  ease: "power2.out",
});

gsap.from(".letter-appear", {
  rotation: 30,
  opacity: 0,
  y: 100,
  duration: 0.25,
  delay: 0,
  ease: "power2.out",
  stagger: 0.1,
});

gsap.from("#bar", {
  width: 0,
  duration: 2,
  delay: 0,
  ease: "power2.out",
  stagger: 0.25,
});

gsap.registerEffect({
  name: "fade",
  defaults: { duration: 0.25 }, //defaults get applied to the "config" object passed to the effect below
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      { opacity: 1, scale: 1, rotation: 0, duration: config.duration },
      {
        duration: config.duration,
        opacity: 0,
        repeat: 1,
        yoyo: true,
        ease: "power2.out",
      }
    );
  },
});

document.querySelectorAll(".letter-appear").forEach(function (box) {
  box.addEventListener("mouseenter", function () {
    gsap.effects.fade(this);
  });
});

function myRandom(max) {
  // return Math.random() * max;
  return Math.floor(Math.random() * max);
}

const scrollable = document.getElementById("scrollable");

scrollable.addEventListener("wheel", (event) => {
  gsap.effects.fade(
    document.querySelectorAll(".letter-appear")[
      myRandom(document.querySelectorAll(".letter-appear").length)
    ]
  );
});
