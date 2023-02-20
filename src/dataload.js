// Get the category and id from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const id = parseInt(urlParams.get("id"));

// Check if the category and id are valid
if (!category || isNaN(id)) {
  console.error("Invalid category or id in the URL");
}

// Load the data.json file
fetch("../src/data.json")
  .then((response) => response.json())
  .then((data) => {
    // Get the project data from data.json based on the category and id
    const projectData = data[category][id];
    if (!projectData) {
      console.error("Project not found in data.json");
    }
    console.log(document.querySelector(".backgroundReplace").style.background);
    mainImage = document.querySelector(".backgroundReplace").style;
    mainImage.background =
      "url(../assets/" +
      projectData.name +
      "/" +
      projectData.images[0] +
      ") center";
    mainImage.backgroundSize = "cover";

    console.log(document.querySelector(".backgroundReplace").style.background);
    if (projectData.images.length > 1) {
      for (i = 1; i < projectData.images.length; i++) {
        console.log(i);
        console.log(projectData.name, projectData.images[i]);
        document.querySelector(".cardsInsert").innerHTML +=
          `
          <button
          onclick="openCurrentImage('` +
          projectData.images[i] +
          `')"
          class="mr-[2.5vw] aspect-[2/3] rounded-3xl border-2 border-blue-first"
          style="
            background: url(../assets/` +
          projectData.name +
          `/` +
          projectData.images[i] +
          `) center;
            background-size: cover;
          "
        ></button>`;
      }
    }
  });

function openCurrentImage(nomImage) {
  fetch("../src/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the project data from data.json based on the category and id
      const projectData = data[category][id];
      if (!projectData) {
        console.error("Project not found in data.json");
      }
      bigImage = document.getElementById("see-big-image").style;
      if (!nomImage) {
        bigImage.background =
          "url(../assets/" +
          projectData.name +
          "/big-" +
          projectData.images[0] +
          ") no-repeat center";
      } else {
        bigImage.background =
          "url(../assets/" +
          projectData.name +
          "/big-" +
          nomImage +
          ") no-repeat center";
      }
      document.getElementById("see-big-section").style.display = "block";
      bigImage.backgroundSize = "contain";
      bigImage.display = "block";
    });
}
function closeBig() {
  console.log("close image");
  document.getElementById("see-big-section").style.display = null;
}
