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
    document.getElementById("butonOpen").style.transform +=
      "translate(-50% , -350%)";
    if (categorie > 1) {
      var div = document.getElementById("category2");
      div.style.width = "200vw";
      div.style.height = "400vh";
      if (categorie > 2) {
        var div = document.getElementById("category3");
        div.style.width = "200vw";
        div.style.height = "400vh";
      } else {
        var div = document.getElementById("category3");
        div.style.width = null;
        div.style.height = null;
      }
    } else {
      var div = document.getElementById("category2");
      div.style.width = null;
      div.style.height = null;
    }
  } else {
    var div = document.getElementById("category1");
    div.style.width = null;
    div.style.height = null;
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
