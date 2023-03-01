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

      console.log(
        document.querySelector(".backgroundReplace").style.background
      );
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
      bigImage = document.getElementById("see-big-image").style;
      bigSection = document.getElementById("see-big-section").style;
      urlVideo =
        "../assets/" +
        projectData.name +
        "/video-" +
        nomVideo.substr(0, nomVideo.length - 3) +
        "mp4";

      bigSection.display = "block";
      bigImage.display = "block";
      document.getElementById("see-big-image").innerHTML =
        `<video class="absolute"
    id="my-video z-40"
    controls
    autoplay
    width="100%"
    height="100%"
    style="height:100vh;width:100vw"
    playsinline
  >
    <source src="` +
        urlVideo +
        `"type="video/mp4">
  </video>
  <button
      onclick="closeBig()"
      class="absolute left-1/2 bottom-0 box-border h-14 w-14 translate-x-[-50%] translate-y-[-50%] cursor-pointer select-none rounded-full border-2 border-blue-first bg-blue-first font-bold text-white duration-200 ease-out active:scale-90 active:bg-transparent z-50"
    >
      <img
        id="close"
        class="pointer-events-none absolute top-1/2 left-1/2 aspect-square h-4 translate-x-[-50%] translate-y-[-50%] scale-150 duration-200"
        src="../public/close.svg"
      />
    </button>
  `;
      console.log(
        bigSection.innerHTML,
        document.getElementById("see-big-image").innerHTML
      );
    });
}

function openCurrentImage(nomImage) {
  fetch("../src/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the project data from data.json based on the category and id
      const projectData = data[category][id];
      if (!projectData) {
        console.error("Project not found in data.json");
      }
      bigImage = document.getElementById("imageElement").style;
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
      document.getElementById("loadElement").style.display = "block";
      document.getElementById("imageElement").style.display = "block";
      bigImage.backgroundSize = "contain";
    });
}
function closeBig() {
  console.log("close image");
  loadElement = document.getElementById("loadElement");
  imageElement = document.getElementById("imageElement");
  if (document.getElementById("my-video") != undefined) {
    currentVideo = document.getElementById("my-video");
    currentVideo.currentTime = 10000;
    currentVideo.remove();
    bigImage.innerHTML = "";
  }
  imageElement.style.display = null;
  imageElement.style.backgroundImage = null;
  loadElement.style.display = null;
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

//scroll horizontal to vertical
const scrollable = document.getElementById("scrollable");

scrollable.addEventListener("wheel", (event) => {
  event.preventDefault();

  const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
  scrollable.scrollLeft -= delta * 40;
});

const scrollablePhone = document.getElementById("scrollablePhone");

scrollablePhone.addEventListener("wheel", (event) => {
  event.preventDefault();

  const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
  scrollablePhone.scrollLeft -= delta * 30;
});

// document.getElementById("my-video").addEventListener("click", (event) => {
//   document.getElementById("my-video");
//   // event.preventDefault();
//   console.log("arret!!", event);
// });
