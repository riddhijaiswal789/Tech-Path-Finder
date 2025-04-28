// You can enhance this script to add interactivity, API calls, or save state

// console.log("Student profile loaded.");

// // Optional: make edit icon interactive
// document.querySelectorAll('.edit-icon').forEach(icon => {
//   icon.addEventListener('click', () => {
//     alert("Edit feature coming soon!");
//   });
// });


window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("studentUser"));

  if (!user) {
      alert("You are not logged in!");
      window.location.href = "login.html";
      return;
  }

  document.getElementById("studentName").innerText = `${user.firstName} ${user.lastName}`;
  document.getElementById("studentEmail").innerText = user.userName;
});

function logout() {
  localStorage.removeItem("studentUser");
  window.location.href = "login.html";
}