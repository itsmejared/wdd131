const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');

if (nav) {
  // Handle menu button toggle (mobile)
  if (menuBtn) {
    menuBtn.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent bubbling
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.textContent = isOpen ? '✕' : '☰';
    });
  }

  // Handle clicks on links inside nav
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    // Always call loadTemples for any link click
    e.preventDefault();
    //loadTemples(a.textContent);

    // Close menu if on mobile
    if (window.innerWidth <= 768 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      }
    }
  });
}