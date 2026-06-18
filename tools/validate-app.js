import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

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
  "icons/icon-512.png"
];

const sourceFiles = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "service-worker.js",
  "vercel.json",
  "README.md",
  "CHANGELOG.md"
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
  if (!condition) {
    errors.push(message);
  }
}


async function main() {
  for (const file of requiredFiles) {
    assert(await exists(file), `Missing required file: ${file}`);
  }

  const app = await read("app.js");
  const html = await read("index.html");
  const sw = await read("service-worker.js");
  const manifest = JSON.parse(await read("manifest.json"));
  const vercel = await read("vercel.json");
  const readme = await read("README.md");
  const changelog = await read("CHANGELOG.md");
  const allText = (await Promise.all(sourceFiles.map(read))).join("\n");

  assert(manifest.name === "FTOKX SIMPLE PWA", "Manifest name must be FTOKX SIMPLE PWA");
  assert(manifest.short_name === "FTOKX", "Manifest short_name must be FTOKX");
  assert(manifest.start_url === "/", "Manifest start_url must be /");
  assert(manifest.display === "standalone", "Manifest display must be standalone");
  assert(manifest.background_color === "#05080d", "Manifest background_color mismatch");
  assert(manifest.theme_color === "#05080d", "Manifest theme_color mismatch");
  assert(Array.isArray(manifest.icons) && manifest.icons.length >= 2, "Manifest must include 192 and 512 icons");
  assert(manifest.icons.some((icon) => icon.sizes === "192x192"), "Manifest missing 192 icon");
  assert(manifest.icons.some((icon) => icon.sizes === "512x512"), "Manifest missing 512 icon");

  for (const iconPath of ["icons/icon-192.png", "icons/icon-512.png"]) {
    const info = await stat(path.join(root, iconPath));
    assert(info.size > 100, `${iconPath} looks empty`);
  }

  assert(app.includes("navigator.serviceWorker.register"), "App must register service worker");
  assert(/CACHE_NAME\s*=\s*["']ftokx-simple-pwa-v\d+\.\d+\.\d+["']/.test(sw), "Service worker CACHE_NAME needs clear version");
  assert(sw.includes("caches.delete"), "Service worker must delete old caches in activate event");
  assert(!sw.includes("/api/okx/candles"), "Service worker must not cache candles API path");
  assert(!sw.includes("/api/okx/ticker"), "Service worker must not cache ticker API path");
  assert(sw.includes("/api/okx/"), "Service worker should bypass OKX API paths");

  assert(vercel.includes("/api/okx/candles"), "vercel.json missing candles rewrite");
  assert(vercel.includes("/api/okx/ticker"), "vercel.json missing ticker rewrite");
  assert(vercel.includes("https://www.okx.com/api/v5/market/candles"), "vercel.json missing OKX candles destination");
  assert(vercel.includes("https://www.okx.com/api/v5/market/ticker"), "vercel.json missing OKX ticker destination");

  const privateEndpointPattern = /api\/v5\/(trade|account|asset|users|broker|finance)/i;
  assert(!privateEndpointPattern.test(allText), "Private or account endpoint found");
  assert(!/secret\s*key/i.test(allText), "Secret key wording found");
  assert(!/passphrase/i.test(allText), "Passphrase wording found");
  assert(!/martingale/i.test(allText), "Martingale wording found");
  assert(!/trailing\s*stop/i.test(allText), "Trailing stop wording found");
  assert(!/chắc thắng/i.test(allText), "Guaranteed-win wording found");

  for (const symbol of ["BTCUSDT", "ETHUSDT", "OKBUSDT"]) {
    assert(allText.includes(symbol), `Human symbol missing: ${symbol}`);
  }
  assert(allText.includes("BTC-USDT-SWAP"), "Missing BTC-USDT-SWAP");
  assert(allText.includes("ETH-USDT-SWAP"), "Missing ETH-USDT-SWAP");
  assert(allText.includes("OKB-USDT-SWAP"), "Missing OKB-USDT-SWAP");
  assert(allText.includes("POSITION_USDT = 50") || allText.includes("50 USDT"), "Position 50 USDT missing");
  assert(allText.includes("LEVERAGE = 5") || allText.includes("x5"), "Leverage x5 missing");
  assert(allText.includes("MARGIN_USDT = 10") || allText.includes("10 USDT"), "Margin 10 USDT missing");
  assert(allText.includes("FEE_USDT = 0.05") || allText.includes("0.05 USDT"), "Fee 0.05 missing");
  assert(allText.includes("WAIT_MINUTES = 20") || allText.includes("20 phút"), "Wait 20 minutes missing");
  assert(allText.includes("0.03"), "BTC/ETH TP 3 percent missing");
  assert(allText.includes("0.02"), "BTC/ETH SL 2 percent missing");
  assert(allText.includes("0.04"), "OKB TP 4 percent missing");
  assert(allText.includes("0.025") || allText.includes("2.5%"), "OKB SL 2.5 percent missing");
  assert(allText.includes("+4.85"), "Daily max win +4.85 missing");
  assert(allText.includes("-3.40"), "Daily max loss -3.40 missing");
  assert(allText.includes("Không có lệnh thứ 4"), "Missing no fourth order rule");
  assert(allText.includes("Không đuổi giá"), "Missing no chasing rule");
  const oldOrderRule = "Không có lệnh thứ " + "6";
  assert(!allText.includes(oldOrderRule), "Old sixth-order rule found");
  assert(html.includes("App chỉ lập phiếu. Người giữ tay."), "Mandatory safety sentence missing in UI");
  assert(html.includes("Đang online") && html.includes("Offline chỉ xem lại phiếu đã lưu"), "Online/offline copy missing");
  assert(html.includes("Có thể cài app ra màn hình chính"), "Install hint missing");

  const blankBugOne = "N" + "/" + "A";
  const blankBugTwo = "undef" + "ined";
  assert(!allText.includes(blankBugOne), "Visible blank placeholder found");
  assert(!allText.includes(blankBugTwo), "Raw empty-value word found");
  assert(!/\d{1,3}\.\d{3},\d+/.test(allText), "Vietnamese trading price example found");
  assert(!/\b\d+,\d{2,3}\b/.test(app), "Comma decimal trading price pattern found in app.js");

  assert(readme.includes("Cảnh báo"), "README warning section missing");
  assert(app.includes('const APP_VERSION = "1.2.1"'), "App version must be 1.2.1");
  assert(sw.includes('ftokx-simple-pwa-v1.2.1'), "Service worker cache version must be 1.2.1");
  assert(changelog.includes("1.2.1"), "CHANGELOG missing version 1.2.1");
  assert(allText.includes("ftokx_simple_pwa_v1_history"), "History localStorage key missing");
  assert(html.includes("LỊCH SỬ"), "History tab missing");
  assert(allText.includes("Xuất lịch sử JSON"), "History export missing");
  assert(allText.includes("Nhập lịch sử JSON"), "History import missing");
  assert(allText.includes("Xóa lịch sử"), "History clear missing");
  assert(allText.includes("7 ngày"), "7-day comparison missing");
  assert(allText.includes("30 ngày"), "30-day comparison missing");
  assert(allText.includes("Kết quả ngày"), "Daily result panel missing");
  assert(allText.includes("Lưu kết quả ngày"), "Save daily result missing");
  assert(allText.includes("SIGNAL_CONFIG"), "Signal config missing");
  assert(allText.includes("minTradeScore: 6"), "V1.2.1 min trade score must be 6");
  assert(allText.includes("watchScore: 5"), "V1.2.1 watch score must be 5");
  assert(allText.includes("strongScore: 7"), "V1.2.1 strong score must be 7");
  assert(allText.includes("minDistanceFromEma20: 0.0025"), "V1.2.1 EMA20 noise filter missing");
  assert(allText.includes("btcMustLead: true"), "V1.2.1 BTC lead filter missing");
  assert(allText.includes("btcLeadMinScore: 4"), "V1.2.1 BTC core lead threshold missing");
  assert(allText.includes("lossCooldownEnabled: true"), "V1.2.1 loss cooldown missing");
  assert(allText.includes("lossCooldownMinScore: 7"), "V1.2.1 loss cooldown threshold missing");
  assert(allText.includes("atrPctMin: 0.00755"), "V1.2.1 ATR min safety gate missing");
  assert(allText.includes("atrPctMax: 0.03"), "V1.2.1 ATR max safety gate missing");
  assert(allText.includes("requireVolumePositive: true"), "V1.2.1 volume sanity gate missing");
  assert(allText.includes("longRequireGreenCandle: true"), "V1.2.1 LONG green candle gate missing");
  assert(allText.includes("AUTO_WATCH_INTERVAL_MS = 5 * 60 * 1000"), "V1.2.1 five-minute watch interval missing");
  assert(html.includes("BẬT LUÔN ONLINE"), "Watch Mode start button missing");
  assert(html.includes("Test chuông/rung"), "Watch Mode test alert button missing");
  assert(html.includes("Dừng báo động"), "Watch Mode stop alert button missing");
  assert(app.includes("navigator.wakeLock.request"), "Screen Wake Lock request missing");
  assert(app.includes("navigator.vibrate"), "Vibration alert missing");
  assert(app.includes("AudioContext"), "Audio alert missing");
  assert(app.includes("Notification.requestPermission"), "Notification permission request missing");
  assert(!allText.includes("api.telegram.org"), "Telegram endpoint must not be exposed in frontend");
  assert(!allText.includes("TELEGRAM_BOT_TOKEN"), "Telegram credential placeholder must not be shipped in frontend");
  assert(allText.includes("WATCH"), "V1.2.1 WATCH tier missing");
  assert(allText.includes("VALID_LONG") && allText.includes("VALID_SHORT"), "V1.2.1 VALID tiers missing");
  assert(allText.includes("STRONG_LONG") && allText.includes("STRONG_SHORT"), "V1.2.1 STRONG tiers missing");
  assert(allText.includes("EMA50 slope") || allText.includes("độ dốc EMA50"), "V1.2.1 EMA50 slope copy missing");
  assert(allText.includes("không tăng vốn") || allText.includes("không tăng vốn".toUpperCase()), "V1.2.1 no size increase rule missing");
  const apiKeyTerm = "API " + "key";
  assert(!allText.toLowerCase().includes(apiKeyTerm.toLowerCase()), "API credential wording found");

  if (errors.length) {
    console.error("VALIDATOR FAIL");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("VALIDATOR PASS");
  console.log(`Checked ${requiredFiles.length} required files.`);
}

main().catch((error) => {
  console.error("VALIDATOR ERROR");
  console.error(error);
  process.exit(1);
});
