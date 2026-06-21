const APP_VERSION = "2.0.0";
const SESSION_KEY = "ftokx_simple_pwa_v1_session";
const SETTINGS_KEY = "ftokx_simple_pwa_v1_settings";
const HISTORY_KEY = "ftokx_simple_pwa_v1_history";
const ALERT_LOG_KEY = "ftokx_simple_pwa_v1_alert_log";
const PAPER_TESTS_KEY = "ftokx_simple_pwa_v1_paper_tests";
const PRE_TRADE_CONTRACT_KEY = "ftokx_simple_pwa_v2_pretrade_contract";

const CAPITAL_DEFAULTS = {
  futuresFundUsdt: 100,
  marginPerTradeUsdt: 50,
  dailyMaxLossUsdt: 6,
  oneTradePerDay: true,
  paperMode: false,
  btcSweepPercent: 50,
  weeklyMaxLossUsdt: 15
};
const CACHE_BUSTER = () => `ts=${Date.now()}`;
const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;
const CANDLES_API = "/api/okx/candles";
const TICKER_API = "/api/okx/ticker";
const AUTO_WATCH_INTERVAL_MS = 5 * 60 * 1000;
const ALERT_ONCE_DURATION_MS = 18 * 1000;
const ALERT_BURST_INTERVAL_MS = 2400;
const ALERT_LOG_LIMIT = 60;
const PAPER_TEST_MAX_HOURS = 24;

const SYMBOL_CONFIG = {
  symbol: "BTCUSDT",
  instId: "BTC-USDT-SWAP",
  label: "BTC/USDT",
  decimals: 1
};

const TRADING_CONFIG = {
  marginMode: "Cô lập",
  leverage: 20,
  orderType: "Limit",
  waitMinutes: 20,
  reviewAfterFillMinutes: 60,
  feeRate: 0.0005,
  noChasePct: 0.0025,
  tp1CloseRatio: 0.5,
  lossCooldownHours: 6,
  maxLossesPerDay: 1,
  maxTradesPerDay: 1,
  sessionLateHour: 23,
  sessionLateMinute: 30,
  weeklyStopLossUsdt: -15,
  dailyStopLossUsdt: -6,
  dailyStopWinUsdt: 6,
  defaultMarginUsdt: 50,
  referenceCapitalMinUsdt: 50,
  referenceCapitalMaxUsdt: 100,
  sideNoiseGapLimit: 0,
  atrPctMin: 0.01,
  atrPctMax: 0.02,
  minDistanceFromEma20: 0.004,
  weakDistanceFromEma20: 0.0025,
  extremeRangeMultiplier: 1.6,
  ema50SlopeLookback: 3,
  minFreshHours: 6,
  maxStaleHours: 12
};

const MARGIN_BY_GRADE = {
  A: 50,
  B: 50,
  C: 50,
  D: 50,
  F: 50
};

const TP_SL_BY_GRADE = {
  A: { tp1: 0.006, tp2: 0.012, sl: 0.006, label: "A Survival" },
  B: { tp1: 0.005, tp2: 0.01, sl: 0.005, label: "B Default" },
  C: { tp1: 0.0045, tp2: 0.008, sl: 0.0045, label: "C Cautious" },
  D: { tp1: 0.004, tp2: 0.006, sl: 0.004, label: "D Observe" },
  F: { tp1: 0.0035, tp2: 0.005, sl: 0.0035, label: "F Paper" }
};

const STATUS_OPTIONS = [
  "Chờ đặt",
  "Đã đặt Limit",
  "Đã khớp",
  "Không khớp đã hủy",
  "Đã TP",
  "Đã SL"
];

const RESULT_OPTIONS = [
  { value: "NONE", label: "Chưa chốt", pnl: "" },
  { value: "SKIPPED", label: "Không giao dịch", pnl: "0" },
  { value: "NOT_FILLED", label: "Không khớp đã hủy", pnl: "0" },
  { value: "TP", label: "TP", pnl: "" },
  { value: "SL", label: "SL", pnl: "" },
  { value: "MANUAL_CLOSE", label: "Manual Close", pnl: "" },
  { value: "STILL_OPEN", label: "Still Open", pnl: "" }
];

const MISTAKE_OPTIONS = [
  { value: "CHASE", label: "Đuổi giá / vào ngoài vùng" },
  { value: "MARKET", label: "Dùng Market thay vì Limit" },
  { value: "MOVE_SL", label: "Dời SL xa hơn" },
  { value: "REENTER_AFTER_SL", label: "Vào lại sau SL" },
  { value: "LOCKED_ENTRY", label: "Vào khi PLAN_ONLY / LOCKED_RISK" },
  { value: "OVERSIZE", label: "Dùng margin cao hơn kỷ luật" },
  { value: "DCA_FUTURES", label: "DCA / gồng futures" }
];

const CONTRACT_ITEMS = [
  { id: "contractLimit", text: "Tôi dùng Limit, không Market." },
  { id: "contractRisk", text: "Tôi chấp nhận mất tiền nếu SL." },
  { id: "contractNoMoveSl", text: "Tôi không dời SL xa hơn." },
  { id: "contractNoReentry", text: "Tôi không vào lại ngay nếu SL." },
  { id: "contractNoDca", text: "Tôi không dùng tiền DCA BTC để gỡ futures." }
];

const SLOGANS = {
  EXECUTABLE: [
    "Lệnh đẹp vẫn phải nhỏ, vì thị trường không nợ ta điều gì.",
    "20x chỉ dùng được khi SL là luật, không phải gợi ý."
  ],
  WAIT_TRIGGER: [
    "Giá chạy mất thì để nó chạy; tiền còn là cơ hội còn.",
    "Trader già không đuổi giá, trader già đợi giá quay về."
  ],
  PLAN_ONLY: [
    "Phiếu yếu là bản đồ, không phải lời mời xuống tiền.",
    "Có kế hoạch để tỉnh táo, không phải để ép lệnh."
  ],
  LOCKED_RISK: [
    "Khi rủi ro khóa cửa, người sống sót không phá khóa.",
    "Không có lệnh cũng là một vị thế."
  ],
  COOLDOWN: [
    "Sau một lệnh thua, việc đầu tiên là giữ tay.",
    "Gỡ lỗ bằng kỷ luật, không gỡ bằng đòn bẩy."
  ],
  DATA: [
    "Không có dữ liệu sạch thì không có quyết định sạch.",
    "Dữ liệu mù thì tay phải đứng yên."
  ],
  SESSION: [
    "Khuya rồi thì thắng lớn nhất là không bấm bừa.",
    "Thị trường còn đó, giấc ngủ mất rồi thì kỷ luật cũng mất."
  ],
  REVIEW: [
    "Lời phải biết quét về BTC, lỗ phải biết dừng tay.",
    "Tuần tốt là tuần còn luật, không phải tuần có nhiều lệnh."
  ]
};

const els = {
  networkStatus: document.querySelector("#networkStatus"),
  dataStatus: document.querySelector("#dataStatus"),
  refreshBtn: document.querySelector("#refreshBtn"),
  clearSessionBtn: document.querySelector("#clearSessionBtn"),
  messageArea: document.querySelector("#messageArea"),
  ticketArea: document.querySelector("#ticketArea"),
  tabTodayBtn: document.querySelector("#tabTodayBtn"),
  tabHistoryBtn: document.querySelector("#tabHistoryBtn"),
  todayView: document.querySelector("#todayView"),
  historyView: document.querySelector("#historyView"),
  historyArea: document.querySelector("#historyArea"),
  historyImportInput: document.querySelector("#historyImportInput"),
  watchToggleBtn: document.querySelector("#watchToggleBtn"),
  testAlertBtn: document.querySelector("#testAlertBtn"),
  stopAlertBtn: document.querySelector("#stopAlertBtn"),
  watchStatus: document.querySelector("#watchStatus")
};

let currentSession = loadSession();
let activeView = "today";
let hasReloadedForServiceWorker = false;
let isWatchModeOn = false;
let watchTimer = null;
let wakeLock = null;
let audioContext = null;
let alertTimers = [];
let alertStopTimer = null;
let lastAlertSignature = "";

function init() {
  saveSettingsOnce();
  bindEvents();
  updateNetworkStatus();
  renderSession();
  renderHistory();
  updateWatchStatus();
  registerServiceWorker();
}

function saveSettingsOnce() {
  const existing = loadSettingsData();
  saveSettingsData({
    ...CAPITAL_DEFAULTS,
    ...existing,
    futuresFundUsdt: getPositiveNumber(existing.futuresFundUsdt, CAPITAL_DEFAULTS.futuresFundUsdt),
    marginPerTradeUsdt: getPositiveNumber(existing.marginPerTradeUsdt, CAPITAL_DEFAULTS.marginPerTradeUsdt),
    dailyMaxLossUsdt: getPositiveNumber(existing.dailyMaxLossUsdt, CAPITAL_DEFAULTS.dailyMaxLossUsdt),
    oneTradePerDay: existing.oneTradePerDay !== false,
    paperMode: existing.paperMode === true,
    btcSweepPercent: clampNumber(existing.btcSweepPercent, 10, 80, CAPITAL_DEFAULTS.btcSweepPercent),
    weeklyMaxLossUsdt: getPositiveNumber(existing.weeklyMaxLossUsdt, CAPITAL_DEFAULTS.weeklyMaxLossUsdt),
    version: APP_VERSION,
    strategy: "BTC_20X_DISCIPLINE_TICKET",
    createdAt: existing.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

function loadSettingsData() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.warn("Cannot read settings", error);
    return {};
  }
}

function saveSettingsData(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function getPositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

function getCapitalSettings() {
  const settings = loadSettingsData();
  return {
    futuresFundUsdt: clampNumber(settings.futuresFundUsdt, 20, 10000, CAPITAL_DEFAULTS.futuresFundUsdt),
    marginPerTradeUsdt: clampNumber(settings.marginPerTradeUsdt, 5, 1000, CAPITAL_DEFAULTS.marginPerTradeUsdt),
    dailyMaxLossUsdt: clampNumber(settings.dailyMaxLossUsdt, 1, 500, CAPITAL_DEFAULTS.dailyMaxLossUsdt),
    weeklyMaxLossUsdt: clampNumber(settings.weeklyMaxLossUsdt, 5, 1000, CAPITAL_DEFAULTS.weeklyMaxLossUsdt),
    btcSweepPercent: clampNumber(settings.btcSweepPercent, 10, 80, CAPITAL_DEFAULTS.btcSweepPercent),
    paperMode: settings.paperMode === true,
    oneTradePerDay: settings.oneTradePerDay !== false
  };
}

function saveCapitalSettings(nextSettings) {
  const current = loadSettingsData();
  saveSettingsData({
    ...current,
    futuresFundUsdt: clampNumber(nextSettings.futuresFundUsdt, 20, 10000, CAPITAL_DEFAULTS.futuresFundUsdt),
    marginPerTradeUsdt: clampNumber(nextSettings.marginPerTradeUsdt, 5, 1000, CAPITAL_DEFAULTS.marginPerTradeUsdt),
    dailyMaxLossUsdt: clampNumber(nextSettings.dailyMaxLossUsdt, 1, 500, CAPITAL_DEFAULTS.dailyMaxLossUsdt),
    weeklyMaxLossUsdt: clampNumber(nextSettings.weeklyMaxLossUsdt, 5, 1000, CAPITAL_DEFAULTS.weeklyMaxLossUsdt),
    btcSweepPercent: clampNumber(nextSettings.btcSweepPercent, 10, 80, CAPITAL_DEFAULTS.btcSweepPercent),
    paperMode: nextSettings.paperMode === true,
    oneTradePerDay: nextSettings.oneTradePerDay !== false,
    updatedAt: new Date().toISOString()
  });
}

function bindEvents() {
  els.refreshBtn.addEventListener("click", handleRefresh);
  els.clearSessionBtn.addEventListener("click", clearSession);
  els.watchToggleBtn.addEventListener("click", toggleWatchMode);
  els.testAlertBtn.addEventListener("click", testSignalAlert);
  els.stopAlertBtn.addEventListener("click", stopSignalAlert);
  els.tabTodayBtn.addEventListener("click", () => switchView("today"));
  els.tabHistoryBtn.addEventListener("click", () => switchView("history"));
  els.historyImportInput.addEventListener("change", importHistoryFile);
  window.addEventListener("online", updateNetworkStatus);
  window.addEventListener("offline", updateNetworkStatus);
  document.addEventListener("visibilitychange", handleVisibilityChange);
}

function switchView(view) {
  activeView = view;
  const showingToday = activeView === "today";
  els.todayView.classList.toggle("hidden", !showingToday);
  els.historyView.classList.toggle("hidden", showingToday);
  els.tabTodayBtn.classList.toggle("active", showingToday);
  els.tabHistoryBtn.classList.toggle("active", !showingToday);
  if (!showingToday) {
    renderHistory();
  }
}

function updateNetworkStatus() {
  if (navigator.onLine) {
    els.networkStatus.textContent = "Đang online";
    els.networkStatus.className = "pill good";
  } else {
    els.networkStatus.textContent = "Offline — chỉ xem lại phiên đã lưu";
    els.networkStatus.className = "pill bad";
  }
}

async function handleRefresh() {
  await runMarketUpdate({ source: "manual", confirmOverwrite: true });
}

async function runMarketUpdate(options = {}) {
  const source = options.source || "manual";
  const confirmOverwrite = options.confirmOverwrite !== false;
  if (!navigator.onLine) {
    showMessage("Không lấy được dữ liệu", "Không có dữ liệu sạch thì không có quyết định sạch.", "bad");
    updateWatchStatus("Offline, Watch Mode tạm dừng lấy dữ liệu mới.");
    return null;
  }

  const todayId = getLocalDateId(new Date());
  const existingToday = loadHistory().find((item) => item.id === todayId || item.date === todayId);
  if (source === "manual" && confirmOverwrite && existingToday && !window.confirm("Hôm nay đã có phiếu. Ghi đè phiên hôm nay?")) {
    return null;
  }

  setLoading(true, source);
  if (source === "manual") {
    hideMessage();
  }

  try {
    const [btcCandles, ticker] = await Promise.all([
      fetchClosedCandles(SYMBOL_CONFIG.instId),
      fetchTicker(SYMBOL_CONFIG.instId)
    ]);

    const now = new Date();
    const analysis = analyzeMarket(btcCandles, ticker, now);
    updateOpenPaperTests({ [SYMBOL_CONFIG.instId]: ticker }, now);
    const session = buildSession(analysis, ticker, now);
    currentSession = session;
    saveSession(session);
    upsertHistoryFromSession(session, existingToday);
    renderSession();
    renderHistory();

    if (source === "auto") {
      updateWatchStatus(`Vừa quét lúc ${formatClock(now.toISOString())}. Kết quả: ${session.actionLabel} · ${session.fitness}% · Grade ${session.grade}.`);
      const createdPaperTest = maybeAlertSignal(session);
      if (createdPaperTest) {
        renderSession();
        renderHistory();
      }
    }
    return session;
  } catch (error) {
    console.error(error);
    showMessage("Không lấy được dữ liệu", "Không giả dữ liệu thị trường. Dữ liệu mù thì tay phải đứng yên.", "bad");
    updateWatchStatus("Lỗi lấy dữ liệu. Watch Mode sẽ thử lại ở vòng kế tiếp.");
    return null;
  } finally {
    setLoading(false, source);
  }
}

function setLoading(isLoading, source = "manual") {
  els.refreshBtn.disabled = isLoading;
  els.refreshBtn.textContent = isLoading && source === "manual" ? "ĐANG LẤY DỮ LIỆU CÔNG KHAI..." : "CẬP NHẬT DỮ LIỆU & LẬP PHIẾU";
}

async function fetchClosedCandles(instId) {
  const url = `${CANDLES_API}?instId=${encodeURIComponent(instId)}&bar=4H&limit=100&${CACHE_BUSTER()}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Candle fetch failed ${instId}`);
  }
  const payload = await response.json();
  if (!payload || payload.code !== "0" || !Array.isArray(payload.data)) {
    throw new Error(`Bad candle payload ${instId}`);
  }

  const now = Date.now();
  const candles = payload.data
    .map(parseCandle)
    .filter((item) => item.time + FOUR_HOURS_MS <= now)
    .sort((a, b) => a.time - b.time);

  if (candles.length < 55) {
    throw new Error(`Not enough closed candles ${instId}`);
  }
  return candles;
}

function parseCandle(row) {
  return {
    time: Number(row[0]),
    open: Number(row[1]),
    high: Number(row[2]),
    low: Number(row[3]),
    close: Number(row[4]),
    volume: Number(row[5])
  };
}

async function fetchTicker(instId) {
  const url = `${TICKER_API}?instId=${encodeURIComponent(instId)}&${CACHE_BUSTER()}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Ticker fetch failed ${instId}`);
  }
  const payload = await response.json();
  const first = payload && Array.isArray(payload.data) ? payload.data[0] : null;
  const last = first ? Number(first.last) : NaN;
  if (!Number.isFinite(last) || last <= 0) {
    throw new Error(`Bad ticker payload ${instId}`);
  }
  return last;
}

function analyzeMarket(btcCandles, ticker, now = new Date()) {
  const btc = enrichCandles(btcCandles);
  const latest = btc.latest;
  const previous = btc.previous;
  const closedAtMs = latest.time + FOUR_HOURS_MS;
  const closeAgeHours = Math.max(0, (now.getTime() - closedAtMs) / (60 * 60 * 1000));
  const dataFreshness = getDataFreshness(closeAgeHours);
  const extreme = latest.range > btc.avgRange20 * TRADING_CONFIG.extremeRangeMultiplier;
  const distanceFromEma20 = Math.abs(latest.close - btc.ema20) / latest.close;
  const btcAtrPct = btc.atr14 / latest.close;
  const avgVolume20 = btc.avgVolume20;
  const volumeRatio = avgVolume20 > 0 ? latest.volume / avgVolume20 : 0;
  const btcVolumePositive = Number.isFinite(latest.volume) && latest.volume > 0;

  const btcLongCoreChecks = [
    latest.close > btc.ema20,
    btc.ema20 > btc.ema50,
    latest.close > latest.open,
    latest.close > previous.close,
    btc.ema50SlopeUp
  ];
  const btcShortCoreChecks = [
    latest.close < btc.ema20,
    btc.ema20 < btc.ema50,
    latest.close < latest.open,
    latest.close < previous.close,
    btc.ema50SlopeDown
  ];

  const atrOk = Number.isFinite(btcAtrPct) && btcAtrPct >= TRADING_CONFIG.atrPctMin && btcAtrPct <= TRADING_CONFIG.atrPctMax;
  const volumeOk = btcVolumePositive && volumeRatio >= 0.6;
  const freshOk = dataFreshness.status === "FRESH";
  const longChecks = [
    latest.close > btc.ema20,
    btc.ema20 > btc.ema50,
    latest.close > latest.open,
    latest.close > previous.close,
    btc.ema50SlopeUp,
    distanceFromEma20 >= TRADING_CONFIG.weakDistanceFromEma20,
    atrOk,
    !extreme
  ];
  const shortChecks = [
    latest.close < btc.ema20,
    btc.ema20 < btc.ema50,
    latest.close < latest.open,
    latest.close < previous.close,
    btc.ema50SlopeDown,
    distanceFromEma20 >= TRADING_CONFIG.weakDistanceFromEma20,
    atrOk,
    !extreme
  ];

  const longScore = countTrue(longChecks);
  const shortScore = countTrue(shortChecks);
  const btcLongCoreScore = countTrue(btcLongCoreChecks);
  const btcShortCoreScore = countTrue(btcShortCoreChecks);
  const side = pickPlanSide({
    longScore,
    shortScore,
    btcLongCoreScore,
    btcShortCoreScore,
    close: latest.close,
    ema20: btc.ema20
  });
  const gap = Math.abs(longScore - shortScore);
  const sideScore = side === "LONG" ? longScore : shortScore;
  const oppositeScore = side === "LONG" ? shortScore : longScore;
  const sideCoreScore = side === "LONG" ? btcLongCoreScore : btcShortCoreScore;
  const oppositeCoreScore = side === "LONG" ? btcShortCoreScore : btcLongCoreScore;
  const fitness = computeFitness({
    side,
    latest,
    previous,
    btc,
    distanceFromEma20,
    btcAtrPct,
    volumeRatio,
    btcVolumePositive,
    extreme,
    gap,
    dataFreshness
  });
  const grade = getGrade(fitness);
  const capitalSettings = getCapitalSettings();
  const marketRegimePro = getMarketRegimePro({ latest, previous, btc, distanceFromEma20, btcAtrPct, extreme, volumeRatio });
  const sessionQuality = getSessionQuality(now, grade, getAction({ fitness, grade, hardVeto: "" }));
  const capitalLadder = getCapitalLadder(grade, getAction({ fitness, grade, hardVeto: "" }), capitalSettings);
  const disciplineGuard = getDisciplineGuard(now, capitalSettings, grade);
  const hardVeto = getHardVetoReason({
    dataFreshness,
    extreme,
    btcAtrPct,
    btcVolumePositive,
    volumeRatio,
    side,
    gap,
    cooldown: getCooldownState(now),
    sideScore,
    oppositeScore,
    grade,
    capitalSettings,
    disciplineGuard,
    sessionQuality
  });
  const action = getAction({ fitness, grade, hardVeto });
  const marketRegime = marketRegimePro.label;
  const slogan = getSlogan({ action, hardVeto });
  const actionLabel = getActionLabel(action);

  return {
    decision: side,
    action,
    actionLabel,
    reason: buildReason({ action, side, fitness, grade, hardVeto, marketRegime, sideScore, oppositeScore, sideCoreScore }),
    signalTier: `${action}_${side}`,
    ticketType: action,
    ticketLabel: actionLabel,
    riskProfile: getRiskProfile(action, grade),
    fitness,
    grade,
    slogan,
    marketRegime,
    marketRegimePro,
    sessionQuality,
    capitalLadder,
    longScore,
    shortScore,
    gap,
    sideScore,
    oppositeScore,
    btcLongCoreScore,
    btcShortCoreScore,
    sideCoreScore,
    oppositeCoreScore,
    closedAt: latest.closeTimeIso,
    dataFreshness,
    hardVeto,
    btc: summarizeTechnical(btc),
    extreme,
    filters: {
      distanceFromEma20: Number((distanceFromEma20 * 100).toFixed(3)),
      minDistanceFromEma20: Number((TRADING_CONFIG.minDistanceFromEma20 * 100).toFixed(3)),
      weakDistanceFromEma20: Number((TRADING_CONFIG.weakDistanceFromEma20 * 100).toFixed(3)),
      btcAtrPct: Number((btcAtrPct * 100).toFixed(3)),
      atrPctMin: Number((TRADING_CONFIG.atrPctMin * 100).toFixed(3)),
      atrPctMax: Number((TRADING_CONFIG.atrPctMax * 100).toFixed(3)),
      volumeRatio: Number(volumeRatio.toFixed(2)),
      btcVolumePositive,
      btcLastCandle: latest.close > latest.open ? "green" : latest.close < latest.open ? "red" : "flat",
      btcCloseVsPrevious: latest.close > previous.close ? "up" : latest.close < previous.close ? "down" : "flat",
      cooldownActive: getCooldownState(now).active,
      cooldownReason: getCooldownState(now).reason,
      disciplineGuardActive: disciplineGuard.active,
      disciplineGuardReason: disciplineGuard.reason
    },
    capitalSettings,
    disciplineGuard,
    signalConfig: { ...TRADING_CONFIG }
  };
}

function enrichCandles(candles) {
  const closes = candles.map((item) => item.close);
  const ranges = candles.map((item) => item.high - item.low);
  const volumes = candles.map((item) => item.volume);
  const trueRanges = candles.map((item, index) => {
    if (index === 0) {
      return item.high - item.low;
    }
    const previousClose = candles[index - 1].close;
    return Math.max(item.high - item.low, Math.abs(item.high - previousClose), Math.abs(item.low - previousClose));
  });
  const latest = candles[candles.length - 1];
  const previous = candles[candles.length - 2];
  const ema20Series = computeEmaSeries(closes, 20);
  const ema50Series = computeEmaSeries(closes, 50);
  const ema20 = getLastNumber(ema20Series);
  const ema50 = getLastNumber(ema50Series);
  const slopeIndex = Math.max(0, ema50Series.length - 1 - TRADING_CONFIG.ema50SlopeLookback);
  const ema50Past = ema50Series[slopeIndex] || ema50;
  const avgRange20 = average(ranges.slice(-20));
  const avgVolume20 = average(volumes.slice(-20));
  const atr14 = average(trueRanges.slice(-14));
  const ema50SlopeUp = ema50 > ema50Past;
  const ema50SlopeDown = ema50 < ema50Past;

  return {
    latest: {
      ...latest,
      range: latest.high - latest.low,
      closeTimeIso: new Date(latest.time + FOUR_HOURS_MS).toISOString()
    },
    previous,
    ema20,
    ema50,
    ema50Past,
    ema50SlopeUp,
    ema50SlopeDown,
    ema50SlopeDirection: ema50SlopeUp ? "up" : ema50SlopeDown ? "down" : "flat",
    avgRange20,
    avgVolume20,
    atr14
  };
}

function computeEmaSeries(values, period) {
  const series = Array(values.length).fill(null);
  const multiplier = 2 / (period + 1);
  const seed = values.slice(0, period).reduce((sum, value) => sum + value, 0) / period;
  let ema = seed;
  series[period - 1] = ema;
  for (let index = period; index < values.length; index += 1) {
    ema = (values[index] - ema) * multiplier + ema;
    series[index] = ema;
  }
  return series;
}

function getLastNumber(values) {
  for (let index = values.length - 1; index >= 0; index -= 1) {
    if (Number.isFinite(values[index])) {
      return values[index];
    }
  }
  return 0;
}

function average(values) {
  if (!values.length) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function countTrue(items) {
  return items.filter(Boolean).length;
}

function pickPlanSide(context) {
  const { longScore, shortScore, btcLongCoreScore, btcShortCoreScore, close, ema20 } = context;
  if (longScore > shortScore) {
    return "LONG";
  }
  if (shortScore > longScore) {
    return "SHORT";
  }
  if (btcLongCoreScore > btcShortCoreScore) {
    return "LONG";
  }
  if (btcShortCoreScore > btcLongCoreScore) {
    return "SHORT";
  }
  return close >= ema20 ? "LONG" : "SHORT";
}

function computeFitness(context) {
  const { side, latest, previous, btc, distanceFromEma20, btcAtrPct, volumeRatio, btcVolumePositive, extreme, gap, dataFreshness } = context;
  let score = 0;

  if (side === "LONG") {
    score += latest.close > btc.ema20 ? 9 : 0;
    score += btc.ema20 > btc.ema50 ? 8 : 0;
    score += btc.ema50SlopeUp ? 8 : 0;
    score += latest.close > latest.open ? 8 : 0;
    score += latest.close > previous.close ? 7 : 0;
  } else {
    score += latest.close < btc.ema20 ? 9 : 0;
    score += btc.ema20 < btc.ema50 ? 8 : 0;
    score += btc.ema50SlopeDown ? 8 : 0;
    score += latest.close < latest.open ? 8 : 0;
    score += latest.close < previous.close ? 7 : 0;
  }

  if (distanceFromEma20 >= TRADING_CONFIG.minDistanceFromEma20) {
    score += 10;
  } else if (distanceFromEma20 >= TRADING_CONFIG.weakDistanceFromEma20) {
    score += 7;
  } else if (distanceFromEma20 >= 0.001) {
    score += 4;
  }

  if (Number.isFinite(btcAtrPct) && btcAtrPct >= TRADING_CONFIG.atrPctMin && btcAtrPct <= TRADING_CONFIG.atrPctMax) {
    score += 15;
  } else if (Number.isFinite(btcAtrPct) && btcAtrPct >= 0.0075 && btcAtrPct <= 0.03) {
    score += 8;
  }

  if (btcVolumePositive && volumeRatio >= 0.8) {
    score += 10;
  } else if (btcVolumePositive && volumeRatio >= 0.6) {
    score += 7;
  } else if (btcVolumePositive) {
    score += 4;
  }

  score += extreme ? 0 : 10;
  score += gap >= 2 ? 10 : gap >= 1 ? 5 : 2;
  score += dataFreshness.status === "FRESH" ? 5 : dataFreshness.status === "STALE" ? 2 : 0;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getGrade(fitness) {
  if (fitness >= 90) return "A";
  if (fitness >= 80) return "B";
  if (fitness >= 70) return "C";
  if (fitness >= 55) return "D";
  return "F";
}

function getDataFreshness(closeAgeHours) {
  if (closeAgeHours <= TRADING_CONFIG.minFreshHours) {
    return { status: "FRESH", ageHours: Number(closeAgeHours.toFixed(2)), label: "Dữ liệu mới" };
  }
  if (closeAgeHours <= TRADING_CONFIG.maxStaleHours) {
    return { status: "STALE", ageHours: Number(closeAgeHours.toFixed(2)), label: "Dữ liệu chậm" };
  }
  return { status: "OLD", ageHours: Number(closeAgeHours.toFixed(2)), label: "Dữ liệu cũ" };
}

function getCooldownState(now = new Date()) {
  const todayRecord = getHistoryRecord(getLocalDateId(now));
  if (todayRecord && (todayRecord.result === "SL" || todayRecord.result === "LOSS" || Number(todayRecord.netPnl || 0) <= -Math.abs(getCapitalSettings().dailyMaxLossUsdt))) {
    return { active: true, reason: "Hôm nay đã lỗ hoặc chạm giới hạn lỗ. Kill Switch bật." };
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const previousRecord = getHistoryRecord(getLocalDateId(yesterday));
  if (previousRecord && (previousRecord.result === "SL" || previousRecord.result === "LOSS" || Number(previousRecord.netPnl || 0) < 0)) {
    return { active: true, reason: "Ngày liền trước lỗ. Phiên sau chỉ nên quan sát hoặc nhận phiếu rất đẹp." };
  }
  return { active: false, reason: "Không có cooldown đang bật." };
}

function getDisciplineGuard(now = new Date(), capitalSettings = getCapitalSettings(), grade = "F") {
  const todayRecord = getHistoryRecord(getLocalDateId(now));
  const tickets = Array.isArray(todayRecord && todayRecord.tickets) ? todayRecord.tickets : [];
  const activeStatuses = ["Đã đặt Limit", "Đã khớp", "Đã TP", "Đã SL"];
  const consumedByStatus = tickets.some((ticket) => activeStatuses.includes(ticket.status));
  const consumedByResult = todayRecord && ["TP", "SL", "MANUAL_CLOSE", "STILL_OPEN"].includes(todayRecord.result);
  const dayPnl = todayRecord ? Number(todayRecord.netPnl || 0) : 0;
  const dailyLossHit = todayRecord && (todayRecord.result === "SL" || dayPnl <= -Math.abs(capitalSettings.dailyMaxLossUsdt));
  const marginShare = capitalSettings.futuresFundUsdt > 0 ? capitalSettings.marginPerTradeUsdt / capitalSettings.futuresFundUsdt : 999;
  const weakGradeWithLargeMargin = marginShare >= 0.8 && !["A", "B"].includes(grade);

  if (capitalSettings.marginPerTradeUsdt > capitalSettings.futuresFundUsdt) {
    return {
      active: true,
      code: "CAPITAL_OVER_MARGIN",
      reason: `Capital Guard: margin ${formatUsdt(capitalSettings.marginPerTradeUsdt)} USDT lớn hơn quỹ futures ${formatUsdt(capitalSettings.futuresFundUsdt)} USDT.`
    };
  }
  if (dailyLossHit) {
    return {
      active: true,
      code: "DAILY_MAX_LOSS",
      reason: `Daily Max Loss đã chạm ngưỡng ${formatUsdt(capitalSettings.dailyMaxLossUsdt)} USDT. Hôm nay dừng.`
    };
  }
  if (capitalSettings.oneTradePerDay && (consumedByStatus || consumedByResult)) {
    return {
      active: true,
      code: "ONE_TRADE_PER_DAY",
      reason: "One Trade Per Day đã dùng viên đạn hôm nay. App chỉ cho xem lại bản đồ."
    };
  }
  if (weakGradeWithLargeMargin) {
    return {
      active: true,
      code: "FUND_GUARD_WEAK_GRADE",
      reason: `Capital Guard: margin/lệnh đang chiếm ${formatPercent(marginShare)} quỹ futures, Grade ${grade} chưa đủ để dùng cỡ này.`
    };
  }
  return { active: false, code: "OK", reason: "Capital Guard bình thường." };
}

function getHardVetoReason(context) {
  const { dataFreshness, extreme, btcAtrPct, btcVolumePositive, volumeRatio, gap, cooldown, sideScore, oppositeScore, disciplineGuard, sessionQuality } = context;
  if (sessionQuality && sessionQuality.hardLock) {
    return `LOCKED_RISK: Session Quality ${sessionQuality.label}. ${sessionQuality.advice}`;
  }
  if (disciplineGuard && disciplineGuard.active) {
    return `LOCKED_RISK: ${disciplineGuard.reason}`;
  }
  if (dataFreshness.status !== "FRESH") {
    return `LOCKED_RISK: ${dataFreshness.label}. Không dùng dữ liệu stale/old để bấm 20x.`;
  }
  if (!Number.isFinite(btcAtrPct) || btcAtrPct < TRADING_CONFIG.atrPctMin) {
    return "LOCKED_RISK: BTC ATR% dưới 1.0%. Biến động quá thấp, dễ nhiễu.";
  }
  if (btcAtrPct > TRADING_CONFIG.atrPctMax) {
    return "LOCKED_RISK: BTC ATR% trên 2.0%. Biến động quá loạn cho 20x.";
  }
  if (!btcVolumePositive || volumeRatio < 0.6) {
    return "LOCKED_RISK: volume BTC không đủ tin cậy.";
  }
  if (extreme) {
    return "LOCKED_RISK: nến BTC 4H quá cực đoan. Không chase sau nến lớn.";
  }
  if (cooldown.active && sideScore < 8) {
    return `LOCKED_RISK: ${cooldown.reason}`;
  }
  if (gap <= TRADING_CONFIG.sideNoiseGapLimit && Math.max(sideScore, oppositeScore) < 5) {
    return "LOCKED_RISK: Long/Short quá nhiễu, chưa xác định được bên ít xấu hơn.";
  }
  return "";
}

function getAction(context) {
  const { fitness, hardVeto } = context;
  if (hardVeto) {
    return "LOCKED_RISK";
  }
  if (fitness >= 80) {
    return "EXECUTABLE";
  }
  if (fitness >= 70) {
    return "WAIT_TRIGGER";
  }
  return "PLAN_ONLY";
}

function getActionLabel(action) {
  const labels = {
    EXECUTABLE: "Có thể xem xét thủ công",
    WAIT_TRIGGER: "Chờ trigger, không chase",
    PLAN_ONLY: "Chỉ lập kế hoạch",
    LOCKED_RISK: "Khóa rủi ro"
  };
  return labels[action] || action;
}


function getSessionQuality(now = new Date(), grade = "F", action = "PLAN_ONLY") {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const lateStart = TRADING_CONFIG.sessionLateHour * 60 + TRADING_CONFIG.sessionLateMinute;
  if (minutes >= lateStart || minutes < 360) {
    return {
      code: "LATE_NIGHT",
      label: "Khuya / dễ mất tỉnh táo",
      score: 35,
      hardLock: !["A"].includes(grade),
      advice: "Sau 23:30 chỉ nên PAPER hoặc Grade A thật đẹp. Buồn ngủ thì không trade."
    };
  }
  if (minutes >= 1140 && minutes < lateStart) {
    return {
      code: "US_ACTIVE",
      label: "Phiên tối / Mỹ hoạt động",
      score: 75,
      hardLock: false,
      advice: "Biến động tốt hơn nhưng râu nến mạnh. Không Market, không chase."
    };
  }
  if (minutes >= 780 && minutes < 1140) {
    return {
      code: "PRE_US",
      label: "Chiều - chuẩn bị trước Mỹ",
      score: 65,
      hardLock: false,
      advice: "Có thể lập kế hoạch, ưu tiên chờ trigger rõ."
    };
  }
  return {
    code: "ASIA_SLOW",
    label: "Sáng / trưa Việt Nam",
    score: 50,
    hardLock: grade === "D" || grade === "F",
    advice: "Phiên chậm dễ nhiễu. Grade yếu thì chỉ PLAN/PAPER."
  };
}

function getMarketRegimePro(context) {
  const { latest, previous, btc, distanceFromEma20, btcAtrPct, extreme, volumeRatio } = context;
  const rising = latest.close > previous.close;
  const aboveStack = latest.close > btc.ema20 && btc.ema20 > btc.ema50;
  const belowStack = latest.close < btc.ema20 && btc.ema20 < btc.ema50;
  if (extreme) {
    return { code: "EXPANSION", label: "Expansion mạnh", playbook: "Không chase. Chờ retest hoặc bỏ.", score: 30 };
  }
  if (btcAtrPct < TRADING_CONFIG.atrPctMin) {
    return { code: "CHOP_LOW_ATR", label: "Chop/Nhiễu ATR thấp", playbook: "Có bản đồ để nhìn, không ép lệnh thật.", score: 25 };
  }
  if (btcAtrPct > TRADING_CONFIG.atrPctMax) {
    return { code: "VOLATILE", label: "Biến động quá mạnh", playbook: "Giảm size, chỉ Limit, tuyệt đối không đuổi giá.", score: 35 };
  }
  if (aboveStack && btc.ema50SlopeUp && volumeRatio >= 0.6) {
    return { code: "TREND_UP", label: "Trend Up", playbook: "Ưu tiên Long khi hồi về vùng, không mua đuổi.", score: 82 };
  }
  if (belowStack && btc.ema50SlopeDown && volumeRatio >= 0.6) {
    return { code: "TREND_DOWN", label: "Trend Down", playbook: "Ưu tiên Short khi hồi lên vùng, không bán đuổi.", score: 82 };
  }
  if (distanceFromEma20 < TRADING_CONFIG.weakDistanceFromEma20) {
    return { code: "RANGE_EMA", label: "Range sát EMA20", playbook: "Dễ quét hai đầu. Chờ biên hoặc bỏ.", score: 45 };
  }
  return { code: rising ? "RANGE_LONG" : "RANGE_SHORT", label: rising ? "Range nghiêng Long" : "Range nghiêng Short", playbook: "Chỉ đánh khi giá về vùng đẹp, hết vùng thì bỏ.", score: 58 };
}

function getCapitalLadder(grade, action, capitalSettings = getCapitalSettings()) {
  const base = Number(capitalSettings.marginPerTradeUsdt || CAPITAL_DEFAULTS.marginPerTradeUsdt);
  const fund = Number(capitalSettings.futuresFundUsdt || CAPITAL_DEFAULTS.futuresFundUsdt);
  let recommended = base;
  let label = "Giữ 50 USDT nếu kỷ luật đủ";
  if (action === "LOCKED_RISK" || action === "PLAN_ONLY") {
    recommended = 0;
    label = "Không dùng tiền thật — chỉ PAPER/quan sát";
  } else if (grade === "C") {
    recommended = Math.min(base, 25);
    label = "Grade C: giảm về 25 USDT hoặc chờ trigger rất rõ";
  } else if (grade === "D" || grade === "F") {
    recommended = 0;
    label = "Grade yếu: không mở vị thế thật";
  } else if (fund < base * 2) {
    recommended = Math.min(base, Math.max(10, Math.floor(fund * 0.35)));
    label = "Quỹ mỏng: giảm margin, ưu tiên sống sót";
  }
  return {
    recommendedMarginUsdt: Number(recommended.toFixed(2)),
    currentMarginUsdt: base,
    label,
    usagePct: fund > 0 ? base / fund : 0
  };
}

function getRiskProfile(action, grade) {
  if (action === "LOCKED_RISK") return "LOCKED";
  if (grade === "A") return "NORMAL_SMALL";
  if (grade === "B") return "REDUCED";
  if (grade === "C") return "SMALL_WAIT";
  if (grade === "D") return "MICRO_PLAN";
  return "NO_SIZE";
}

function getMarketRegime(context) {
  const { latest, previous, btc, distanceFromEma20, btcAtrPct, extreme } = context;
  if (extreme) return "Expansion mạnh — không chase, chờ retest";
  if (btcAtrPct < TRADING_CONFIG.atrPctMin) return "Chop/Nhiễu — biến động thấp";
  if (latest.close > btc.ema20 && btc.ema20 > btc.ema50 && btc.ema50SlopeUp) return "Trend Up — ưu tiên Long hồi";
  if (latest.close < btc.ema20 && btc.ema20 < btc.ema50 && btc.ema50SlopeDown) return "Trend Down — ưu tiên Short hồi";
  if (distanceFromEma20 < TRADING_CONFIG.weakDistanceFromEma20) return "Range sát EMA20 — dễ quét hai đầu";
  if (latest.close > previous.close) return "Range nghiêng Long — chỉ chờ giá đẹp";
  if (latest.close < previous.close) return "Range nghiêng Short — chỉ chờ giá đẹp";
  return "Neutral — ưu tiên đứng ngoài";
}

function getSlogan(context) {
  const { action, hardVeto } = context;
  if (hardVeto && hardVeto.includes("cooldown")) {
    return SLOGANS.COOLDOWN[0];
  }
  if (hardVeto && hardVeto.includes("Dữ liệu")) {
    return SLOGANS.DATA[0];
  }
  const pool = SLOGANS[action] || SLOGANS.PLAN_ONLY;
  return pool[0];
}

function buildReason(context) {
  const { action, side, fitness, grade, hardVeto, marketRegime, sideScore, oppositeScore, sideCoreScore } = context;
  if (hardVeto) {
    return `${hardVeto} Vẫn dựng phiếu phân tích ${side} với vốn chuẩn 50 USDT để xem lời/lỗ giả định, nhưng trạng thái khóa nghĩa là không nhập lệnh thật.`;
  }
  if (action === "EXECUTABLE") {
    return `${side} đạt ${fitness}% · Grade ${grade}. Regime: ${marketRegime}. Score ${sideScore}/8 so với ${oppositeScore}/8, BTC core ${sideCoreScore}/5. Chỉ vào đúng Limit, có TP1/TP2/SL, không dời SL.`;
  }
  if (action === "WAIT_TRIGGER") {
    return `${side} đạt ${fitness}% · Grade ${grade}. Có thể theo dõi nhưng không chase. Chỉ hợp lệ nếu giá về vùng entry; hết vùng thì bỏ. TP1 chốt 50%, TP2 chốt phần còn lại.`;
  }
  return `${side} đạt ${fitness}% · Grade ${grade}. Đây là PLAN_ONLY: có bản đồ để nhìn, chưa phải lệnh đáng xuống tiền.`;
}

function summarizeTechnical(data) {
  return {
    close: roundForTech(data.latest.close),
    ema20: roundForTech(data.ema20),
    ema50: roundForTech(data.ema50),
    ema50Past: roundForTech(data.ema50Past),
    ema50Slope: data.ema50SlopeDirection,
    range: roundForTech(data.latest.range),
    avgRange20: roundForTech(data.avgRange20),
    atr14: roundForTech(data.atr14),
    atrPct: Number(((data.atr14 / data.latest.close) * 100).toFixed(3)),
    volume: Number.isFinite(data.latest.volume) ? roundForTech(data.latest.volume) : 0,
    avgVolume20: roundForTech(data.avgVolume20)
  };
}

function roundForTech(value) {
  return Number(Number(value || 0).toFixed(4));
}

function buildSession(analysis, ticker, now) {
  const reviewAt = new Date(now.getTime() + TRADING_CONFIG.waitMinutes * 60 * 1000).toISOString();
  const marginUsdt = getMarginUsdt(analysis.action, analysis.grade);
  const positionUsdt = getPositionUsdt(marginUsdt);
  const order = buildOrder(analysis, ticker, marginUsdt, positionUsdt);
  const riskTotals = computeRiskTotals([order]);
  const price = formatPrice(ticker, SYMBOL_CONFIG.decimals);

  return {
    version: APP_VERSION,
    dayId: getLocalDateId(now),
    date: getLocalDateId(now),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    reviewAt,
    decision: analysis.decision,
    action: analysis.action,
    actionLabel: analysis.actionLabel,
    reason: analysis.reason,
    ticketType: analysis.ticketType,
    ticketLabel: analysis.ticketLabel,
    riskProfile: analysis.riskProfile,
    fitness: analysis.fitness,
    grade: analysis.grade,
    slogan: analysis.slogan,
    marketRegime: analysis.marketRegime,
    analysis,
    prices: { BTCUSDT: price },
    orders: [order],
    rules: {
      symbol: SYMBOL_CONFIG.symbol,
      marginUsdt,
      positionUsdt,
      leverage: TRADING_CONFIG.leverage,
      notionalUsdt: positionUsdt,
      marginMode: TRADING_CONFIG.marginMode,
      orderType: TRADING_CONFIG.orderType,
      waitMinutes: TRADING_CONFIG.waitMinutes,
      noChasePct: Number((TRADING_CONFIG.noChasePct * 100).toFixed(2)),
      estimatedWin: riskTotals.win,
      estimatedLoss: riskTotals.loss,
      stopDayLoss: TRADING_CONFIG.dailyStopLossUsdt,
      feeEstimate: riskTotals.fee,
      futuresFundUsdt: getCapitalSettings().futuresFundUsdt,
      dailyMaxLossUsdt: getCapitalSettings().dailyMaxLossUsdt,
      oneTradePerDay: getCapitalSettings().oneTradePerDay,
      paperMode: getCapitalSettings().paperMode,
      weeklyMaxLossUsdt: getCapitalSettings().weeklyMaxLossUsdt,
      btcSweepPercent: getCapitalSettings().btcSweepPercent
    }
  };
}

function getMarginUsdt(action, grade) {
  const settings = getCapitalSettings();
  return settings.marginPerTradeUsdt || MARGIN_BY_GRADE[grade] || TRADING_CONFIG.defaultMarginUsdt;
}

function getPositionUsdt(marginUsdt) {
  return Number((Number(marginUsdt || 0) * TRADING_CONFIG.leverage).toFixed(2));
}

function buildOrder(analysis, ticker, marginUsdt, positionUsdt) {
  const gradeParams = TP_SL_BY_GRADE[analysis.grade] || TP_SL_BY_GRADE.F;
  const direction = analysis.decision;
  const pullbackPct = analysis.action === "EXECUTABLE" ? 0.0005 : analysis.action === "WAIT_TRIGGER" ? 0.0015 : 0.0025;
  const entry = direction === "LONG" ? ticker * (1 - pullbackPct) : ticker * (1 + pullbackPct);
  const takeProfit1 = direction === "LONG" ? entry * (1 + gradeParams.tp1) : entry * (1 - gradeParams.tp1);
  const takeProfit2 = direction === "LONG" ? entry * (1 + gradeParams.tp2) : entry * (1 - gradeParams.tp2);
  const stopLoss = direction === "LONG" ? entry * (1 - gradeParams.sl) : entry * (1 + gradeParams.sl);
  const invalidPrice = direction === "LONG" ? entry * (1 + TRADING_CONFIG.noChasePct) : entry * (1 - TRADING_CONFIG.noChasePct);
  const entryLow = direction === "LONG" ? entry * (1 - 0.001) : entry * (1 - 0.0005);
  const entryHigh = direction === "LONG" ? entry * (1 + 0.0005) : entry * (1 + 0.001);
  const closeRatio = Number(TRADING_CONFIG.tp1CloseRatio || 0.5);
  const remainingRatio = 1 - closeRatio;
  const grossTp1Be = positionUsdt * closeRatio * gradeParams.tp1;
  const grossTp2Plan = positionUsdt * ((closeRatio * gradeParams.tp1) + (remainingRatio * gradeParams.tp2));
  const grossFullTp2 = positionUsdt * gradeParams.tp2;
  const grossLoss = -(positionUsdt * gradeParams.sl);
  const feeEstimate = positionUsdt > 0 ? positionUsdt * TRADING_CONFIG.feeRate * 2 : 0;
  const btcQty = positionUsdt > 0 && entry > 0 ? positionUsdt / entry : 0;
  const netTp1Be = grossTp1Be - feeEstimate;
  const netTp2Plan = grossTp2Plan - feeEstimate;
  const netFullTp2 = grossFullTp2 - feeEstimate;
  const netLoss = grossLoss - feeEstimate;
  const risk = Math.abs(netLoss);
  const reward = Math.max(0, netTp2Plan);
  const rr = risk > 0 ? reward / risk : 0;
  const fullRr = risk > 0 ? Math.max(0, netFullTp2) / risk : 0;

  return {
    symbol: SYMBOL_CONFIG.symbol,
    instId: SYMBOL_CONFIG.instId,
    direction,
    entry: formatPrice(entry, SYMBOL_CONFIG.decimals),
    entryZone: `${formatPrice(entryLow, SYMBOL_CONFIG.decimals)} – ${formatPrice(entryHigh, SYMBOL_CONFIG.decimals)}`,
    invalidPrice: formatPrice(invalidPrice, SYMBOL_CONFIG.decimals),
    tp: formatPrice(takeProfit2, SYMBOL_CONFIG.decimals),
    tp1: formatPrice(takeProfit1, SYMBOL_CONFIG.decimals),
    tp2: formatPrice(takeProfit2, SYMBOL_CONFIG.decimals),
    sl: formatPrice(stopLoss, SYMBOL_CONFIG.decimals),
    tpPct: formatPercent(gradeParams.tp2),
    tp1Pct: formatPercent(gradeParams.tp1),
    tp2Pct: formatPercent(gradeParams.tp2),
    slPct: formatPercent(gradeParams.sl),
    tp1CloseRatio: formatPercent(closeRatio),
    tp2CloseRatio: formatPercent(remainingRatio),
    tpSlMode: `Survival TP1/TP2 · ${gradeParams.label}`,
    survivalRule: `TP1 chốt ${formatPercent(closeRatio)} vị thế, phần còn lại dời SL về hòa vốn; TP2 chốt phần còn lại.`,
    marginUsdt: formatUsdt(marginUsdt),
    positionUsdt: formatUsdt(positionUsdt),
    notionalUsdt: formatUsdt(positionUsdt),
    btcQty: formatBtcQty(btcQty),
    leverage: TRADING_CONFIG.leverage,
    marginMode: TRADING_CONFIG.marginMode,
    orderType: TRADING_CONFIG.orderType,
    feeEstimate: formatUsdt(feeEstimate),
    netTp1Be: formatSigned(netTp1Be),
    netTp2Plan: formatSigned(netTp2Plan),
    netFullTp2: formatSigned(netFullTp2),
    netWin: formatSigned(netTp2Plan),
    netLoss: formatSigned(netLoss),
    grossWin: formatSigned(grossTp2Plan),
    grossLoss: formatSigned(grossLoss),
    marginRoiTp1: formatPercentSigned(marginUsdt > 0 ? netTp1Be / marginUsdt : 0),
    marginRoiTp2Plan: formatPercentSigned(marginUsdt > 0 ? netTp2Plan / marginUsdt : 0),
    marginRoiFullTp2: formatPercentSigned(marginUsdt > 0 ? netFullTp2 / marginUsdt : 0),
    marginRoiWin: formatPercentSigned(marginUsdt > 0 ? netTp2Plan / marginUsdt : 0),
    marginRoiLoss: formatPercentSigned(marginUsdt > 0 ? netLoss / marginUsdt : 0),
    fundUsage: formatPercent(marginUsdt / Math.max(1, getCapitalSettings().futuresFundUsdt)),
    fundRisk: formatPercentSigned(getCapitalSettings().futuresFundUsdt > 0 ? netLoss / getCapitalSettings().futuresFundUsdt : 0),
    accountRiskMin: formatPercentSigned(TRADING_CONFIG.referenceCapitalMinUsdt > 0 ? netLoss / TRADING_CONFIG.referenceCapitalMinUsdt : 0),
    accountRiskMax: formatPercentSigned(TRADING_CONFIG.referenceCapitalMaxUsdt > 0 ? netLoss / TRADING_CONFIG.referenceCapitalMaxUsdt : 0),
    rr: Number(rr.toFixed(2)),
    fullRr: Number(fullRr.toFixed(2)),
    capitalLadder: analysis.capitalLadder || getCapitalLadder(analysis.grade, analysis.action),
    recommendedMarginUsdt: formatUsdt((analysis.capitalLadder || getCapitalLadder(analysis.grade, analysis.action)).recommendedMarginUsdt),
    action: analysis.action,
    grade: analysis.grade,
    fitness: analysis.fitness,
    status: STATUS_OPTIONS[0],
    reviewAt: ""
  };
}

function computeRiskTotals(orders) {
  if (!Array.isArray(orders) || orders.length === 0) {
    return { win: "+0.00", loss: "+0.00", fee: "0" };
  }
  const win = orders.reduce((sum, order) => sum + Number(order.netWin || 0), 0);
  const loss = orders.reduce((sum, order) => sum + Number(order.netLoss || 0), 0);
  const fee = orders.reduce((sum, order) => sum + Number(order.feeEstimate || 0), 0);
  return { win: formatSigned(win), loss: formatSigned(loss), fee: formatUsdt(fee) };
}

function formatUsdt(value) {
  const number = Number(value || 0);
  return number.toFixed(Number.isInteger(number) ? 0 : 2);
}

function formatBtcQty(value) {
  const number = Number(value || 0);
  return number.toFixed(5);
}

function formatPercentSigned(value) {
  const number = Number(value || 0) * 100;
  const sign = number > 0 ? "+" : "";
  return `${sign}${number.toFixed(2)}%`;
}

function formatPercent(value) {
  return `${(value * 100).toFixed(value < 0.005 ? 2 : value < 0.01 ? 2 : 1)}%`;
}

function formatPrice(value, decimals) {
  return Number(value).toFixed(decimals);
}

function renderSession() {
  if (!currentSession) {
    els.dataStatus.textContent = "CHƯA CẬP NHẬT DỮ LIỆU";
    els.dataStatus.className = "pill muted";
    els.ticketArea.innerHTML = "";
    return;
  }

  const created = formatTime(currentSession.createdAt);
  els.dataStatus.textContent = `Cập nhật ${created}`;
  els.dataStatus.className = currentSession.action === "LOCKED_RISK" ? "pill bad" : "pill good";
  renderTicket(currentSession);
}

function renderTicket(session) {
  const actionTime = formatTime(session.reviewAt);
  const decisionClass = getDecisionClass(session);
  const order = session.orders[0];
  const paperPanel = renderPaperTestPanel(session);
  els.ticketArea.innerHTML = `
    <section class="ticket-card decision compact-ticket ${session.action === "LOCKED_RISK" ? "locked-card" : ""}">
      <div class="compact-headline">
        <span class="signal-tier">${escapeHtml(SYMBOL_CONFIG.label)} · Isolated x${escapeHtml(TRADING_CONFIG.leverage)} · Limit</span>
        <span class="grade-badge grade-${escapeHtml(session.grade)}">Grade ${escapeHtml(session.grade)} · ${escapeHtml(session.fitness)}%</span>
      </div>

      <div class="decision-compact">
        <div>
          <div class="decision-word compact ${decisionClass}">${escapeHtml(session.decision)}</div>
          <p class="reason">${escapeHtml(session.actionLabel)} · ${escapeHtml(session.marketRegime)}</p>
        </div>
        <div class="action-chip">${escapeHtml(session.action)}</div>
      </div>

      <div class="fitness-row compact-meter">
        <div class="fitness-meter" aria-label="Fitness ${session.fitness}%"><span style="width:${escapeHtml(session.fitness)}%"></span></div>
        <strong>${escapeHtml(session.fitness)}%</strong>
      </div>

      ${renderFocusTicket(session, order)}
      ${renderCommandBadgesPanel(session, order)}
      ${renderCapitalGuardPanel(session, order)}
      ${renderRegimeSessionPanel(session)}
      ${renderPreTradeContractPanel(session)}
      ${renderSloganBox(session)}
      ${renderRiskWarning(session)}

      <details class="compact-details">
        <summary>Vì sao app đề xuất như vậy?</summary>
        <p class="reason">Lý do: ${escapeHtml(session.reason)}</p>
        <ol class="steps">
          <li>Chỉ dùng ${escapeHtml(SYMBOL_CONFIG.label)} Futures, ký quỹ cô lập, x${escapeHtml(TRADING_CONFIG.leverage)}.</li>
          <li>EXECUTABLE: có thể xem xét nhập Limit đúng vùng, không Market.</li>
          <li>WAIT_TRIGGER: chờ giá về vùng, không chase.</li>
          <li>PLAN_ONLY hoặc LOCKED_RISK: có bản đồ để nhìn, ưu tiên không xuống tiền.</li>
          <li>Chờ đến ${escapeHtml(actionTime)}. Không khớp thì hủy. Không dời SL.</li>
        </ol>
      </details>
    </section>

    <details class="panel compact-details">
      <summary>Phiếu BTC/USDT 20X đầy đủ</summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Cặp</th>
              <th>Action</th>
              <th>Hướng</th>
              <th class="price">Entry Zone</th>
              <th class="price">Limit</th>
              <th class="price">TP1</th>
              <th class="price">TP2</th>
              <th class="price">SL</th>
              <th class="price">Ký quỹ</th>
              <th class="price">Vị thế x20</th>
              <th class="price">TP2 Plan PnL</th>
              <th class="price">SL PnL</th>
              <th class="price">R:R</th>
            </tr>
          </thead>
          <tbody>${renderOrderRow(order)}</tbody>
        </table>
      </div>
      <p class="muted-text">No Chase: nếu giá đã vượt vùng bất lợi quá ${escapeHtml(session.rules.noChasePct)}% so với Limit, phiếu hết hiệu lực. Giá chạy mất thì để nó chạy.</p>
    </details>

    <details class="panel compact-details">
      <summary>Rủi ro ước tính</summary>
      <div class="risk-grid">
        <div class="metric"><span>Vốn ký quỹ/lệnh</span><strong>${escapeHtml(order.marginUsdt)} USDT</strong></div>
        <div class="metric"><span>Vị thế danh nghĩa x20</span><strong>${escapeHtml(order.notionalUsdt)} USDT</strong></div>
        <div class="metric"><span>Ước lượng BTC</span><strong>${escapeHtml(order.btcQty)} BTC</strong></div>
        <div class="metric"><span>Đòn bẩy</span><strong>x${escapeHtml(order.leverage)} · ${escapeHtml(order.marginMode)}</strong></div>
        <div class="metric"><span>Nếu TP1 + BE</span><strong class="win">${escapeHtml(order.netTp1Be)} USDT · ${escapeHtml(order.marginRoiTp1)}</strong></div>
        <div class="metric"><span>Nếu TP2 kế hoạch</span><strong class="win">${escapeHtml(order.netTp2Plan)} USDT · ${escapeHtml(order.marginRoiTp2Plan)}</strong></div>
        <div class="metric"><span>Nếu SL</span><strong class="loss">${escapeHtml(order.netLoss)} USDT · ${escapeHtml(order.marginRoiLoss)}</strong></div>
        <div class="metric"><span>Dùng quỹ futures</span><strong>${escapeHtml(order.fundUsage)}</strong></div>
        <div class="metric"><span>Lỗ SL so với quỹ futures</span><strong class="loss">${escapeHtml(order.fundRisk)}</strong></div>
        <div class="metric"><span>Phí ước tính</span><strong>${escapeHtml(order.feeEstimate)} USDT</strong></div>
      </div>
      <p class="muted-text">20x không tha lỗi dời SL. Chạm TP1 thì bớt tham; chạm SL thì rời bàn. Không DCA futures. Không martingale. Không tăng size sau lỗ.</p>
    </details>

    <details class="panel compact-details">
      <summary>Theo dõi thủ công</summary>
      <div class="follow-grid">${renderFollowRow(order, 0)}</div>
    </details>

    <details class="panel compact-details">
      <summary>Morning Review / ghi kết quả sáng hôm sau</summary>
      ${renderMorningReviewPanel(session)}
      ${renderDayResultPanel(session)}
    </details>

    ${paperPanel ? `<details class="panel compact-details"><summary>Giấy thử TP1/TP2/SL</summary>${paperPanel}</details>` : ""}
    ${renderMistakeCounterPanel()}
    ${renderWeeklyReviewPanel()}
    ${renderScoreDetails(session)}
  `;

  bindStatusButtons();
  bindDayResultControls();
  bindCapitalControls();
  bindCopyTicketControls(session, order);
}

function renderCapitalGuardPanel(session, order) {
  const settings = getCapitalSettings();
  const guard = session.analysis && session.analysis.disciplineGuard ? session.analysis.disciplineGuard : getDisciplineGuard(new Date(), settings, session.grade);
  const fundUsage = settings.futuresFundUsdt > 0 ? settings.marginPerTradeUsdt / settings.futuresFundUsdt : 0;
  const guardClass = guard.active ? "guard-bad" : fundUsage >= 0.5 ? "guard-warn" : "guard-good";
  const oneTradeChecked = settings.oneTradePerDay ? "checked" : "";
  return `
    <details class="panel compact-details capital-guard" open>
      <summary>Kill Switch & Capital Guard</summary>
      <div class="guard-banner ${guardClass}">
        <strong>${guard.active ? "ĐANG KHÓA HÀNH ĐỘNG" : "PHANH VỐN ĐANG BẬT"}</strong>
        <p>${escapeHtml(guard.reason)} Margin/lệnh đang dùng ${escapeHtml(formatPercent(fundUsage))} quỹ futures.</p>
      </div>
      <div class="capital-form">
        <label><span>Quỹ futures</span><input id="futuresFundInput" type="number" min="20" step="1" value="${escapeHtml(settings.futuresFundUsdt)}" /></label>
        <label><span>Margin/lệnh</span><input id="marginPerTradeInput" type="number" min="5" step="1" value="${escapeHtml(settings.marginPerTradeUsdt)}" /></label>
        <label><span>Daily Max Loss</span><input id="dailyMaxLossInput" type="number" min="1" step="1" value="${escapeHtml(settings.dailyMaxLossUsdt)}" /></label>
        <label><span>Weekly Max Loss</span><input id="weeklyMaxLossInput" type="number" min="5" step="1" value="${escapeHtml(settings.weeklyMaxLossUsdt)}" /></label>
        <label><span>BTC Sweep % lời tuần</span><input id="btcSweepPercentInput" type="number" min="10" max="80" step="5" value="${escapeHtml(settings.btcSweepPercent)}" /></label>
        <label class="check-label"><input id="oneTradePerDayInput" type="checkbox" ${oneTradeChecked} /> One Trade Per Day</label>
        <label class="check-label"><input id="paperModeInput" type="checkbox" ${settings.paperMode ? "checked" : ""} /> Paper Mode mặc định</label>
      </div>
      <button id="saveCapitalSettingsBtn" class="ghost-btn" type="button">Lưu phanh vốn</button>
      <p class="muted-text">Một lệnh x20 không được lớn hơn hệ thần kinh của ông. Quỹ 50–100 USDT thì thua một SL là nghỉ, không vào lại.</p>
    </details>
  `;
}

function renderFocusTicket(session, order) {
  const isLocked = session.action === "LOCKED_RISK";
  const canTrade = !isLocked && session.action !== "PLAN_ONLY";
  const posture = session.action === "EXECUTABLE"
    ? "CÓ THỂ XEM XÉT VÀO LIMIT"
    : session.action === "WAIT_TRIGGER"
      ? "CHỜ TRIGGER, CHƯA CHASE"
      : session.action === "PLAN_ONLY"
        ? "PHIẾU YẾU, CHỈ VÀO NẾU ÔNG TỰ CHẤP NHẬN"
        : "KHÓA RỦI RO, KHÔNG VÀO";
  const executeLine = canTrade
    ? "Có thể nhập tay nếu chấp nhận rủi ro. Không Market, không dời SL. TP1 chốt một nửa, phần còn lại để TP2."
    : isLocked
      ? "App vẫn tính sẵn phiếu 50 USDT để ông nhìn lời/lỗ, nhưng trạng thái là KHÓA RỦI RO. Không nhập OKX."
      : "Có phiếu 50 USDT để nhìn bài toán, nhưng ưu tiên không xuống tiền khi Grade yếu.";

  return `
    <div class="focus-ticket ${canTrade ? "" : "focus-ticket-muted"}">
      <div class="focus-title">
        <span>VỊ THẾ ĐỀ XUẤT</span>
        <strong>${escapeHtml(posture)}</strong>
        <button id="copyTicketBtn" class="copy-ticket-btn" type="button">Copy phiếu OKX</button>
      </div>

      <div class="focus-grid compact-position-grid">
        <div class="focus-main ${session.decision === "LONG" ? "decision-long" : "decision-short"}">
          ${escapeHtml(order.direction)}
        </div>
        <div class="focus-metric"><span>Vốn ký quỹ</span><strong>${escapeHtml(order.marginUsdt)} USDT</strong></div>
        <div class="focus-metric"><span>Lão khuyến nghị</span><strong>${escapeHtml(order.recommendedMarginUsdt)} USDT</strong></div>
        <div class="focus-metric"><span>Vị thế x20</span><strong>${escapeHtml(order.notionalUsdt)} USDT</strong></div>
        <div class="focus-metric"><span>Ước lượng BTC</span><strong>${escapeHtml(order.btcQty)} BTC</strong></div>
        <div class="focus-metric"><span>Entry zone</span><strong>${escapeHtml(order.entryZone)}</strong></div>
      </div>

      <div class="price-strip" aria-label="Giá Limit TP1 TP2 và SL">
        <div class="price-tile limit-tile">
          <span>LIMIT</span>
          <strong>${escapeHtml(order.entry)}</strong>
          <small>Chỉ đặt Limit, không Market</small>
        </div>
        <div class="price-tile tp1-tile">
          <span>TP1 · CHỐT ${escapeHtml(order.tp1CloseRatio)}</span>
          <strong>${escapeHtml(order.tp1)}</strong>
          <small>${escapeHtml(order.tp1Pct)} · ${escapeHtml(order.netTp1Be)} USDT nếu phần còn lại BE</small>
        </div>
        <div class="price-tile tp2-tile">
          <span>TP2 · CHỐT PHẦN CÒN LẠI</span>
          <strong>${escapeHtml(order.tp2)}</strong>
          <small>${escapeHtml(order.tp2Pct)} · kế hoạch ${escapeHtml(order.netTp2Plan)} USDT</small>
        </div>
        <div class="price-tile sl-tile">
          <span>SL · CẮT LỖ</span>
          <strong>${escapeHtml(order.sl)}</strong>
          <small>${escapeHtml(order.slPct)} · ${escapeHtml(order.netLoss)} USDT</small>
        </div>
      </div>

      <div class="survival-pnl-grid">
        <div class="pnl-tile"><span>TP1/TP2/SL Mode</span><strong>${escapeHtml(order.tpSlMode)}</strong></div>
        <div class="pnl-tile"><span>TP1 + BE</span><strong class="win">${escapeHtml(order.netTp1Be)} USDT · ${escapeHtml(order.marginRoiTp1)}</strong></div>
        <div class="pnl-tile"><span>TP2 kế hoạch</span><strong class="win">${escapeHtml(order.netTp2Plan)} USDT · ${escapeHtml(order.marginRoiTp2Plan)}</strong></div>
        <div class="pnl-tile"><span>Lỗ nếu SL</span><strong class="loss">${escapeHtml(order.netLoss)} USDT · ${escapeHtml(order.marginRoiLoss)}</strong></div>
        <div class="pnl-tile"><span>No chase sau</span><strong>${escapeHtml(order.invalidPrice)}</strong></div>
        <div class="pnl-tile"><span>R:R kế hoạch</span><strong>${escapeHtml(order.rr)}R</strong></div>
      </div>

      <p class="focus-note"><strong>Luật sống lâu:</strong> ${escapeHtml(order.survivalRule)} ${escapeHtml(executeLine)}</p>
    </div>
  `;
}

function getDecisionClass(session) {
  if (session.action === "LOCKED_RISK") return "decision-flat";
  if (session.action === "PLAN_ONLY") return "decision-flat";
  return session.decision === "LONG" ? "decision-long" : "decision-short";
}

function renderSloganBox(session) {
  return `
    <div class="slogan-box">
      <strong>Lão nhắc:</strong>
      <p>${escapeHtml(session.slogan)}</p>
    </div>
  `;
}

function renderRiskWarning(session) {
  if (session.action === "LOCKED_RISK") {
    return `
      <div class="warning-box">
        <strong>LOCKED_RISK</strong>
        <p>App vẫn tính sẵn phiếu 50 USDT để ông nhìn lời/lỗ, nhưng trạng thái khóa nghĩa là không nhập lệnh thật. Không phá khóa bằng cảm xúc.</p>
      </div>
    `;
  }
  if (session.action === "PLAN_ONLY") {
    return `
      <div class="warning-box">
        <strong>PLAN_ONLY</strong>
        <p>Phiếu này không phải tín hiệu đẹp. Dùng để học bối cảnh, không dùng để ép lệnh.</p>
      </div>
    `;
  }
  if (session.action === "WAIT_TRIGGER") {
    return `
      <div class="warning-box soft">
        <strong>WAIT_TRIGGER</strong>
        <p>Chỉ hợp lệ nếu giá về vùng entry. Nếu giá chạy khỏi vùng, phiếu hết hạn. Không chase.</p>
      </div>
    `;
  }
  return `
    <div class="warning-box soft">
      <strong>EXECUTABLE</strong>
      <p>Được phép xem xét thủ công, không phải lệnh bắt buộc. Vào nhỏ, đúng Limit, đúng SL.</p>
    </div>
  `;
}

function renderMorningReviewPanel(session) {
  return `
    <section class="panel morning-panel">
      <h3>MORNING REVIEW</h3>
      <p class="muted-text">Sáng hôm sau ghi lại: có vào đúng kế hoạch không, TP1/TP2/SL/Manual Close/Not Filled/Still Open, PnL tay, có dời SL không, có FOMO không. Nếu lỗ hoặc phá luật, bật cooldown cho phiên tiếp theo.</p>
      <div class="check-grid">
        <span>□ Vào đúng vùng entry</span>
        <span>□ Không dời SL</span>
        <span>□ Không vào lại sau SL</span>
        <span>□ Không gồng lỗ</span>
      </div>
    </section>
  `;
}

function renderOrderRow(order) {
  return `
    <tr>
      <td>${escapeHtml(order.symbol)}</td>
      <td>${escapeHtml(order.action)}</td>
      <td>${escapeHtml(order.direction)}</td>
      <td class="price">${escapeHtml(order.entryZone)}</td>
      <td class="price">${escapeHtml(order.entry)}</td>
      <td class="price win">${escapeHtml(order.tp1)} <small>${escapeHtml(order.tp1Pct)}</small></td>
      <td class="price win">${escapeHtml(order.tp2)} <small>${escapeHtml(order.tp2Pct)}</small></td>
      <td class="price loss">${escapeHtml(order.sl)} <small>${escapeHtml(order.slPct)}</small></td>
      <td class="price">${escapeHtml(order.marginUsdt)} USDT</td>
      <td class="price">${escapeHtml(order.notionalUsdt)} USDT</td>
      <td class="price win">${escapeHtml(order.netTp2Plan)} USDT</td>
      <td class="price loss">${escapeHtml(order.netLoss)} USDT</td>
      <td class="price">${escapeHtml(order.rr)}R</td>
    </tr>
  `;
}

function renderFollowRow(order, index) {
  const reviewText = order.reviewAt ? `<p class="review-note">Xem lại lúc ${escapeHtml(formatTime(order.reviewAt))}</p>` : "";
  return `
    <div class="follow-row">
      <div class="follow-head">
        <strong>${escapeHtml(order.symbol)} · ${escapeHtml(order.direction)}</strong>
        <span class="pill muted">${escapeHtml(order.status)}</span>
      </div>
      <div class="follow-actions">
        ${STATUS_OPTIONS.map((status) => `
          <button class="small-btn" type="button" data-order-index="${index}" data-status="${escapeHtml(status)}">${escapeHtml(status)}</button>
        `).join("")}
      </div>
      ${reviewText}
    </div>
  `;
}

function renderDayResultPanel(session) {
  const record = getHistoryRecord(session.dayId || getLocalDateId(session.createdAt));
  const selectedResult = record ? record.result : "NONE";
  const netPnl = record && Number.isFinite(Number(record.netPnl)) ? String(record.netPnl) : "";
  const note = record ? record.note : "";
  const emotion = record ? record.emotion || "" : "";

  return `
    <section class="panel day-result-panel">
      <h3>Kết quả ngày</h3>
      <p class="muted-text">App không đọc tài khoản OKX. Ông tự ghi kết quả để app còn biết khi nào phải khóa tay.</p>
      <div class="form-grid">
        <label>
          <span>Kết quả</span>
          <select id="dayResultSelect">
            ${RESULT_OPTIONS.map((option) => `
              <option value="${escapeHtml(option.value)}" ${option.value === selectedResult ? "selected" : ""}>${escapeHtml(option.label)}</option>
            `).join("")}
          </select>
        </label>
        <label>
          <span>Net PnL USDT</span>
          <input id="dayNetPnlInput" type="number" step="0.01" inputmode="decimal" value="${escapeHtml(netPnl)}" placeholder="0" />
        </label>
        <label>
          <span>Cảm xúc lúc vào lệnh</span>
          <select id="dayEmotionSelect">
            ${["", "Bình tĩnh", "FOMO", "Trả thù", "Vào cho có", "Đúng kế hoạch"].map((item) => `<option value="${escapeHtml(item)}" ${item === emotion ? "selected" : ""}>${escapeHtml(item || "Chưa ghi")}</option>`).join("")}
          </select>
        </label>
      </div>
      ${renderMistakeCheckboxes(record)}
      <label class="full-label">
        <span>Ghi chú bài học</span>
        <textarea id="dayNoteInput" rows="3" maxlength="360" placeholder="Ví dụ: đợi đúng trigger, bỏ qua vì PLAN_ONLY, hoặc phá luật dời SL.">${escapeHtml(note)}</textarea>
      </label>
      <button id="saveDayResultBtn" class="ghost-btn" type="button">Lưu kết quả ngày</button>
    </section>
  `;
}

function renderScoreDetails(session) {
  const analysis = session.analysis;
  const closedAt = analysis.closedAt ? formatDateTime(analysis.closedAt) : "Chưa có phiên mới";
  return `
    <details>
      <summary>Chi tiết kỹ thuật 4H</summary>
      <div class="score-grid">
        <div class="metric"><span>Fitness</span><strong>${escapeHtml(session.fitness)}%</strong></div>
        <div class="metric"><span>Grade</span><strong>${escapeHtml(session.grade)}</strong></div>
        <div class="metric"><span>Long / Short</span><strong>${analysis.longScore}/8 · ${analysis.shortScore}/8</strong></div>
        <div class="metric"><span>Nến BTC đã đóng</span><strong>${escapeHtml(closedAt)}</strong></div>
        <div class="metric"><span>Data</span><strong>${escapeHtml(analysis.dataFreshness.status)} · ${escapeHtml(analysis.dataFreshness.ageHours)}h</strong></div>
        <div class="metric"><span>Regime</span><strong>${escapeHtml(analysis.marketRegime)}</strong></div>
      </div>
      <ul class="tech-list">
        <li>V2.0 FINAL chỉ dùng BTC/USDT Futures, Isolated, x20, Limit, Survival TP1/TP2, Command Center, Market Regime Pro, Session Quality, Pre-Trade Contract, Capital Ladder, Mistake Counter, Weekly Review & BTC Sweep, Paper Mode; không auto trade, không private API.</li>
        <li>Always Plan: app luôn dựng 01 phiếu phân tích BTC. Action quyết định có nên xuống tiền hay chỉ xem.</li>
        <li>Fitness 100 điểm gồm: xu hướng 25, momentum 15, EMA distance 10, ATR 15, volume 10, không extreme 10, Long/Short gap 10, data fresh 5.</li>
        <li>Capital Guard: quỹ futures và margin/lệnh lưu local trên máy. x20 hiển thị notional, PnL, % lỗ so với quỹ. LOCKED_RISK vẫn tính lời/lỗ giả định nhưng không khuyến nghị nhập lệnh thật.</li>
        <li>BTC close ${analysis.btc.close}, EMA20 ${analysis.btc.ema20}, EMA50 ${analysis.btc.ema50}, EMA50 slope ${escapeHtml(analysis.btc.ema50Slope)}.</li>
        <li>BTC core Long/Short: ${analysis.btcLongCoreScore}/5 · ${analysis.btcShortCoreScore}/5. Khoảng cách EMA20: ${analysis.filters.distanceFromEma20}%.</li>
        <li>ATR% ${analysis.filters.btcAtrPct}% · vùng chuẩn ${analysis.filters.atrPctMin}% đến ${analysis.filters.atrPctMax}% · volume ratio ${analysis.filters.volumeRatio}x.</li>
        <li>Cooldown: ${analysis.filters.cooldownActive ? "Đang bật" : "Không bật"}. ${escapeHtml(analysis.filters.cooldownReason)}</li>
        <li>Extreme candle: ${analysis.extreme ? "Có" : "Không"}. Hard veto: ${escapeHtml(analysis.hardVeto || "Không")}</li>
      </ul>
    </details>
  `;
}

function bindCapitalControls() {
  const saveButton = document.querySelector("#saveCapitalSettingsBtn");
  if (!saveButton) return;
  saveButton.addEventListener("click", () => {
    const futuresFundInput = document.querySelector("#futuresFundInput");
    const marginPerTradeInput = document.querySelector("#marginPerTradeInput");
    const dailyMaxLossInput = document.querySelector("#dailyMaxLossInput");
    const weeklyMaxLossInput = document.querySelector("#weeklyMaxLossInput");
    const btcSweepPercentInput = document.querySelector("#btcSweepPercentInput");
    const oneTradeInput = document.querySelector("#oneTradePerDayInput");
    const paperModeInput = document.querySelector("#paperModeInput");
    const next = {
      futuresFundUsdt: futuresFundInput ? Number(futuresFundInput.value) : CAPITAL_DEFAULTS.futuresFundUsdt,
      marginPerTradeUsdt: marginPerTradeInput ? Number(marginPerTradeInput.value) : CAPITAL_DEFAULTS.marginPerTradeUsdt,
      dailyMaxLossUsdt: dailyMaxLossInput ? Number(dailyMaxLossInput.value) : CAPITAL_DEFAULTS.dailyMaxLossUsdt,
      weeklyMaxLossUsdt: weeklyMaxLossInput ? Number(weeklyMaxLossInput.value) : CAPITAL_DEFAULTS.weeklyMaxLossUsdt,
      btcSweepPercent: btcSweepPercentInput ? Number(btcSweepPercentInput.value) : CAPITAL_DEFAULTS.btcSweepPercent,
      paperMode: paperModeInput ? paperModeInput.checked : false,
      oneTradePerDay: oneTradeInput ? oneTradeInput.checked : true
    };
    if (!Number.isFinite(next.futuresFundUsdt) || !Number.isFinite(next.marginPerTradeUsdt) || !Number.isFinite(next.dailyMaxLossUsdt)) {
      showMessage("Chưa lưu phanh vốn", "Các ô vốn phải là số hợp lệ.", "bad");
      return;
    }
    saveCapitalSettings(next);
    if (currentSession) {
      const ticker = currentSession.prices && currentSession.prices.BTCUSDT ? Number(currentSession.prices.BTCUSDT) : Number(currentSession.orders[0].entry);
      const marginUsdt = getMarginUsdt(currentSession.action, currentSession.grade);
      const positionUsdt = getPositionUsdt(marginUsdt);
      currentSession.orders = [buildOrder(currentSession.analysis, ticker, marginUsdt, positionUsdt)];
      currentSession.rules = {
        ...currentSession.rules,
        marginUsdt,
        positionUsdt,
        notionalUsdt: positionUsdt,
        futuresFundUsdt: getCapitalSettings().futuresFundUsdt,
        dailyMaxLossUsdt: getCapitalSettings().dailyMaxLossUsdt,
        weeklyMaxLossUsdt: getCapitalSettings().weeklyMaxLossUsdt,
        btcSweepPercent: getCapitalSettings().btcSweepPercent,
        paperMode: getCapitalSettings().paperMode,
        oneTradePerDay: getCapitalSettings().oneTradePerDay
      };
      currentSession.updatedAt = new Date().toISOString();
      saveSession(currentSession);
      upsertHistoryFromSession(currentSession, getHistoryRecord(currentSession.dayId));
    }
    showMessage("Đã lưu phanh vốn", "Phiếu đã tính lại theo quỹ futures và margin/lệnh mới.", "");
    renderSession();
    renderHistory();
  });
}

function bindCopyTicketControls(session, order) {
  const button = document.querySelector("#copyTicketBtn");
  if (!button) return;
  button.addEventListener("click", async () => {
    const text = buildCopyTicketText(session, order);
    const ok = await copyText(text);
    button.textContent = ok ? "Đã copy" : "Copy lỗi";
    window.setTimeout(() => { button.textContent = "Copy phiếu OKX"; }, 1600);
  });
}

function buildCopyTicketText(session, order) {
  return [
    "FTOKX V2.0 FINAL · BTC/USDT Futures · Isolated x20",
    `Action: ${session.action} · Grade ${session.grade} · Fitness ${session.fitness}%`,
    `Hướng: ${order.direction}`,
    `Margin: ${order.marginUsdt} USDT`,
    `Vị thế danh nghĩa: ${order.notionalUsdt} USDT`,
    `Limit: ${order.entry}`,
    `Entry zone: ${order.entryZone}`,
    `TP1: ${order.tp1} (${order.tp1Pct}) — chốt ${order.tp1CloseRatio}`,
    `TP2: ${order.tp2} (${order.tp2Pct}) — chốt phần còn lại`,
    `SL: ${order.sl} (${order.slPct})`,
    `No chase sau: ${order.invalidPrice}`,
    `Kế hoạch PnL: TP1+BE ${order.netTp1Be} USDT | TP2 ${order.netTp2Plan} USDT | SL ${order.netLoss} USDT`,
    `Regime: ${session.analysis.marketRegimePro ? session.analysis.marketRegimePro.label : session.marketRegime}`,
    `Session: ${session.analysis.sessionQuality ? session.analysis.sessionQuality.label : "Chưa phân loại"}`,
    `Lão khuyến nghị margin: ${order.recommendedMarginUsdt} USDT`,
    "Contract: Limit, không dời SL, không vào lại sau SL, không dùng tiền DCA BTC để gỡ futures.",
    "Luật: không Market, không DCA futures, không martingale, không tăng size sau lỗ."
  ].join("\n");
}

async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.warn("Clipboard API failed", error);
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "readonly");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return ok;
  } catch (error) {
    console.warn("Fallback copy failed", error);
    return false;
  }
}


function getContractState() {
  const state = {};
  CONTRACT_ITEMS.forEach((item) => {
    const input = document.querySelector(`#${item.id}`);
    state[item.id] = Boolean(input && input.checked);
  });
  return state;
}

function isContractComplete() {
  const state = getContractState();
  return CONTRACT_ITEMS.every((item) => state[item.id]);
}

function canMarkLimitPlaced(session) {
  if (!session) return false;
  if (session.action === "LOCKED_RISK" || session.action === "PLAN_ONLY") {
    showMessage("Chưa được đánh dấu đặt Limit", "PLAN_ONLY/LOCKED_RISK chỉ là bản đồ. Không biến cảnh báo thành lệnh thật.", "bad");
    return false;
  }
  if (!isContractComplete()) {
    showMessage("Thiếu Pre-Trade Contract", "Tick đủ 5 cam kết trước khi đánh dấu Đã đặt Limit.", "bad");
    return false;
  }
  return true;
}

function renderMistakeCheckboxes(record) {
  const selected = new Set(Array.isArray(record && record.mistakes) ? record.mistakes : []);
  return `
    <div class="mistake-box">
      <strong>Đếm lỗi kỷ luật</strong>
      <p class="muted-text">Lãi/lỗ chưa đủ. Trader già phải biết mình có phá luật không.</p>
      <div class="mistake-grid">
        ${MISTAKE_OPTIONS.map((item) => `
          <label class="check-label"><input type="checkbox" class="mistake-input" value="${escapeHtml(item.value)}" ${selected.has(item.value) ? "checked" : ""} /> ${escapeHtml(item.label)}</label>
        `).join("")}
      </div>
    </div>`;
}

function getCheckedMistakes() {
  return Array.from(document.querySelectorAll(".mistake-input:checked")).map((input) => input.value);
}

function computeSweepPlanForPnl(netPnl) {
  const pnl = Number(netPnl || 0);
  if (pnl <= 0) return 0;
  const percent = getCapitalSettings().btcSweepPercent / 100;
  return Number((pnl * percent).toFixed(2));
}

function renderCommandBadgesPanel(session, order) {
  const settings = getCapitalSettings();
  return `
    <section class="command-badges">
      <div><span>Mode</span><strong>${settings.paperMode ? "PAPER FIRST" : "REAL MANUAL"}</strong></div>
      <div><span>Regime</span><strong>${escapeHtml(session.analysis.marketRegimePro ? session.analysis.marketRegimePro.label : session.marketRegime)}</strong></div>
      <div><span>Session</span><strong>${escapeHtml(session.analysis.sessionQuality ? session.analysis.sessionQuality.label : "Chưa phân loại")}</strong></div>
      <div><span>Ladder</span><strong>${escapeHtml(order.recommendedMarginUsdt)} USDT</strong></div>
    </section>`;
}

function renderRegimeSessionPanel(session) {
  const regime = session.analysis.marketRegimePro || { label: session.marketRegime, playbook: "Chỉ vào khi kế hoạch rõ.", score: 0 };
  const quality = session.analysis.sessionQuality || { label: "Chưa phân loại", advice: "Giữ kỷ luật.", score: 0 };
  return `
    <details class="panel compact-details pro-panel">
      <summary>Market Regime Pro & Session Quality</summary>
      <div class="summary-grid">
        <div class="metric"><span>Regime</span><strong>${escapeHtml(regime.label)}</strong></div>
        <div class="metric"><span>Regime Score</span><strong>${escapeHtml(regime.score)}</strong></div>
        <div class="metric"><span>Session</span><strong>${escapeHtml(quality.label)}</strong></div>
        <div class="metric"><span>Session Score</span><strong>${escapeHtml(quality.score)}</strong></div>
      </div>
      <p><strong>Playbook:</strong> ${escapeHtml(regime.playbook)}</p>
      <p><strong>Giờ giao dịch:</strong> ${escapeHtml(quality.advice)}</p>
    </details>`;
}

function renderPreTradeContractPanel(session) {
  const disabledText = session.action === "LOCKED_RISK" || session.action === "PLAN_ONLY"
    ? "PLAN_ONLY/LOCKED_RISK không nên đánh dấu lệnh thật. Contract vẫn để nhắc tay."
    : "Tick đủ trước khi đánh dấu Đã đặt Limit.";
  return `
    <details class="panel compact-details contract-panel" open>
      <summary>Pre-Trade Contract</summary>
      <p class="muted-text">${escapeHtml(disabledText)}</p>
      <div class="contract-grid">
        ${CONTRACT_ITEMS.map((item) => `
          <label class="check-label"><input id="${escapeHtml(item.id)}" type="checkbox" /> ${escapeHtml(item.text)}</label>
        `).join("")}
      </div>
    </details>`;
}

function renderMistakeCounterPanel() {
  const history = loadHistory();
  const last30 = computeStats(history, 30);
  return `
    <details class="panel compact-details mistake-counter-panel">
      <summary>Mistake Counter</summary>
      <div class="summary-grid">
        <div class="metric"><span>Lỗi 30 ngày</span><strong class="${last30.mistakes > 0 ? "loss" : "win"}">${last30.mistakes}</strong></div>
        <div class="metric"><span>Quyền tăng vốn</span><strong>${last30.mistakes === 0 && last30.pnl >= 0 ? "Có thể giữ" : "Không tăng"}</strong></div>
      </div>
      <p class="muted-text">Nếu tuần có lỗi kỷ luật, không tăng margin. Nếu lỗi lặp lại, chuyển Paper Mode trước khi dùng tiền thật.</p>
    </details>`;
}

function renderWeeklyReviewPanel() {
  const settings = getCapitalSettings();
  const stats = computeStats(loadHistory(), 7);
  const status = stats.pnl <= -Math.abs(settings.weeklyMaxLossUsdt) ? "KHÓA TUẦN" : stats.mistakes > 0 ? "KHÔNG TĂNG VỐN" : "BÌNH THƯỜNG";
  const sweep = stats.pnl > 0 ? Number((stats.pnl * settings.btcSweepPercent / 100).toFixed(2)) : 0;
  return `
    <details class="panel compact-details weekly-panel">
      <summary>Weekly Review & BTC Sweep</summary>
      <div class="summary-grid">
        <div class="metric"><span>Trạng thái tuần</span><strong>${escapeHtml(status)}</strong></div>
        <div class="metric"><span>PnL 7 ngày</span><strong class="${stats.pnl >= 0 ? "win" : "loss"}">${formatSigned(stats.pnl)} USDT</strong></div>
        <div class="metric"><span>Lỗi kỷ luật</span><strong>${stats.mistakes}</strong></div>
        <div class="metric"><span>Quét sang BTC</span><strong class="win">${formatUsdt(sweep)} USDT</strong></div>
      </div>
      <p class="muted-text">Nếu futures có lời, quét ${escapeHtml(settings.btcSweepPercent)}% lợi nhuận sang BTC. Nếu tuần lỗ hoặc phá luật, không nạp thêm futures.</p>
    </details>`;
}

function bindStatusButtons() {
  document.querySelectorAll("[data-order-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.orderIndex);
      const status = button.dataset.status;
      updateOrderStatus(index, status);
    });
  });
}

function bindDayResultControls() {
  const resultSelect = document.querySelector("#dayResultSelect");
  const pnlInput = document.querySelector("#dayNetPnlInput");
  const saveButton = document.querySelector("#saveDayResultBtn");
  if (!resultSelect || !pnlInput || !saveButton) {
    return;
  }

  resultSelect.addEventListener("change", () => {
    const option = RESULT_OPTIONS.find((item) => item.value === resultSelect.value);
    if (option && option.pnl !== "") {
      pnlInput.value = option.pnl;
    }
  });
  saveButton.addEventListener("click", saveDayResult);
}

function updateOrderStatus(index, status) {
  if (!currentSession || !currentSession.orders[index]) {
    return;
  }

  const now = new Date();
  const order = currentSession.orders[index];
  if (status === "Đã đặt Limit" && !canMarkLimitPlaced(currentSession)) {
    return;
  }
  order.status = status;

  if (status === "Đã đặt Limit") {
    order.reviewAt = new Date(now.getTime() + TRADING_CONFIG.waitMinutes * 60 * 1000).toISOString();
  } else if (status === "Đã khớp") {
    order.reviewAt = new Date(now.getTime() + TRADING_CONFIG.reviewAfterFillMinutes * 60 * 1000).toISOString();
  } else if (status === "Không khớp đã hủy" || status === "Đã TP" || status === "Đã SL") {
    order.reviewAt = "";
  }

  currentSession.updatedAt = now.toISOString();
  saveSession(currentSession);
  upsertHistoryFromSession(currentSession, getHistoryRecord(currentSession.dayId));
  renderSession();
  renderHistory();
}

function saveDayResult() {
  if (!currentSession) {
    return;
  }

  const resultSelect = document.querySelector("#dayResultSelect");
  const pnlInput = document.querySelector("#dayNetPnlInput");
  const noteInput = document.querySelector("#dayNoteInput");
  const emotionSelect = document.querySelector("#dayEmotionSelect");
  const result = resultSelect ? resultSelect.value : "NONE";
  const netPnlRaw = pnlInput ? pnlInput.value.trim() : "";
  const netPnl = netPnlRaw === "" ? 0 : Number(netPnlRaw);

  if (!Number.isFinite(netPnl)) {
    showMessage("Chưa lưu kết quả ngày", "Net PnL phải là số, ví dụ 1.25 hoặc -0.75.", "bad");
    return;
  }

  const now = new Date().toISOString();
  const existing = getHistoryRecord(currentSession.dayId);
  const record = buildHistoryRecord(currentSession, existing);
  record.result = result;
  record.netPnl = Number(netPnl.toFixed(2));
  record.note = noteInput ? noteInput.value.trim() : "";
  record.emotion = emotionSelect ? emotionSelect.value : "";
  record.mistakes = getCheckedMistakes();
  record.paperMode = getCapitalSettings().paperMode;
  record.btcSweepPlannedUsdt = computeSweepPlanForPnl(record.netPnl);
  record.finalStatus = resolveFinalStatus(record.decision, result);
  record.updatedAt = now;

  saveHistory(upsertHistoryRecord(record));
  showMessage("Đã lưu kết quả ngày", netPnl < 0 ? "Đã ghi lỗ. Phiên sau phải để kỷ luật ngồi ghế lái." : "Lịch sử đã cập nhật. Thắng nhỏ cũng phải giữ luật.", netPnl < 0 ? "bad" : "");
  renderHistory();
}

function resolveFinalStatus(decision, result) {
  if (result === "NONE") {
    return "OPEN";
  }
  if (result === "SKIPPED" || result === "NOT_FILLED") {
    return "NO_TRADE";
  }
  return "DONE";
}

async function toggleWatchMode() {
  if (isWatchModeOn) {
    stopWatchMode();
    return;
  }
  await startWatchMode();
}

async function startWatchMode() {
  isWatchModeOn = true;
  saveSettingsData({ ...loadSettingsData(), watchModeHint: true, updatedAt: new Date().toISOString() });
  await unlockAlertAudio();
  await requestNotificationPermission();
  await requestWakeLock();
  updateWatchStatus("Đang bật. App tự quét mỗi 5 phút khi màn hình còn sáng.");
  els.watchToggleBtn.textContent = "TẮT LUÔN ONLINE";
  if (watchTimer) {
    window.clearInterval(watchTimer);
  }
  await runMarketUpdate({ source: "auto", confirmOverwrite: false });
  watchTimer = window.setInterval(() => {
    runMarketUpdate({ source: "auto", confirmOverwrite: false });
  }, AUTO_WATCH_INTERVAL_MS);
}

function stopWatchMode() {
  isWatchModeOn = false;
  if (watchTimer) {
    window.clearInterval(watchTimer);
    watchTimer = null;
  }
  releaseWakeLock();
  stopSignalAlert();
  updateWatchStatus("Đã tắt. Không còn tự quét 5 phút.");
  els.watchToggleBtn.textContent = "BẬT LUÔN ONLINE";
}

async function unlockAlertAudio() {
  try {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      return;
    }
    if (!audioContext) {
      audioContext = new AudioContextCtor();
    }
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
    playShortTone(620, 0.08, 0.03);
  } catch (error) {
    console.warn("Audio unlock failed", error);
  }
}

async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    return;
  }
  if (Notification.permission === "default") {
    try {
      await Notification.requestPermission();
    } catch (error) {
      console.warn("Notification permission failed", error);
    }
  }
}

async function requestWakeLock() {
  if (!("wakeLock" in navigator) || !navigator.wakeLock.request) {
    updateWatchStatus("Đang bật, nhưng trình duyệt không hỗ trợ giữ màn hình sáng. Hãy chỉnh điện thoại không tự khóa.");
    return;
  }
  try {
    wakeLock = await navigator.wakeLock.request("screen");
    wakeLock.addEventListener("release", () => {
      if (isWatchModeOn && document.visibilityState === "visible") {
        updateWatchStatus("Wake Lock vừa nhả. Nếu màn hình tắt, hãy bật lại app.");
      }
    });
  } catch (error) {
    console.warn("Wake lock failed", error);
    updateWatchStatus("Không giữ được màn hình sáng. Hãy cắm sạc và tắt tự khóa màn hình nếu cần.");
  }
}

function releaseWakeLock() {
  if (wakeLock && wakeLock.release) {
    wakeLock.release().catch(() => {});
  }
  wakeLock = null;
}

function handleVisibilityChange() {
  if (!isWatchModeOn) {
    return;
  }
  if (document.visibilityState === "visible") {
    requestWakeLock();
    updateWatchStatus("App đã hiện lại. Watch Mode tiếp tục quét 5 phút.");
  } else {
    updateWatchStatus("App đang bị đưa nền. Trình duyệt có thể giảm hoặc dừng quét.");
  }
}

function updateWatchStatus(message) {
  if (!els.watchStatus || !els.watchToggleBtn) {
    return;
  }
  if (message) {
    els.watchStatus.textContent = message;
    return;
  }
  const settings = loadSettingsData();
  els.watchStatus.textContent = settings.watchModeHint
    ? "Đã từng bật Watch Mode. Bấm BẬT LUÔN ONLINE để mở lại âm thanh/rung sau khi mở app."
    : "Chưa bật. Dùng điện thoại phụ: mở app, bật màn hình, cắm sạc nếu canh lâu.";
}

function maybeAlertSignal(session) {
  if (!session || session.action !== "EXECUTABLE") {
    return false;
  }
  const signature = buildAlertSignature(session);
  if (signature === lastAlertSignature || hasAlertedSignature(signature)) {
    return false;
  }
  lastAlertSignature = signature;
  const paperTest = createPaperTestFromSession(session, signature);
  recordAlertLog(session, signature, paperTest);
  startSignalAlert(session, paperTest);
  return true;
}

function buildAlertSignature(session) {
  return [session.dayId, session.decision, session.action, session.grade, session.analysis.closedAt].join("|");
}

function hasAlertedSignature(signature) {
  return loadAlertLog().some((item) => item.signature === signature);
}

function startSignalAlert(session, paperTest) {
  stopSignalAlert({ keepMessage: true });
  const direction = session.decision || "TEST";
  const title = direction === "TEST" ? "TEST CHUÔNG/RUNG" : `BTC 20X EXECUTABLE ${direction}`;
  const body = direction === "TEST"
    ? "Nếu nghe chuông hoặc máy rung là Watch Mode dùng được trên thiết bị này."
    : `Fitness ${session.fitness}% · Grade ${session.grade}. Đã tạo giấy thử TP1/TP2/SL giả lập. Không phải lệnh tự động.`;

  showMessage(title, body, direction === "TEST" ? "" : "alert");
  notifySignal(title, body);
  runSingleAlertPattern();
  alertStopTimer = window.setTimeout(() => stopSignalAlert({ keepMessage: true }), ALERT_ONCE_DURATION_MS + 500);
}

function testSignalAlert() {
  const fakeSession = {
    decision: "TEST",
    fitness: 100,
    grade: "A",
    analysis: { signalTier: "TEST_ALERT" }
  };
  startSignalAlert(fakeSession, null);
}

function stopSignalAlert(options = {}) {
  alertTimers.forEach((timerId) => window.clearTimeout(timerId));
  alertTimers = [];
  if (alertStopTimer) {
    window.clearTimeout(alertStopTimer);
    alertStopTimer = null;
  }
  if (navigator.vibrate) {
    navigator.vibrate(0);
  }
  if (!options.keepMessage && els.messageArea && els.messageArea.classList.contains("alert-box")) {
    hideMessage();
  }
}

function runSingleAlertPattern() {
  ringAndVibrate();
  for (let delay = ALERT_BURST_INTERVAL_MS; delay < ALERT_ONCE_DURATION_MS; delay += ALERT_BURST_INTERVAL_MS) {
    alertTimers.push(window.setTimeout(ringAndVibrate, delay));
  }
}

function ringAndVibrate() {
  playAlertTone();
  vibrateAlert();
}

function playAlertTone() {
  if (!audioContext) {
    return;
  }
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  playShortTone(880, 0.18, 0.08);
  window.setTimeout(() => playShortTone(660, 0.18, 0.08), 260);
  window.setTimeout(() => playShortTone(880, 0.24, 0.08), 520);
}

function playShortTone(frequency, duration, volume) {
  if (!audioContext) {
    return;
  }
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  const now = audioContext.currentTime;
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function vibrateAlert() {
  if (navigator.vibrate) {
    navigator.vibrate([700, 320, 700, 900]);
  }
}

function notifySignal(title, body) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }
  try {
    new Notification(title, {
      body,
      icon: "/icons/icon-192.png",
      tag: "ftokx-watch-signal",
      requireInteraction: true
    });
  } catch (error) {
    console.warn("Notification failed", error);
  }
}

function loadAlertLog() {
  try {
    const raw = localStorage.getItem(ALERT_LOG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Cannot read alert log", error);
    return [];
  }
}

function saveAlertLog(log) {
  const normalized = log
    .filter((item) => item && item.signature && item.createdAt)
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, ALERT_LOG_LIMIT);
  localStorage.setItem(ALERT_LOG_KEY, JSON.stringify(normalized));
}

function recordAlertLog(session, signature, paperTest) {
  const now = new Date().toISOString();
  const entry = {
    id: signature,
    signature,
    createdAt: now,
    dayId: session.dayId,
    decision: session.decision,
    action: session.action,
    grade: session.grade,
    fitness: session.fitness,
    closedAt: session.analysis.closedAt,
    paperTestId: paperTest ? paperTest.id : ""
  };
  const existing = loadAlertLog().filter((item) => item.signature !== signature);
  saveAlertLog([entry, ...existing]);
}

function clearAlertLog() {
  if (!window.confirm("Xóa toàn bộ log cảnh báo? Giấy thử TP1/TP2/SL vẫn giữ nguyên.")) {
    return;
  }
  localStorage.removeItem(ALERT_LOG_KEY);
  renderHistory();
}

function createPaperTestFromSession(session, signature) {
  if (!session || !Array.isArray(session.orders) || session.orders.length === 0) {
    return null;
  }
  const existing = getPaperTest(signature);
  if (existing) {
    return existing;
  }
  const now = new Date().toISOString();
  const test = {
    id: signature,
    signature,
    dayId: session.dayId,
    createdAt: now,
    updatedAt: now,
    direction: session.decision,
    action: session.action,
    grade: session.grade,
    fitness: session.fitness,
    finalStatus: "OPEN",
    note: "Giấy thử giả định vào lệnh thành công tại giá Limit khi báo động. Đây không phải lệnh thật.",
    orders: session.orders.map((order) => ({
      symbol: order.symbol,
      instId: order.instId,
      direction: order.direction,
      entry: order.entry,
      tp: order.tp2 || order.tp,
      tp1: order.tp1 || order.tp,
      tp2: order.tp2 || order.tp,
      sl: order.sl,
      marginUsdt: order.marginUsdt,
      notionalUsdt: order.notionalUsdt,
      btcQty: order.btcQty,
      netWin: order.netWin,
      netTp1Be: order.netTp1Be,
      netTp2Plan: order.netTp2Plan,
      netLoss: order.netLoss,
      lastPrice: order.entry,
      status: "Giả định vào lệnh thành công",
      result: "OPEN",
      resolvedAt: ""
    }))
  };
  savePaperTests([test, ...loadPaperTests()]);
  return test;
}

function updateOpenPaperTests(tickers, now) {
  const tests = loadPaperTests();
  if (tests.length === 0) {
    return;
  }
  let changed = false;
  const updatedTests = tests.map((test) => {
    if (!test || test.finalStatus !== "OPEN") {
      return test;
    }
    const ageHours = (now.getTime() - new Date(test.createdAt).getTime()) / (60 * 60 * 1000);
    const orders = test.orders.map((order) => updatePaperOrder(order, tickers, now));
    const openCount = orders.filter((order) => order.result === "OPEN").length;
    const finalStatus = openCount === 0 ? "DONE" : ageHours >= PAPER_TEST_MAX_HOURS ? "EXPIRED" : "OPEN";
    changed = true;
    return { ...test, orders, finalStatus, updatedAt: now.toISOString() };
  });
  if (changed) {
    savePaperTests(updatedTests);
  }
}

function updatePaperOrder(order, tickers, now) {
  if (!order || order.result === "TP" || order.result === "SL") {
    return order;
  }
  const last = tickers[order.instId];
  if (!Number.isFinite(last) || last <= 0) {
    return order;
  }
  const tp = Number(order.tp);
  const sl = Number(order.sl);
  let result = "OPEN";
  let status = "Đang theo dõi giả lập";
  let resolvedAt = "";
  if (order.direction === "LONG") {
    if (last >= tp) {
      result = "TP";
      status = "Đã chạm TP giả lập";
      resolvedAt = now.toISOString();
    } else if (last <= sl) {
      result = "SL";
      status = "Đã chạm SL giả lập";
      resolvedAt = now.toISOString();
    }
  } else if (order.direction === "SHORT") {
    if (last <= tp) {
      result = "TP";
      status = "Đã chạm TP giả lập";
      resolvedAt = now.toISOString();
    } else if (last >= sl) {
      result = "SL";
      status = "Đã chạm SL giả lập";
      resolvedAt = now.toISOString();
    }
  }
  if (result === "OPEN") {
    status = "Giả định vào lệnh thành công";
  }
  return {
    ...order,
    lastPrice: formatPrice(last, SYMBOL_CONFIG.decimals),
    status,
    result,
    resolvedAt: resolvedAt || order.resolvedAt || ""
  };
}

function loadPaperTests() {
  try {
    const raw = localStorage.getItem(PAPER_TESTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Cannot read paper tests", error);
    return [];
  }
}

function savePaperTests(tests) {
  const normalized = tests
    .filter((item) => item && item.id && Array.isArray(item.orders))
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, 40);
  localStorage.setItem(PAPER_TESTS_KEY, JSON.stringify(normalized));
}

function getPaperTest(id) {
  return loadPaperTests().find((item) => item.id === id) || null;
}

function getPaperTestForSession(session) {
  if (!session || session.action !== "EXECUTABLE") {
    return loadPaperTests()[0] || null;
  }
  return getPaperTest(buildAlertSignature(session)) || loadPaperTests()[0] || null;
}

function computePaperPnl(test) {
  if (!test || !Array.isArray(test.orders)) {
    return 0;
  }
  return Number(test.orders.reduce((sum, order) => {
    if (order.result === "TP") {
      return sum + Number(order.netWin || 0);
    }
    if (order.result === "SL") {
      return sum + Number(order.netLoss || 0);
    }
    return sum;
  }, 0).toFixed(2));
}

function renderPaperTestPanel(session) {
  const test = getPaperTestForSession(session);
  if (!test) {
    return "";
  }
  const pnl = computePaperPnl(test);
  const openCount = test.orders.filter((order) => order.result === "OPEN").length;
  const title = test.finalStatus === "OPEN" ? "Giấy thử TP1/TP2/SL đang mở" : test.finalStatus === "EXPIRED" ? "Giấy thử đã hết hạn" : "Giấy thử đã chốt";
  return `
    <section class="panel paper-panel">
      <h3>${escapeHtml(title)}</h3>
      <p class="muted-text">Giả định vào lệnh thành công tại giá Limit lúc app báo động EXECUTABLE. Đây không phải lệnh thật, không đọc tài khoản OKX.</p>
      <div class="summary-grid">
        <div class="metric"><span>Hướng thử</span><strong>${escapeHtml(test.direction)}</strong></div>
        <div class="metric"><span>Fitness</span><strong>${escapeHtml(test.fitness || "")}% · Grade ${escapeHtml(test.grade || "")}</strong></div>
        <div class="metric"><span>Còn mở</span><strong>${openCount}/${test.orders.length}</strong></div>
        <div class="metric"><span>PnL giả lập</span><strong class="${pnl >= 0 ? "win" : "loss"}">${formatSigned(pnl)} USDT</strong></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Cặp</th>
              <th>Trạng thái giả lập</th>
              <th class="price">Entry</th>
              <th class="price">Last</th>
              <th class="price">TP1</th>
              <th class="price">TP2</th>
              <th class="price">SL</th>
            </tr>
          </thead>
          <tbody>
            ${test.orders.map((order) => `
              <tr>
                <td>${escapeHtml(order.symbol)}</td>
                <td>${escapeHtml(order.status)}</td>
                <td class="price">${escapeHtml(order.entry)}</td>
                <td class="price">${escapeHtml(order.lastPrice || order.entry)}</td>
                <td class="price">${escapeHtml(order.tp1 || order.tp)}</td>
                <td class="price">${escapeHtml(order.tp2 || order.tp)}</td>
                <td class="price">${escapeHtml(order.sl)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderAlertLogPanel() {
  const log = loadAlertLog().slice(0, 10);
  const tests = loadPaperTests();
  return `
    <section class="panel">
      <h3>Log cảnh báo EXECUTABLE</h3>
      <p class="muted-text">Watch Mode chỉ hú khi action = EXECUTABLE. PLAN_ONLY, WAIT_TRIGGER và LOCKED_RISK không hú để tránh ép lệnh.</p>
      <div class="history-actions"><button id="clearAlertLogBtn" class="ghost-btn danger" type="button">Xóa log cảnh báo</button></div>
      ${log.length === 0 ? `<p class="muted-text">Chưa có cảnh báo nào.</p>` : `
        <div class="history-list">
          ${log.map((item) => {
            const test = tests.find((paper) => paper.id === item.paperTestId);
            const pnl = test ? computePaperPnl(test) : 0;
            return `
              <article class="history-item">
                <div>
                  <strong>${escapeHtml(formatDateTime(item.createdAt))}</strong>
                  <p class="muted-text">${escapeHtml(item.decision)} · ${escapeHtml(item.action)} · ${escapeHtml(item.fitness)}% · Grade ${escapeHtml(item.grade)}</p>
                </div>
                <div class="history-result">
                  <span class="pill muted">${test ? escapeHtml(test.finalStatus) : "Đã báo"}</span>
                  <strong class="${pnl >= 0 ? "win" : "loss"}">${formatSigned(pnl)} USDT</strong>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      `}
    </section>
  `;
}

function clearSession() {
  if (!window.confirm("Xóa phiên hôm nay trên máy này? Lịch sử vẫn giữ nguyên.")) {
    return;
  }
  localStorage.removeItem(SESSION_KEY);
  currentSession = null;
  hideMessage();
  renderSession();
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Cannot read saved session", error);
    return null;
  }
}

function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Cannot read saved history", error);
    return [];
  }
}

function saveHistory(history) {
  const normalized = history
    .filter((item) => item && item.date && item.decision)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  localStorage.setItem(HISTORY_KEY, JSON.stringify(normalized));
}

function getHistoryRecord(id) {
  return loadHistory().find((item) => item.id === id || item.date === id) || null;
}

function upsertHistoryFromSession(session, existing) {
  const record = buildHistoryRecord(session, existing);
  saveHistory(upsertHistoryRecord(record));
}

function upsertHistoryRecord(record) {
  const history = loadHistory();
  const index = history.findIndex((item) => item.id === record.id || item.date === record.date);
  if (index >= 0) {
    history[index] = record;
  } else {
    history.push(record);
  }
  return history;
}

function buildHistoryRecord(session, existing) {
  const previous = existing || {};
  return {
    id: session.dayId || session.date || getLocalDateId(session.createdAt),
    date: session.date || session.dayId || getLocalDateId(session.createdAt),
    time: formatClock(session.createdAt),
    decision: session.decision,
    action: session.action,
    actionLabel: session.actionLabel,
    signalTier: session.analysis.signalTier || session.action,
    longScore: session.analysis.longScore,
    shortScore: session.analysis.shortScore,
    fitness: session.fitness,
    grade: session.grade,
    btcPrice: session.prices ? session.prices.BTCUSDT : "",
    tickets: Array.isArray(session.orders) ? session.orders : [],
    finalStatus: previous.finalStatus || "OPEN",
    result: previous.result || "NONE",
    netPnl: Number.isFinite(Number(previous.netPnl)) ? Number(previous.netPnl) : 0,
    note: previous.note || "",
    emotion: previous.emotion || "",
    mistakes: Array.isArray(previous.mistakes) ? previous.mistakes : [],
    paperMode: previous.paperMode === true,
    btcSweepPlannedUsdt: Number.isFinite(Number(previous.btcSweepPlannedUsdt)) ? Number(previous.btcSweepPlannedUsdt) : 0,
    createdAt: previous.createdAt || session.createdAt,
    updatedAt: session.updatedAt || new Date().toISOString()
  };
}

function renderHistory() {
  const history = loadHistory();
  if (!history.length) {
    els.historyArea.innerHTML = `
      <section class="panel">
        <h3>LỊCH SỬ</h3>
        <p class="muted-text">Chưa có lịch sử. Bấm cập nhật dữ liệu hôm nay để tạo bản ghi đầu tiên.</p>
      </section>
    `;
    return;
  }

  const sorted = [...history].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  els.historyArea.innerHTML = `
    <section class="panel">
      <h3>LỊCH SỬ</h3>
      <div class="history-actions">
        <button id="exportHistoryBtn" class="ghost-btn" type="button">Xuất lịch sử JSON</button>
        <button id="importHistoryBtn" class="ghost-btn" type="button">Nhập lịch sử JSON</button>
        <button id="clearHistoryBtn" class="ghost-btn danger" type="button">Xóa lịch sử</button>
      </div>
    </section>
    ${renderStatsPanel("7 ngày", computeStats(sorted, 7))}
    ${renderStatsPanel("30 ngày", computeStats(sorted, 30))}
    ${renderAlertLogPanel()}
    <section class="panel">
      <h3>Danh sách ngày</h3>
      <div class="history-list">${sorted.map(renderHistoryItem).join("")}</div>
    </section>
  `;
  bindHistoryButtons();
}

function renderStatsPanel(title, stats) {
  return `
    <section class="panel">
      <h3>${escapeHtml(title)}</h3>
      <div class="summary-grid">
        <div class="metric"><span>Có dữ liệu</span><strong>${stats.total}</strong></div>
        <div class="metric"><span>EXEC / WAIT / PLAN / LOCK</span><strong>${stats.execDays} / ${stats.waitDays} / ${stats.planDays} / ${stats.lockDays}</strong></div>
        <div class="metric"><span>LONG / SHORT</span><strong>${stats.longDays} / ${stats.shortDays}</strong></div>
        <div class="metric"><span>Fitness TB</span><strong>${stats.avgFitness}%</strong></div>
        <div class="metric"><span>Tổng Net PnL</span><strong class="${stats.pnl >= 0 ? "win" : "loss"}">${formatSigned(stats.pnl)} USDT</strong></div>
        <div class="metric"><span>Lỗi kỷ luật</span><strong class="${stats.mistakes > 0 ? "loss" : "win"}">${stats.mistakes}</strong></div>
        <div class="metric"><span>BTC Sweep gợi ý</span><strong class="win">${formatUsdt(stats.sweep)} USDT</strong></div>
        <div class="metric"><span>Kỷ luật ghi kết quả</span><strong>${stats.doneDays}/${stats.total}</strong></div>
      </div>
    </section>
  `;
}

function renderHistoryItem(item) {
  const resultLabel = getResultLabel(item.result);
  const pnl = Number(item.netPnl || 0);
  return `
    <article class="history-item">
      <div>
        <strong>${escapeHtml(formatDateShort(item.date))}</strong>
        <p class="muted-text">${escapeHtml(item.time || "Đã lưu")} · ${escapeHtml(item.decision)} · ${escapeHtml(item.action || item.signalTier || "PLAN_ONLY")} · ${escapeHtml(item.fitness || 0)}% · Grade ${escapeHtml(item.grade || "")}</p>
        ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}
        ${Array.isArray(item.mistakes) && item.mistakes.length ? `<p class="loss">Lỗi kỷ luật: ${escapeHtml(item.mistakes.length)}</p>` : ""}
      </div>
      <div class="history-result">
        <span class="pill muted">${escapeHtml(resultLabel)}</span>
        <strong class="${pnl >= 0 ? "win" : "loss"}">${formatSigned(pnl)} USDT</strong>
      </div>
    </article>
  `;
}

function computeStats(history, days) {
  const start = startOfLocalDay(new Date());
  start.setDate(start.getDate() - days + 1);
  const records = history.filter((item) => {
    const date = parseDateId(item.date);
    return date && date >= start;
  });
  const total = records.length;
  const doneDays = records.filter((item) => item.finalStatus === "DONE" || item.finalStatus === "NO_TRADE").length;
  const avgFitness = total ? Math.round(records.reduce((sum, item) => sum + Number(item.fitness || 0), 0) / total) : 0;
  return {
    total,
    longDays: records.filter((item) => item.decision === "LONG").length,
    shortDays: records.filter((item) => item.decision === "SHORT").length,
    execDays: records.filter((item) => item.action === "EXECUTABLE").length,
    waitDays: records.filter((item) => item.action === "WAIT_TRIGGER").length,
    planDays: records.filter((item) => item.action === "PLAN_ONLY").length,
    lockDays: records.filter((item) => item.action === "LOCKED_RISK").length,
    avgFitness,
    pnl: Number(records.reduce((sum, item) => sum + Number(item.netPnl || 0), 0).toFixed(2)),
    mistakes: records.reduce((sum, item) => sum + (Array.isArray(item.mistakes) ? item.mistakes.length : 0), 0),
    sweep: Number(records.reduce((sum, item) => sum + Number(item.btcSweepPlannedUsdt || 0), 0).toFixed(2)),
    doneDays
  };
}

function bindHistoryButtons() {
  const exportButton = document.querySelector("#exportHistoryBtn");
  const importButton = document.querySelector("#importHistoryBtn");
  const clearButton = document.querySelector("#clearHistoryBtn");
  const clearAlertLogButton = document.querySelector("#clearAlertLogBtn");
  if (exportButton) exportButton.addEventListener("click", exportHistory);
  if (importButton) importButton.addEventListener("click", () => els.historyImportInput.click());
  if (clearButton) clearButton.addEventListener("click", clearHistory);
  if (clearAlertLogButton) clearAlertLogButton.addEventListener("click", clearAlertLog);
}

function exportHistory() {
  const history = loadHistory();
  const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ftokx-history-${getLocalDateId(new Date())}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function importHistoryFile(event) {
  const file = event.target.files && event.target.files[0];
  event.target.value = "";
  if (!file) return;

  try {
    const text = await file.text();
    const imported = JSON.parse(text);
    if (!Array.isArray(imported)) throw new Error("History file must be an array");
    const current = loadHistory();
    const merged = mergeHistory(current, imported.map(normalizeImportedRecord));
    saveHistory(merged);
    renderHistory();
    showMessage("Đã nhập lịch sử", "Dữ liệu lịch sử đã được merge theo ngày.", "");
  } catch (error) {
    console.error(error);
    showMessage("Không nhập được lịch sử", "File JSON không đúng cấu trúc tối thiểu: cần date và decision.", "bad");
  }
}

function normalizeImportedRecord(item) {
  if (!item || !item.date || !item.decision) {
    throw new Error("Bad history record");
  }
  const id = item.id || item.date;
  return {
    id,
    date: item.date,
    time: item.time || "Đã nhập",
    decision: item.decision,
    action: item.action || item.signalTier || "PLAN_ONLY",
    actionLabel: item.actionLabel || "Chỉ lập kế hoạch",
    signalTier: item.signalTier || item.action || "PLAN_ONLY",
    longScore: Number(item.longScore || 0),
    shortScore: Number(item.shortScore || 0),
    fitness: Number(item.fitness || 0),
    grade: item.grade || "",
    btcPrice: item.btcPrice || "",
    tickets: Array.isArray(item.tickets) ? item.tickets : [],
    finalStatus: item.finalStatus || "OPEN",
    result: item.result || "NONE",
    netPnl: Number.isFinite(Number(item.netPnl)) ? Number(item.netPnl) : 0,
    note: item.note || "",
    emotion: item.emotion || "",
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString()
  };
}

function mergeHistory(current, imported) {
  const map = new Map();
  current.forEach((item) => map.set(item.id || item.date, item));
  imported.forEach((item) => {
    const key = item.id || item.date;
    const existing = map.get(key);
    if (!existing || String(item.updatedAt || "") >= String(existing.updatedAt || "")) {
      map.set(key, item);
    }
  });
  return [...map.values()];
}

function clearHistory() {
  if (!window.confirm("Xóa toàn bộ lịch sử? Phiên hôm nay vẫn giữ nguyên.")) {
    return;
  }
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

function showMessage(title, body, tone) {
  const toneClass = tone === "bad" ? "bad-box" : tone === "alert" ? "alert-box" : "";
  els.messageArea.className = `message-card ${toneClass}`;
  els.messageArea.innerHTML = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p>`;
}

function hideMessage() {
  els.messageArea.className = "message-card hidden";
  els.messageArea.innerHTML = "";
}

function formatTime(iso) {
  const date = new Date(iso);
  return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

function formatClock(iso) {
  const date = new Date(iso);
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
}

function formatDateTime(iso) {
  const date = new Date(iso);
  return date.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatDateShort(dateId) {
  const date = parseDateId(dateId);
  if (!date) return "Đã lưu";
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function getLocalDateId(input) {
  const date = input instanceof Date ? input : new Date(input);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDateId(dateId) {
  const match = String(dateId || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function getResultLabel(value) {
  const option = RESULT_OPTIONS.find((item) => item.value === value);
  return option ? option.label : "Chưa chốt";
}

function formatSigned(value) {
  const number = Number(value || 0);
  return `${number >= 0 ? "+" : ""}${number.toFixed(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            newWorker.postMessage({ type: "SKIP_WAITING" });
          }
        });
      });
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (hasReloadedForServiceWorker) return;
        hasReloadedForServiceWorker = true;
        window.location.reload();
      });
    } catch (error) {
      console.warn("Service worker registration failed", error);
    }
  });
}

init();
