//const API_BASE = "https://localhost:7049/api";

const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

$(document).ready(function () {
  loadStudents();
});

function loadStudents() {
  $.ajax({
    url: `${API_BASE}/Students/GetAllStudents`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    success: function (data) {
      let rows = "";
      data.forEach((s) => {
        rows += `
          <tr>
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>${s.address ?? ""}</td>
            <td>${s.stateId}</td>
            <td>${s.phoneNumber}</td>
            <td>${s.photoPath ? `<img src="https://localhost:7049/${s.photoPath}" width="50"/>` : ""}</td>
            <td>${s.subjects}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="editStudent(${s.stuId})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteStudent(${s.stuId})">Delete</button>
            </td>
          </tr>
        `;
      });
      $("#studentTable tbody").html(rows);
    },
    error: () => Swal.fire("Error loading data", "", "error"),
  });
}

function deleteStudent(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Delete this record?",
    icon: "warning",
    showCancelButton: true,
  }).then((res) => {
    if (res.isConfirmed) {
      $.ajax({
        url: `${API_BASE}/Students/DeleteStudent/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        success: function () {
          Swal.fire("Deleted!", "Student deleted successfully", "success");
          loadStudents();
        },
      });
    }
  });
}

function editStudent(id) {
  window.location.href = `create.html?id=${id}`;
}
