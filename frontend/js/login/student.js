document.getElementById("stuSignIn").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from refreshing page

    const password = document.getElementById("password").value;
    const userName = document.getElementById("userName").value;

    const response = await fetch("http://localhost:5000/api/tech/student/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password , userName }),
    });

    const data = await response.json();

    if (response.status === 200) {
        localStorage.setItem("studentUser", JSON.stringify(data.user)); // storing it
        window.location.href = "myprofile.html";
    } else {
        document.getElementById("message").innerText = data.msg;
        document.getElementById("message").style.color = "red";
    }
});
