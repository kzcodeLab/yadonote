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

const DEMO_SPOTS_CONFIG = {
  single: ['breakfast', 'lunch', 'cafe'], // 国内向け・スピード重視に適したカテゴリ
  toggle: ['dinner', 'sightseeing'],     // 海外客向け・丁寧な説明に適したカテゴリ
  inline: ['dinner', 'bar']              // 併記で見せたいカテゴリ
};

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupLanguage(); // サイト全体の言語設定（もしあれば）
  setupChips();    // スマホ用チップ動作
  setupTracking();
  setupFAQ();
  renderSpots();
  loadSpots();
});

function setupChips() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = chip.dataset.target;
      const target = document.querySelector(targetId);
      if (target) {
        // チップの選択状態更新
        chips.forEach(c => c.setAttribute('aria-selected', 'false'));
        chip.setAttribute('aria-selected', 'true');

        // スムーズスクロール (ヘッダー分のオフセットを考慮)
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

// ... setupMenu, setupLanguage ...

// ... loadSpots, parseCSV, parseCSVRow ...

function sortSpots(spots) {
  // デモ用に適当な順序、あるいはCSV順のまま利用
  return spots;
}

const DEMO_SPOTS = {
  single: [
    {
      name: '港町モーニングテーブル',
      categories: ['breakfast'],
      hours: '7:30-11:00',
      price_range: '1,000〜2,000円',
      payment: 'カード/QR',
      address: 'サンプル市港町2-2-5',
      time_by_car_min: '5',
      time_on_foot_min: '8',
      image_file: 'spot-02.svg',
      host_note: '焼き立てパンの香りで心地よい朝を迎えられます',
      parking: '提携P3台'
    },
    {
      name: '潮風ランチデッキ',
      categories: ['lunch'],
      hours: '11:00-15:00',
      price_range: '1,500円〜2,000円',
      payment: 'カード/QR',
      address: 'サンプル市海辺4-5-6',
      time_by_car_min: '6',
      time_on_foot_min: '12',
      image_file: 'spot-04.svg',
      host_note: '海を眺めながら楽しむ限定ランチコースが好評です',
      parking: '提携P5台'
    }
  ],
  toggle: [
    {
      name: '灯夜ダイニング',
      categories: ['dinner'],
      hours: '17:30-22:30',
      price_range: '¥2,500 - ¥3,500',
      payment: 'カード/QR',
      address: 'サンプル市旧港9-2-1',
      time_by_car_min: '8',
      time_on_foot_min: '18',
      image_file: 'spot-07.svg',
      host_note: '灯りに包まれた落ち着いた空間で特別なディナーをどうぞ',
      parking: '店舗裏5台'
    },
    {
      name: '星空コース料理',
      categories: ['dinner'],
      hours: '18:30-22:00',
      price_range: '¥2,000 - ¥3,000',
      payment: 'カード/QR',
      address: 'サンプル市丘の上6-4-8',
      time_by_car_min: '10',
      time_on_foot_min: null,
      image_file: 'spot-09.svg',
      host_note: '最上階から夜景を望む窓際席は特におすすめです',
      parking: '宿送迎あり'
    }
  ],
  inline: [
    {
      name: '囲炉裏ビストロ',
      categories: ['dinner'],
      hours: '18:00-23:00',
      price_range: '¥3,000 - ¥4,000',
      payment: 'カード',
      address: 'サンプル市温泉通5-7-3',
      time_by_car_min: '9',
      time_on_foot_min: '20',
      image_file: 'spot-08.svg',
      host_note: '炭火で仕上げる肉料理と地酒のペアリングが人気です',
      parking: '施設前8台'
    },
    {
      name: '港ミュージアム',
      categories: ['sightseeing'],
      hours: '10:00-18:00',
      price_range: '入館料800円',
      payment: 'カード/QR',
      address: 'サンプル市歴史町4-3-1',
      time_by_car_min: '7',
      time_on_foot_min: '12',
      image_file: 'spot-02.svg',
      host_note: '港町の歴史展示と体験型ブースが家族連れに好評です',
      parking: '施設前8台'
    }
  ]
};

function renderSpots() {
  const demoAreas = document.querySelectorAll('.spot-demo-area');

  demoAreas.forEach(area => {
    const type = area.dataset.demoType;
    area.innerHTML = '';

    // CSV読み込みを待たずに固定のデモデータを表示
    const targetSpots = DEMO_SPOTS[type] || [];

    const grid = document.createElement('div');
    grid.className = 'spot-category-grid';
    grid.setAttribute('role', 'list');

    targetSpots.forEach(spot => {
      grid.appendChild(createSpotCard(spot, type));
    });

    area.appendChild(grid);
  });

  setupDemoToggle();
}

function setupDemoToggle() {
  const toggleSection = document.getElementById('plan-02');
  if (!toggleSection) return;

  const btns = toggleSection.querySelectorAll('.lang-btn');
  const demoArea = toggleSection.querySelector('.spot-demo-area');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // ボタンの見た目更新
      btns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // 言語モード切り替え
      const lang = btn.textContent.trim().toLowerCase() === 'jp' ? 'ja' : 'en';

      // カードの言語を更新（再描画せずクラス切り替え等で対応したいが、今回は簡易的に再描画または属性付与）
      // 既存の createSpotCard は引数でコンテンツを確定させているため、
      // ここでは簡易的にカードを作り直す
      const targetSpots = STATE.spots.filter(s => ['dinner'].some(c => s.categories.includes(c))).slice(0, 2);
      const grid = demoArea.querySelector('.spot-category-grid');
      if (grid) {
        grid.innerHTML = '';
        targetSpots.forEach(spot => {
          // toggleモードの場合、指定言語でカードを作る
          grid.appendChild(createSpotCard(spot, 'toggle', lang));
        });
      }
    });
  });
}

function localizeSpot(spot, type, lang = 'ja') {
  const baseInfo = {
    title: spot.name,
    hostNote: spot.host_note,
    info: {
      hours: { label: '営業時間', value: spot.hours || '営業時間未登録' },
      price: { label: '価格帯', value: spot.price_range || '価格帯未登録' },
      payment: { label: '支払方法', value: spot.payment || '支払い情報について' },
      address: { label: '所在地', value: spot.address || '住所情報なし' }
    },
    tags: spot.categories.map(c => CATEGORY_LABELS[c] || c),
    travel: {
      car: spot.time_by_car_min ? `車で${spot.time_by_car_min}分` : null,
      walk: spot.time_on_foot_min ? `徒歩${spot.time_on_foot_min}分` : null,
      parking: spot.parking || '駐車: 要確認'
    },
    alt: `${spot.name}の外観`
  };

  // 英語データ（擬似的に生成、実際はCSVにenカラムがあればそれを使うが、今回はハードコード辞書を参照）
  // ※既存の CARD_LOCALIZATION を活用
  const enData = CARD_LOCALIZATION[spot.name]?.en || {};
  const bothData = CARD_LOCALIZATION[spot.name]?.both || {};

  if (type === 'single') {
    // 日本語のみ
    return baseInfo;
  }

  if (type === 'toggle') {
    // 言語切替（現在のlangに応じる）
    if (lang === 'en') {
      return {
        title: enData.name || spot.name,
        hostNote: enData.hostNote || spot.host_note,
        info: {
          hours: { label: 'Hours', value: enData.hours || spot.hours },
          price: { label: 'Price', value: enData.price || spot.price_range },
          payment: { label: 'Payment', value: enData.payment || spot.payment },
          address: { label: 'Address', value: enData.address || spot.address }
        },
        tags: enData.tags || baseInfo.tags,
        travel: {
          car: enData.car || (spot.time_by_car_min ? `${spot.time_by_car_min} min drive` : null),
          walk: enData.walk || (spot.time_on_foot_min ? `${spot.time_on_foot_min} min walk` : null),
          parking: null // 英語では詳細省略など
        },
        alt: enData.alt || baseInfo.alt
      };
    } else {
      return baseInfo;
    }
  }

  if (type === 'inline') {
    // 併記（bothデータがあれば使う）
    // データがない場合は日本語をベースに無理やり併記風にする処理を入れるか、
    // ここでは既存のCARD_LOCALIZATIONにあるものを優先使用
    if (CARD_LOCALIZATION[spot.name]?.both) {
      const d = CARD_LOCALIZATION[spot.name].both;
      return {
        title: d.name,
        hostNote: d.hostNote, // 既に併記済みと想定
        info: {
          hours: { label: d.hoursLabel, value: d.hours },
          price: { label: d.priceLabel, value: d.price },
          payment: { label: d.paymentLabel, value: d.payment },
          address: { label: d.addressLabel, value: d.address }
        },
        tags: d.tags,
        travel: {
          car: d.car,
          walk: d.walk,
          parking: null
        },
        alt: d.alt
      };
    }
    // データがない場合（フォールバック：日本語のみ）
    return baseInfo;
  }

  return baseInfo;
}

function createSpotCard(spot, type, lang = 'ja') {
  const localized = localizeSpot(spot, type, lang);
  const article = document.createElement("article");
  article.className = "spot-card";
  // ... (以下、構築ロジックは概ね同じだが、travel周りの表示調整が必要)
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

const ANALYTICS_EVENT = 'spot_click';
const ANALYTICS_ENDPOINT = '';

function setupFAQ() {
  // イベント委譲：ドキュメント全体でクリックを監視 (v2)
  document.addEventListener('click', (e) => {
    const button = e.target.closest('.faq-question');
    if (!button) return;

    e.preventDefault();

    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));

    const answerId = button.getAttribute('aria-controls');
    if (answerId) {
      const answer = document.getElementById(answerId);
      if (answer) {
        answer.classList.toggle('open', !expanded);
      }
    }
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
