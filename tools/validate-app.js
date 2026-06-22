import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const APP_VERSION = "2.2.0";

const requiredFiles = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "service-worker.js",
  "vercel.json",
  "package.json",
  "README.md",
  "CHANGELOG.md",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "config/FTOKX_FINAL_V2_DISCIPLINE_OS_CONFIG.json",
  "config/FTOKX_SHORT_TREND_CONFIG_180_V2_2_0_POSITION_RANGE.json"
];

const sourceFiles = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "service-worker.js",
  "vercel.json",
  "README.md",
  "CHANGELOG.md",
  "config/FTOKX_FINAL_V2_DISCIPLINE_OS_CONFIG.json",
  "config/FTOKX_SHORT_TREND_CONFIG_180_V2_2_0_POSITION_RANGE.json"
];

const errors = [];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

async function main() {
  for (const file of requiredFiles) {
    assert(await exists(file), `Missing required file: ${file}`);
  }

  const app = await read("app.js");
  const html = await read("index.html");
  const css = await read("style.css");
  const sw = await read("service-worker.js");
  const manifest = JSON.parse(await read("manifest.json"));
  const vercel = await read("vercel.json");
  const readme = await read("README.md");
  const changelog = await read("CHANGELOG.md");
  const packageJson = JSON.parse(await read("package.json"));
  const config = JSON.parse(await read("config/FTOKX_SHORT_TREND_CONFIG_180_V2_2_0_POSITION_RANGE.json"));
  const allText = (await Promise.all(sourceFiles.map(read))).join("\n");

  assert(packageJson.version === APP_VERSION, `package.json version must be ${APP_VERSION}`);
  assert(config.version === APP_VERSION, `Config version must be ${APP_VERSION}`);
  assert(manifest.name === "FTOKX SIMPLE PWA", "Manifest name must be FTOKX SIMPLE PWA");
  assert(manifest.short_name === "FTOKX", "Manifest short_name must be FTOKX");
  assert(manifest.start_url === "/", "Manifest start_url must be /");
  assert(manifest.display === "standalone", "Manifest display must be standalone");
  assert(Array.isArray(manifest.icons) && manifest.icons.length >= 2, "Manifest must include icons");

  for (const iconPath of ["icons/icon-192.png", "icons/icon-512.png"]) {
    const info = await stat(path.join(root, iconPath));
    assert(info.size > 100, `${iconPath} looks empty`);
  }

  assert(app.includes('const APP_VERSION = "2.2.0"'), "App version must be 2.2.0");
  assert(sw.includes("ftokx-simple-pwa-v2.2.0-config180-position-range"), "Service worker cache version must be v2.2.0-config180-position-range");
  assert(changelog.includes("V2.2.0"), "CHANGELOG missing V2.2.0");
  assert(readme.includes("CONFIG180 POSITION RANGE"), "README missing CONFIG180 POSITION RANGE title");
  assert(html.includes("SHORT TREND WATCHLIST · V2.2 CONFIG180 RANGE"), "Header missing V2.2 CONFIG180 RANGE badge");

  assert(app.includes("STRATEGY_PROFILE"), "Strategy profile missing");
  assert(app.includes("LÃO SHORT TREND V1.4.3") && allText.includes("LÃO SHORT TREND V1.4.2"), "Config 180 strategy/reference name missing");
  assert(app.includes("OBSERVATION_ONLY") && app.includes("NO_LIVE"), "NO_LIVE / OBSERVATION_ONLY missing");
  assert(app.includes("WATCHLIST_HIT"), "WATCHLIST_HIT action missing");
  assert(app.includes('instId: "BTC-USDT-SWAP"'), "Missing BTC-USDT-SWAP");
  assert(app.includes('symbol: "BTCUSDT"'), "Missing BTCUSDT symbol");
  assert(app.includes("shortOnly: true"), "SHORT only guard missing");
  assert(app.includes('requiredRegimeCode: "TREND_DOWN"'), "Trend Down only guard missing");
  assert(app.includes('requiredGrade: "A"'), "Grade A only guard missing");
  assert(app.includes("minFitness: 92"), "Min Fitness 92 missing");
  assert(app.includes("leverage: STRATEGY_PROFILE.leverage") && app.includes("leverage: 5"), "Leverage x5 missing");
  assert(app.includes("positionNotionalMinUsdt: 500") && app.includes("positionNotionalMaxUsdt: 1000"), "Position range 500-1000 missing");
  assert(app.includes("marginMinUsdt: 100") && app.includes("marginMaxUsdt: 200"), "Margin range 100-200 missing");
  assert(app.includes("position-ladder-grid") && allText.includes("BOOST: 750") && allText.includes("MAX WATCH"), "Position ladder missing");
  assert(app.includes("marginRequiredUsdt: 100"), "Base margin 100 missing");
  assert(app.includes("noChasePct: 0.0015"), "No Chase 0.15% missing");
  assert(app.includes("atrPctMin: 0.006") && app.includes("atrPctMax: 0.02"), "ATR 0.6%-2.0% missing");
  assert(app.includes("minDistanceFromEma20: 0.01") && app.includes("maxDistanceFromEma20: 0.028"), "EMA20 distance 1.0%-2.8% missing");
  assert(app.includes("tp1: 0.007") && app.includes("tp2: 0.007") && app.includes("sl: 0.003"), "TP/SL Config180 missing");
  assert(app.includes("expiryCandles15m: 12") && app.includes("expiryMinutes: 180"), "12 candles / 180 minutes expiry missing");
  assert(allText.includes("Daily Max Loss: 3 USDT") || app.includes("dailyMaxLossUsdt: 3"), "Daily max loss 3 missing");
  assert(allText.includes("Volume Filter") && app.includes("volumeMinRatio: 0.8"), "Volume filter missing");

  assert(app.includes("navigator.serviceWorker.register"), "App must register service worker");
  assert(sw.includes("caches.delete"), "Service worker must delete old caches");
  assert(!sw.includes('/api/okx/candles"'), "Service worker must not cache candles path in shell");
  assert(!sw.includes('/api/okx/ticker"'), "Service worker must not cache ticker path in shell");
  assert(sw.includes("/api/okx/"), "Service worker should bypass OKX API paths");

  assert(vercel.includes("/api/okx/candles"), "vercel.json missing candles rewrite");
  assert(vercel.includes("/api/okx/ticker"), "vercel.json missing ticker rewrite");
  assert(vercel.includes("https://www.okx.com/api/v5/market/candles"), "vercel.json missing OKX candles destination");
  assert(vercel.includes("https://www.okx.com/api/v5/market/ticker"), "vercel.json missing OKX ticker destination");

  const privateEndpointPattern = /api\/v5\/(trade|account|asset|users|broker|finance)/i;
  assert(!privateEndpointPattern.test(allText), "Private/account endpoint found");
  assert(!/secret\s*key/i.test(allText), "Secret key wording found");
  assert(!/passphrase/i.test(allText), "Passphrase wording found");
  assert(!/chắc thắng/i.test(allText), "Guaranteed-win wording found");
  assert(html.includes("App không đặt lệnh") || allText.includes("App không đặt lệnh"), "Safety sentence missing");
  assert(html.includes("Đang online") && html.includes("Offline chỉ xem lại phiếu đã lưu"), "Online/offline copy missing");

  assert(allText.includes("ftokx_simple_pwa_v1_history"), "History localStorage key missing");
  assert(allText.includes("ftokx_simple_pwa_v1_session"), "Session localStorage key missing");
  assert(allText.includes("ftokx_simple_pwa_v1_alert_log"), "Alert log key missing");
  assert(allText.includes("ftokx_simple_pwa_v1_paper_tests"), "Paper test key missing");
  assert(html.includes("LỊCH SỬ"), "History tab missing");
  assert(allText.includes("Xuất lịch sử JSON"), "History export missing");
  assert(allText.includes("Nhập lịch sử JSON"), "History import missing");
  assert(allText.includes("7 ngày"), "7-day stats missing");
  assert(allText.includes("30 ngày"), "30-day stats missing");
  assert(allText.includes("Kết quả ngày"), "Daily result panel missing");
  assert(html.includes("BẬT LUÔN ONLINE"), "Watch Mode start button missing");
  assert(html.includes("Test chuông/rung"), "Watch Mode test alert missing");
  assert(app.includes("AUTO_WATCH_INTERVAL_MS = 5 * 60 * 1000"), "Watch interval missing");

  for (const forbidden of [".env.local", ".vercel/project.json", ".vercel", "node_modules"]) {
    assert(!(await exists(forbidden)), `Sensitive/local file should not be present: ${forbidden}`);
  }

  if (errors.length) {
    console.error("VALIDATION FAILED");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log("VALIDATION PASSED: FTOKX SIMPLE PWA V2.2 CONFIG180 POSITION RANGE package looks safe.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
