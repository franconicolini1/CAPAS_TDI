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
