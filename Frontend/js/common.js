const API_BASE = "https://localhost:7049/api";

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
