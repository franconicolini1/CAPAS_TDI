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
