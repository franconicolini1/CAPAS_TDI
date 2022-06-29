let result = document.querySelector(".calculator-result-text");
let addElement = document.querySelector(".add");
let subElement = document.querySelector(".sub");
let multElement = document.querySelector(".mult");
let divideElement = document.querySelector(".divide");
let equal = document.querySelector(".equal");
let numbers = document.querySelectorAll(".calculator-number");
let operators = document.querySelectorAll(".operator");

let number1 = null,
  number2 = null,
  f = null,
  actual = null;

const calculate = () => {
  number2 = actual;
  if (!number1 || !number2 || !f) {
    return (result.innerHTML = "ERROR DE ENTRADA");
  }

  result.innerHTML = f(Number(number1), Number(number2));
  number1 = null;
  number2 = null;
  f = null;
  actual = null;
};

const checkEntry = () => {
  const r = result.innerHTML;
  if (
    r === "&nbsp;" ||
    r === "ERROR DE ENTRADA" ||
    r === "NO SE PUEDE DIVIDIR POR 0 EVE :)" ||
    (actual === null && number1 === null)
  ) {
    return true;
  }
  return false;
};

equal.addEventListener("click", calculate);

numbers.forEach((item) => {
  item.addEventListener("click", () => {
    result.innerHTML = checkEntry() ? "" : result.innerHTML;
    result.innerHTML = result.innerHTML;
    result.innerHTML += item.value;
    if (actual === null) {
      actual = "";
    }
    actual += item.value;
  });
});

operators.forEach((item) => {
  item.addEventListener("click", () => {
    result.innerHTML = checkEntry() ? "" : result.innerHTML;
    if (item.value === "-" && actual === null && number1 === null) {
      return;
    }

    result.innerHTML = result.innerHTML === "&nbsp;" ? "" : result.innerHTML;
    result.innerHTML += " " + item.value + " ";
  });
});

addElement.addEventListener("click", () => {
  f = f !== null ? f : add;
  number1 = actual;
  actual = number2;
});

subElement.addEventListener("click", (e) => {
  if (actual === null && number1 === null) {
    if (actual === null) {
      actual = "";
    }
    result.innerHTML += e.target.value;
    return (actual += e.target.value);
  }

  f = f !== null ? f : sub;
  number1 = actual;
  actual = number2;
});

multElement.addEventListener("click", () => {
  f = f !== null ? f : mult;
  number1 = actual;
  actual = number2;
});

divideElement.addEventListener("click", () => {
  f = f !== null ? f : divide;
  number1 = actual;
  actual = number2;
});

const add = (n1, n2) => {
  return n1 + n2;
};

const sub = (n1, n2) => {
  return n1 - n2;
};

const mult = (n1, n2) => {
  return n1 * n2;
};

const divide = (n1, n2) => {
  if (n2 === 0) {
    return "NO SE PUEDE DIVIDIR POR 0 EVE :)";
  }
  return n1 / n2;
};
