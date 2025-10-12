const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

// Grab the <select> element by ID
const productSelect = document.getElementById("product");

// Loop through the products array and create options
products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.id;      // the value attribute
  option.textContent = product.name; // visible text in the dropdown
  productSelect.appendChild(option);
});

// Increment counter when form is submitted successfully
const form = document.getElementById("reviewForm");

form.addEventListener("submit", () => {
  let count = localStorage.getItem("reviewsCount");
  count = count ? parseInt(count, 10) + 1 : 1;
  localStorage.setItem("reviewsCount", count);
});