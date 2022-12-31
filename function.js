var clipboard = new Clipboard(".copy");
var lowercase = "abcdefghijklmnopqrstuvwxyz",
  uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers = "0123456789",
  punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  lowercaseInput = document.getElementById("lowercase"),
  uppercaseInput = document.getElementById("uppercase"),
  punctuationInput = document.getElementById("punctuation"),
  numbersInput = document.getElementById("numbers"),
  lengthInput = document.getElementById("length"),
  passwordFeild = document.getElementById("pass-field"),
  generateButton = document.getElementById("generate"),
  copyButton = document.getElementById("copy"),
  plength,
  userPassword,
  passwordCharSet;

function generate() {
  userPassword = "";
  passwordCharSet = "";
  if (lowercaseInput.checked) {
    passwordCharSet += lowercase;
  }
  if (uppercaseInput.checked) {
    passwordCharSet += uppercase;
  }
  if (punctuationInput.checked) {
    passwordCharSet += punctuation;
  }
  if (numbersInput.checked) {
    passwordCharSet += numbers;
  }
  plength = Number(lengthInput.value);

  for (let i = 0; i < plength; i++) {
    userPassword += passwordCharSet.charAt(
      Math.floor(Math.random() * passwordCharSet.length)
    );
  }
  if (userPassword == "") {
    let alertbox = document.getElementById("alert");
    alertbox.innerHTML = "Please select an option before generating";
    alertbox.classList.add("fail");
    setTimeout(function () {
      alertbox.classList.remove("fail");
    }, 3000);
  } else {
    passwordFeild.innerHTML = userPassword;
  }
  copyButton.setAttribute("data-clipboard-text", userPassword);
}
generateButton.addEventListener("click", generate);

clipboard.on("success", function (e) {
  console.info("Action:", e.action);
  console.info("Text:", e.text);
  console.info("Trigger:", e.trigger);
  let alertbox = document.getElementById("alert");
  alertbox.innerHTML = "Copied!";
  alertbox.classList.add("success");
  setTimeout(function () {
    alertbox.classList.remove("success");
  }, 3000);

  e.clearSelection();
});

clipboard.on("error", function (e) {
  console.error("Action:", e.action);
  console.error("Trigger:", e.trigger);
  let alertbox = document.getElementById("alert");
  alertbox.innerHTML = "Try select the text to copy";
  alertbox.classList.add("fail");
  setTimeout(function () {
    alertbox.classList.remove("fail");
  }, 3000);
});
