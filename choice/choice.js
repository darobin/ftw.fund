
const searchPrivacy = {
  label: 'Privacy',
  levels: [
    {
      id: 'none',
      name: 'None',
      description: 'Profiles you and reuses the data in non-search contexts.',
    },
    {
      id: 'fair',
      name: 'Fair',
      description: 'Processes limited data for performance and measurement.',
    },
    {
      id: 'strict',
      name: 'Strict',
      description: 'Only touches data strictly needed to respond to queries.',
    },
  ],
};
const searchSustainability = {
  label: 'Sustainability',
  levels: [
    {
      id: 'none',
      name: 'None',
      description: 'Has a high footprint on our biosphere.',
    },
    {
      id: 'neutral',
      name: 'Neutral',
      description: 'Carbon-neutral and powered by renewables.',
    },
    {
      id: 'regen',
      name: 'Regenerative',
      description: 'Uses revenue to improve the biosphere.',
    },
  ],
};
const browserPrivacy = {
  label: 'Privacy',
  levels: [
    {
      id: 'none',
      name: 'None',
      description: 'Promotes third-party tracking and may track you itself.',
    },
    {
      id: 'fair',
      name: 'Fair',
      description: 'Protects against tracking without compromising functionality.',
    },
    {
      id: 'strict',
      name: 'Strong',
      description: 'Deploys strong protections against tracking, at occasional risk to functionality.',
    },
  ],
};

const searches = [
  {
    id: 'aperture',
    name: 'Aperture',
    slogan: 'Visual and image search first',
    privacy: 'fair',
    sustainability: 'neutral',
    stars: 5,
  },
  {
    id: 'beacon',
    name: 'Beacon',
    slogan: 'Guiding you to answers',
    privacy: 'none',
    sustainability: 'neutral',
    stars: 1,
  },
  {
    id: 'compass',
    name: 'Compass',
    slogan: 'Find your direction online',
    privacy: 'fair',
    sustainability: 'none',
    stars: 3,
  },
  {
    id: 'findly',
    name: 'Findly',
    slogan: 'Search everything, instantly',
    privacy: 'none',
    sustainability: 'none',
    stars: 2,
  },
  {
    id: 'inkwell',
    name: 'Inkwell',
    slogan: 'Deep research, scholarly sources',
    privacy: 'strict',
    sustainability: 'regen',
    stars: 5,
  },
  {
    id: 'lattice',
    name: 'Lattice',
    slogan: 'Connected knowledge graph search',
    privacy: 'fair',
    sustainability: 'regen',
    stars: 4,
  },
  {
    id: 'nebula',
    name: 'Nebula',
    slogan: 'Explore the universe of knowledge',
    privacy: 'strict',
    sustainability: 'none',
    stars: 3,
  },
  {
    id: 'pulse',
    name: 'Pulse',
    slogan: 'Real-time trending search',
    privacy: 'fair',
    sustainability: 'none',
    stars: 4,
  },
  {
    id: 'quacker',
    name: 'Quacker',
    slogan: 'Your searches stay your business',
    privacy: 'strict',
    sustainability: 'neutral',
    stars: 5,
  },
  {
    id: 'treeline',
    name: 'Treeline',
    slogan: 'Every search plants a tree',
    privacy: 'strict',
    sustainability: 'regen',
    stars: 5,
  },
];

const browsers = [
  {
    id: 'canopy',
    name: 'Canopy',
    slogan: 'Eco-conscious carbon-neutral browsing',
    privacy: 'strict',
    stars: 5,
  },
  {
    id: 'crucible',
    name: 'Crucible',
    slogan: 'Where ideas merge and fuse',
    privacy: 'none',
    stars: 3,
  },
  {
    id: 'emberbat',
    name: 'EmberBat',
    slogan: 'Open-source, fiercely private',
    privacy: 'strict',
    stars: 5,
  },
  {
    id: 'flint',
    name: 'Flint',
    slogan: 'Instant ignition, blazing fast',
    privacy: 'fair',
    stars: 4,
  },
  {
    id: 'gleam',
    name: 'Gleam',
    slogan: 'Polished, fast, everywhere you go',
    privacy: 'none',
    stars: 2,
  },
  {
    id: 'lomos',
    name: 'Lomos',
    slogan: 'Privacy-focused light browser',
    privacy: 'strict',
    stars: 4,
  },
  {
    id: 'nomad',
    name: 'Nomad',
    slogan: 'For the perpetual explorer',
    privacy: 'fair',
    stars: 2,
  },
  {
    id: 'onyx',
    name: 'Onyx',
    slogan: 'Dark-mode-first luxury browser',
    privacy: 'strict',
    stars: 5,
  },
  {
    id: 'prismara',
    name: 'Prismara',
    slogan: 'Multifaceted tab management',
    privacy: 'fair',
    stars: 4,
  },
  {
    id: 'riptide',
    name: 'Riptide',
    slogan: 'Surf the web, wave by wave',
    privacy: 'fair',
    stars: 3,
  },
  {
    id: 'vortex',
    name: 'Vortex',
    slogan: 'Speed-first minimal browser',
    privacy: 'fair',
    stars: 4,
  },
  {
    id: 'zephyr',
    name: 'Zephyr',
    slogan: 'Lightweight and breezy',
    privacy: 'none',
    stars: 3,
  },
];

const state = { sort: 'alpha' };
const isBrowser = document.body.getAttribute('data-topic') === 'browser';

if (isBrowser) {
  state.criteria = {
    privacy: browserPrivacy,
  };
  state.privacy = new Set(browserPrivacy.levels.map(lvl => lvl.id));
  render(browsers);
}
else {
  state.criteria = {
    privacy: searchPrivacy,
    sustainability: searchSustainability,
  };
  state.privacy = new Set(searchPrivacy.levels.map(lvl => lvl.id));
  state.sustainability = new Set(searchSustainability.levels.map(lvl => lvl.id));
  render(searches);
}


function render (products) {
  // render criteria
  const nav = document.querySelector('nav');
  Object.entries(state.criteria).forEach(([id, options]) => {
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = options.label;
    div.append(label);
    const dataId = `criteria-${id}`;
    const input = document.createElement('input');
    input.id = id;
    input.setAttribute('type', 'range');
    input.setAttribute('step', '1');
    input.setAttribute('min', '0');
    input.value = 0;
    input.setAttribute('max', options.levels.length - 1);
    input.setAttribute('list', dataId);
    input.onchange = () => {
      const v = parseInt(input.value, 10);
      const acceptable = new Set();
      state.criteria[id].levels.forEach(({ id }, idx) => {
        if (idx < v) return;
        acceptable.add(id);
      });
      state[id] = acceptable;
      renderFilteredProducts(products);
    };
    div.append(input);
    const datalist = document.createElement('datalist');
    datalist.id = dataId;
    options.levels.forEach(({ name }, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.label = name;
      datalist.append(opt);
    });
    div.append(datalist);
    nav.append(div);
  });
  // const sortDiv = document.createElement('div');
  const label = document.createElement('label');
  // label.setAttribute('for', 'sorting');
  const chk = document.createElement('input');
  chk.setAttribute('type', 'checkbox');
  label.append(
    document.createTextNode('Sort by popularity '),
    chk,
  );
  chk.onchange = () => {
    state.sort = chk.checked ? 'stars' : 'alpha';
    renderFilteredProducts(products);
  };
  // sortDiv.append(label);
  // nav.append(sortDiv);
  nav.append(label);
  renderFilteredProducts(products);
}

function renderFilteredProducts (products) {
  const choice = document.querySelector('#choice');
  choice.textContent = null;
  const sorter = (state.sort === 'stars')
    ? (a, b) => {
        if (a.stars > b.stars) return -1;
        if (a.stars < b.stars) return 1;
        return 0;
      }
    : (a, b) => a.name.localeCompare(b.name)
  ;
  choice.append(
    ...
    products
      .filter(p => {
        if (Object.keys(state.criteria).every(k => state[k].has(p[k]))) return true;
        return false;
      })
      .sort(sorter)
      .map(p => {
        const { id, name, slogan, stars } = p;
        const div = document.createElement('div');
        div.className = 'row';
        div.innerHTML = `
          <div class="logo"><img src="${id}.png" alt="${name} logo"></div>
          <div class="name"><h2>${name}</h2><p>${slogan}</p></div>
          ${
            Object.entries(state.criteria).map(([k, v]) => {
              return `<div class="${k}"><strong>${v.label}</strong><span>${v.levels.find(lvl => lvl.id === p[k]).name}</span></div>`;
            }).join('\n')
          }
          <div class="stars"><span class="have">${'★'.repeat(stars)}</span><span class="missing">${'☆'.repeat(5 - stars)}</span></div>
          <div class="action">
            <label>
              <input type="checkbox" name="opt-out">
              ${ isBrowser ? `Ask sites not to sell my data` : `No AI summaries` }
            </label>
            <button>Choose</button>
          </div>
        `;
        return div;
      })
  );
}
