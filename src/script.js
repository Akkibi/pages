const toggleNav = () => {
  document.body.dataset.nav =
    document.body.dataset.nav === "true" ? "false" : "true";
};
AOS.init();

var categorie = 0;

function changeDivCSS() {
  console.log(categorie);
  if (categorie > 0) {
    var div = document.getElementById("category1");
    div.style.width = "200vw";
    div.style.height = "400vh";
    document.getElementById("butonOpen").style.transform =
      "translate(-50% , -350%)";
    document.getElementById("butonDiscover1").style.transform =
      "translate(-50% , -50%)";
    document.getElementById("butonDiscover2").style.transform =
      "translate(-50% , 250%)";
    if (categorie > 1) {
      document.getElementById("butonDiscover1").style.transform =
        "translate(-50% , -350%)";
      document.getElementById("butonDiscover2").style.transform =
        "translate(-50% , -50%)";
      document.getElementById("butonDiscover3").style.transform =
        "translate(-50% , 250%)";

      var div = document.getElementById("category2");
      div.style.width = "200vw";
      div.style.height = "400vh";
      if (categorie > 2) {
        document.getElementById("butonDiscover2").style.transform =
          "translate(-50% , -350%)";
        document.getElementById("butonDiscover3").style.transform =
          "translate(-50% , -50%)";

        var div = document.getElementById("category3");
        div.style.width = "200vw";
        div.style.height = "400vh";
      } else {
        var div = document.getElementById("category3");
        div.style.width = null;
        div.style.height = null;
        document.getElementById("butonDiscover3").style.transform = null;
      }
    } else {
      var div = document.getElementById("category2");
      div.style.width = null;
      div.style.height = null;
      document.getElementById("butonDiscover2").style.transform = null;
    }
  } else {
    var div = document.getElementById("category1");
    div.style.width = null;
    div.style.height = null;
    document.getElementById("butonDiscover1").style.transform = null;
    document.getElementById("butonOpen").style.transform = null;
  }
}

function slideLeft() {
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
      window.location.href = "/pages/one-work.html" + url;
    });
}
// pages/one-work.html?category=3dProjects&id=0
