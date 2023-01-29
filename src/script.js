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
    div.style.width = "400vh";
    div.style.height = "600vh";
    if (categorie > 1) {
      var div = document.getElementById("category2");
      div.style.width = "400vh";
      div.style.height = "600vh";
      if (categorie > 2) {
        var div = document.getElementById("category3");
        div.style.width = "400vh";
        div.style.height = "600vh";
      } else {
        var div = document.getElementById("category3");
        div.style.width = "41vh";
        div.style.height = "61vh";
      }
    } else {
      var div = document.getElementById("category2");
      div.style.width = "42vh";
      div.style.height = "62vh";
    }
  } else {
    var div = document.getElementById("category1");
    div.style.width = "43vh";
    div.style.height = "63vh";
  }
}

function slideLeft() {
  if (categorie > 0) {
    categorie--;
    changeDivCSS();
    document.getElementById("nav-right").style.opacity = 1;
  } else {
    document.getElementById("nav-left").style.opacity = 0;
  }
}
function slideRight() {
  if (categorie < 4) {
    categorie++;
    changeDivCSS();
    document.getElementById("nav-left").style.opacity = 1;
  } else {
    document.getElementById("nav-right").style.opacity = 0;
  }
}
