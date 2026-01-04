//toggle nav from side
let toggle = document.querySelector("#menu");
let adNav = document.querySelector("#ad-nav");
let closeBtn = document.querySelector(".close");
let submit = document.querySelector("#btn-sub");
let category = document.querySelector("#category");

//show nav bar
toggle.addEventListener("click", () => {
  adNav.classList.add("side");
});

//close nav bar
closeBtn.addEventListener("click", () => {
  adNav.classList.toggle("side");
});
//submit form
// 1. Select the elements
const poemForm = document.querySelector("form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

// --- Form Submission Logic ---
poemForm.addEventListener("submit", async (e) => {
  // Prevent the page from refreshing
  e.preventDefault();

  // Prepare the data object
  const poemData = {
    title: titleInput.value,
    content: contentInput.value,
  };

  try {
    const response = await fetch("http://localhost:5000/poems", {
      method: "POST",
      headers: {
        // This is the most important part!
        // It tells your backend to use express.json()
        "Content-Type": "application/json",
      },
      body: JSON.stringify(poemData),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Poem uploaded successfully!");
      poemForm.reset(); // Clear the form
    } else {
      alert("Error: " + result.error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Could not connect to the server.");
  }
});
