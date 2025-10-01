const STATE = {
  spots: [],
  language: 'ja',
  languageMode: document.documentElement.dataset.languageMode || 'single'
};

const ICONS = {
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.75 5.5a.75.75 0 0 0-1.5 0v5.06c0 .2.08.39.22.53l3.11 3.11a.75.75 0 0 0 1.06-1.06l-2.89-2.89V7.5z"/></svg>',
  map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3.45a2 2 0 0 0-1.13.07l-3.62 1.3A2 2 0 0 0 3 6.7v12.88a1 1 0 0 0 1.35.94l4-1.52 7.3 2.72a2 2 0 0 0 1.13.07l3.62-1.3A2 2 0 0 0 21 19.3V6.42a1 1 0 0 0-1.35-.94l-4 1.52zM9 5.2l6 2.24v11.35L9 16.55zm-2 .48 1-.38v11.35l-3 1.14V6.7zm12 13.12-1 .37V7.35l3-1.14v11.82z"/></svg>',
  yen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4a1 1 0 0 0-.83 1.57L10 11.6V13H7a1 1 0 1 0 0 2h3v1H7a1 1 0 1 0 0 2h3v1a1 1 0 1 0 2 0v-1h3a1 1 0 1 0 0-2h-3v-1h3a1 1 0 1 0 0-2h-3v-1.4l4.33-6.03A1 1 0 0 0 15.5 4a1 1 0 0 0-.82.43L12 8.59 9.32 4.43A1 1 0 0 0 8.5 4z"/></svg>',
  card: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3zm0 2h18v2H3zm0 4h18v6H3zm2 3.5a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5z"/></svg>',
  child: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8c-4.41 0-8 2.69-8 6a1 1 0 0 0 2 0c0-2.2 2.58-4 6-4s6 1.8 6 4a1 1 0 0 0 2 0c0-3.31-3.59-6-8-6z"/></svg>',
  rain: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 8a5 5 0 0 0-9.58-1.9A4.5 4.5 0 0 0 7.5 18H17a4 4 0 0 0 0-8zM8 16a2.5 2.5 0 0 1-.14-5 1 1 0 0 0 .9-.64A3 3 0 1 1 17 8a1 1 0 0 0 1 1 2 2 0 0 1 0 4zM9 19a1 1 0 0 1 .92.62l.8 2a1 1 0 0 1-1.84.76l-.8-2A1 1 0 0 1 9 19zm6 0a1 1 0 0 1 .92.62l.8 2a1 1 0 0 1-1.84.76l-.8-2A1 1 0 0 1 15 19zm-3 2a1 1 0 0 1 .92.62l.4 1a1 1 0 0 1-1.84.76l-.4-1A1 1 0 0 1 12 21z"/></svg>',
  car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.34 5a3 3 0 0 0-2.9 2.2L2.1 10.79A2 2 0 0 0 1.95 12v6a1 1 0 0 0 2 0v-1h16v1a1 1 0 0 0 2 0v-6a2 2 0 0 0-.15-1.21l-1.34-3.58A3 3 0 0 0 17.66 5zM6.34 7h11.32a1 1 0 0 1 .95.71L19.66 10H4.34l1.05-2.29A1 1 0 0 1 6.34 7zM5.5 15a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm13 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>',
  walk: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm3.42 5.65a1 1 0 0 0-1.41-.07l-2 1.72-2.67-1.1a1 1 0 0 0-.78 1.85l2.14.88-1.16 3.87-2.2 1.76A1 1 0 0 0 7.5 17h.1a1 1 0 0 0 .7-.28l2-2a1 1 0 0 0 .26-.45l.74-2.45 1.7.7V18a1 1 0 1 0 2 0v-4.5a1 1 0 0 0-.63-.92l-1.05-.43 1.44-1.24 1.06 1.6A1 1 0 0 0 18 12a1 1 0 0 0 .83-1.56z"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>'
};

const CATEGORY_LABELS = {
  breakfast: '朝食',
  lunch: 'ランチ',
  dinner: 'ディナー',
  supermarket: 'スーパーマーケット',
  beach: 'ビーチ',
  sightseeing: '観光スポット'
};

const CATEGORY_GROUPS = [
  { id: 'breakfast', label: '朝食', description: '1言語表示プラン（言語は任意）' },
  { id: 'lunch', label: 'Lunch', description: '2言語切替えプラン（English ver.）' },
  { id: 'dinner', label: 'ディナー / Dinner', description: '2言語同一ページ併記プラン' }
];

const CATEGORY_DISPLAY_LABELS = {
  breakfast: '朝食',
  lunch: 'Lunch',
  dinner: 'ディナー / Dinner'
};

const CARD_LOCALIZATION = {
  '潮風ランチデッキ': {
    en: {
      name: 'Shiokaze Lunch Deck',
      hostNote: 'Enjoy seasonal seafood with ocean views. Reserve ahead for a window seat.',
      hours: '11:00-15:00',
      price: '¥1,500 - ¥2,000',
      payment: 'Cards / QR accepted',
      address: '4-5-6 Kaigan Street, Sample City',
      parking: 'Partner parking: 5 spaces',
      car: '6 min by car',
      walk: '12 min on foot',
      tags: ['Lunch'],
      alt: 'Ocean-view dining at Shiokaze Lunch Deck.'
    }
  },
  '港カフェランチ便': {
    en: {
      name: 'Minato Cafe Lunch Stand',
      hostNote: 'Colorful daily plate made with fresh market produce.',
      hours: '10:30-16:00',
      price: '¥1,000 - ¥1,500',
      payment: 'Cash / QR accepted',
      address: '7-1-2 Ichiba Street, Sample City',
      parking: 'Market shared parking',
      car: '5 min by car',
      walk: '10 min on foot',
      tags: ['Lunch'],
      alt: 'Daily plate at Minato Cafe Lunch Stand.'
    }
  },
  'テラスランチガーデン': {
    en: {
      name: 'Terrace Lunch Garden',
      hostNote: 'Unwind on a greenery-filled terrace for a calm midday break.',
      hours: '11:30-14:30',
      price: '¥1,500 - ¥2,000',
      payment: 'Cards accepted',
      address: '8-3-4 Hilltop, Sample City',
      parking: '4 spaces in front',
      car: '7 min by car',
      walk: '15 min on foot',
      tags: ['Lunch'],
      alt: 'Terrace seating at Terrace Lunch Garden.'
    }
  },
  '灯夜ダイニング': {
    both: {
      name: '灯夜ダイニング / Tobari Dining',
      hostNote: '炭火と地酒をゆっくり味わえる地元人気の一軒。/ Savor charcoal-grilled dishes with local sake in a cozy hideaway.',
      hoursLabel: '営業時間 / Opening Hours',
      hours: '17:30-22:30 / 5:30pm-10:30pm',
      priceLabel: '価格帯 / Price',
      price: '¥2,500 - ¥3,500',
      paymentLabel: '支払方法 / Payment',
      payment: 'カード／QR対応 / Cards & QR',
      addressLabel: '所在地 / Address',
      address: 'サンプル市旧港9-2-1 / 9-2-1 Old Harbor, Sample City',
      car: '車で8分 / 8 minutes by car',
      walk: '徒歩18分 / 18 minutes on foot',
      tags: ['ディナー / Dinner'],
      alt: '灯夜ダイニングの炭火席と地酒。/ Charcoal-grilled dinner at Tobari Dining.'
    }
  },
  '囲炉裏ビストロ': {
    both: {
      name: '囲炉裏ビストロ / Irori Bistro',
      hostNote: '炭火で仕上げる肉料理と地酒のペアリングが人気です。/ Charcoal-grilled meats paired with local sake are the highlight.',
      hoursLabel: '営業時間 / Opening Hours',
      hours: '18:00-23:00 / 6:00pm-11:00pm',
      priceLabel: '価格帯 / Price',
      price: '¥3,000 - ¥4,000',
      paymentLabel: '支払方法 / Payment',
      payment: 'カード対応 / Cards accepted',
      addressLabel: '所在地 / Address',
      address: 'サンプル市温泉通5-7-3 / 5-7-3 Onsen Street, Sample City',
      car: '車で9分 / 9 minutes by car',
      walk: '徒歩20分 / 20 minutes on foot',
      tags: ['ディナー / Dinner'],
      alt: '囲炉裏ビストロのコースと囲炉裏席。/ Irori Bistro course and hearth seating.'
    }
  },
  '星空コース料理': {
    both: {
      name: '星空コース料理 / Starlight Course Dining',
      hostNote: '最上階から夜景を望む窓際席は特におすすめです。/ Window seats on the top floor offer sparkling night views.',
      hoursLabel: '営業時間 / Opening Hours',
      hours: '18:30-22:00 / 6:30pm-10:00pm',
      priceLabel: '価格帯 / Price',
      price: '¥2,000 - ¥3,000',
      paymentLabel: '支払方法 / Payment',
      payment: 'カード／QR対応 / Cards & QR',
      addressLabel: '所在地 / Address',
      address: 'サンプル市丘の上6-4-8 / 6-4-8 Hilltop, Sample City',
      car: '車で10分 / 10 minutes by car',
      tags: ['ディナー / Dinner'],
      alt: '星空コース料理の夜景とテーブル。/ Night view with the Starlight Course Dining table.'
    }
  }
};

const FAQ_ITEMS = [
  {
    question: '申し込みから公開までどれくらいかかりますか？',
    answer: '初稿7営業日、修正2往復で公開14営業日が目安です。'
  },
  {
    question: '推しのお店・スポットがない場合どうすればよいですか？',
    answer: 'こちらで選定可能です。インターネット、SNS上に公開されている情報からピックアップさせていただきます。'
  },
  {
    question: '周辺情報が更新された場合は？',
    answer: 'メンテナンスパックをご用意しています。ご希望に応じて選択してください。急ぎの場合は、緊急プランも用意しています。お気軽にご連絡ください。'
  },
  {
    question: '表示速度やスマホ対応は大丈夫ですか？',
    answer: 'はい。静的・軽量設計と画像最適化をしています。画像が多くなると表示速度が遅くなる場合がありますが、できる限り軽量化して見やすいサイト作りに努めます。'
  },
  {
    question: 'どこで公開されますか？独自ドメインは？',
    answer: '標準はGitHub Pages（無料）。独自ドメイン希望の際はお客様に独自ドメイン・サーバーを用意していただく必要があります。'
  },
  {
    question: '掲載に不具合・誤りがあった場合は？',
    answer: '事実誤認やリンクミスは無償で即時対応します。'
  },
  {
    question: '「AIを使う」とは具体的に何をしますか？',
    answer: '原稿案の生成・整形の補助に活用します。最終的な内容は人が確認・編集し、正確性とトーンを担保します。'
  },
  {
    question: '納品されるものにはどんなものが含まれますか？',
    answer: 'サイトURLを共有させていただいております。ご希望であれば別途QRコードを作成してお渡しも可能です。（別途お見積り）'
  },
  {
    question: '支払いタイミングは？',
    answer: '公開時に請求、銀行振込（手数料ご負担）です。キャンセルは着手後50％が目安です。'
  }
];

const ANALYTICS_EVENT = 'yadonote_event';
const ANALYTICS_ENDPOINT = window.YADONOTE_ANALYTICS_ENDPOINT || null;

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupLanguage();
  setupTracking();
  renderFAQ();
  loadSpots();
});

function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  if (!toggle || !navList) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open', !expanded);
  });
}

function setupLanguage() {
  const switcher = document.querySelector('.language-switch');
  if (STATE.languageMode === 'switch' && switcher) {
    switcher.hidden = false;
    document.body.dataset.language = STATE.language;
    switcher.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        STATE.language = lang;
        document.body.dataset.language = lang;
        switcher.querySelectorAll('.lang-btn').forEach((other) => {
          other.setAttribute('aria-pressed', String(other.dataset.lang === lang));
        });
      });
    });
  }
}

async function loadSpots() {
  try {
    const response = await fetch('data/spots.csv');
    if (!response.ok) throw new Error('CSVの取得に失敗しました');
    const text = await response.text();
    const parsed = parseCSV(text);
    STATE.spots = sortSpots(parsed);
    renderSpots();
  } catch (error) {
    console.error(error);
    const list = document.querySelector('.spot-category-list');
    if (list) {
      list.innerHTML = '<p>スポットデータの読み込みに失敗しました。ページを再読み込みしてください。</p>';
    }
  }
}

function parseCSV(text) {
  const rows = text.trim().split(/\r?\n/).filter(Boolean);
  if (!rows.length) return [];
  const headers = parseCSVRow(rows.shift());
  return rows.map((line) => {
    const values = parseCSVRow(line);
    const entry = {};
    headers.forEach((header, index) => {
      entry[header.trim()] = (values[index] || '').trim();
    });
    entry.categories = entry.category ? entry.category.split('|').map((cat) => cat.trim()) : [];
    entry.kid_friendly = entry.kid_friendly === 'yes';
    entry.time_by_car_min = Number(entry.time_by_car_min || 0);
    entry.time_on_foot_min = Number(entry.time_on_foot_min || 0);
    entry.display_name = entry.name;
    return entry;
  });
}

function parseCSVRow(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result.map((value) => value.trim().replace(/\r$/, ''));
}

function sortSpots(spots) {
  return spots.sort((a, b) => a.display_name.localeCompare(b.display_name, 'ja'));
}

function renderSpots() {
  const list = document.querySelector('.spot-category-list');
  if (!list) return;
  list.innerHTML = '';

  CATEGORY_GROUPS.forEach(({ id, label, description }) => {
    const spots = STATE.spots.filter((spot) => spot.categories.includes(id)).slice(0, 3);
    if (!spots.length) return;

    const section = document.createElement('section');
    section.className = 'spot-category';

    const heading = document.createElement('h3');
    heading.className = 'spot-category-title';
    heading.textContent = label;
    section.appendChild(heading);

    if (description) {
      const subheading = document.createElement('p');
      subheading.className = 'spot-category-sub';
      subheading.textContent = description;
      section.appendChild(subheading);
    }

    const grid = document.createElement('div');
    grid.className = 'spot-category-grid';
    grid.setAttribute('role', 'list');

    spots.forEach((spot) => {
      grid.appendChild(createSpotCard(spot, id));
    });

    section.appendChild(grid);
    list.appendChild(section);
  });

  if (!list.children.length) {
    const empty = document.createElement('p');
    empty.className = 'spot-empty';
    empty.textContent = '現在表示できるスポットがありません。';
    list.appendChild(empty);
  }
}

function localizeSpot(spot, categoryId) {
  const baseInfo = {
    title: spot.name,
    hostNote: spot.host_note,
    info: {
      hours: { label: '営業時間', value: spot.hours || '営業時間未登録' },
      price: { label: '価格帯', value: spot.price_range || '価格帯未登録' },
      payment: { label: '支払方法', value: spot.payment || '支払い情報はお問い合わせください' },
      address: { label: '所在地', value: spot.address || '住所はお問い合わせください' }
    },
    tags: [CATEGORY_DISPLAY_LABELS[categoryId]].filter(Boolean),
    travel: {
      car: spot.time_by_car_min ? `車で${spot.time_by_car_min}分` : null,
      walk: spot.time_on_foot_min ? `徒歩${spot.time_on_foot_min}分` : null,
      parking: spot.parking || '駐車: 要確認'
    },
    alt: `${spot.name}の様子。${spot.host_note}`
  };

  if (categoryId === 'lunch') {
    const overrides = CARD_LOCALIZATION[spot.name]?.en || {};
    return {
      title: overrides.name || baseInfo.title,
      hostNote: overrides.hostNote || baseInfo.hostNote,
      info: {
        hours: { label: 'Opening Hours', value: overrides.hours || spot.hours || 'Check hours' },
        price: { label: 'Price Range', value: overrides.price || spot.price_range || 'Check price' },
        payment: { label: 'Payment', value: overrides.payment || spot.payment || 'Please ask for payment options' },
        address: { label: 'Address', value: overrides.address || spot.address || 'Check address' }
      },
      tags: overrides.tags || ['Lunch'],
      travel: {
        car: overrides.car || (spot.time_by_car_min ? `Drive ${spot.time_by_car_min} min` : null),
        walk: overrides.walk || (spot.time_on_foot_min ? `Walk ${spot.time_on_foot_min} min` : null),
        parking: null
      },
      alt: overrides.alt || `Dining at ${overrides.name || spot.name}. ${overrides.hostNote || spot.host_note}`
    };
  }

  if (categoryId === 'dinner') {
    const overrides = CARD_LOCALIZATION[spot.name]?.both || {};
    return {
      title: overrides.name || baseInfo.title,
      hostNote: overrides.hostNote || baseInfo.hostNote,
      info: {
        hours: {
          label: overrides.hoursLabel || '営業時間 / Opening Hours',
          value: overrides.hours || (spot.hours ? `${spot.hours} / Check hours` : '要確認 / Please inquire')
        },
        price: {
          label: overrides.priceLabel || '価格帯',
          value: overrides.price || (spot.price_range ? spot.price_range : '要確認')
        },
        payment: {
          label: overrides.paymentLabel || '支払方法 / Payment',
          value: overrides.payment || (spot.payment ? `${spot.payment} / Payment info` : 'お問い合わせください / Please ask')
        },
        address: {
          label: overrides.addressLabel || '所在地 / Address',
          value: overrides.address || (spot.address ? `${spot.address} / Address` : '要確認 / Please inquire')
        }
      },
      tags: overrides.tags || ['ディナー / Dinner'],
      travel: {
        car: overrides.car || (spot.time_by_car_min ? `車で${spot.time_by_car_min}分 / ${spot.time_by_car_min} minutes by car` : null),
        walk: overrides.walk || (spot.time_on_foot_min ? `徒歩${spot.time_on_foot_min}分 / ${spot.time_on_foot_min} minutes on foot` : null),
        parking: overrides.parking || null
      },
      alt: overrides.alt || `${spot.name}の様子。${spot.host_note}`
    };
  }

  return baseInfo;
}

function createSpotCard(spot, categoryId) {
  const localized = localizeSpot(spot, categoryId);
  const article = document.createElement("article");
  article.className = "spot-card";
  article.setAttribute("role", "listitem");

  const image = document.createElement("img");
  image.loading = "lazy";
  image.width = 1280;
  image.height = 720;
  image.src = `assets/images/spots/${spot.image_file || "placeholder.svg"}`;
  image.alt = localized.alt || `${spot.name}の様子。${spot.host_note}`;
  article.appendChild(image);

  const body = document.createElement("div");
  body.className = "spot-card-body";

  const categories = Array.isArray(localized.tags) && localized.tags.length
    ? localized.tags
    : [CATEGORY_DISPLAY_LABELS[categoryId]].filter(Boolean);
  if (categories.length) {
    const tags = document.createElement("div");
    tags.className = "spot-tags";
    categories.forEach((category) => {
      const tag = document.createElement("span");
      tag.className = "spot-tag";
      tag.textContent = category;
      tags.appendChild(tag);
    });
    body.appendChild(tags);
  }

  const title = document.createElement("h3");
  title.textContent = localized.title;
  body.appendChild(title);

  const hostNote = document.createElement("p");
  hostNote.className = "host-note";
  hostNote.textContent = localized.hostNote;
  body.appendChild(hostNote);

  const infoList = document.createElement("ul");
  infoList.className = "spot-info";
  infoList.appendChild(createInfoItem(ICONS.clock, localized.info.hours.label, localized.info.hours.value));
  infoList.appendChild(createInfoItem(ICONS.yen, localized.info.price.label, localized.info.price.value));
  infoList.appendChild(createInfoItem(ICONS.card, localized.info.payment.label, localized.info.payment.value));
  infoList.appendChild(createInfoItem(ICONS.map, localized.info.address.label, localized.info.address.value));
  body.appendChild(infoList);

  const travel = document.createElement("div");
  travel.className = "spot-travel";
  if (localized.travel.car) {
    const carItem = document.createElement("span");
    carItem.innerHTML = `${ICONS.car}<span>${localized.travel.car}</span>`;
    travel.appendChild(carItem);
  }
  if (localized.travel.walk) {
    const walkItem = document.createElement("span");
    walkItem.innerHTML = `${ICONS.walk}<span>${localized.travel.walk}</span>`;
    travel.appendChild(walkItem);
  }
  if (!['breakfast', 'lunch', 'dinner'].includes(categoryId)) {
    const parkingText = localized.travel.parking || spot.parking || '駐車: 要確認';
    if (parkingText) {
      const parkingItem = document.createElement('span');
      parkingItem.textContent = parkingText;
      travel.appendChild(parkingItem);
    }
  }
  body.appendChild(travel);

  if (spot.maps_url) {
    const actions = document.createElement("div");
    actions.className = "spot-actions";
    actions.appendChild(createSpotLink("Google Mapで見る", spot.maps_url, "spot_map", spot));
    body.appendChild(actions);
  }

  article.appendChild(body);
  return article;
}

function createInfoItem(icon, label, value) {
  const li = document.createElement("li");
  const iconSpan = document.createElement("span");
  iconSpan.className = "info-icon";
  iconSpan.innerHTML = icon;
  const textWrapper = document.createElement("div");
  textWrapper.className = 'info-text';
  const labelEl = document.createElement("span");
  labelEl.className = "info-label";
  labelEl.textContent = label;
  const valueEl = document.createElement("span");
  valueEl.className = "info-value";
  valueEl.textContent = value;
  textWrapper.appendChild(labelEl);
  textWrapper.appendChild(valueEl);
  li.appendChild(iconSpan);
  li.appendChild(textWrapper);
  return li;
}

function createSpotLink(label, href, trackPrefix, spot) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.target = "_blank";
  anchor.rel = "noopener";
  anchor.textContent = label;
  anchor.dataset.track = `${trackPrefix}_${slugify(spot.name)}`;
  anchor.dataset.trackSpot = spot.name;
  if (trackPrefix === "spot_map") {
    anchor.classList.add("primary-action");
  }
  return anchor;
}

function renderFAQ() {
  const container = document.querySelector('.faq-list');
  if (!container) return;
  container.innerHTML = '';
  FAQ_ITEMS.forEach((item, index) => {
    const wrapper = document.createElement('article');
    wrapper.className = 'faq-item';
    wrapper.setAttribute('role', 'listitem');

    const button = document.createElement('button');
    button.className = 'faq-question';
    button.setAttribute('aria-expanded', String(index === 0));
    button.innerHTML = `<span>${item.question}</span><span aria-hidden="true">${ICONS.chevron}</span>`;

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.id = `faq-answer-${index}`;
    answer.textContent = item.answer;
    if (index === 0) {
      answer.classList.add('open');
    }

    button.setAttribute('aria-controls', answer.id);
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      answer.classList.toggle('open', !expanded);
    });

    wrapper.appendChild(button);
    wrapper.appendChild(answer);
    container.appendChild(wrapper);
  });
}

function setupTracking() {
  document.body.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-track]');
    if (!trigger) return;
    const payload = {
      href: trigger.getAttribute('href'),
      spot: trigger.dataset.trackSpot || undefined
    };
    trackEvent(trigger.dataset.track, payload);
  });
}

function trackEvent(action, payload = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: ANALYTICS_EVENT,
    action,
    payload,
    timestamp: Date.now()
  });
  if (ANALYTICS_ENDPOINT && navigator.sendBeacon) {
    const body = JSON.stringify({ action, payload, ts: Date.now() });
    navigator.sendBeacon(ANALYTICS_ENDPOINT, body);
  } else {
    console.debug('Track:', action, payload);
  }
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
