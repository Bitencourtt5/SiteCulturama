/**
 * CULTURAMA - Interactive Application Logic
 * Baseado no PDD - Landing Page Promocional
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroMockup();
  initInteractiveMap();
  initB2BTabs();
  initLeadForm();
  initAudienceCalculator();
  initFAQAccordion();
  initModals();
  initScrollAnimations();
});

/* ==========================================================================
   1. NAVBAR & NAVIGATION SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('svg');
      if (navLinks.classList.contains('open')) {
        mobileToggle.setAttribute('aria-expanded', 'true');
      } else {
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu on link click
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. HERO INTERACTIVE PHONE MOCKUP
   ========================================================================== */
const heroEventsData = {
  jazz: {
    tag: 'Shows & Música • Ao Vivo',
    title: 'Festival de Jazz na Paulista',
    time: 'Hoje, às 19:30',
    distance: '450m de você',
    status: '🔥 Em alta • 1.4k confirmados'
  },
  art: {
    tag: 'Artes Visuais • Imersivo',
    title: 'Exposição Imersiva Arte Viva',
    time: 'Ter - Dom, 10h às 20h',
    distance: '1.2 km de você',
    status: '✨ Verificado • Ingressos disponíveis'
  },
  theater: {
    tag: 'Teatro & Performance',
    title: 'Peça Aberta no Ibirapuera',
    time: 'Amanhã, às 16:00',
    distance: '2.8 km de você',
    status: '🎟️ Entrada Gratuita'
  }
};

function initHeroMockup() {
  const phonePins = document.querySelectorAll('.phone-pin');
  const cardTag = document.getElementById('heroCardTag');
  const cardTitle = document.getElementById('heroCardTitle');
  const cardMeta = document.getElementById('heroCardMeta');

  if (!cardTitle) return;

  phonePins.forEach(pin => {
    pin.addEventListener('click', () => {
      const eventKey = pin.getAttribute('data-event');
      phonePins.forEach(p => p.classList.remove('active'));
      pin.classList.add('active');

      if (heroEventsData[eventKey]) {
        const ev = heroEventsData[eventKey];
        cardTag.textContent = ev.tag;
        cardTitle.textContent = ev.title;
        cardMeta.innerHTML = `<span>📍 ${ev.distance}</span><span>•</span><span>🕒 ${ev.time}</span>`;
      }
    });
  });

  // Cycle automatically every 4 seconds if not interacted
  let currentIdx = 0;
  const pinKeys = ['jazz', 'art', 'theater'];
  setInterval(() => {
    currentIdx = (currentIdx + 1) % pinKeys.length;
    const targetPin = document.querySelector(`.phone-pin[data-event="${pinKeys[currentIdx]}"]`);
    if (targetPin && !document.querySelector('.phone-mockup:hover')) {
      targetPin.click();
    }
  }, 4500);
}

/* ==========================================================================
   3. INTERACTIVE LIVE MAP SHOWCASE (EXPLORER)
   ========================================================================== */
const liveMapEvents = [
  {
    id: 'jazz-paulista',
    category: 'musica',
    categoryLabel: 'Música & Shows',
    title: 'Festival de Jazz na Paulista',
    desc: 'O maior encontro de jazz instrumental a céu aberto de São Paulo. Food trucks temáticos, palcos simultâneos e curadoria de alta qualidade.',
    location: 'Av. Paulista, altura do MASP - São Paulo',
    date: 'Hoje, 19:30 às 23:00',
    organizer: 'Instituto Cultural Harmonia',
    organizerDoc: 'CNPJ Verificado: 34.***.***/0001-90',
    price: 'Acesso Livre / Gratuito',
    top: '42%',
    left: '35%',
    icon: '🎵',
    routes: { metro: '4 min (Estação Trianon)', car: '12 min', walk: '15 min' }
  },
  {
    id: 'arte-imersiva',
    category: 'artes',
    categoryLabel: 'Artes Visuais',
    title: 'Exposição Imersiva: Cores do Brasil',
    desc: 'Projeções sensoriais em 360°, trilha sonora espacializada e obras interativas de artistas contemporâneos renomados.',
    location: 'Pavilhão das Culturas Brasileiras - Ibirapuera',
    date: 'Amanhã, 10:00 às 21:00',
    organizer: 'Curadoria ArteViva Brasil',
    organizerDoc: 'CNPJ Verificado: 41.***.***/0001-12',
    price: 'R$ 35,00 (Meia R$ 17,50)',
    top: '68%',
    left: '58%',
    icon: '🎨',
    routes: { metro: '15 min (Estação AACD)', car: '18 min', walk: '25 min' }
  },
  {
    id: 'teatro-parque',
    category: 'teatro',
    categoryLabel: 'Teatro & Dança',
    title: 'Romeu e Julieta Contemporâneo',
    desc: 'Adaptação clássica ao ar livre com elenco premiado e linguagem urbana contemporânea.',
    location: 'Teatro de Arena - Parque da Aclimação',
    date: 'Sábado, às 17:00',
    organizer: 'Cia. Aberta de Teatro Urbano',
    organizerDoc: 'CNPJ Verificado: 28.***.***/0001-44',
    price: 'R$ 20,00',
    top: '28%',
    left: '68%',
    icon: '🎭',
    routes: { metro: '8 min (Estação Vergueiro)', car: '10 min', walk: '20 min' }
  },
  {
    id: 'samba-gastronomia',
    category: 'gastronomia',
    categoryLabel: 'Gastronomia & Cultura',
    title: 'Feira das Raízes: Samba & Sabores',
    desc: 'Culinária afro-brasileira artesanal, roda de samba tradicional e artesanato de microempreendedores culturais.',
    location: 'Largo da Matriz - Freguesia do Ó',
    date: 'Domingo, 12:00 às 20:00',
    organizer: 'Coletivo Raízes Vivas',
    organizerDoc: 'CNPJ Verificado: 19.***.***/0001-78',
    price: 'Entrada Gratuita',
    top: '20%',
    left: '22%',
    icon: '🍲',
    routes: { metro: 'Integração Ônibus/Metrô', car: '22 min', walk: '--' }
  },
  {
    id: 'cinema-indie',
    category: 'cinema',
    categoryLabel: 'Cinema & Audiovisual',
    title: 'Mostra de Cinema Independente',
    desc: 'Exibição de curtas e longas nacionais inéditos com debate ao vivo com diretores e produtores.',
    location: 'Cineclube Bela Vista - Rua Treze de Maio',
    date: 'Sexta, às 20:00',
    organizer: 'Associação Cineastas Livres',
    organizerDoc: 'CNPJ Verificado: 50.***.***/0001-33',
    price: 'R$ 15,00',
    top: '55%',
    left: '78%',
    icon: '🎬',
    routes: { metro: '6 min (Estação Brigadeiro)', car: '14 min', walk: '10 min' }
  }
];

function initInteractiveMap() {
  const canvas = document.getElementById('mapSimulationCanvas');
  const categoryPills = document.querySelectorAll('.category-pill');
  const searchInput = document.getElementById('mapSearchInput');

  // Sidebar Elements
  const sideBadge = document.getElementById('sideEventBadge');
  const sideTitle = document.getElementById('sideEventTitle');
  const sideDesc = document.getElementById('sideEventDesc');
  const sideDate = document.getElementById('sideEventDate');
  const sideLocation = document.getElementById('sideEventLocation');
  const sidePrice = document.getElementById('sideEventPrice');
  const sideOrganizer = document.getElementById('sideEventOrganizer');
  const sideDoc = document.getElementById('sideEventDoc');
  const sideMetro = document.getElementById('sideRouteMetro');
  const sideCar = document.getElementById('sideRouteCar');

  if (!canvas) return;

  function renderMarkers(filteredEvents) {
    // Keep roads intact
    const existingMarkers = canvas.querySelectorAll('.interactive-marker');
    existingMarkers.forEach(m => m.remove());

    filteredEvents.forEach((ev, idx) => {
      const marker = document.createElement('div');
      marker.className = `interactive-marker ${idx === 0 ? 'active' : ''}`;
      marker.style.top = ev.top;
      marker.style.left = ev.left;
      marker.setAttribute('data-id', ev.id);

      marker.innerHTML = `
        <div class="marker-pin">
          <div class="marker-icon">${ev.icon}</div>
          <span>${ev.title.split(':')[0]}</span>
        </div>
      `;

      marker.addEventListener('click', () => {
        document.querySelectorAll('.interactive-marker').forEach(m => m.classList.remove('active'));
        marker.classList.add('active');
        updateSidebar(ev);
      });

      canvas.appendChild(marker);
    });

    if (filteredEvents.length > 0) {
      updateSidebar(filteredEvents[0]);
    }
  }

  function updateSidebar(ev) {
    if (!sideTitle) return;
    sideBadge.textContent = `${ev.icon} ${ev.categoryLabel}`;
    sideTitle.textContent = ev.title;
    sideDesc.textContent = ev.desc;
    sideDate.textContent = ev.date;
    sideLocation.textContent = ev.location;
    sidePrice.textContent = ev.price;
    sideOrganizer.textContent = ev.organizer;
    sideDoc.textContent = ev.organizerDoc;
    if (sideMetro) sideMetro.textContent = ev.routes.metro;
    if (sideCar) sideCar.textContent = ev.routes.car;
  }

  // Category Filtering
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-category');

      let filtered = liveMapEvents;
      if (cat !== 'todos') {
        filtered = liveMapEvents.filter(e => e.category === cat);
      }
      renderMarkers(filtered);
    });
  });

  // Search input filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = liveMapEvents.filter(ev => 
        ev.title.toLowerCase().includes(q) || 
        ev.categoryLabel.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q)
      );
      renderMarkers(filtered);
    });
  }

  // Initial render
  renderMarkers(liveMapEvents);
}

/* ==========================================================================
   4. B2B AUDIENCE & TABS SWITCHER
   ========================================================================== */
function initB2BTabs() {
  const tabs = document.querySelectorAll('.b2b-tab-btn');
  const orgContent = document.getElementById('b2bOrgContent');
  const sponsorContent = document.getElementById('b2bSponsorContent');
  const formHeadline = document.getElementById('b2bFormHeadline');
  const formSub = document.getElementById('b2bFormSub');
  const formTypeInput = document.getElementById('leadPartnerType');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');

      if (target === 'organizers') {
        if (orgContent) orgContent.style.display = 'block';
        if (sponsorContent) sponsorContent.style.display = 'none';
        if (formHeadline) formHeadline.textContent = 'Cadastre seu Evento Cultural';
        if (formSub) formSub.textContent = 'Comece a vender ingressos com curadoria verificada e repasse seguro via Stripe & Mercado Pago.';
        if (formTypeInput) formTypeInput.value = 'Organizador / Artista';
      } else {
        if (orgContent) orgContent.style.display = 'none';
        if (sponsorContent) sponsorContent.style.display = 'block';
        if (formHeadline) formHeadline.textContent = 'Associe sua Marca à Cultura';
        if (formSub) formSub.textContent = 'Conecte sua empresa a um público de alta fidelidade e valor cultural comprovado.';
        if (formTypeInput) formTypeInput.value = 'Marca / Patrocinador';
      }
    });
  });
}

/* ==========================================================================
   5. B2B LEAD FORM SUBMISSION & TOAST
   ========================================================================== */
function initLeadForm() {
  const form = document.getElementById('b2bLeadForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Enviando solicitação...
    `;

    // Simulate API request
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('🎉 Solicitação enviada! Nossa equipe de curadoria entrará em contato em até 24h.');
    }, 1200);
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D98054" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

/* ==========================================================================
   6. INTERACTIVE AUDIENCE CALCULATOR (B2B SIMULATOR)
   ========================================================================== */
function initAudienceCalculator() {
  const slider = document.getElementById('calcAudienceSlider');
  const audienceVal = document.getElementById('calcAudienceVal');
  const reachVal = document.getElementById('calcReachVal');
  const revenueVal = document.getElementById('calcRevenueVal');

  if (!slider || !audienceVal) return;

  function updateValues() {
    const attendees = parseInt(slider.value, 10);
    audienceVal.textContent = attendees.toLocaleString('pt-BR');
    
    // Estimated views/reach on Culturama app is approx 12x capacity
    const estimatedReach = attendees * 12;
    reachVal.textContent = estimatedReach.toLocaleString('pt-BR') + ' pessoas';

    // Estimated gross ticketing at R$ 35 average
    const gross = attendees * 35;
    revenueVal.textContent = 'R$ ' + gross.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  slider.addEventListener('input', updateValues);
  updateValues();
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(i => i.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ==========================================================================
   8. MODALS (DOWNLOAD QR CODE & ORGANIZER)
   ========================================================================== */
function initModals() {
  const downloadBtns = document.querySelectorAll('[data-action="download-app"]');
  const downloadModal = document.getElementById('downloadModal');
  const closeModals = document.querySelectorAll('.modal-close, .modal-backdrop');

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (downloadModal) {
        downloadModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModals.forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        const activeModal = document.querySelector('.modal-backdrop.active');
        if (activeModal) {
          activeModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // ESC key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-backdrop.active');
      if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}

/* ==========================================================================
   9. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .comparison-card, .stat-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

// Global style for spin animation
const spinStyle = document.createElement('style');
spinStyle.textContent = `
  @keyframes spin { 100% { transform: rotate(360deg); } }
  .revealed { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(spinStyle);
