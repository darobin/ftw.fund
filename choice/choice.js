
const searchPrivacy = {
  label: 'Privacy',
  levels: [
    {
      id: 'strict',
      name: 'Strict',
      description: 'Only touches data strictly needed to respond to queries.',
    },
    {
      id: 'fair',
      name: 'Fair',
      description: 'Processes limited data for performance and measurement.',
    },
    {
      id: 'tracking',
      name: 'Tracking',
      description: 'Profiles you and reuses the data in non-search contexts.',
    },
  ],
};
const searchSustainability = {
  label: 'Sustainability',
  levels: [
    {
      id: 'regen',
      name: 'Regenerative',
      description: 'Uses revenue to improve the biosphere.',
    },
    {
      id: 'neutral',
      name: 'Neutral',
      description: 'Carbon-neutral and powered by renewables.',
    },
    {
      id: 'negative',
      name: 'Negative',
      description: 'Has a high footprint on our biosphere.',
    },
  ],
};
const browserPrivacy = {
  label: 'Privacy',
  levels: [
    {
      id: 'strict',
      name: 'Strong',
      description: 'Deploys strong protections against tracking, at occasional risk to functionality.',
    },
    {
      id: 'fair',
      name: 'Fair',
      description: 'Protects against tracking without compromising functionality.',
    },
    {
      id: 'tracking',
      name: 'Tracking',
      description: 'Promotes third-party tracking and may track you itself.',
    },
  ],
};

const searches = {
  aperture: {
    name: 'Aperture',
    slogan: 'Visual and image search first',
    privacy: 'fair',
    sustainability: 'neutral',
    stars: 5,
  },
  beacon: {
    name: 'Beacon',
    slogan: 'Guiding you to answers',
    privacy: 'tracking',
    sustainability: 'fair',
    stars: 1,
  },
  compass: {
    name: 'Compass',
    slogan: 'Find your direction online',
    privacy: 'fair',
    sustainability: 'negative',
    stars: 3,
  },
  findly: {
    name: 'Findly',
    slogan: 'Search everything, instantly',
    privacy: 'tracking',
    sustainability: 'negative',
    stars: 2,
  },
  inkwell: {
    name: 'Inkwell',
    slogan: 'Deep research, scholarly sources',
    privacy: 'strict',
    sustainability: 'regen',
    stars: 5,
  },
  lattice: {
    name: 'Lattice',
    slogan: 'Connected knowledge graph search',
    privacy: 'fair',
    sustainability: 'regen',
    stars: 4,
  },
  nebula: {
    name: 'Nebula',
    slogan: 'Explore the universe of knowledge',
    privacy: 'strict',
    sustainability: 'negative',
    stars: 3,
  },
  pulse: {
    name: 'Pulse',
    slogan: 'Real-time trending search',
    privacy: 'fair',
    sustainability: 'negative',
    stars: 4,
  },
  quacker: {
    name: 'Quacker',
    slogan: 'Your searches stay your business',
    privacy: 'strict',
    sustainability: 'fair',
    stars: 5,
  },
  treeline: {
    name: 'Treeline',
    slogan: 'Every search plants a tree',
    privacy: 'strict',
    sustainability: 'regen',
    stars: 5,
  },
};

const browsers = {
  canopy: {
    name: 'Canopy',
    slogan: 'Eco-conscious carbon-neutral browsing',
    privacy: 'strict',
    stars: 5,
  },
  crucible: {
    name: 'Crucible',
    slogan: 'Where ideas merge and fuse',
    privacy: 'tracking',
    stars: 3,
  },
  emberbat: {
    name: 'EmberBat',
    slogan: 'Open-source, fiercely private',
    privacy: 'strict',
    stars: 5,
  },
  flint: {
    name: 'Flint',
    slogan: 'Instant ignition, blazing fast',
    privacy: 'fair',
    stars: 4,
  },
  gleam: {
    name: 'Gleam',
    slogan: 'Polished, fast, everywhere you go',
    privacy: 'tracking',
    stars: 2,
  },
  lomos: {
    name: 'Lomos',
    slogan: 'Privacy-focused light browser',
    privacy: 'strict',
    stars: 4,
  },
  nomad: {
    name: 'Nomad',
    slogan: 'For the perpetual explorer',
    privacy: 'fair',
    stars: 2,
  },
  onyx: {
    name: 'Onyx',
    slogan: 'Dark-mode-first luxury browser',
    privacy: 'strict',
    stars: 5,
  },
  prismara: {
    name: 'Prismara',
    slogan: 'Multifaceted tab management',
    privacy: 'fair',
    stars: 4,
  },
  riptide: {
    name: 'Riptide',
    slogan: 'Surf the web, wave by wave',
    privacy: 'fair',
    stars: 3,
  },
  vortex: {
    name: 'Vortex',
    slogan: 'Speed-first minimal browser',
    privacy: 'fair',
    stars: 4,
  },
  zephyr: {
    name: 'Zephyr',
    slogan: 'Lightweight and breezy',
    privacy: 'tracking',
    stars: 3,
  },
};

const state = {};

if (document.body.getAttribute('data-topic') === 'browser') {
  state.criteria = {
    privacy: browserPrivacy,
  };
  state.acceptablePrivacy = new Set(Object.keys(browserPrivacy));
  render(browsers);
}
else {
  state.criteria = {
    privacy: searchPrivacy,
    sustainability: searchSustainability,
  };
  state.acceptablePrivacy = new Set(Object.keys(searchPrivacy));
  state.acceptableSustainability = new Set(Object.keys(searchSustainability));
  render(searches);
}


function render (products) {
  // render criteria
  renderFilteredProducts(products);
}

function renderFilteredProducts (products) {

}
