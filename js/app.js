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
   3. REAL INTERACTIVE LEAFLET MAP & BROWSER GPS ENGINE
   ========================================================================== */
const liveMapEvents = [
  {
    id: 'jazz-paulista',
    category: 'musica',
    categoryLabel: 'Shows & Música',
    title: 'Festival de Jazz na Paulista',
    desc: 'O maior encontro de jazz instrumental a céu aberto de São Paulo. Food trucks temáticos, palcos simultâneos e curadoria de alta qualidade.',
    location: 'Av. Paulista, altura do MASP - Bela Vista',
    neighborhood: 'Bela Vista',
    lat: -23.561496,
    lng: -46.655881,
    date: 'Hoje, 19:30 às 23:00',
    organizer: 'Instituto Cultural Harmonia',
    organizerDoc: 'CNPJ Verificado: 34.***.***/0001-90',
    price: 'Acesso Livre / Gratuito',
    isFree: true,
    isToday: true,
    isTrending: true,
    icon: '🎵',
    routes: {
      metro: { time: '4 min', detail: 'Estação Trianon-MASP (Linha 2-Verde) • 180m a pé' },
      car: { time: '10 min', detail: 'Via Av. 9 de Julho • Estacionamento MASP conveniado' },
      walk: { time: '12 min', detail: '850m • Rota plana e iluminada pela Av. Paulista' },
      bike: { time: '4 min', detail: 'Ciclovia Av. Paulista com paraciclo no local' }
    }
  },
  {
    id: 'arte-imersiva',
    category: 'artes',
    categoryLabel: 'Artes Visuais',
    title: 'Exposição Imersiva: Cores do Brasil',
    desc: 'Projeções sensoriais em 360°, trilha sonora espacializada e obras interativas de artistas contemporâneos renomados.',
    location: 'Pavilhão das Culturas Brasileiras - Ibirapuera',
    neighborhood: 'Ibirapuera',
    lat: -23.587416,
    lng: -46.657634,
    date: 'Amanhã, 10:00 às 21:00',
    organizer: 'Curadoria ArteViva Brasil',
    organizerDoc: 'CNPJ Verificado: 41.***.***/0001-12',
    price: 'R$ 35,00 (Meia R$ 17,50)',
    isFree: false,
    isToday: false,
    isTrending: true,
    icon: '🎨',
    routes: {
      metro: { time: '14 min', detail: 'Estação AACD-Servidor (Linha 5-Lilás) + 8 min a pé' },
      car: { time: '16 min', detail: 'Via Av. 23 de Maio • Portão 3 com bolsão de estacionamento' },
      walk: { time: '35 min', detail: '2.8 km • Caminhada pelo Parque do Ibirapuera' },
      bike: { time: '11 min', detail: 'Ciclovia do Ibirapuera com estação Bike Itaú' }
    }
  },
  {
    id: 'teatro-parque',
    category: 'teatro',
    categoryLabel: 'Teatro & Dança',
    title: 'Romeu e Julieta Contemporâneo',
    desc: 'Adaptação clássica ao ar livre com elenco premiado e linguagem urbana contemporânea.',
    location: 'Teatro de Arena - Parque da Aclimação',
    neighborhood: 'Aclimação',
    lat: -23.573194,
    lng: -46.630982,
    date: 'Sábado, às 17:00',
    organizer: 'Cia. Aberta de Teatro Urbano',
    organizerDoc: 'CNPJ Verificado: 28.***.***/0001-44',
    price: 'R$ 20,00',
    isFree: false,
    isToday: false,
    isTrending: false,
    icon: '🎭',
    routes: {
      metro: { time: '8 min', detail: 'Estação Vergueiro (Linha 1-Azul) • 700m de caminhada' },
      car: { time: '12 min', detail: 'Via Rua Vergueiro • Vagas demarcadas na praça' },
      walk: { time: '20 min', detail: '1.6 km • Acesso fácil pela entrada principal' },
      bike: { time: '8 min', detail: 'Ciclofaixa da Aclimação' }
    }
  },
  {
    id: 'samba-gastronomia',
    category: 'gastronomia',
    categoryLabel: 'Gastronomia & Cultura',
    title: 'Feira das Raízes: Samba & Sabores',
    desc: 'Culinária afro-brasileira artesanal, roda de samba tradicional e artesanato de microempreendedores culturais.',
    location: 'Largo da Matriz - Freguesia do Ó',
    neighborhood: 'Freguesia do Ó',
    lat: -23.498112,
    lng: -46.697521,
    date: 'Hoje, 12:00 às 22:00',
    organizer: 'Coletivo Raízes Vivas',
    organizerDoc: 'CNPJ Verificado: 19.***.***/0001-78',
    price: 'Entrada Gratuita',
    isFree: true,
    isToday: true,
    isTrending: true,
    icon: '🍲',
    routes: {
      metro: { time: '22 min', detail: 'Integração Metrô Barra Funda + Ônibus Expresso' },
      car: { time: '24 min', detail: 'Via Marginal Tietê sentido Freguesia do Ó' },
      walk: { time: '1h 10min', detail: '6.4 km' },
      bike: { time: '28 min', detail: 'Rota via Ciclovia Marginal' }
    }
  },
  {
    id: 'cinema-indie',
    category: 'cinema',
    categoryLabel: 'Cinema & Audiovisual',
    title: 'Mostra de Cinema Independente',
    desc: 'Exibição de curtas e longas nacionais inéditos com debate ao vivo com diretores e produtores convidados.',
    location: 'Cineclube Bela Vista - Rua Treze de Maio',
    neighborhood: 'Bixiga',
    lat: -23.557201,
    lng: -46.647212,
    date: 'Hoje, às 20:00',
    organizer: 'Associação Cineastas Livres',
    organizerDoc: 'CNPJ Verificado: 50.***.***/0001-33',
    price: 'R$ 15,00',
    isFree: false,
    isToday: true,
    isTrending: false,
    icon: '🎬',
    routes: {
      metro: { time: '6 min', detail: 'Estação Brigadeiro (Linha 2-Verde) • 450m' },
      car: { time: '10 min', detail: 'Via Av. Brigadeiro Luís Antônio' },
      walk: { time: '11 min', detail: '900 metros pelo bairro histórico do Bixiga' },
      bike: { time: '4 min', detail: 'Paraciclo em frente ao Cineclube' }
    }
  },
  {
    id: 'samba-vila-madalena',
    category: 'musica',
    categoryLabel: 'Shows & Música',
    title: 'Noite de Choro & Samba na Vila',
    desc: 'Grandes clássicos do choro e samba de raiz em ambiente acolhedor, com carta de drinks autorais e petiscos.',
    location: 'Beco do Batman / R. Aspicuelta - Vila Madalena',
    neighborhood: 'Vila Madalena',
    lat: -23.557454,
    lng: -46.686771,
    date: 'Hoje, 21:00 às 02:00',
    organizer: 'Espaço Cultural Beco Vivo',
    organizerDoc: 'CNPJ Verificado: 31.***.***/0001-65',
    price: 'R$ 25,00',
    isFree: false,
    isToday: true,
    isTrending: true,
    icon: '🎷',
    routes: {
      metro: { time: '10 min', detail: 'Estação Fradique Coutinho (Linha 4-Amarela) + 600m' },
      car: { time: '14 min', detail: 'Via Rua Henrique Schaumann' },
      walk: { time: '22 min', detail: '1.9 km pelas galerias de arte da Vila' },
      bike: { time: '8 min', detail: 'Ciclorrota Vila Madalena' }
    }
  },
  {
    id: 'bienal-esculturas',
    category: 'artes',
    categoryLabel: 'Artes Visuais',
    title: 'Bienal de Esculturas Monumentais',
    desc: 'Obras de grande porte espalhadas pelos gramados do parque com áudio-guia interativo pelo app Culturama.',
    location: 'Jardins da Oca - Parque do Ibirapuera',
    neighborhood: 'Ibirapuera',
    lat: -23.585221,
    lng: -46.659912,
    date: 'Todos os dias, 08:00 às 19:00',
    organizer: 'Fundação Arte Pública',
    organizerDoc: 'CNPJ Verificado: 11.***.***/0001-22',
    price: 'Acesso Livre / Gratuito',
    isFree: true,
    isToday: true,
    isTrending: false,
    icon: '🗿',
    routes: {
      metro: { time: '12 min', detail: 'Estação Moema (Linha 5-Lilás) + caminhada' },
      car: { time: '15 min', detail: 'Entrada pelo Portão 2 do Parque' },
      walk: { time: '30 min', detail: '2.3 km de trajeto arborizado' },
      bike: { time: '9 min', detail: 'Ciclovia interna do parque' }
    }
  },
  {
    id: 'gastronomia-liberdade',
    category: 'gastronomia',
    categoryLabel: 'Gastronomia & Cultura',
    title: 'Festival da Cultura Oriental & Sabores',
    desc: 'Mais de 40 barracas de culinária típica asiática, apresentações de taiko ao vivo e oficinas culturais gratuitas.',
    location: 'Praça da Liberdade - Liberdade',
    neighborhood: 'Liberdade',
    lat: -23.559281,
    lng: -46.634628,
    date: 'Domingo, 10:00 às 18:00',
    organizer: 'Associação Cultural da Liberdade',
    organizerDoc: 'CNPJ Verificado: 48.***.***/0001-99',
    price: 'Entrada Gratuita',
    isFree: true,
    isToday: false,
    isTrending: true,
    icon: '🍜',
    routes: {
      metro: { time: '2 min', detail: 'Estação Japão-Liberdade (Linha 1-Azul) na saída da praça' },
      car: { time: '12 min', detail: 'Via Radial Leste • Recomenda-se transporte público' },
      walk: { time: '15 min', detail: '1.2 km partindo da Praça da Sé' },
      bike: { time: '6 min', detail: 'Ciclofaixa Centro-Sul' }
    }
  }
];

function initInteractiveMap() {
  const mapContainer = document.getElementById('realLeafletMap');
  if (!mapContainer || typeof L === 'undefined') return;

  // DOM Elements
  const btnGetRealGps = document.getElementById('btnGetRealLocation');
  const btnPresetPaulista = document.getElementById('btnPresetPaulista');
  const userLocationBadge = document.getElementById('userLocationBadge');
  const radiusSlider = document.getElementById('mapRadiusSlider');
  const radiusLabel = document.getElementById('radiusValueLabel');
  const searchInput = document.getElementById('mapSearchInput');

  // Sidebar Elements
  const sideBadge = document.getElementById('sideEventBadge');
  const sideStatus = document.getElementById('sideEventLiveStatus');
  const sideTitle = document.getElementById('sideEventTitle');
  const sideDesc = document.getElementById('sideEventDesc');
  const sideDate = document.getElementById('sideEventDate');
  const sideLocation = document.getElementById('sideEventLocation');
  const sidePrice = document.getElementById('sideEventPrice');
  const sideOrganizer = document.getElementById('sideEventOrganizer');
  const sideDoc = document.getElementById('sideEventDoc');
  const routeTimeDisplay = document.getElementById('routeTimeDisplay');
  const routeInstructionDisplay = document.getElementById('routeInstructionDisplay');
  const countTodos = document.getElementById('countTodos');

  // Control Buttons
  const categoryPills = document.querySelectorAll('.category-pill');
  const quickFilterBtns = document.querySelectorAll('.quick-filter-btn');
  const layerBtns = document.querySelectorAll('.layer-btn');
  const transportTabs = document.querySelectorAll('.transport-tab');
  const btnSaveAgenda = document.getElementById('btnSaveAgenda');
  const saveAgendaText = document.getElementById('saveAgendaText');
  const btnOpenTicketModal = document.getElementById('btnOpenTicketModal');
  const ticketModal = document.getElementById('ticketSimModal');
  const modalTicketTitle = document.getElementById('modalTicketTitle');
  const modalTicketMeta = document.getElementById('modalTicketMeta');
  const modalTicketPrice = document.getElementById('modalTicketPrice');

  if (countTodos) {
    countTodos.textContent = liveMapEvents.length;
  }

  // Initial State: MASP / Av. Paulista, São Paulo
  let userCoords = { lat: -23.561496, lng: -46.655881 };
  let selectedEvent = liveMapEvents[0];
  let activeCategory = 'todos';
  let activeQuickFilter = 'all';
  let activeTransportMode = 'metro';
  let activeRadiusKm = 10;
  let savedEvents = new Set();
  let markersMap = new Map();

  // 1. Initialize Real Leaflet Map
  const map = L.map('realLeafletMap', {
    center: [userCoords.lat, userCoords.lng],
    zoom: 13,
    zoomControl: true,
    attributionControl: false
  });

  // 2. Tile Layers Setup
  const tileLayers = {
    dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }),
    hot: L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19
    }),
    voyager: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    })
  };

  let activeLayer = tileLayers.dark.addTo(map);

  // Invalidate map size on initial load and window resize
  setTimeout(() => {
    map.invalidateSize();
  }, 250);
  window.addEventListener('resize', () => {
    map.invalidateSize();
  });

  // 3. User GPS Marker Setup (HTML DivIcon)
  const userGpsIcon = L.divIcon({
    className: 'custom-leaflet-user-icon',
    html: `
      <div class="leaflet-user-gps">
        <div class="pulse-core"></div>
        <div class="gps-tag">📍 Você está aqui</div>
      </div>
    `,
    iconSize: [120, 40],
    iconAnchor: [60, 15]
  });

  const userGpsMarker = L.marker([userCoords.lat, userCoords.lng], {
    icon: userGpsIcon,
    draggable: true,
    zIndexOffset: 1000
  }).addTo(map);

  // 4. Radius Circle Boundary
  const radiusCircle = L.circle([userCoords.lat, userCoords.lng], {
    radius: activeRadiusKm * 1000,
    color: '#D98054',
    fillColor: '#D98054',
    fillOpacity: 0.08,
    weight: 1.5,
    dashArray: '6, 6'
  }).addTo(map);

  // 5. Glowing Animated Route Polyline
  let routePolyline = L.polyline([
    [userCoords.lat, userCoords.lng],
    [selectedEvent.lat, selectedEvent.lng]
  ], {
    color: '#FF8F5E',
    weight: 4,
    opacity: 0.9,
    dashArray: '8, 8',
    lineCap: 'round'
  }).addTo(map);

  // Haversine Geodesic Distance Formula (km)
  function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Update User Location & Recalculate
  function setUserLocation(lat, lng, labelText = null) {
    userCoords = { lat, lng };
    userGpsMarker.setLatLng([lat, lng]);
    radiusCircle.setLatLng([lat, lng]);

    if (labelText && userLocationBadge) {
      userLocationBadge.textContent = `📍 ${labelText}`;
    }

    if (selectedEvent) {
      updateRouteLine();
      updateSidebar(selectedEvent);
    }
    renderEventMarkers();
  }

  // Update Route Polyline
  function updateRouteLine() {
    if (!selectedEvent || !routePolyline) return;
    routePolyline.setLatLngs([
      [userCoords.lat, userCoords.lng],
      [selectedEvent.lat, selectedEvent.lng]
    ]);
  }

  // Render & Filter Event Markers
  function renderEventMarkers() {
    // Clear previous markers
    markersMap.forEach(m => map.removeLayer(m));
    markersMap.clear();

    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const visibleEvents = liveMapEvents.filter(ev => {
      // Category filter
      if (activeCategory !== 'todos' && ev.category !== activeCategory) return false;

      // Quick filter
      if (activeQuickFilter === 'today' && !ev.isToday) return false;
      if (activeQuickFilter === 'free' && !ev.isFree) return false;
      if (activeQuickFilter === 'trending' && !ev.isTrending) return false;

      // Search filter
      if (searchQuery) {
        const matches = ev.title.toLowerCase().includes(searchQuery) ||
                        ev.neighborhood.toLowerCase().includes(searchQuery) ||
                        ev.categoryLabel.toLowerCase().includes(searchQuery) ||
                        ev.location.toLowerCase().includes(searchQuery);
        if (!matches) return false;
      }

      // Radius filter
      const dist = calculateDistanceKm(userCoords.lat, userCoords.lng, ev.lat, ev.lng);
      if (dist > activeRadiusKm) return false;

      return true;
    });

    visibleEvents.forEach(ev => {
      const isSelected = selectedEvent && selectedEvent.id === ev.id;
      const distKm = calculateDistanceKm(userCoords.lat, userCoords.lng, ev.lat, ev.lng).toFixed(1);

      const eventIcon = L.divIcon({
        className: 'custom-leaflet-event-icon',
        html: `
          <div class="leaflet-event-pin ${isSelected ? 'active' : ''}" data-event-id="${ev.id}">
            <div class="pin-icon">${ev.icon}</div>
            <span>${ev.title.split(':')[0]}</span>
          </div>
        `,
        iconSize: [140, 36],
        iconAnchor: [70, 18]
      });

      const marker = L.marker([ev.lat, ev.lng], { icon: eventIcon });

      // Click Event on Marker
      marker.on('click', () => {
        selectedEvent = ev;
        updateSidebar(ev);
        updateRouteLine();
        renderEventMarkers();
      });

      marker.addTo(map);
      markersMap.set(ev.id, marker);
    });

    // If active event was filtered out, fallback to first visible
    if (visibleEvents.length > 0) {
      const stillVisible = visibleEvents.find(e => selectedEvent && e.id === selectedEvent.id);
      if (!stillVisible) {
        selectedEvent = visibleEvents[0];
      }
      updateSidebar(selectedEvent);
      updateRouteLine();
    } else {
      routePolyline.setLatLngs([]);
    }
  }

  // Update Sidebar Content
  function updateSidebar(ev) {
    if (!ev || !sideTitle) return;

    const distance = calculateDistanceKm(userCoords.lat, userCoords.lng, ev.lat, ev.lng).toFixed(1);

    sideBadge.textContent = `${ev.icon} ${ev.categoryLabel}`;
    sideTitle.textContent = ev.title;
    sideDesc.textContent = ev.desc;
    sideDate.textContent = ev.date;
    sideLocation.textContent = `${ev.location} (${distance} km de você)`;
    sidePrice.textContent = ev.price;
    sideOrganizer.textContent = ev.organizer;
    sideDoc.textContent = ev.organizerDoc;

    if (sideStatus) {
      if (ev.isTrending) {
        sideStatus.textContent = '🔥 Em Alta';
        sideStatus.style.display = 'inline-block';
      } else if (ev.isFree) {
        sideStatus.textContent = '🎟️ Entrada Livre';
        sideStatus.style.display = 'inline-block';
      } else {
        sideStatus.style.display = 'none';
      }
    }

    // Update Route Details
    updateRouteModePanel(ev, activeTransportMode);

    // Update Agenda Save Button
    if (btnSaveAgenda && saveAgendaText) {
      if (savedEvents.has(ev.id)) {
        btnSaveAgenda.classList.add('btn-primary');
        btnSaveAgenda.classList.remove('btn-outline-copper');
        saveAgendaText.textContent = '✓ Salvo na Agenda';
      } else {
        btnSaveAgenda.classList.remove('btn-primary');
        btnSaveAgenda.classList.add('btn-outline-copper');
        saveAgendaText.textContent = 'Salvar na Minha Agenda';
      }
    }
  }

  function updateRouteModePanel(ev, mode) {
    if (!ev || !routeTimeDisplay || !routeInstructionDisplay) return;
    const route = ev.routes[mode] || ev.routes.metro;
    routeTimeDisplay.textContent = `${route.time} até o evento`;
    routeInstructionDisplay.textContent = route.detail;
  }

  // Map Click: Move GPS
  map.on('click', (e) => {
    setUserLocation(e.latlng.lat, e.latlng.lng, 'Local selecionado no mapa');
    showToast('📍 Localização atualizada no mapa! Distâncias e rotas recalculadas.');
  });

  // Drag GPS Pin
  userGpsMarker.on('dragend', (e) => {
    const latlng = userGpsMarker.getLatLng();
    setUserLocation(latlng.lat, latlng.lng, 'Posição ajustada por arrasto');
    showToast('📍 Você moveu seu pin de GPS!');
  });

  // Browser Real Geolocation Button
  if (btnGetRealGps) {
    btnGetRealGps.addEventListener('click', () => {
      if (!navigator.geolocation) {
        showToast('⚠️ Geolocalização não é suportada pelo seu navegador.');
        return;
      }

      btnGetRealGps.innerHTML = `
        <svg class="animate-spin" style="animation: spin 1s linear infinite; width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        <span>Buscando seu GPS...</span>
      `;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(latitude, longitude, 'Seu GPS Real (Navegador)');
          map.flyTo([latitude, longitude], 14, { duration: 1.5 });
          
          btnGetRealGps.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>GPS Ativo</span>
          `;
          if (btnPresetPaulista) btnPresetPaulista.classList.remove('active');

          showToast('🎯 GPS Real detectado com sucesso! Exibindo eventos a partir da sua localização.');
        },
        (error) => {
          btnGetRealGps.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3m0 14v3M2 12h3m14 0h3"></path></svg>
            <span>Usar Meu GPS Real</span>
          `;
          showToast('ℹ️ Permissão de GPS não concedida. Usando modo de demonstração na Av. Paulista.');
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  }

  // Preset Av. Paulista Button
  if (btnPresetPaulista) {
    btnPresetPaulista.addEventListener('click', () => {
      btnPresetPaulista.classList.add('active');
      setUserLocation(-23.561496, -46.655881, 'Você em: Av. Paulista (MASP)');
      map.flyTo([-23.561496, -46.655881], 13, { duration: 1.2 });
      showToast('📍 Mapa centralizado na Avenida Paulista / MASP!');
    });
  }

  // Radius Slider Control
  if (radiusSlider) {
    radiusSlider.addEventListener('input', (e) => {
      activeRadiusKm = parseInt(e.target.value, 10);
      if (radiusLabel) radiusLabel.textContent = `${activeRadiusKm} km`;
      radiusCircle.setRadius(activeRadiusKm * 1000);
      renderEventMarkers();
    });
  }

  // Category Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderEventMarkers();
    });
  });

  // Quick Filter Buttons
  quickFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quickFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeQuickFilter = btn.getAttribute('data-quick');
      renderEventMarkers();
    });
  });

  // Layer Switcher
  layerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      layerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const layerKey = btn.getAttribute('data-layer');
      
      map.removeLayer(activeLayer);
      if (tileLayers[layerKey]) {
        activeLayer = tileLayers[layerKey].addTo(map);
      }
    });
  });

  // Multimodal Transport Tabs
  transportTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      transportTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTransportMode = tab.getAttribute('data-mode');
      if (selectedEvent) {
        updateRouteModePanel(selectedEvent, activeTransportMode);
      }
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderEventMarkers();
    });
  }

  // Save to Agenda Button
  if (btnSaveAgenda) {
    btnSaveAgenda.addEventListener('click', () => {
      if (!selectedEvent) return;
      if (savedEvents.has(selectedEvent.id)) {
        savedEvents.delete(selectedEvent.id);
        btnSaveAgenda.classList.remove('btn-primary');
        btnSaveAgenda.classList.add('btn-outline-copper');
        saveAgendaText.textContent = 'Salvar na Minha Agenda';
        showToast(`Removido da sua agenda: "${selectedEvent.title}"`);
      } else {
        savedEvents.add(selectedEvent.id);
        btnSaveAgenda.classList.add('btn-primary');
        btnSaveAgenda.classList.remove('btn-outline-copper');
        saveAgendaText.textContent = '✓ Salvo na Agenda';
        showToast(`✨ Adicionado à sua Agenda Cultural: "${selectedEvent.title}"!`);
      }
    });
  }

  // Open Ticket Pass Simulator Modal
  if (btnOpenTicketModal && ticketModal) {
    btnOpenTicketModal.addEventListener('click', () => {
      if (!selectedEvent) return;
      if (modalTicketTitle) modalTicketTitle.textContent = selectedEvent.title;
      const distance = calculateDistanceKm(userCoords.lat, userCoords.lng, selectedEvent.lat, selectedEvent.lng).toFixed(1);
      if (modalTicketMeta) modalTicketMeta.textContent = `📍 ${selectedEvent.location} (${distance} km) • 🕒 ${selectedEvent.date}`;
      if (modalTicketPrice) modalTicketPrice.textContent = selectedEvent.price;

      ticketModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Initial Render
  renderEventMarkers();
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
