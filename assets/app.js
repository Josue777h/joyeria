// ========== HERO SLIDER ==========
const heroTrack = document.getElementById('heroTrack');
const heroDotsContainer = document.getElementById('heroDots');
const heroPrevBtn = document.getElementById('heroPrev');
const heroNextBtn = document.getElementById('heroNext');
const heroSlides = document.querySelectorAll('.hero-slide');

if (heroTrack && heroDotsContainer && heroPrevBtn && heroNextBtn && heroSlides.length) {
  let heroCurrent = 0;
  const heroTotal = heroSlides.length;
  let heroAutoplayInterval;

  // Create dots
  for (let i = 0; i < heroTotal; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => heroGoToSlide(i));
    heroDotsContainer.appendChild(dot);
  }

  const heroDots = document.querySelectorAll('#heroDots .dot');

  function heroUpdateSlider() {
    heroTrack.style.transform = `translateX(-${heroCurrent * 100}%)`;
    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === heroCurrent);
    });
  }

  function heroGoToSlide(n) {
    heroCurrent = (n + heroTotal) % heroTotal;
    heroUpdateSlider();
    heroResetAutoplay();
  }

  function heroNext() { heroGoToSlide(heroCurrent + 1); }
  function heroPrev() { heroGoToSlide(heroCurrent - 1); }

  function heroResetAutoplay() {
    clearInterval(heroAutoplayInterval);
    heroAutoplayInterval = setInterval(heroNext, 5000);
  }

  heroPrevBtn.addEventListener('click', heroPrev);
  heroNextBtn.addEventListener('click', heroNext);

  // Touch support
  let heroTouchStart = 0;
  let heroTouchEnd = 0;
  heroTrack.addEventListener('touchstart', e => {
    heroTouchStart = e.changedTouches[0].screenX;
  });
  heroTrack.addEventListener('touchend', e => {
    heroTouchEnd = e.changedTouches[0].screenX;
    if (heroTouchStart - heroTouchEnd > 50) heroNext();
    if (heroTouchEnd - heroTouchStart > 50) heroPrev();
  });

  // Start autoplay
  heroResetAutoplay();

  // Parallax effect on mouse move
  const heroBgPattern = document.querySelector('.hero-bg-pattern');
  if (heroBgPattern) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroBgPattern.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}

// ========== FEATURED SLIDER ==========
const featuredTrack = document.getElementById('sliderTrack');
const featuredProgressFill = document.getElementById('progressFill');
const featuredPrevBtn = document.getElementById('prevBtn');
const featuredNextBtn = document.getElementById('nextBtn');
const featuredMPrevBtn = document.getElementById('mPrevBtn');
const featuredMNextBtn = document.getElementById('mNextBtn');
const featuredCards = document.querySelectorAll('.product-card');

if (featuredTrack && featuredCards.length) {
  let featuredCurrent = 0;
  let featuredCardsPerView = 3;
  let featuredAutoplayInterval;

  function featuredUpdateCardsPerView() {
    const width = window.innerWidth;
    if (width < 768) {
      featuredCardsPerView = 1;
    } else if (width < 1024) {
      featuredCardsPerView = 2;
    } else {
      featuredCardsPerView = 3;
    }
  }

  function featuredUpdateSlider() {
    const cardWidth = featuredCards[0].offsetWidth;
    const gap = 24;
    const offset = featuredCurrent * (cardWidth + gap);
    featuredTrack.style.transform = `translateX(-${offset}px)`;
    const totalSlides = Math.ceil(featuredCards.length / featuredCardsPerView);
    if (featuredProgressFill) {
      const progress = ((featuredCurrent + 1) / totalSlides) * 100;
      featuredProgressFill.style.width = `${progress}%`;
    }
  }

  function featuredNext() {
    const maxIndex = featuredCards.length - featuredCardsPerView;
    if (featuredCurrent < maxIndex) {
      featuredCurrent++;
    } else {
      featuredCurrent = 0;
    }
    featuredUpdateSlider();
    featuredResetAutoplay();
  }

  function featuredPrev() {
    const maxIndex = featuredCards.length - featuredCardsPerView;
    if (featuredCurrent > 0) {
      featuredCurrent--;
    } else {
      featuredCurrent = maxIndex;
    }
    featuredUpdateSlider();
    featuredResetAutoplay();
  }

  function featuredResetAutoplay() {
    clearInterval(featuredAutoplayInterval);
    featuredAutoplayInterval = setInterval(featuredNext, 4000);
  }

  if (featuredPrevBtn) featuredPrevBtn.addEventListener('click', featuredPrev);
  if (featuredNextBtn) featuredNextBtn.addEventListener('click', featuredNext);
  if (featuredMPrevBtn) featuredMPrevBtn.addEventListener('click', featuredPrev);
  if (featuredMNextBtn) featuredMNextBtn.addEventListener('click', featuredNext);

  window.addEventListener('resize', () => {
    featuredUpdateCardsPerView();
    featuredCurrent = 0;
    featuredUpdateSlider();
  });

  // Touch support
  let featuredTouchStart = 0;
  let featuredTouchEnd = 0;
  featuredTrack.addEventListener('touchstart', e => {
    featuredTouchStart = e.changedTouches[0].screenX;
  });
  featuredTrack.addEventListener('touchend', e => {
    featuredTouchEnd = e.changedTouches[0].screenX;
    if (featuredTouchStart - featuredTouchEnd > 50) featuredNext();
    if (featuredTouchEnd - featuredTouchStart > 50) featuredPrev();
  });

  // Initialize
  featuredUpdateCardsPerView();
  featuredUpdateSlider();
  featuredResetAutoplay();

  // Pause autoplay on hover
  featuredTrack.addEventListener('mouseenter', () => clearInterval(featuredAutoplayInterval));
  featuredTrack.addEventListener('mouseleave', featuredResetAutoplay);
}

/////////////////////////////////////////////
// ========== CATEGORIES FILTER ==========
// WhatsApp configuration (set your number below, e.g., '573001112233')
const WHATSAPP_NUMBER = '573143243707';
function getWhatsAppLink(item) {
  if (!WHATSAPP_NUMBER) return null;
  const msg = `Hola Joyería Indio, me interesa ${item.name} (${formatPrice(item.price)}). ¿Disponibilidad y tiempos?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
const categoryButtons = document.querySelectorAll('.category-card');
const galleryGrid = document.getElementById('galleryGrid');
const emptyState = document.getElementById('emptyState');
const paginationContainer = document.getElementById('catalogPagination');

const galleryItems = [
  { id: 1,  category: 'anillos',  src: './IMG-20251002-WA0057/anillos/IMG-20251002-WA0063.webp', name: 'Anillo 5 carriles balines diamantados',  price: 150000 },
  { id: 2,  category: 'anillos',  src: './IMG-20251002-WA0057/anillos/IMG-20251002-WA0065.webp', name: 'Anillo dije dollar',  price: 180000 },
  { id: 3,  category: 'anillos',  src: './IMG-20251002-WA0057/anillos/IMG-20251002-WA0066.webp', name: 'Anillo Rolex balines #4',  price: 175000 },
  { id: 4,  category: 'anillos',  src: './IMG-20251002-WA0057/anillos/IMG-20251002-WA0067.webp', name: 'Anillos doble carril',  price: 190000 },
  { id: 5,  category: 'anillos',  src: './IMG-20251002-WA0057/anillos/IMG-20251002-WA0068.webp', name: 'Anillo 0068',  price: 210000 },
  { id: 6,  category: 'pulseras', src: './IMG-20251002-WA0057/Pulseras/IMG-20251002-WA0058.webp', name: 'Pulsera 7 chacras', price: 120000 },
  { id: 7,  category: 'pulseras', src: './IMG-20251002-WA0057/Pulseras/IMG-20251002-WA0059.webp', name: 'Pulsera balines #8', price: 125000 },
  { id: 8,  category: 'pulseras', src: './IMG-20251002-WA0057/Pulseras/IMG-20251002-WA0061.webp', name: 'Pulsera de plata', price: 130000 },
  { id: 9,  category: 'pulseras', src: './IMG-20251002-WA0057/Pulseras/IMG-20251002-WA0062.webp', name: 'Pulsera dólar 3 carriles y diamantado', price: 135000 },
  { id: 10, category: 'pulseras', src: './IMG-20251002-WA0057/Pulseras/IMG-20251002-WA0064.webp', name: 'Pulsera dólar balines diamantado #5', price: 140000 },
  { id: 11, category: 'pulseras', src: './IMG-20251002-WA0057/Pulseras/redimensionada_1.webp', name: 'Pulsera dólar diseño exclusivo', price: 110000 },
  { id: 12, category: 'pulseras', src: './IMG-20251002-WA0057/Pulseras/redimensionada_2.webp', name: 'Pulsera Rolex balines #8 tipo oro', price: 115000 },
  { id: 13, category: 'pulseras', src: './IMG-20251002-WA0057/Pulseras/redimensionada_3.webp', name: 'Pulsera Redim 3', price: 118000 },
  { id: 14, category: 'topos',    src: './IMG-20251002-WA0057/topos/IMG-20251002-WA0055.webp', name: 'Topos Gucci rayado',   price: 90000 },
  { id: 15, category: 'topos',    src: './IMG-20251002-WA0057/topos/IMG-20251002-WA0056.webp', name: 'Topos Rolex',   price: 95000 },
  { id: 16, category: 'topos',    src: './IMG-20251002-WA0057/topos/IMG-20251002-WA0057.webp', name: 'Topos vanclef dorado',   price: 97000 },
  { id: 17, category: 'topos',    src: './IMG-20251002-WA0057/topos/Screenshot_22.webp',       name: 'Topos virgen Guadalupe',     price: 85000 },
  { id: 18, category: 'topos',    src: './IMG-20251002-WA0057/topos/Screenshot_4.webp',        name: 'Topos 4',      price: 88000 },
  { id: 19, category: 'topos',    src: './IMG-20251002-WA0057/topos/Screenshot_5.webp',        name: 'Topos 5',      price: 88000 },
  { id: 20, category: 'topos',    src: './IMG-20251002-WA0057/topos/Screenshot_6.webp',        name: 'Topos 6',      price: 88000 },
  { id: 21, category: 'topos',    src: './IMG-20251002-WA0057/topos/Screenshot_7.webp',        name: 'Topos 7',      price: 88000 },
  // cadenas sin imágenes locales detectadas -> mostrará estado vacío cuando se filtre
];

let currentFilter = 'all';
let currentSearch = '';
let currentPage = 1;
const pageSize = 8;

function formatPrice(value) {
  try {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
  } catch {
    return `$${value}`;
  }
}

function renderGallery(filter) {
  if (!galleryGrid) return;
  if (filter) { currentFilter = filter; currentPage = 1; }

  const term = currentSearch.trim().toLowerCase();
  let data = galleryItems;
  if (currentFilter !== 'all') {
    data = data.filter(i => i.category === currentFilter);
  }
  if (term) {
    data = data.filter(i => i.name.toLowerCase().includes(term));
  }

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  if (currentPage > totalPages) currentPage = totalPages;

  if (data.length === 0) {
    galleryGrid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    if (paginationContainer) paginationContainer.innerHTML = '';
    return;
  }
  if (emptyState) emptyState.classList.add('hidden');

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = data.slice(start, end);

  galleryGrid.innerHTML = pageItems.map(i => {
    const wa = getWhatsAppLink(i);
    const buyHref = wa || 'index.html#contacto';
    const buyAttrs = wa ? 'target="_blank" rel="noopener"' : '';
    return (
    `<article class="relative overflow-hidden rounded-xl border border-brown/40 bg-black/20 group">
       <img src="${i.src}" alt="${i.name}" loading="lazy" class="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"/>
       <div class="p-3 flex items-center justify-between">
         <h3 class="text-sm sm:text-base font-medium text-ivory/90 truncate">${i.name}</h3>
         <span class="text-gold-300 text-sm font-semibold">${formatPrice(i.price)}</span>
       </div>
       <div class="px-3 pb-3 flex items-center justify-between gap-2">
         <button type="button" data-action="view" data-id="${i.id}" class="btn btn-outline">Ver</button>
         <a href="${buyHref}" ${buyAttrs} class="btn btn-primary">Comprar</a>
       </div>
     </article>`);
  }).join('');

  if (paginationContainer) {
    const parts = [];
    const disabledPrev = currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gold-600 hover:text-gold-300';
    parts.push(`<button data-action="prev" class="px-3 py-1.5 rounded-md border border-brown/50 ${disabledPrev}">‹</button>`);
    for (let p = 1; p <= totalPages; p++) {
      const active = p === currentPage ? 'bg-gold-600 text-black border-gold-600' : 'hover:border-gold-600 hover:text-gold-300';
      parts.push(`<button data-page="${p}" class="px-3 py-1.5 rounded-md border border-brown/50 ${active}">${p}</button>`);
    }
    const disabledNext = currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:border-gold-600 hover:text-gold-300';
    parts.push(`<button data-action="next" class="px-3 py-1.5 rounded-md border border-brown/50 ${disabledNext}">›</button>`);
    paginationContainer.innerHTML = parts.join('');
  }
}

categoryButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Get the filter value
    const filterValue = this.getAttribute('data-filter');
    renderGallery(filterValue);
  });
});

// Optional: Add ripple effect on click
categoryButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(212, 175, 55, 0.5)';
    ripple.style.width = ripple.style.height = '100px';
    ripple.style.left = e.clientX - this.offsetLeft - 50 + 'px';
    ripple.style.top = e.clientY - this.offsetTop - 50 + 'px';
    ripple.style.animation = 'ripple-animation 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-animation {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Search wiring (catalog page)
const catalogSearch = document.getElementById('catalogSearch');
if (catalogSearch) {
  catalogSearch.addEventListener('input', (e) => {
    currentSearch = e.target.value || '';
    currentPage = 1;
    renderGallery();
  });
}

if (paginationContainer) {
  paginationContainer.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;
    const pageAttr = target.getAttribute('data-page');
    const action = target.getAttribute('data-action');
    if (pageAttr) {
      currentPage = parseInt(pageAttr, 10) || 1;
      renderGallery();
    } else if (action === 'prev') {
      if (currentPage > 1) { currentPage--; renderGallery(); }
    } else if (action === 'next') {
      currentPage++; renderGallery();
    }
  });
}

renderGallery('all');

// ================= PRODUCT MODAL =================
const productModal = document.getElementById('productModal');
const productModalOverlay = document.getElementById('productModalOverlay');
const pmClose = document.getElementById('pmClose');
const pmTitle = document.getElementById('pmTitle');
const pmImage = document.getElementById('pmImage');
const pmName = document.getElementById('pmName');
const pmPrice = document.getElementById('pmPrice');
const pmDesc = document.getElementById('pmDesc');
const pmBuy = document.getElementById('pmBuy');
// no pmView (removed)

function openProductModal(item) {
  if (!productModal) return;
  pmTitle.textContent = item.name;
  pmName.textContent = item.name;
  pmPrice.textContent = formatPrice(item.price);
  pmImage.src = item.src;
  pmImage.alt = item.name;
  const wa = getWhatsAppLink(item);
  if (pmBuy) {
    pmBuy.href = wa || 'index.html#contacto';
    if (wa) { pmBuy.setAttribute('target','_blank'); pmBuy.setAttribute('rel','noopener'); }
    else { pmBuy.removeAttribute('target'); pmBuy.removeAttribute('rel'); }
  }
  productModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  if (!productModal) return;
  productModal.classList.add('hidden');
  document.body.style.overflow = '';
}

if (galleryGrid && productModal) {
  galleryGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="view"]');
    if (!btn) return;
    e.preventDefault();
    const id = parseInt(btn.getAttribute('data-id'), 10);
    const item = galleryItems.find(p => p.id === id);
    if (item) openProductModal(item);
  });
}

if (pmClose) pmClose.addEventListener('click', closeProductModal);
if (productModalOverlay) productModalOverlay.addEventListener('click', closeProductModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && productModal && !productModal.classList.contains('hidden')) {
    closeProductModal();
  }
});

// ========== GLOBAL: Footer Year & Mobile Menu ==========
// Set current year in footer if element exists
const yearEl = document.getElementById('year');
if (yearEl) {
  try { yearEl.textContent = new Date().getFullYear(); } catch {}
}

// Mobile menu toggle (available on all pages)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu(forceState) {
  if (!mobileMenu) return;
  const willOpen = forceState !== undefined ? forceState : mobileMenu.classList.contains('hidden');
  if (willOpen) {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  // Close menu when a link inside is clicked
  mobileMenu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) toggleMobileMenu(false);
  });
  // Close with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) toggleMobileMenu(false);
  });
  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 640) toggleMobileMenu(false);
  });
}

// ========== FEATURED CARDS -> OPEN MODAL ==========
// Allow opening the modal by tapping the featured card (but not when clicking its CTA link)
try {
  const featuredContainer = document.querySelector('.featured-section');
  if (featuredContainer && productModal) {
    // Removed event listener
  }
} catch {}

renderGallery('all');
