//toggle nav from side
let toggle = document.querySelector("#menu");
let adNav = document.querySelector("#ad-nav");
let closeBtn = document.querySelector(".close");

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
const category = document.querySelector("#category");
const poemImage = document.getElementById("imgs");

// --- Form Submission Logic ---
poemForm.addEventListener("submit", async (e) => {
  // Prevent the page from refreshing
  e.preventDefault();

  // Prepare the data object
  const poemData = new FormData();

  poemData.append("title", titleInput.value);
  poemData.append("content", contentInput.value);
  poemData.append("image", poemImage.files[0]);
  poemData.append("category", category.value);

  try {
    const response = await fetch("http://localhost:5000/poems", {
      method: "POST",

      body: poemData,
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
