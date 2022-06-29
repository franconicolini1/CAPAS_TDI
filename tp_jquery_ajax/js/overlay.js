let cardImgs = document.querySelectorAll(".card-img");
let quitIcons = document.querySelectorAll(".quit-icon");

cardImgs.forEach((img) => {
  img.addEventListener("click", () => {
    img.style.display = "none";
    img.nextElementSibling.style.display = "block";
    img.nextElementSibling.nextElementSibling.style.display = "block";
    img.parentElement.className += " overlay-container";

    if (
      img.classList.contains("card-img-aside") ||
      img.classList.contains("card-img-nav")
    ) {
      img.nextElementSibling.nextElementSibling.nextElementSibling.style.display =
        "none";
      img.nextElementSibling.style.height = "400px";
    }

    if (img.classList.contains("card-img-nav")) {
      img.parentElement.style.transform = "translateY(48.3vh)";
    }

    if (img.classList.contains("card-img-profile")) {
      img.parentElement.style.transform = "translateX(-16.68vw)";
    }

    if (img.classList.contains("card-img-information")) {
      img.parentElement.style.transform = "translateX(-16.68vw)";
      img.nextElementSibling.classList += " center";
      img.nextElementSibling.nextElementSibling.classList += " center-icon";
    }

    if (img.classList.contains("card-img-collapse")) {
      img.parentElement.style.transform = "translateX(-16.68vw)";
    }

    if (img.classList.contains("card-img-collapse")) {
      img.nextElementSibling.nextElementSibling.nextElementSibling.style.display =
        "none";
    }
  });
});

quitIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.previousElementSibling.style.display = "none";
    icon.previousElementSibling.previousElementSibling.style.display = "block";
    icon.parentElement.classList.remove("overlay-container");
    icon.style.display = "none";

    if (
      icon.previousElementSibling.previousElementSibling.classList.contains(
        "card-img-aside"
      ) ||
      icon.previousElementSibling.previousElementSibling.classList.contains(
        "card-img-nav"
      )
    ) {
      icon.nextElementSibling.style.display = "block";
    }

    if (
      icon.previousElementSibling.previousElementSibling.classList.contains(
        "card-img-nav"
      ) ||
      icon.previousElementSibling.previousElementSibling.classList.contains(
        "card-img-profile"
      ) ||
      icon.previousElementSibling.previousElementSibling.classList.contains(
        "card-img-collapse"
      ) ||
      icon.previousElementSibling.previousElementSibling.classList.contains(
        "card-img-information"
      )
    ) {
      icon.parentElement.style.transform = "none";
    }

    if (
      icon.previousElementSibling.previousElementSibling.classList.contains(
        "card-img-collapse"
      )
    ) {
      icon.nextElementSibling.style.display = "block";
    }
  });
});
