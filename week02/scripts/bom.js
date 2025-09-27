const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list'); // you need to fill in the blank to reference the HTML 

// When the button is clicked...
button.addEventListener("click", () => {
  const chapter = input.value.trim();

  // Check that input is not empty
  if (chapter !== "") {
    // Create list item
    const li = document.createElement("li");
    li.textContent = chapter;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.setAttribute("aria-label", `Remove ${chapter}`);
    deleteBtn.classList.add("delete");

    // Append delete button to the li
    li.append(deleteBtn);

    // Append li to the list
    list.append(li);

    // Add delete functionality
    deleteBtn.addEventListener("click", () => {
      list.removeChild(li);
      input.value = "";
      input.focus();
    });

    // Clear and refocus the input
    input.value = "";
    input.focus();
  } else {
    // Optional: alert if user tries to add empty input
    alert("Please enter a Book of Mormon chapter!");
    input.focus();
  }
});