'use strict';

// ─── Data ──────────────────────────────────────────────────────────────────
const REGIONS = ['Americas', 'Europe', 'Middle East & Africa', 'Asia', 'Oceania'];

const L = (city, country, tz, flag, region, alt = '') => ({
  id: city + '-' + tz, city, country, tz, flag, region, alt,
});

const FEATURED = [
  // Americas
  L('Los Angeles',  'USA',        'America/Los_Angeles',            '🇺🇸', 'Americas', 'California CA San Francisco SF Bay Area Silicon Valley Menlo Park Palo Alto San Jose Sunnyvale Cupertino Oakland Sacramento Seattle Portland Pacific PST PDT West Coast'),
  L('Anchorage',    'USA',        'America/Anchorage',              '🇺🇸', 'Americas', 'Alaska'),
  L('Honolulu',     'USA',        'Pacific/Honolulu',               '🇺🇸', 'Americas', 'Hawaii'),
  L('Denver',       'USA',        'America/Denver',                 '🇺🇸', 'Americas', 'Colorado Mountain MST MDT'),
  L('Chicago',      'USA',        'America/Chicago',                '🇺🇸', 'Americas', 'Texas Central CST CDT'),
  L('New York',     'USA',        'America/New_York',               '🇺🇸', 'Americas', 'NYC Manhattan Washington DC Boston Miami Eastern EST EDT East Coast'),
  L('Vancouver',    'Canada',     'America/Vancouver',              '🇨🇦', 'Americas'),
  L('Toronto',      'Canada',     'America/Toronto',                '🇨🇦', 'Americas'),
  L('Mexico City',  'Mexico',     'America/Mexico_City',            '🇲🇽', 'Americas'),
  L('Bogotá',       'Colombia',   'America/Bogota',                 '🇨🇴', 'Americas'),
  L('Lima',         'Peru',       'America/Lima',                   '🇵🇪', 'Americas'),
  L('Santiago',     'Chile',      'America/Santiago',               '🇨🇱', 'Americas'),
  L('São Paulo',    'Brazil',     'America/Sao_Paulo',              '🇧🇷', 'Americas'),
  L('Buenos Aires', 'Argentina',  'America/Argentina/Buenos_Aires', '🇦🇷', 'Americas'),

  // Europe
  L('London',     'UK',          'Europe/London',     '🇬🇧', 'Europe'),
  L('Dublin',     'Ireland',     'Europe/Dublin',     '🇮🇪', 'Europe'),
  L('Lisbon',     'Portugal',    'Europe/Lisbon',     '🇵🇹', 'Europe'),
  L('Madrid',     'Spain',       'Europe/Madrid',     '🇪🇸', 'Europe'),
  L('Paris',      'France',      'Europe/Paris',      '🇫🇷', 'Europe'),
  L('Amsterdam',  'Netherlands', 'Europe/Amsterdam',  '🇳🇱', 'Europe'),
  L('Brussels',   'Belgium',     'Europe/Brussels',   '🇧🇪', 'Europe'),
  L('Berlin',     'Germany',     'Europe/Berlin',     '🇩🇪', 'Europe'),
  L('Zurich',     'Switzerland', 'Europe/Zurich',     '🇨🇭', 'Europe'),
  L('Rome',       'Italy',       'Europe/Rome',       '🇮🇹', 'Europe'),
  L('Vienna',     'Austria',     'Europe/Vienna',     '🇦🇹', 'Europe'),
  L('Stockholm',  'Sweden',      'Europe/Stockholm',  '🇸🇪', 'Europe'),
  L('Oslo',       'Norway',      'Europe/Oslo',       '🇳🇴', 'Europe'),
  L('Copenhagen', 'Denmark',     'Europe/Copenhagen', '🇩🇰', 'Europe'),
  L('Helsinki',   'Finland',     'Europe/Helsinki',   '🇫🇮', 'Europe'),
  L('Warsaw',     'Poland',      'Europe/Warsaw',     '🇵🇱', 'Europe'),
  L('Prague',     'Czech Rep.',  'Europe/Prague',     '🇨🇿', 'Europe'),
  L('Budapest',   'Hungary',     'Europe/Budapest',   '🇭🇺', 'Europe'),
  L('Athens',     'Greece',      'Europe/Athens',     '🇬🇷', 'Europe'),
  L('Bucharest',  'Romania',     'Europe/Bucharest',  '🇷🇴', 'Europe'),
  L('Istanbul',   'Turkey',      'Europe/Istanbul',   '🇹🇷', 'Europe'),
  L('Moscow',     'Russia',      'Europe/Moscow',     '🇷🇺', 'Europe'),

  // Middle East & Africa
  L('Cairo',        'Egypt',        'Africa/Cairo',        '🇪🇬', 'Middle East & Africa'),
  L('Casablanca',   'Morocco',      'Africa/Casablanca',   '🇲🇦', 'Middle East & Africa'),
  L('Lagos',        'Nigeria',      'Africa/Lagos',        '🇳🇬', 'Middle East & Africa'),
  L('Accra',        'Ghana',        'Africa/Accra',        '🇬🇭', 'Middle East & Africa'),
  L('Nairobi',      'Kenya',        'Africa/Nairobi',      '🇰🇪', 'Middle East & Africa'),
  L('Addis Ababa',  'Ethiopia',     'Africa/Addis_Ababa',  '🇪🇹', 'Middle East & Africa'),
  L('Johannesburg', 'South Africa', 'Africa/Johannesburg', '🇿🇦', 'Middle East & Africa'),
  L('Tel Aviv',     'Israel',       'Asia/Jerusalem',      '🇮🇱', 'Middle East & Africa'),
  L('Amman',        'Jordan',       'Asia/Amman',          '🇯🇴', 'Middle East & Africa'),
  L('Beirut',       'Lebanon',      'Asia/Beirut',         '🇱🇧', 'Middle East & Africa'),
  L('Tehran',       'Iran',         'Asia/Tehran',         '🇮🇷', 'Middle East & Africa'),
  L('Kuwait City',  'Kuwait',       'Asia/Kuwait',         '🇰🇼', 'Middle East & Africa'),
  L('Riyadh',       'Saudi Arabia', 'Asia/Riyadh',         '🇸🇦', 'Middle East & Africa'),
  L('Doha',         'Qatar',        'Asia/Qatar',          '🇶🇦', 'Middle East & Africa'),
  L('Dubai',        'UAE',          'Asia/Dubai',          '🇦🇪', 'Middle East & Africa'),

  // Asia
  L('Karachi',      'Pakistan',    'Asia/Karachi',      '🇵🇰', 'Asia'),
  L('Mumbai',       'India',       'Asia/Kolkata',      '🇮🇳', 'Asia', 'Bombay'),
  L('New Delhi',    'India',       'Asia/Kolkata',      '🇮🇳', 'Asia', 'Delhi'),
  L('Bangalore',    'India',       'Asia/Kolkata',      '🇮🇳', 'Asia', 'Bengaluru'),
  L('Colombo',      'Sri Lanka',   'Asia/Colombo',      '🇱🇰', 'Asia'),
  L('Kathmandu',    'Nepal',       'Asia/Kathmandu',    '🇳🇵', 'Asia'),
  L('Dhaka',        'Bangladesh',  'Asia/Dhaka',        '🇧🇩', 'Asia'),
  L('Yangon',       'Myanmar',     'Asia/Rangoon',      '🇲🇲', 'Asia'),
  L('Bangkok',      'Thailand',    'Asia/Bangkok',      '🇹🇭', 'Asia'),
  L('Phnom Penh',   'Cambodia',    'Asia/Phnom_Penh',   '🇰🇭', 'Asia'),
  L('Ho Chi Minh',  'Vietnam',     'Asia/Ho_Chi_Minh',  '🇻🇳', 'Asia', 'Saigon'),
  L('Kuala Lumpur', 'Malaysia',    'Asia/Kuala_Lumpur', '🇲🇾', 'Asia'),
  L('Singapore',    'Singapore',   'Asia/Singapore',    '🇸🇬', 'Asia'),
  L('Jakarta',      'Indonesia',   'Asia/Jakarta',      '🇮🇩', 'Asia'),
  L('Manila',       'Philippines', 'Asia/Manila',       '🇵🇭', 'Asia'),
  L('Hong Kong',    'Hong Kong',   'Asia/Hong_Kong',    '🇭🇰', 'Asia'),
  L('Taipei',       'Taiwan',      'Asia/Taipei',       '🇹🇼', 'Asia'),
  L('Shanghai',     'China',       'Asia/Shanghai',     '🇨🇳', 'Asia'),
  L('Beijing',      'China',       'Asia/Shanghai',     '🇨🇳', 'Asia'),
  L('Seoul',        'South Korea', 'Asia/Seoul',        '🇰🇷', 'Asia'),
  L('Tokyo',        'Japan',       'Asia/Tokyo',        '🇯🇵', 'Asia'),
  L('Osaka',        'Japan',       'Asia/Tokyo',        '🇯🇵', 'Asia'),

  // Oceania
  L('Perth',     'Australia',   'Australia/Perth',     '🇦🇺', 'Oceania'),
  L('Darwin',    'Australia',   'Australia/Darwin',    '🇦🇺', 'Oceania'),
  L('Adelaide',  'Australia',   'Australia/Adelaide',  '🇦🇺', 'Oceania'),
  L('Brisbane',  'Australia',   'Australia/Brisbane',  '🇦🇺', 'Oceania'),
  L('Sydney',    'Australia',   'Australia/Sydney',    '🇦🇺', 'Oceania'),
  L('Melbourne', 'Australia',   'Australia/Melbourne', '🇦🇺', 'Oceania'),
  L('Auckland',  'New Zealand', 'Pacific/Auckland',    '🇳🇿', 'Oceania'),
  L('Fiji',      'Fiji',        'Pacific/Fiji',        '🇫🇯', 'Oceania'),
];

// Featured cities (with flags/aliases) + every IANA world time zone (from zones.js).
const _featuredIds = new Set(FEATURED.map((f) => f.id));
const LOCATIONS = FEATURED.concat(
  (typeof ALL_ZONES !== 'undefined' ? ALL_ZONES : []).filter((z) => !_featuredIds.has(z.id))
);

// Country code → flag emoji (for geocoded cities).
function flagFromCC(cc) {
  if (!cc || cc.length !== 2) return '🌐';
  return String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

// Cities added via worldwide search — persisted so they survive reloads.
let customLocations = [];
try { customLocations = JSON.parse(localStorage.getItem('tzc-custom') || '[]'); } catch (_) {}
function addCustom(loc) {
  if (!customLocations.some((c) => c.id === loc.id)) {
    customLocations.push(loc);
    try { localStorage.setItem('tzc-custom', JSON.stringify(customLocations)); } catch (_) {}
  }
}

function deviceTz() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch (_) { return 'UTC'; }
}

// "Current location" option — shows the real place name once reverse-geocoded.
let geoLabel = null;
try { geoLabel = JSON.parse(localStorage.getItem('tzc-geolabel') || 'null'); } catch (_) {}
function currentLocation() {
  const tz = deviceTz();
  const ok = !!(geoLabel && geoLabel.tz === tz);
  return {
    id: 'current', city: ok && geoLabel.label ? geoLabel.label : t('currentLocation'),
    country: '', tz, flag: '📍', region: '', alt: 'here my location current',
    lat: ok ? geoLabel.lat : undefined, lon: ok ? geoLabel.lon : undefined,
  };
}
// Ask for location once, reverse-geocode to "City, Region", cache it, re-render.
function detectLocationName() {
  const tz = deviceTz();
  if ((geoLabel && geoLabel.tz === tz && geoLabel.lang === LANG && geoLabel.label) || !navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(async (pos) => {
    try {
      const { latitude, longitude } = pos.coords;
      const r = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${encodeURIComponent(LANG)}`);
      const d = await r.json();
      const city = d.city || d.locality || d.principalSubdivision || '';
      const region = d.principalSubdivision || d.countryName || '';
      const label = city ? (region && region !== city ? `${city}, ${region}` : city) : '';
      if (!label) return;
      geoLabel = { tz: deviceTz(), lang: LANG, label, lat: latitude, lon: longitude };
      try { localStorage.setItem('tzc-geolabel', JSON.stringify(geoLabel)); } catch (_) {}
      render();
    } catch (_) {}
  }, () => {}, { timeout: 8000, maximumAge: 3600000 });
}

const byId = (id) =>
  id === 'current'
    ? currentLocation()
    : (LOCATIONS.find((l) => l.id === id) || customLocations.find((l) => l.id === id) || null);

// ─── i18n (translations from i18n.js) ─────────────────────────────────────────
function detectLang() {
  try { const s = localStorage.getItem('tzc-lang'); if (s && I18N[s]) return s; } catch (_) {}
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return (typeof I18N !== 'undefined' && I18N[nav]) ? nav : 'en';
}
let LANG = (typeof I18N !== 'undefined') ? detectLang() : 'en';
let LOCALE = (typeof I18N !== 'undefined' && I18N[LANG] && I18N[LANG].locale) || 'en-US';
function t(key, vars) {
  const dict = (typeof I18N !== 'undefined' && (I18N[LANG] || I18N.en)) || {};
  let s = dict[key] != null ? dict[key] : ((typeof I18N !== 'undefined' && I18N.en && I18N.en[key]) || key);
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}
function regionLabel(r) {
  return (typeof I18N !== 'undefined' && I18N[LANG] && I18N[LANG].regions && I18N[LANG].regions[r]) || r;
}
function setLang(lang) {
  if (typeof I18N === 'undefined' || !I18N[lang]) return;
  LANG = lang;
  LOCALE = I18N[lang].locale || 'en-US';
  try { localStorage.setItem('tzc-lang', LANG); } catch (_) {}
  applyStaticI18n();
  render();
  if (state.sourceId === 'current') detectLocationName();
}

// Localized city + country names.
function ccFromFlag(flag) {
  if (!flag) return '';
  const cps = [...flag].map((c) => c.codePointAt(0));
  if (cps.length === 2 && cps.every((cp) => cp >= 0x1f1e6 && cp <= 0x1f1ff)) {
    return String.fromCharCode(...cps.map((cp) => cp - 0x1f1e6 + 65));
  }
  return '';
}
const _regionNames = {};
function localizedCountry(loc) {
  const cc = ccFromFlag(loc.flag);
  if (cc) {
    try {
      if (!_regionNames[LOCALE]) _regionNames[LOCALE] = new Intl.DisplayNames([LOCALE], { type: 'region' });
      const n = _regionNames[LOCALE].of(cc);
      if (n && n !== cc) return n;
    } catch (_) {}
  }
  return loc.country || '';
}
function localizedCity(loc) {
  const m = (typeof CITY_I18N !== 'undefined') && CITY_I18N[loc.city];
  return (m && m[LANG]) || loc.city;
}

// ─── Weather (Open-Meteo) — temperature at the displayed moment ───────────────
let coordsByCity = {};
try { coordsByCity = JSON.parse(localStorage.getItem('tzc-coords') || '{}'); } catch (_) {}
let weatherByKey = {};   // "lat,lon" -> { times:[...UTC], temps:[...] }
let weatherUnit = null;  // 'fahrenheit' | 'celsius'
let _wxTimer = null, _wxFetchedAt = 0, _wxKey = '';

function detectUnit() {
  let region = '';
  try { region = (navigator.language || '').split('-')[1] || ''; } catch (_) {}
  return ['US', 'BS', 'BZ', 'KY', 'LR', 'PW', 'FM', 'MH'].includes(region.toUpperCase()) ? 'fahrenheit' : 'celsius';
}
function coordKey(lat, lon) { return lat.toFixed(2) + ',' + lon.toFixed(2); }
function coordsFor(loc) {
  if (loc && loc.lat != null && loc.lon != null) return { lat: loc.lat, lon: loc.lon };
  return (loc && coordsByCity[loc.city]) || null;
}
async function ensureCoords(loc) {
  const have = coordsFor(loc);
  if (have) return have;
  if (!loc || !loc.city) return null;
  try {
    const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(loc.city)}&count=1&language=en&format=json`);
    const d = await r.json();
    const hit = (d.results || [])[0];
    if (hit) {
      coordsByCity[loc.city] = { lat: hit.latitude, lon: hit.longitude };
      try { localStorage.setItem('tzc-coords', JSON.stringify(coordsByCity)); } catch (_) {}
      return coordsByCity[loc.city];
    }
  } catch (_) {}
  return null;
}
// Temperature string for a city at a specific instant (matched to that UTC hour).
function tempFor(loc, instant) {
  const c = coordsFor(loc);
  if (!c) return '';
  const w = weatherByKey[coordKey(c.lat, c.lon)];
  if (!w) return '';
  const key = instant.toISOString().slice(0, 13) + ':00'; // YYYY-MM-DDTHH:00 (UTC)
  const i = w.times.indexOf(key);
  if (i < 0 || w.temps[i] == null) return '';
  return Math.round(w.temps[i]) + '°' + (weatherUnit === 'fahrenheit' ? 'F' : 'C');
}
// Resolve coords for all shown cities, fetch their hourly temps in one call, re-render.
function updateWeather() {
  clearTimeout(_wxTimer);
  _wxTimer = setTimeout(async () => {
    if (!weatherUnit) weatherUnit = detectUnit();
    const locs = [byId(state.sourceId), ...state.destIds.map(byId)].filter(Boolean);
    const uniq = [], seen = new Set();
    for (const loc of locs) {
      let c = coordsFor(loc);
      if (!c) c = await ensureCoords(loc);
      if (c) { const k = coordKey(c.lat, c.lon); if (!seen.has(k)) { seen.add(k); uniq.push(c); } }
    }
    if (!uniq.length) return;
    const key = uniq.map((c) => coordKey(c.lat, c.lon)).sort().join('|') + '|' + weatherUnit;
    if (key === _wxKey && Date.now() - _wxFetchedAt < 15 * 60 * 1000) return; // unchanged & fresh
    try {
      const lats = uniq.map((c) => c.lat).join(','), lons = uniq.map((c) => c.lon).join(',');
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&hourly=temperature_2m&timezone=UTC&past_days=1&forecast_days=16&temperature_unit=${weatherUnit}`);
      const data = await r.json();
      const arr = Array.isArray(data) ? data : [data];
      arr.forEach((d, idx) => {
        const c = uniq[idx];
        if (c && d && d.hourly) weatherByKey[coordKey(c.lat, c.lon)] = { times: d.hourly.time, temps: d.hourly.temperature_2m };
      });
      _wxFetchedAt = Date.now();
      _wxKey = key;
      render();
    } catch (_) {}
  }, 250);
}

// ─── Time helpers (full Intl tz support in browsers) ─────────────────────────
function getParts(date, tz) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const o = {};
  for (const p of dtf.formatToParts(date)) if (p.type !== 'literal') o[p.type] = p.value;
  if (o.hour === '24') o.hour = '00'; // some engines emit 24 for midnight
  return o;
}

function tzOffsetMs(tz, date) {
  const o = getParts(date, tz);
  const asUTC = Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour, +o.minute, +o.second);
  return asUTC - date.getTime();
}

// Convert a wall-clock time in a zone to the correct UTC instant (DST-safe).
function wallToInstant(y, mo, d, h, mi, tz) {
  const guess = Date.UTC(y, mo - 1, d, h, mi, 0);
  const off1 = tzOffsetMs(tz, new Date(guess));
  let inst = guess - off1;
  const off2 = tzOffsetMs(tz, new Date(inst));
  if (off2 !== off1) inst = guess - off2;
  return new Date(inst);
}

function fmtTime(instant, tz) {
  return new Intl.DateTimeFormat(LOCALE, {
    hour: 'numeric', minute: '2-digit', timeZone: tz,
  }).format(instant);
}

function tzAbbr(instant, tz) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' })
    .formatToParts(instant);
  const p = parts.find((x) => x.type === 'timeZoneName');
  return p ? p.value : '';
}

// "Sat, Jun 6" in the given zone
function fmtDate(instant, tz) {
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: 'short', month: 'short', day: 'numeric', timeZone: tz,
  }).format(instant);
}

// Current wall-clock "HH:MM" (24h) in the given zone, for the <input type=time>.
function nowHHMM(tz) {
  const t = getParts(new Date(), tz);
  return `${t.hour}:${t.minute}`;
}

// ── Date helpers (pick any day; plan weeks/months ahead) ──────────────────────
function ymd(dateStr) {
  const [y, mo, d] = dateStr.split('-').map(Number);
  return { y, mo, d };
}
function toInputDate(y, mo, d) {
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
function todayInZone(tz) {
  const t = getParts(new Date(), tz);
  return `${t.year}-${t.month}-${t.day}`;
}
function selectedDateStr(tz) {
  return $('#dateInput').value || todayInZone(tz);
}
// Shift a YYYY-MM-DD string by whole days and/or months (calendar-safe via UTC).
function shiftDate(dateStr, days, months) {
  const { y, mo, d } = ymd(dateStr);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (months) dt.setUTCMonth(dt.getUTCMonth() + months);
  if (days) dt.setUTCDate(dt.getUTCDate() + days);
  return toInputDate(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}
// "Today" / "Tomorrow" / "In 6 days" relative to today in the source zone.
function relativeLabel(dateStr, tz) {
  const a = Date.parse(todayInZone(tz) + 'T00:00:00Z');
  const b = Date.parse(dateStr + 'T00:00:00Z');
  const diff = Math.round((b - a) / 86400000);
  if (diff === 0) return t('today');
  if (diff === 1) return t('tomorrow');
  if (diff === -1) return t('yesterday');
  return diff > 0 ? t('inDays', { n: diff }) : t('daysAgo', { n: -diff });
}
function stepDay(delta) {
  const tz = byId(state.sourceId).tz;
  $('#dateInput').value = shiftDate(selectedDateStr(tz), delta, 0);
  render();
}

function dayOffset(instant, fromTz, toTz) {
  const dayStr = (tz) => new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(instant);
  const fromDay = dayStr(fromTz), toDay = dayStr(toTz);
  if (fromDay === toDay) return 0;
  return Math.round((Date.parse(toDay + 'T00:00:00Z') - Date.parse(fromDay + 'T00:00:00Z')) / 86400000);
}

// Local hour (0–23) in a zone, for the day/night indicator.
function localHour(instant, tz) {
  return +getParts(instant, tz).hour;
}
// Zonely time-of-day sky tile based on local hour.
function dayNight(hour) {
  let period;
  if (hour >= 6 && hour < 11) period = 'morning';
  else if (hour >= 11 && hour < 17) period = 'afternoon';
  else if (hour >= 17 && hour < 21) period = 'evening';
  else period = 'night';
  return { period, src: 'brand/timeofday/zonely-time-' + period + '.svg' };
}
// "9h ahead" / "3h 30m behind" / "same time", relative to the source zone.
function offsetPhrase(instant, fromTz, toTz) {
  const diffMin = Math.round((tzOffsetMs(toTz, instant) - tzOffsetMs(fromTz, instant)) / 60000);
  if (diffMin === 0) return t('sameTime');
  const h = Math.floor(Math.abs(diffMin) / 60);
  const m = Math.abs(diffMin) % 60;
  const x = (h ? h + t('hUnit') : '') + (m ? m + t('minUnit') : '');
  return t(diffMin > 0 ? 'ahead' : 'behind', { x });
}

// ─── State ───────────────────────────────────────────────────────────────────
const DEFAULTS = {
  sourceId: 'current',
  destIds: [
    'Los Angeles-America/Los_Angeles',
    'New York-America/New_York',
    'Tokyo-Asia/Tokyo',
    'Singapore-Asia/Singapore',
    'Dubai-Asia/Dubai',
  ],
};

let state = loadState();
let pickerMode = null; // 'source' | 'dest'
let liveNow = true;    // "Now" mode: keep the source time synced to the real current time
let editMode = false;  // when true, destination rows show delete buttons

function loadState() {
  try {
    const raw = localStorage.getItem('tzc-state');
    if (raw) {
      const s = JSON.parse(raw);
      if (s && byId(s.sourceId) && Array.isArray(s.destIds)) {
        return { sourceId: s.sourceId, destIds: s.destIds.filter(byId) };
      }
    }
  } catch (_) {}
  return { sourceId: DEFAULTS.sourceId, destIds: DEFAULTS.destIds.slice() };
}

function saveState() {
  try { localStorage.setItem('tzc-state', JSON.stringify(state)); } catch (_) {}
}

// Current instant from the chosen date + time, in the source zone.
function currentInstant() {
  const src = byId(state.sourceId);
  const { y, mo, d } = ymd(selectedDateStr(src.tz));
  const [h, mi] = $('#timeInput').value.split(':').map(Number);
  return wallToInstant(y, mo, d, h || 0, mi || 0, src.tz);
}

// ─── DOM ──────────────────────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function renderSource(instant) {
  const s = byId(state.sourceId);
  const dn = dayNight(localHour(instant, s.tz));
  const badge = $('#srcBadge');
  badge.src = dn.src;
  badge.alt = dn.period;
  const p = getParts(instant, s.tz);
  $('#timeSlider').value = (+p.hour) * 60 + (+p.minute);
  const cn = localizedCountry(s);
  $('#sourceLabel').textContent = cn ? `${s.flag}  ${localizedCity(s)}, ${cn}` : `${s.flag}  ${localizedCity(s)}`;
  const stemp = tempFor(s, instant);
  $('#timeZoneLabel').textContent = tzAbbr(instant, s.tz) + (stemp ? ' · ' + stemp : '');
  $('#heroTime').textContent = fmtTime(instant, s.tz);
  $('#whenLabel').textContent = `${fmtDate(instant, s.tz)} · ${relativeLabel(selectedDateStr(s.tz), s.tz)}`;
}

function renderDestinations(instant) {
  const card = $('#destCard');
  const src = byId(state.sourceId);
  const dests = state.destIds.map(byId).filter(Boolean);

  let html = '';
  if (dests.length === 0) {
    html += '<div class="empty">No cities yet — add one below</div>';
  }
  dests.forEach((loc, i) => {
    const off = dayOffset(instant, src.tz, loc.tz);
    const dn = dayNight(localHour(instant, loc.tz));
    const dateColor = off > 0 ? 'var(--orange)' : off < 0 ? 'var(--purple)' : 'var(--secondary)';
    const offTag = off > 0 ? ` (+${off})` : off < 0 ? ` (${off})` : '';
    const tp = tempFor(loc, instant);
    if (i > 0) html += '<div class="divider"></div>';
    html += `
      <div class="dest" data-id="${esc(loc.id)}">
        <button class="del" data-del="${esc(loc.id)}" aria-label="Remove ${esc(loc.city)}">−</button>
        <img class="dn-tile" src="${dn.src}" alt="${dn.period}">

        <div class="dest-text">
          <div class="dest-city">${loc.flag}  ${esc(localizedCity(loc))}</div>
          <div class="dest-sub">${esc(offsetPhrase(instant, src.tz, loc.tz))} · ${tp ? esc(tp) : esc(tzAbbr(instant, loc.tz))}</div>
        </div>
        <div class="dest-right">
          <div class="dest-time">${esc(fmtTime(instant, loc.tz))}</div>
          <div class="dest-date" style="color:${dateColor}">${esc(fmtDate(instant, loc.tz))}${offTag}</div>
        </div>
        <div class="dest-handle" aria-label="Drag to reorder">≡</div>
      </div>`;
  });
  if (dests.length > 0) html += '<div class="divider"></div>';
  html += '<button class="row link-row" id="addBtn"><span>' + t('addCity') + '</span></button>';
  card.innerHTML = html;
  card.classList.toggle('editing', editMode);
}

function updateNowBtn() {
  $('#nowBtn').classList.toggle('active', liveNow);
}

function render() {
  // In "Now" mode, keep the date + time pinned to the real current moment.
  if (liveNow) {
    const t = getParts(new Date(), byId(state.sourceId).tz);
    $('#timeInput').value = `${t.hour}:${t.minute}`;
    $('#dateInput').value = `${t.year}-${t.month}-${t.day}`;
  }
  const instant = currentInstant();
  renderSource(instant);
  renderDestinations(instant);
  updateNowBtn();
  updateWeather();
}

// Apply translations to the static UI elements.
function applyStaticI18n() {
  $('#labelFrom').textContent = t('convertFrom');
  $('#labelTo').textContent = t('convertTo');
  $('#nowBtn').textContent = t('now');
  $('#editBtn').textContent = editMode ? t('done') : t('edit');
  $('#swapHint').textContent = t('swapHint');
  $('#pickerCancel').textContent = t('cancel');
  $('#pickerSearch').setAttribute('placeholder', t('search'));
  $('#settingsTitle').textContent = t('settings');
  $('#settingsLangLabel').textContent = t('language');
  $('#settingsCancel').textContent = t('cancel');
}

// ─── Settings (language) ──────────────────────────────────────────────────────
function renderLangList() {
  let html = '';
  for (const code in I18N) {
    html += `<div class="lang-item" data-lang="${code}"><span>${esc(I18N[code].langName)}</span><span class="lang-check">${code === LANG ? '✓' : ''}</span></div>`;
  }
  $('#langList').innerHTML = html;
}
function openSettings() { renderLangList(); $('#settings').hidden = false; }
function closeSettings() {
  const p = $('#settings');
  p.classList.add('closing');
  setTimeout(() => { p.hidden = true; p.classList.remove('closing'); }, 280);
}

// ─── Picker ────────────────────────────────────────────────────────────────────
function openPicker(mode) {
  pickerMode = mode;
  $('#pickerTitle').textContent = mode === 'source' ? t('selectSource') : t('addDestination');
  $('#pickerSearch').value = '';
  geoResults = [];
  renderPickerList('');
  const p = $('#picker');
  p.hidden = false;
  $('#pickerSearch').focus();
}

function closePicker() {
  const p = $('#picker');
  p.classList.add('closing');
  setTimeout(() => { p.hidden = true; p.classList.remove('closing'); }, 280);
  pickerMode = null;
}

// Worldwide city search via Open-Meteo geocoding (resolves any city → its time zone).
let geoResults = [];
let geoTimer = null;
function geoSearch(query) {
  const q = query.trim();
  clearTimeout(geoTimer);
  if (q.length < 2) { geoResults = []; return; }
  geoTimer = setTimeout(async () => {
    try {
      const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=8&language=${encodeURIComponent(LANG)}&format=json`);
      const data = await r.json();
      if ($('#pickerSearch').value.trim() !== q) return; // stale response
      const seen = new Set();
      geoResults = (data.results || []).filter((x) => x.timezone).map((x) => ({
        id: 'geo:' + x.name + '|' + x.timezone,
        city: x.name, country: x.country || '', tz: x.timezone,
        flag: flagFromCC(x.country_code), region: 'geo', alt: x.admin1 || '', isGeo: true,
        lat: x.latitude, lon: x.longitude,
      })).filter((g) => (seen.has(g.id) ? false : (seen.add(g.id), true)));
      renderPickerList($('#pickerSearch').value);
    } catch (_) {}
  }, 300);
}

function renderPickerList(query) {
  const q = query.trim().toLowerCase();
  const excluded = pickerMode === 'source'
    ? new Set(state.destIds)
    : new Set([...state.destIds, state.sourceId]);
  const now = new Date();
  const item = (loc, label) => {
    const dn = dayNight(localHour(now, loc.tz));
    return `<div class="picker-item" data-pick="${esc(loc.id)}">
        <span>${label}</span>
        <span class="now"><img class="dn-tile-sm" src="${dn.src}" alt=""> ${esc(fmtTime(now, loc.tz))}</span>
      </div>`;
  };

  let html = '';
  let total = 0;

  // Your current location (auto-detected device time zone)
  if (!excluded.has('current') && (q === '' || 'current location here my'.includes(q))) {
    html += '<div class="picker-section">' + t('yourLocation') + '</div>' + item(currentLocation(), '📍 ' + t('currentLocation'));
    total += 1;
  }

  for (const region of REGIONS) {
    const items = LOCATIONS.filter((l) =>
      l.region === region && !excluded.has(l.id) &&
      (q === ''
        ? l.flag !== '🌐'                       // empty query: featured cities only
        : (l.city.toLowerCase().includes(q) ||  // typing: search every world zone
           l.country.toLowerCase().includes(q) ||
           (l.alt && l.alt.toLowerCase().includes(q))))
    );
    if (!items.length) continue;
    total += items.length;
    html += `<div class="picker-section">${regionLabel(region)}</div>`;
    for (const l of items) {
      const cn = localizedCountry(l);
      html += item(l, `${l.flag}  ${esc(localizedCity(l))}${cn ? ', ' + esc(cn) : ''}`);
    }
  }

  // Worldwide geocoded results (any city not in the built-in list, e.g. Shenzhen)
  if (q !== '' && geoResults.length) {
    const localKey = new Set(LOCATIONS.map((l) => l.city.toLowerCase() + '|' + l.tz));
    const geoShow = geoResults.filter((g) => !excluded.has(g.id) && !localKey.has(g.city.toLowerCase() + '|' + g.tz));
    if (geoShow.length) {
      html += '<div class="picker-section">' + t('worldwide') + '</div>';
      for (const g of geoShow) { const cn = localizedCountry(g); html += item(g, `${g.flag}  ${esc(localizedCity(g))}${cn ? ', ' + esc(cn) : ''}`); }
      total += geoShow.length;
    }
  }

  if (q === '') html += '<div class="picker-hint">' + t('searchHint') + '</div>';
  if (total === 0) html = '<div class="no-results">' + (q.length >= 2 ? t('searching') : t('noResults')) + '</div>';
  $('#pickerList').innerHTML = html;
}

function pick(id) {
  if (id.startsWith('geo:')) {
    const g = geoResults.find((x) => x.id === id);
    if (g) addCustom(g);
  }
  if (pickerMode === 'source') {
    state.sourceId = id;
  } else {
    if (!state.destIds.includes(id)) state.destIds.push(id);
  }
  if (id === 'current') detectLocationName();
  saveState();
  render();
  closePicker();
}

// Tap a destination to make it the source; the old source drops into its slot.
// The displayed moment is preserved (re-anchored to the new source zone).
function swapToSource(id) {
  const idx = state.destIds.indexOf(id);
  if (idx === -1) return;
  const instant = currentInstant();
  state.destIds[idx] = state.sourceId;
  state.sourceId = id;
  const p = getParts(instant, byId(id).tz);
  $('#dateInput').value = `${p.year}-${p.month}-${p.day}`;
  $('#timeInput').value = `${p.hour}:${p.minute}`;
  saveState();
  render();
}

// ── Drag-to-reorder destinations (Edit mode) ──────────────────────────────────
let drag = null;
function onDragMove(e) {
  if (!drag) return;
  e.preventDefault();
  const dy = e.clientY - drag.startY;
  drag.el.style.transform = `translateY(${dy}px)`;
  let target = drag.fromIndex + Math.round(dy / drag.pitch);
  target = Math.max(0, Math.min(drag.rows.length - 1, target));
  if (target !== drag.target) {
    drag.target = target;
    drag.rows.forEach((r, i) => {
      if (r === drag.el) return;
      let shift = 0;
      if (drag.fromIndex < target && i > drag.fromIndex && i <= target) shift = -drag.pitch;
      else if (drag.fromIndex > target && i >= target && i < drag.fromIndex) shift = drag.pitch;
      r.style.transform = shift ? `translateY(${shift}px)` : '';
    });
  }
}
function onDragEnd() {
  if (!drag) return;
  const d = drag; drag = null;
  document.removeEventListener('pointermove', onDragMove);
  document.removeEventListener('pointerup', onDragEnd);
  document.removeEventListener('pointercancel', onDragEnd);
  d.el.classList.remove('dragging');
  d.rows.forEach((r) => { r.style.transform = ''; });
  if (d.target !== d.fromIndex) {
    const [item] = state.destIds.splice(d.fromIndex, 1);
    state.destIds.splice(d.target, 0, item);
    saveState();
  }
  render();
}
function startDrag(e) {
  if (!editMode) return;
  const handle = e.target.closest('.dest-handle');
  if (!handle) return;
  const row = handle.closest('.dest');
  const rows = [...document.querySelectorAll('#destCard .dest')];
  const fromIndex = rows.indexOf(row);
  if (fromIndex === -1) return;
  e.preventDefault();
  const pitch = rows.length > 1
    ? Math.abs(rows[1].getBoundingClientRect().top - rows[0].getBoundingClientRect().top)
    : row.getBoundingClientRect().height;
  drag = { startY: e.clientY, pitch, fromIndex, el: row, rows, target: fromIndex };
  row.classList.add('dragging');
  document.addEventListener('pointermove', onDragMove, { passive: false });
  document.addEventListener('pointerup', onDragEnd);
  document.addEventListener('pointercancel', onDragEnd);
}

// ─── Events ────────────────────────────────────────────────────────────────────
$('#sourceBtn').addEventListener('click', () => openPicker('source'));
$('#pickerCancel').addEventListener('click', closePicker);
$('#editBtn').addEventListener('click', () => {
  editMode = !editMode;
  $('#editBtn').textContent = editMode ? t('done') : t('edit');
  $('#destCard').classList.toggle('editing', editMode);
  $('#swapHint').style.display = editMode ? 'none' : '';
});
$('#settingsBtn').addEventListener('click', openSettings);
$('#settingsCancel').addEventListener('click', closeSettings);
$('#langList').addEventListener('click', (e) => {
  const it = e.target.closest('[data-lang]');
  if (it) { setLang(it.getAttribute('data-lang')); closeSettings(); }
});
$('#timeInput').addEventListener('input', () => { liveNow = false; render(); });
$('#timeSlider').addEventListener('input', () => {
  liveNow = false;
  const mins = +$('#timeSlider').value;
  $('#timeInput').value = `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
  render();
});
$('#nowBtn').addEventListener('click', () => { liveNow = true; render(); });
$('#dateInput').addEventListener('change', () => { liveNow = false; render(); });
$('#pickerSearch').addEventListener('input', (e) => { renderPickerList(e.target.value); geoSearch(e.target.value); });

$('#destCard').addEventListener('click', (e) => {
  const del = e.target.closest('[data-del]');
  if (del) {
    const id = del.getAttribute('data-del');
    state.destIds = state.destIds.filter((d) => d !== id);
    saveState();
    render();
    return;
  }
  if (e.target.closest('#addBtn')) { openPicker('dest'); return; }
  if (editMode) return;
  const row = e.target.closest('.dest');
  if (row) swapToSource(row.getAttribute('data-id'));
});

$('#destCard').addEventListener('pointerdown', startDrag);

$('#pickerList').addEventListener('click', (e) => {
  const item = e.target.closest('[data-pick]');
  if (item) pick(item.getAttribute('data-pick'));
});

// ─── Init ──────────────────────────────────────────────────────────────────────
function init() {
  // Start in "Now" mode — show the live current time, refreshing each minute.
  liveNow = true;
  applyStaticI18n();
  render();
  if (state.sourceId === 'current') detectLocationName();
  setInterval(() => {
    if (drag || !liveNow) return;
    if ($('#timeInput').value !== nowHHMM(byId(state.sourceId).tz)) render();
  }, 1000);

  if ('serviceWorker' in navigator) {
    const hadController = !!navigator.serviceWorker.controller;
    let refreshing = false;
    // When a new version takes control, reload once to show it (skip the first install).
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing || !hadController) return;
      refreshing = true;
      location.reload();
    });
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then((reg) => {
        reg.update();                                   // check for a new version now
        setInterval(() => reg.update(), 60 * 60 * 1000); // ...and hourly
        document.addEventListener('visibilitychange', () => { if (!document.hidden) reg.update(); });
      }).catch(() => {});
    });
  }
}

init();
