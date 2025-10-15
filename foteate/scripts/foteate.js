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

    const booking = { name, email, session, notes, date: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    message.textContent = `Thanks for booking a session, ${name}! We'll be in touch soon.`;
    modal.classList.add("show");

    // Close modal after 3 seconds
    setTimeout(() => modal.classList.remove("show"), 3000);

    form.reset();
  });
}