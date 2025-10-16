const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

if (menuBtn && nav) {
  // Toggle menu open/close on mobile
  menuBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });

  // Close menu after clicking a link (mobile only)
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && window.innerWidth <= 768) {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    }
  });
}

// Booking form logic
// ===== BOOKING FORM =====
const form = document.getElementById("bookingForm");
const modal = document.getElementById("thankYouModal");
const message = document.getElementById("thankYouMessage");
const sessionSelect = document.getElementById("session");

// Only execute booking logic if the form exists on this page
if (form && modal && message && sessionSelect) {
  // Dynamic session options
  const sessionOptions = [
    { value: "portrait", label: "Portrait" },
    { value: "wedding", label: "Wedding" },
    { value: "event", label: "Event" },
    { value: "outdoor", label: "Outdoor" },
    { value: "family", label: "Family Session" },
    { value: "graduation", label: "Graduation" },
    { value: "custom", label: "Custom" },
  ];

  window.addEventListener("DOMContentLoaded", () => {
    sessionSelect.innerHTML = '<option value="">Select a session</option>';
    sessionOptions.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt.value;
      option.textContent = opt.label;
      sessionSelect.appendChild(option);
    });
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const session = form.session.value;
    const notes = form.message.value.trim();

    let existing = [];
    try {
      existing = JSON.parse(localStorage.getItem("bookings")) || [];
    } catch (e) {
      console.warn("Corrupted localStorage data for bookings, resetting.");
      localStorage.removeItem("bookings");
    }

    const booking = { name, email, session, notes, date: new Date().toISOString() };
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    message.textContent = `Thanks for booking a session, ${name}! We'll be in touch soon.`;
    modal.classList.add("show");

    setTimeout(() => modal.classList.remove("show"), 3000);
    form.reset();
  });
}
// ===== SIMPLE FADE REVIEW CAROUSEL =====
const reviews = document.querySelectorAll(".review-card");
const dotsContainer = document.querySelector(".review-dots");

if (reviews.length > 1 && dotsContainer) {
  let index = 0;
  const delay = 5000;

  // Create dots dynamically
  dotsContainer.innerHTML = Array.from(reviews, (_, i) =>
    `<span class="dot${i === 0 ? " active" : ""}" data-index="${i}"></span>`
  ).join("");

  const dots = dotsContainer.querySelectorAll(".dot");

  function setActive(i) {
    reviews[index].classList.remove("active");
    dots[index].classList.remove("active");
    index = i;
    reviews[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function next() {
    setActive((index + 1) % reviews.length);
  }

  let timer = setInterval(next, delay);

  dotsContainer.addEventListener("click", (e) => {
    const dot = e.target.closest(".dot");
    if (!dot) return;
    setActive(Number(dot.dataset.index));
    restart();
  });

  const slider = document.querySelector(".review-slider");
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", restart);

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, delay);
  }
}