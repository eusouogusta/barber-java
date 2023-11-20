const showLoginBtn = document.getElementById("showLoginBtn");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

showLoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("oculto");
  registerForm.classList.add("oculto");
});

showRegisterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.remove("oculto");
  loginForm.classList.add("oculto");
});
