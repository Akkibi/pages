// const { check } = require("prettier");

const toggleNav = () => {
  document.body.dataset.nav =
    document.body.dataset.nav === "true" ? "false" : "true";
};

var categorie = 0;
var url = new URL(window.location.href);

changeDivCSS();

function changeDivCSS() {
  // check if on category or project
  if (url.searchParams.get("id")) {
    return;
  }

  let newWidth = "200vw";
  let newHeight = "400vh";
  let butonHideTop = "translate(-50% , -350%)";
  let butonHideBottom = "translate(-50% , 250%)";
  let butonShow = "translate(-50% , -50%)";
  console.log(categorie);
  if (categorie > 0) {
    var div = document.getElementById("category1");
    div.style.width = newWidth;
    div.style.height = newHeight;
    document.getElementById("butonOpen").style.transform = butonHideTop;
    document.getElementById("butonDiscover1").style.transform = butonShow;
    document.getElementById("butonDiscover2").style.transform = butonHideBottom;
  } else {
    var div = document.getElementById("category1");
    div.style.width = null;
    div.style.height = null;
    document.getElementById("butonDiscover1").style.transform = null;
    document.getElementById("butonOpen").style.transform = null;
  }
  if (categorie > 1) {
    document.getElementById("butonDiscover1").style.transform = butonHideTop;
    document.getElementById("butonDiscover2").style.transform = butonShow;
    document.getElementById("butonDiscover3").style.transform = butonHideBottom;

    var div = document.getElementById("category2");
    div.style.width = newWidth;
    div.style.height = newHeight;
  } else {
    var div = document.getElementById("category2");
    div.style.width = null;
    div.style.height = null;
    document.getElementById("butonDiscover2").style.transform = null;
  }
  if (categorie > 2) {
    document.getElementById("butonDiscover2").style.transform = butonHideTop;
    document.getElementById("butonDiscover3").style.transform = butonShow;

    var div = document.getElementById("category3");
    div.style.width = newWidth;
    div.style.height = newHeight;
  } else {
    var div = document.getElementById("category3");
    div.style.width = null;
    div.style.height = null;
    document.getElementById("butonDiscover3").style.transform = null;
  }
  if (categorie <= 0) {
    // document.getElementById("nav-right").style.boxShadow = "0px 0px 20px white";
    document.getElementById("nav-right").style.outline =
      "outset 20px rgba(255,255,255,0.25)";
  } else {
    // document.getElementById("nav-right").style.boxShadow = null;
    document.getElementById("nav-right").style.outline = null;
  }
}

function slideLeft() {
  // check if on category or project
  if (url.searchParams.get("id")) {
    return;
  }

  if (categorie > 0) {
    categorie--;
    changeDivCSS();
    document.getElementById("nav-right").style.opacity = 1;
    if (categorie <= 0) {
      document.getElementById("nav-left").style.opacity = 0;
    }
  }
}

function slideRight() {
  // check if on category or project
  if (url.searchParams.get("id")) {
    return;
  }

  if (categorie < 3) {
    categorie++;
    changeDivCSS();
    document.getElementById("nav-left").style.opacity = 1;
    if (categorie >= 3) {
      document.getElementById("nav-right").style.opacity = 0;
    }
  }
}

function openSlideRight() {
  if (categorie < 1) {
    slideRight();
  } else {
    openCurrentCategory();
  }
}

function openCurrentCategory() {
  // Load the data.json file
  var lastId = 0;
  fetch("../src/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the project data from data.json based on the category and id
      const projectData = Object.keys(data)[categorie - 1];
      if (!projectData) {
        console.error(
          "projectData is not defined (data.json didn't load as expected)"
        );
      }
      url = "?category=" + projectData + "&id=" + lastId;
      // window.open(url);
      window.location.href = "../pages/one-work.html" + url;
    });
}
// pages/one-work.html?category=3dProjects&id=0

// move with arrows
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    if (typeof imageLeft !== "undefined") {
      imageLeft();
    }
    slideLeft();
  }
  if (event.key === "ArrowRight") {
    if (typeof imageRight !== "undefined") {
      imageRight();
    }
    slideRight();
  }
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    toggleNav();
  }
});
