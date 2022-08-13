
var buttons = document.getElementsByClassName("button");
var display1 = document.getElementById("display1");
var display2 = document.getElementById("display2");
var bar = document.getElementById("bar-icon");
var stn = document.getElementById("stn");
var sci = document.getElementById("sci");

var operand1 = 0;
var operand2 = 0;
var operator = null;
var result = 0;
var fontCheck = 0;
var prev = null;

function isoperator(value) {
  return (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    value === "/" ||
    value === "%" ||
    value === "^" ||
    value === "!" ||
    value === "sqr"
  );
}

//icon navigation and slider window
bar.addEventListener("click", icon);
function icon() {
  document.getElementById("slide").style.width = 132 + "px";
  document.getElementById("slide").style.height = 524 + "px";
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

// on scientific button click
sci.addEventListener("click", function () {
  document.getElementById("slide").style.width = 0 + "px";
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
  stn.style.visibility = "hidden";
  sci.style.zIndex = "2";
});

//large display
display2.addEventListener("click", function () {
  document.getElementById("slide").style.width = 0 + "px";
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
});

// Click event function on buttons
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", clickevent);
}

// Function for Click event
function clickevent() {
  let value = this.getAttribute("data-value");

  var text = display2.textContent.trim();
  if (isoperator(value)) {
    display2.style.fontSize = "2.5rem";
    fontCheck = 0;
    operator = value;
    if (operator === "+") {
      if (result === 0) {
        if (prev == null) {
          operand1 = operand1 + parseFloat(display2.textContent);
        } else {
          operand1 = eval(
            operand1 + " " + prev + " " + parseFloat(display2.textContent)
          );
        }
      } else {
        operand1 = result;
        result = 0;
        operand1 = result + parseFloat(display2.textContent);
      }
      display1.innerText = operand1;
      display1.innerText += value;
      display2.innerText = " ";
      prev = operator;
    } else if (operator === "-") {
      if (result === 0) {
        if (prev == null) {
          operand1 = parseFloat(display2.textContent) - operand1;
        } else {
          operand1 = eval(
            operand1 + " " + prev + " " + parseFloat(display2.textContent)
          );
        }
      } else {
        operand1 = result;
        result = 0;
        operand1 = result + parseFloat(display2.textContent);
      }
      display1.innerText = operand1;
      display1.innerText += value;
      display2.innerText = " ";
      prev = operator;
    } else if (operator === "*") {
      if (result === 0) {
        if (prev == null) {
          operand1 = 1 * parseFloat(display2.textContent);
        } else {
          operand1 = eval(
            operand1 + " " + prev + " " + parseFloat(display2.textContent)
          );
        }
      } else {
        operand1 = result;
        result = 0;
        operand1 = result + parseFloat(display2.textContent);
      }
      display1.innerText = operand1;
      display1.innerText += value;
      display2.innerText = " ";
      prev = operator;
    } else if (operator === "/") {
      if (result === 0) {
        if (prev == null) {
          operand1 = parseFloat(display2.textContent) / 1;
        } else {
          operand1 = eval(
            operand1 + " " + prev + " " + parseFloat(display2.textContent)
          );
        }
      } else {
        operand1 = result;
        result = 0;
        operand1 = result + parseFloat(display2.textContent);
      }
      display1.innerText = operand1;
      display1.innerText += value;
      display2.innerText = " ";
      prev = operator;
    } else if (operator === "%") {
      if (result !== 0) {
        var a = 100;
        var newresult = eval(result / a);
        display2.textContent = newresult;
        display1.innerText = result + operator;
      }
    } else if (operator === "^") {
      if (result === 0) {
        operand1 = 1 * parseFloat(text);
        display1.innerText += value;
        display2.innerText = "";
      } else {
        operand1 = result;
        display1.innerText = operand1 + operator;
        display2.innerText = "";
      }
    } else if (operator === "sqr") {
      if (
        display2.innerText.length === 0 ||
        parseFloat(display2.textContent) === 0
      ) {
        display1.innerText = `sqr(${0})`;
        display2.innerText = 0;
        return;
      } else if (parseFloat(display2.textContent) === 1) {
        display1.innerText = `sqr(${1})`;
        display2.innerText = 1;
        return;
      }
      result =
        parseFloat(display2.textContent) * parseFloat(display2.textContent);
      display1.innerText = `sqr(${parseFloat(display2.textContent)})`;
      display2.innerText = result;
    } else if (operator === "!") {
      if (
        display2.innerText.length === 0 ||
        parseFloat(display2.textContent) === 0 ||
        parseFloat(display2.textContent) === 1
      ) {
        display1.innerText = `fact(${parseFloat(display2.textContent)})`;
        display2.innerText = 1;
        return;
      }
      result = fact(parseFloat(display2.textContent));
      display1.innerText = `fact(${parseFloat(display2.textContent)})`;
      display2.innerText = result;
    }
  } else if (value === "ac") {
    display2.style.fontSize = "2.5rem";
    display2.innerText = " ";
    display1.innerText = " ";

    operand1 = 0;
    operand2 = 0;
    operator = null;
    result = 0;
    prev = null;
  } else if (value === "c") {
    if (result > 0 && display2.innerText.length > 0) {
      display2.innerText = " ";
      display1.innerText = " ";
      display2.style.fontSize = "2.5rem";
      operand1 = 0;
      operand2 = 0;
      operator = null;
      result = 0;
      prev = null;
    } else {
      let str1 = String(display2.innerText);

      let str2 = String(display1.innerText);

      let str3 = str1.slice(0, display2.innerText.length - 1);
      let str4 = str2.slice(0, display1.innerText.length - 1);

      if (str3.length === 0) {
        display2.innerText = " ";
        display1.innerText = " ";
        operand1 = 0;
        operand2 = 0;
        operator = null;
        result = 0;
        prev = null;
      } else {
        display1.innerText = str4;
        value = parseFloat(str3);
        display2.innerText = value;
      }
    }
  } else if (value === "=") {
    operand2 = parseFloat(text);
    if (operator === "^") {
      result = operand1 ** operand2;
    } else {
      result = eval(operand1 + " " + operator + " " + operand2);
    }
    display2.textContent = result;
    display1.textContent += "=";
  } else if (value === ".") {
    if (text.length > 0) {
      display2.innerText += value;
      display1.innerText += value;
    }
  } else {
    if (fontCheck < 11) {
      display2.innerText += value;
    } else {
      display2.style.fontSize = "2rem";
      display2.innerText += value;
    }
    fontCheck++;
    display1.innerText += value;
  }
}

// Recursive call for factorial
function fact(n) {
  if (n === 1) {
    return n;
  }
  return n * fact(n - 1);
}
