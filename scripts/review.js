document.addEventListener("DOMContentLoaded", () => {
  const count = Number(localStorage.getItem("reviewsCount")) || 0;
  const display = document.getElementById("review-counter");
  display.textContent = `You have submitted ${count} review${count !== 1 ? "s" : ""}.`;
});