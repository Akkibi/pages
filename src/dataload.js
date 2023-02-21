// Get the category and id from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const id = parseInt(urlParams.get("id"));

// Check if the category and id are valid
if (!category || isNaN(id)) {
  console.error("Invalid category or id in the URL");
}

//set transparency on arrows
function updateOpacity(x) {
  if (id <= 0) {
    document.getElementById("arrow-left").style.opacity = 0;
  } else {
    document.getElementById("arrow-left").style.opacity = 1;
  }
  if (x) {
    if (id >= x - 1) {
      document.getElementById("arrow-right").style.opacity = 0;
    } else {
      document.getElementById("arrow-right").style.opacity = 1;
    }
  }
}

// Load the data.json file
function updateContent() {
  fetch("../src/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the project data from data.json based on the category and id
      const projectData = data[category][id];
      if (!projectData) {
        console.error("Project not found in data.json");
      }
      console.log(
        document.querySelector(".backgroundReplace").style.background
      );

      document.getElementById("titleReplace").innerText = projectData.title;
      document.getElementById("descriptionReplace").innerText =
        projectData.description;

      mainImage = document.querySelector(".backgroundReplace").style;
      mainImage.background =
        "url(../assets/" +
        projectData.name +
        "/" +
        projectData.images[0] +
        ") center";
      mainImage.backgroundSize = "cover";

      console.log(
        document.querySelector(".backgroundReplace").style.background
      );
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
      //update opacity on load
      if (id + 1 <= data[category].length) {
        updateOpacity(data[category].length);
      } else {
        updateOpacity();
      }
    });
}

updateContent();

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

//when right arrow is clicked
function imageRight() {
  // get the current URL
  const url = new URL(window.location.href);

  // get the id parameter from the query string
  const id = url.searchParams.get("id");

  //verify that the page exists
  fetch("../src/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the project data from data.json based on the category and id
      const projectData = data[category];
      if (!projectData) {
        console.error("Project not found in data.json");
      }
      // add 1 to the id
      let newId = parseInt(id);
      console.log(projectData.length);
      if (parseInt(id) + 1 <= projectData.length) {
        newId = parseInt(id) + 1;

        // set the new id to the URL
        url.searchParams.set("id", newId);

        // update the URL
        window.history.replaceState(null, null, url);
        location.reload();
        updateOpacity();
        updateContent();
      }
    });
}

//when left arrow is clicked
function imageLeft() {
  const url = new URL(window.location.href);

  // get the id parameter from the query string
  const id = url.searchParams.get("id");
  if (id > 0) {
    // substract 1 to the id
    const newId = parseInt(id) - 1;

    // set the new id to the URL
    url.searchParams.set("id", newId);

    // update the URL
    window.history.replaceState(null, null, url);
    location.reload();
    updateOpacity();
    updateContent();
  }
}

// var scrollable = document.getElementById("scrollable");

// scrollable.addEventListener("wheel", function (event) {
//   if (event.deltaX !== 0) {
//     event.preventDefault();
//     scrollable.scrollLeft += event.deltaX;
//   }
// });

const scrollable = document.getElementById("scrollable");

scrollable.addEventListener("wheel", (event) => {
  event.preventDefault();

  const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
  scrollable.scrollLeft += delta * 40;
});

const scrollablePhone = document.getElementById("scrollablePhone");

scrollablePhone.addEventListener("wheel", (event) => {
  event.preventDefault();

  const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
  scrollablePhone.scrollLeft += delta * 30;
});
