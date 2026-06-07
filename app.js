'use strict';

// ─── Data ──────────────────────────────────────────────────────────────────
const REGIONS = ['Americas', 'Europe', 'Middle East & Africa', 'Asia', 'Oceania'];

const L = (city, country, tz, flag, region, alt = '') => ({
  id: city + '-' + tz, city, country, tz, flag, region, alt,
});

const LOCATIONS = [
  // Americas
  L('Los Angeles',  'USA',        'America/Los_Angeles',            '🇺🇸', 'Americas', 'California CA San Francisco SF Silicon Valley Seattle Pacific PST PDT West Coast'),
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

const byId = (id) => LOCATIONS.find((l) => l.id === id);

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
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz,
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
  return new Intl.DateTimeFormat('en-US', {
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
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  return diff > 0 ? `In ${diff} days` : `${-diff} days ago`;
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
  const f = dayStr(fromTz), t = dayStr(toTz);
  if (f === t) return 0;
  return Math.round((Date.parse(t + 'T00:00:00Z') - Date.parse(f + 'T00:00:00Z')) / 86400000);
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
  if (diffMin === 0) return 'same time';
  const h = Math.floor(Math.abs(diffMin) / 60);
  const m = Math.abs(diffMin) % 60;
  const hm = h + 'h' + (m ? ' ' + m + 'm' : '');
  return hm + (diffMin > 0 ? ' ahead' : ' behind');
}

// ─── State ───────────────────────────────────────────────────────────────────
const DEFAULTS = {
  sourceId: 'London-Europe/London',
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
  $('#sourceLabel').textContent = `${s.flag}  ${s.city}, ${s.country}`;
  $('#timeZoneLabel').textContent = tzAbbr(instant, s.tz);
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
    if (i > 0) html += '<div class="divider"></div>';
    html += `
      <div class="dest" data-id="${esc(loc.id)}">
        <button class="del" data-del="${esc(loc.id)}" aria-label="Remove ${esc(loc.city)}">−</button>
        <img class="dn-tile" src="${dn.src}" alt="${dn.period}">

        <div class="dest-text">
          <div class="dest-city">${loc.flag}  ${esc(loc.city)}</div>
          <div class="dest-sub">${esc(offsetPhrase(instant, src.tz, loc.tz))} · ${esc(tzAbbr(instant, loc.tz))}</div>
        </div>
        <div class="dest-right">
          <div class="dest-time">${esc(fmtTime(instant, loc.tz))}</div>
          <div class="dest-date" style="color:${dateColor}">${esc(fmtDate(instant, loc.tz))}${offTag}</div>
        </div>
        <div class="dest-handle" aria-label="Drag to reorder">≡</div>
      </div>`;
  });
  if (dests.length > 0) html += '<div class="divider"></div>';
  html += '<button class="row link-row" id="addBtn"><span>+ Add City</span></button>';
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
}

// ─── Picker ────────────────────────────────────────────────────────────────────
function openPicker(mode) {
  pickerMode = mode;
  $('#pickerTitle').textContent = mode === 'source' ? 'Select Source' : 'Add Destination';
  $('#pickerSearch').value = '';
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

function renderPickerList(query) {
  const q = query.trim().toLowerCase();
  const excluded = pickerMode === 'source'
    ? new Set(state.destIds)
    : new Set([...state.destIds, state.sourceId]);
  const now = new Date();

  let html = '';
  let total = 0;
  for (const region of REGIONS) {
    const items = LOCATIONS.filter((l) =>
      l.region === region &&
      !excluded.has(l.id) &&
      (q === '' ||
        l.city.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        (l.alt && l.alt.toLowerCase().includes(q)))
    );
    if (!items.length) continue;
    total += items.length;
    html += `<div class="picker-section">${region}</div>`;
    for (const l of items) {
      html += `
        <div class="picker-item" data-pick="${esc(l.id)}">
          <span>${l.flag}  ${esc(l.city)}, ${esc(l.country)}</span>
          <span class="now"><img class="dn-tile-sm" src="${dayNight(localHour(now, l.tz)).src}" alt=""> ${esc(fmtTime(now, l.tz))}</span>
        </div>`;
    }
  }
  if (total === 0) html = '<div class="no-results">No matching cities</div>';
  $('#pickerList').innerHTML = html;
}

function pick(id) {
  if (pickerMode === 'source') {
    state.sourceId = id;
  } else {
    if (!state.destIds.includes(id)) state.destIds.push(id);
  }
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
  $('#editBtn').textContent = editMode ? 'Done' : 'Edit';
  $('#destCard').classList.toggle('editing', editMode);
  $('#swapHint').style.display = editMode ? 'none' : '';
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
$('#pickerSearch').addEventListener('input', (e) => renderPickerList(e.target.value));

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
  render();
  setInterval(() => {
    if (drag || !liveNow) return;
    if ($('#timeInput').value !== nowHHMM(byId(state.sourceId).tz)) render();
  }, 1000);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
}

init();
