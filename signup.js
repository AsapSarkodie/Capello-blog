//sign import
const authForm = document.querySelector(".in");
const nameInput = document.querySelector("#me");
const authEmail = document.querySelector("#input-email");
const authPassword = document.querySelector("#authpassword");

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const signUpData = {
    name: nameInput.value,
    email: authEmail.value,
    password: authPassword.value,
  };

  console.log(signUpData);

  try {
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      alert("missing slot");
      console.log("missing slot");
      return;
    } else {
      const response = await fetch(`http://localhost:5000/auth/register`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      const data = response.json();

      if (data.token) {
        let token = data.token;
        localStorage.setItem("token", token);
      }
      alert("Signed up successful");
      authForm.reset();
    }
  } catch (error) {
    console.log(`error` + error);
  }
});

//continue from 3:19:22
