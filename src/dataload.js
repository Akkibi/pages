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
      "url(../assets/firby/" + projectData.images[0] + ") center";
    // mainImage.background-size = "cover";

    console.log(document.querySelector(".backgroundReplace").style.background);
    if (projectData.images.length > 1) {
      for (i = 1; i < projectData.images.length; i++) {
        console.log(i);
        document.querySelector(".cardsInsert").innerHTML +=
          `
          <div
          class="textReplace mr-[2.5vw] aspect-[2/3] rounded-3xl border-2 border-blue-first"
          style="
            background: url(../assets/firby/` +
          projectData.images[i] +
          `) center;
            background-size: cover;
          "
        ></div>`;
      }
    }
  });
