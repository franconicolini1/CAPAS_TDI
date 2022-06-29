let showAlbumButtons;
let albums;

$("document").ready(() => {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    type: "GET",
    dataType: "json",
    async: false,
    success: (data) => tableSuccess(data),
    error: (e) => tableError(e),
  });
});

const tableSuccess = (data) => {
  let tableBody = document.querySelector(".table-body");
  let html = "";

  data.forEach((item) => {
    const addr = item.address;

    html += `<tr class="tr">
      <td class="td" value=${item.id}>${item.id}</td>
      <td class="td">${item.name}</td>
      <td class="td">${item.username}</td>
      <td class="td">${item.email}</td>
      <td class="td">${addr.city}, ${addr.street}, ${addr.suite} - ${addr.zipcode}</td>
      <td class="td">${item.company.name}</td>
      <td class="td"><button class="show-album" value="Ver Album">Ver &Aacute;lbum</button></td>
    </tr>`;
  });

  tableBody.innerHTML += html;
  showAlbumButtons = document.querySelectorAll(".show-album");

  showAlbumButtons.forEach((item) => {
    item.addEventListener("click", (e) =>
      getAlbums(
        e.target.parentElement.parentElement.firstElementChild.getAttribute(
          "value"
        )
      )
    );
  });
};

const tableError = (e) => {
  console.error(e);
};

const getAlbums = (id) => {
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/albums/${id}/photos `,
    type: "GET",
    dataType: "json",
    async: false,
    success: (data) => albumSuccess(data, id),
    error: (e) => albumError(e),
  });
};

const albumSuccess = (data, id) => {
  let albumContainer = document.querySelector(".album-items-container");
  albumContainer.innerHTML = "";
  let html = "";

  for (let i = 0; i < 10; i++) {
    html += `<div class="album">
        <p class="album-title">${data[i].title.slice(0, 10)}</p>
    </div>`;
  }

  albumContainer.innerHTML += html;

  albums = document.querySelectorAll(".album");
  albums.forEach((album) => {
    album.addEventListener("click", (e) => getImagesFromAlbum(id));
  });
};

const albumError = (e) => {
  console.error(e);
};

/* IMAGES */

const getImagesFromAlbum = (albumId) => {
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
    type: "GET",
    dataType: "json",
    async: false,
    success: (data) => imagesSuccess(data),
    error: (e) => imagesError(e),
  });
};

const imagesSuccess = (data) => {
  let imagesContainer = document.querySelector(".img-items-container");
  imagesContainer.innerHTML = "";
  let html = "";

  for (let i = 0; i < 10; i++) {
    html += `<img class="img-item" alt="album image ${i}" src=${data[i].thumbnailUrl} url=${data[i].url} />`;
  }

  imagesContainer.innerHTML += html;

  const images = document.querySelectorAll(".img-item");
  images.forEach((img) => {
    img.addEventListener("click", () => {
      let overlayContainer = document.querySelector(".overlay-container");
      overlayContainer.style.display = "flex";

      overlayContainer.firstElementChild.setAttribute(
        "src",
        img.getAttribute("url")
      );
    });
  });

  const overlayIcon = document.querySelector(".overlay-icon");
  overlayIcon.addEventListener("click", () => {
    let overlayContainer = document.querySelector(".overlay-container");
    overlayContainer.style.display = "none";
  });
};

const imagesError = (e) => {
  console.log(e);
};

/* INITIAL IMAGES */

const images = document.querySelectorAll(".expand-img");
images.forEach((img) => {
  img.addEventListener("click", () => {
    let overlayContainer = document.querySelector(".overlay-container");
    overlayContainer.style.display = "flex";

    overlayContainer.firstElementChild.setAttribute(
      "src",
      img.getAttribute("src")
    );
  });
});

const overlayIcon = document.querySelector(".overlay-icon");
overlayIcon.addEventListener("click", () => {
  let overlayContainer = document.querySelector(".overlay-container");
  overlayContainer.style.display = "none";
});

/* ASIDE RESPONSIVE */

const headerIcon = (e) => {
  let aside = document.querySelector(".aside");

  if (aside.classList.contains("col-xs")) {
    aside.style.transform = "translateX(-50vw)";
    aside.classList.replace("col-xs", "col-xs-3");
  } else {
    aside.style.transform = "none";
    aside.classList.replace("col-xs-3", "col-xs");
  }
};

$(".header-nav-icon").click((e) => headerIcon(e));
