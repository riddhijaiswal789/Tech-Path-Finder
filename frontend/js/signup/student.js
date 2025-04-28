document.getElementById("stuSignUp").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from refreshing page

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const password = document.getElementById("password").value;
    const userName = document.getElementById("userName").value;

    const response = await fetch("http://localhost:5000/api/tech/student/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, userName, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
        document.getElementById("message").innerText = "Signup successful! You can now login.";
        document.getElementById("message").style.color = "green";
    } else {
        document.getElementById("message").innerText = data.msg;
        document.getElementById("message").style.color = "red";
    }
});

