const loginButton = document.querySelector("#login-form-submit");
const username = document.querySelector("#username-field");
const password = document.querySelector("#password-field");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const user = username.value;
  const pwd = password.value;
  if (user === pwd) {
    alert("Login Successful!");
    localStorage.setItem("isLoggedIn", "true");
    location.href = "./orders.html";
  } else {
    alert("Please enter valid credentials!");
  }
});

if (localStorage.getItem("isLoggedIn") == "true") {
  location.href = "./orders.html";
}
