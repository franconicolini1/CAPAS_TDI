const VALID_COUNTRIES = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Ecuador",
  "Guyana",
  "Guyana Francesa",
  "Paraguay",
  "Perú",
  "Surinam",
  "Uruguay",
  "Venezuela",
];

let nameError = true;
let socialError = true;
let dateError = true;
let countryError = true;
let selectError = true;

const checkProfileName = (e) => {
  if (e.target.value.length <= 0 || e.target.value.length > 12) {
    e.target.className += " border-error";
    e.target.nextElementSibling.className =
      "glyphicon glyphicon-remove-circle error-icon";
    return (nameError = true);
  }
  e.target.classList.remove("border-error");
  e.target.nextElementSibling.className = "far fa-check-circle check-icon";
  return (nameError = false);
};

const checkProfileSocial = (e) => {
  if (e.target.value.length <= 10 || e.target.value.length >= 30) {
    e.target.className += " border-error";
    e.target.nextElementSibling.className =
      "glyphicon glyphicon-remove-circle error-icon";
    return (socialError = true);
  }
  e.target.classList.remove("border-error");
  e.target.nextElementSibling.className = "far fa-check-circle check-icon";
  return (socialError = false);
};

const checkProfileDate = (e) => {
  if (e.target.value.length === 0) {
    e.target.className += " border-error";
    e.target.nextElementSibling.className =
      "glyphicon glyphicon-remove-circle error-icon";
    return (dateError = true);
  }
  e.target.classList.remove("border-error");
  e.target.nextElementSibling.className = "far fa-check-circle check-icon";
  return (dateError = false);
};

const checkProfileCountry = (e) => {
  if (!VALID_COUNTRIES.includes(e.target.value)) {
    e.target.className += " border-error";
    e.target.nextElementSibling.className =
      "glyphicon glyphicon-remove-circle error-icon";
    return (countryError = true);
  }
  e.target.classList.remove("border-error");
  e.target.nextElementSibling.className = "far fa-check-circle check-icon";
  return (countryError = false);
};

const checkProfileSelect = (e) => {
  if (e.target.value === "Seleccionar") {
    e.target.className += " border-error";
    e.target.nextElementSibling.className =
      "glyphicon glyphicon-remove-circle error-icon";
    return (selectError = true);
  }
  e.target.classList.remove("border-error");
  e.target.nextElementSibling.className = "far fa-check-circle check-icon";
  return (selectError = false);
};

const cancelClick = () => {
  $(".save-text")[0].innerHTML = "&nbsp;";

  let i = $(".profile-form-input-container i");
  i.removeClass("far fa-check-circle check-icon");
  i.removeClass("glyphicon glyphicon-remove-circle error-icon");

  let inputs = $("input");
  inputs.removeClass("border-error");

  let select = $("select");
  select.removeClass("border-error");
};

const putErrorBorder = () => {
  if (nameError) {
    const e = $(".profile-name")[0];
    e.className += " border-error";
    e.nextElementSibling.className =
      "glyphicon glyphicon-remove-circle error-icon";
  }

  if (socialError) {
    const e = $(".profile-social")[0];
    e.className += " border-error";
    e.nextElementSibling.className =
      "glyphicon glyphicon-remove-circle error-icon";
  }

  if (countryError) {
    const e = $(".profile-country")[0];
    e.className += " border-error";
    e.nextElementSibling.className =
      "glyphicon glyphicon-remove-circle error-icon";
  }

  if (selectError) {
    const e = $(".profile-select")[0];
    e.className += " border-error";
    e.nextElementSibling.className =
      "glyphicon glyphicon-remove-circle error-icon";
  }

  if (dateError) {
    const e = $(".profile-date")[0];
    e.className += " border-error";
    e.nextElementSibling.className =
      "glyphicon glyphicon-remove-circle error-icon";
  }
};

const deleteInputsContent = () => {
  let inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    if (input.type === "button" || input.type === "reset") return;
    input.value = "";
  });
};

const saveClick = () => {
  let saveText = $(".save-text");

  if (nameError || countryError || selectError || dateError || socialError) {
    saveText[0].textContent = "Verifique los campos erroneos";
    saveText.removeClass("success-text");
    saveText.addClass("error-text");

    putErrorBorder();
  } else {
    saveText.removeClass("error-text");
    saveText.addClass("success-text");
    cancelClick();
    deleteInputsContent();
    saveText[0].textContent = "Guardado";
  }
};

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

const dateKeyPress = (e) => {
  e.target.value = "";
};

$(".profile-name").focusout((e) => checkProfileName(e));
$(".profile-social").focusout((e) => checkProfileSocial(e));
$(".profile-date").focusout((e) => checkProfileDate(e));
$(".profile-country").focusout((e) => checkProfileCountry(e));
$(".profile-select").focusout((e) => checkProfileSelect(e));
$(".profile-form-cancel").click(cancelClick);
$(".profile-form-save").click(saveClick);
$(".profile-date").keydown((e) => dateKeyPress(e));
$(".profile-date").keyup((e) => dateKeyPress(e));
$(".header-nav-icon").click((e) => headerIcon(e));
