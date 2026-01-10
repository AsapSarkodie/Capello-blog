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
    } else {
      const response = await fetch(`http://localhost:5000/auth/register`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      console.log(await response.json());

      alert("Sign up was successful");
      console.log("SignUp was successful");

      authForm.reset();
    }
  } catch (error) {
    console.log(`error` + error.message);
  }
});

//continue from 3:19:22
//fix the alert
