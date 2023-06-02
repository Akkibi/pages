function myRandom(max) {
  return Math.floor(Math.random() * max);
}

// document.querySelectorAll(".letter-appear").forEach(function (box) {
//   box.addEventListener("mouseenter", function () {
//     gsap.effects.fade(this);
//   });
// });

const scrollable = document.getElementById("scrollable");
// let i = 0;

// scrollable.addEventListener("wheel", (event) => {
//   if (i < document.querySelectorAll(".letter-appear").length) {
//     gsap.effects.fade(document.querySelectorAll(".letter-appear")[i]);
//     i++;
//   } else {
//     i = 0;
//   }
// });

const timeline = gsap.timeline();

scrollable.addEventListener("touchmove", (event) => {
  moveText(event);
});

var canMove = true;

scrollable.addEventListener("wheel", (event) => {
  moveText(event);
});

function moveText(event) {
  if (canMove) {
    canMove = false;
    console.log(event);
    timeline.to(".letter-appear", {
      y: -200,
      opacity: 0,
      duration: 0.5,
    });
    timeline.to("#bar", { y: -200, duration: 0.5, opacity: 0 }, "<");
    timeline.to(".letter-appear", {
      y: 200,
      duration: 0,
    });
    timeline.to("#bar", { y: 200, duration: 0 }, "<");
    timeline.to("#text-appear", { y: 200, duration: 0, opacity: 0 }, "<");
    timeline.to(".letter-appear", { y: 0, duration: 0.5, opacity: 1 });
    timeline.to("#bar", { y: 0, duration: 0.5, opacity: 0.5 }, "<");
    timeline.to("#text-appear", { y: 0, duration: 0.5, opacity: 1 }, "<");
  }
}

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
