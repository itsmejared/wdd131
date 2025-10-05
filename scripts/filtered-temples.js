const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Lima Peru Los Olivos",
    location: "Lima, Peru",
    dedicated: "2024, January, 24",
    area: 47413,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/lima-peru-los-olivos-temple/lima-peru-los-olivos-temple-42502.jpg"
  },
  {
    templeName: "Boston Massachusetts",
    location: "Massachusetts, USA",
    dedicated: "2000, October, 1",
    area: 69600,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/boston-massachusetts-temple/boston-massachusetts-temple-9913-main.jpg"
  },
  {
    templeName: "Bogota Colombia",
    location: "Bogota, Colombia",
    dedicated: "1999, April, 24",
    area: 53500,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/bogota-colombia-temple/bogota-colombia-temple-7733-main.jpg"
  }
];

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
    loadTemples(a.textContent);

    // Close menu if on mobile
    if (window.innerWidth <= 768 && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      }
    }
  });
} else {
  console.warn('No se encontró el <nav>; los filtros no se podrán activar.');
}

const cards = document.getElementById('cards');

function getYear(dedicatedStr) {
  return parseInt(dedicatedStr.split(',')[0].trim(), 10);
}

function renderTemples(list) {
  if (!cards) return;
  cards.innerHTML = '';

  const fragment = document.createDocumentFragment();

  list.forEach(t => {
    const fig = document.createElement('figure');
    fig.className = 'card';

    const img = document.createElement('img');
    img.src = t.imageUrl;
    img.alt = t.templeName;
    img.loading = 'lazy';

    const cap = document.createElement('figcaption');
    const h3 = document.createElement('h3');
    h3.textContent = t.templeName;

    const loc = document.createElement('p');
    loc.className = 'meta';
    loc.innerHTML = `<strong>Location:</strong> ${t.location}`;

    const ded = document.createElement('p');
    ded.className = 'meta';
    ded.innerHTML = `<strong>Dedicated:</strong> ${t.dedicated}`;

    const area = document.createElement('p');
    area.className = 'meta';
    area.innerHTML = `<strong>Size:</strong> ${t.area.toLocaleString()} sq ft`;

    cap.append(h3, loc, ded, area);
    fig.append(cap, img);
    fragment.append(fig);
  });

  cards.append(fragment);
}

function lowerCaseLink(link) {
  if (!link) return 'home';
  link = link.toLowerCase().trim();
  return ['home','old','new','large','small'].includes(link) ? link : 'home';
}

function loadTemples(filter) {
  filter = lowerCaseLink(filter);

  const conditions = {
    old:   t => getYear(t.dedicated) < 1900,
    new:   t => getYear(t.dedicated) > 2000,
    large: t => t.area > 90000,
    small: t => t.area < 10000
  };

  const filtered = conditions[filter] ? temples.filter(conditions[filter]) : temples;
  renderTemples(filtered);
}

loadTemples();