const API_BASE = "https://localhost:7049/api"; 

$("#loginForm").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: `${API_BASE}/auth/login`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      username: $("#username").val(),
      password: $("#password").val(),
    }),
    success: function (res) {
      localStorage.setItem("token", res.token);
      window.location.href = "index.html";
    },
    error: function () {
      Swal.fire("Invalid Username or Password", "", "error");
    },
  });
});
