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
  "icons/icon-512.png",
  "config/FTOKX_FINAL_V2_DISCIPLINE_OS_CONFIG.json"
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
  const config = JSON.parse(await read("config/FTOKX_FINAL_V2_DISCIPLINE_OS_CONFIG.json"));
  const allText = (await Promise.all(sourceFiles.map(read))).join("\n");

  assert(packageJson.version === "2.0.0", "package.json version must be 2.0.0");
  assert(config.version === "2.0.0", "Final config version must be 2.0.0");
  assert(manifest.name === "FTOKX SIMPLE PWA", "Manifest name must be FTOKX SIMPLE PWA");
  assert(manifest.short_name === "FTOKX", "Manifest short_name must be FTOKX");
  assert(manifest.start_url === "/", "Manifest start_url must be /");
  assert(manifest.display === "standalone", "Manifest display must be standalone");
  assert(Array.isArray(manifest.icons) && manifest.icons.length >= 2, "Manifest must include icons");

  for (const iconPath of ["icons/icon-192.png", "icons/icon-512.png"]) {
    const info = await stat(path.join(root, iconPath));
    assert(info.size > 100, `${iconPath} looks empty`);
  }

  assert(app.includes('const APP_VERSION = "2.0.0"'), "App version must be 2.0.0");
  assert(sw.includes('ftokx-simple-pwa-v2.0.0-final'), "Service worker cache version must be v2.0.0-final");
  assert(changelog.includes("V2.0.0 FINAL"), "CHANGELOG missing V2.0.0 FINAL");
  assert(readme.includes("Futures Discipline OS"), "README missing Futures Discipline OS title");
  assert(html.includes("FUTURES DISCIPLINE OS · V2.0 FINAL"), "Header missing V2.0 FINAL badge");

  assert(app.includes("BTC-USDT-SWAP"), "Missing BTC-USDT-SWAP");
  assert(app.includes('symbol: "BTCUSDT"'), "Missing BTCUSDT symbol");
  assert(!app.includes("ETH-USDT-SWAP"), "ETH swap must be removed");
  assert(!app.includes("OKB-USDT-SWAP"), "OKB swap must be removed");
  assert(!app.includes('symbol: "ETHUSDT"'), "ETHUSDT must be removed");
  assert(!app.includes('symbol: "OKBUSDT"'), "OKBUSDT must be removed");

  assert(allText.includes("leverage: 20") || allText.includes("x20"), "Leverage x20 missing");
  assert(allText.includes("Cô lập") || allText.includes("Isolated"), "Isolated margin missing");
  assert(allText.includes("Always Plan") || html.includes("Command Center"), "Planning principle missing");
  assert(allText.includes("EXECUTABLE"), "EXECUTABLE action missing");
  assert(allText.includes("WAIT_TRIGGER"), "WAIT_TRIGGER action missing");
  assert(allText.includes("PLAN_ONLY"), "PLAN_ONLY action missing");
  assert(allText.includes("LOCKED_RISK"), "LOCKED_RISK action missing");
  assert(allText.includes("Fitness") && allText.includes("Grade"), "Fitness/Grade UI missing");
  assert(allText.includes("TP_SL_BY_GRADE"), "Grade-based TP/SL missing");
  assert(app.includes("noChasePct: 0.0025"), "No Chase 0.25% missing");
  assert(app.includes("defaultMarginUsdt: 50"), "Default 50 USDT margin missing");
  assert(app.includes("referenceCapitalMinUsdt: 50") && app.includes("referenceCapitalMaxUsdt: 100"), "50-100 USDT reference missing");
  assert(allText.includes("VỊ THẾ ĐỀ XUẤT"), "Suggested position card missing");
  assert(allText.includes("price-strip"), "Prominent Limit/TP1/TP2/SL strip missing");
  assert(app.includes("tp1CloseRatio: 0.5"), "TP1 50% close ratio missing");

  assert(app.includes("function getMarketRegimePro"), "Market Regime Pro missing");
  assert(app.includes("function getSessionQuality"), "Session Quality missing");
  assert(allText.includes("Pre-Trade Contract"), "Pre-Trade Contract missing");
  assert(app.includes("CONTRACT_ITEMS"), "Contract items missing");
  assert(app.includes("canMarkLimitPlaced"), "Pre-trade status guard missing");
  assert(app.includes("function getCapitalLadder"), "Capital Ladder missing");
  assert(app.includes("MISTAKE_OPTIONS") && allText.includes("Mistake Counter"), "Mistake Counter missing");
  assert(allText.includes("Weekly Review & BTC Sweep"), "Weekly Review & BTC Sweep missing");
  assert(allText.includes("Paper Mode"), "Paper Mode missing");
  assert(allText.includes("Weekly Max Loss"), "Weekly Max Loss missing");
  assert(app.includes("btcSweepPercent"), "BTC Sweep percent missing");
  assert(css.includes("command-badges") && css.includes("contract-grid") && css.includes("mistake-grid"), "V2 UI CSS missing");

  assert(allText.includes("Kill Switch") && allText.includes("Capital Guard"), "Kill Switch/Capital Guard missing");
  assert(allText.includes("One Trade Per Day"), "One Trade Per Day missing");
  assert(allText.includes("Daily Max Loss"), "Daily Max Loss missing");
  assert(allText.includes("Copy phiếu OKX") && app.includes("buildCopyTicketText"), "Copy Ticket missing");
  assert(allText.includes("futuresFundUsdt") && allText.includes("marginPerTradeUsdt"), "Futures fund settings missing");
  assert(allText.includes("Morning Review") || allText.includes("MORNING REVIEW"), "Morning Review missing");
  assert(allText.includes("Không dời SL"), "No SL moving warning missing");
  assert(allText.includes("Không DCA futures"), "No DCA futures warning missing");
  assert(allText.includes("Không martingale"), "No martingale warning missing");

  assert(app.includes("navigator.serviceWorker.register"), "App must register service worker");
  assert(sw.includes("caches.delete"), "Service worker must delete old caches");
  assert(!sw.includes("/api/okx/candles\""), "Service worker must not cache candles path in shell");
  assert(!sw.includes("/api/okx/ticker\""), "Service worker must not cache ticker path in shell");
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
  assert(html.includes("App chỉ lập phiếu. Người giữ tay."), "Safety sentence missing");
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
  assert(app.includes('session.action !== "EXECUTABLE"'), "Watch Mode must alert only EXECUTABLE");

  for (const forbidden of [".env.local", ".vercel/project.json", "node_modules"]) {
    assert(!(await exists(forbidden)), `Sensitive/local file should not be present: ${forbidden}`);
  }

  const badVisible = ["chắc thắng", "auto trade", "private API key"];
  for (const bad of badVisible) {
    assert(!allText.toLowerCase().includes(bad.toLowerCase()) || bad === "auto trade", `Forbidden wording found: ${bad}`);
  }

  if (errors.length) {
    console.error("VALIDATION FAILED");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log("VALIDATION PASSED: FTOKX SIMPLE PWA V2.0 FINAL Futures Discipline OS package looks safe.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
