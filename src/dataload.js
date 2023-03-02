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
      } else {
        //replace Date, Title and description
        document.getElementById("dateReplace").innerText = projectData.date;
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

        if (projectData.videos.length >= 1) {
          for (j = 0; j < projectData.videos.length; j++) {
            console.log("video", j, projectData.name, projectData.videos[j]);
            document.querySelector(".cardsInsert").innerHTML +=
              `
          <button
          onclick="openCurrentVideo('` +
              projectData.videos[j] +
              `')"
          class="mr-[2.5vw] aspect-[2/3] rounded-3xl border-2 border-blue-first"
          style="
            background: url(../assets/` +
              projectData.name +
              `/` +
              projectData.videos[j] +
              `) center;
            background-size: cover;
          "
        >
        <div class="h-full w-full" style="background:url(../public/play.png) no-repeat center;  background-size: 5rem 5rem;"></div>
        </button>`;
          }
        }
        if (projectData.images.length > 1) {
          for (i = 1; i < projectData.images.length; i++) {
            console.log("image", i, projectData.name, projectData.images[i]);
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
      }
    });
}

updateContent();

function openCurrentVideo(nomVideo) {
  fetch("../src/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the project data from data.json based on the category and id
      const projectData = data[category][id];
      if (!projectData) {
        console.error("Project not found in data.json");
      }
      document.getElementById("videoElement").style.display = "block";
      document.getElementById("loadElement").style.display = "block";
      urlVideo = nomVideo.substr(0, nomVideo.length - 4);
      document.getElementById("youtubeIframe").innerHTML =
        `
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/` +
        urlVideo +
        `"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>`;
    });
}

function openCurrentImage(nomImage) {
  fetch("../src/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the project data from data.json based on the category and id
      const projectData = data[category][id];
      if (!projectData) {
        console.error(
          "Sorry but this picture is unavailable. Project not found in data.json"
        );
      } else {
        bigImage = document.getElementById("imageElement").style;
        // console.log(
        //   "bahahaha",
        //   imageExists(
        //     "../assets/" + projectData.name + "/big-" + projectData.images[0]
        //   )
        // );
        if (!nomImage) {
          if (
            imageExists(
              "../assets/" + projectData.name + "/big-" + projectData.images[0]
            )
          ) {
            //affiche la bonne image
            bigImage.background =
              "url(../assets/" +
              projectData.name +
              "/big-" +
              projectData.images[0] +
              ") no-repeat center";
          } else {
            //affiche 404
            bigImage.background =
              "url(../public/error404.png) no-repeat center";
          }
        } else {
          //affiche la bonne image
          if (
            imageExists("../assets/" + projectData.name + "/big-" + nomImage)
          ) {
            bigImage.background =
              "url(../assets/" +
              projectData.name +
              "/big-" +
              nomImage +
              ") no-repeat center";
          } else {
            //affiche 404
            bigImage.background =
              "url(../public/error404.png) no-repeat center";
          }
        }
        document.getElementById("loadElement").style.display = "block";
        document.getElementById("imageElement").style.display = "block";
        bigImage.backgroundSize = "contain";
      }
    });
}
function closeBig() {
  loadElement = document.getElementById("loadElement");
  imageElement = document.getElementById("imageElement");
  videoElement = document.getElementById("videoElement");
  youtubeIframe = document.getElementById("youtubeIframe");

  loadElement.style.display = null;
  imageElement.style.display = null;
  imageElement.style.backgroundImage = null;
  videoElement.style.display = null;
  youtubeIframe.innerHTML = "";
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
      if (parseInt(id) + 1 < projectData.length) {
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

function imageExists(image_url) {
  var http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);
  http.send();

  return http.status != 404;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeBig();
  }
});

//scroll horizontal to vertical
const scrollable = document.getElementById("scrollable");

scrollable.addEventListener("wheel", (event) => {
  event.preventDefault();
  // console.log(event);
  scrollable.scrollLeft += event.deltaY * 2;
});
