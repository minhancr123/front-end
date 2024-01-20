const wrapper = document.querySelector(".wrapper");
const login = document.querySelector(".login-link");
const register = document.querySelector(".register-link");
const loginbtn = document.querySelector(".btn-login");
const closebtn = document.querySelector(".close-icon");
register.addEventListener("click", () => {
  wrapper.classList.add("active");
});
login.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
loginbtn.addEventListener("click", () => {
  wrapper.classList.add("active-popup");
});
closebtn.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
});
