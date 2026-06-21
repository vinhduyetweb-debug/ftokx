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
  const packageJson = JSON.parse(await read("package.json"));
  const allText = (await Promise.all(sourceFiles.map(read))).join("\n");

  assert(packageJson.version === "1.3.2", "package.json version must be 1.3.2");
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

  assert(app.includes('const APP_VERSION = "1.3.2"'), "App version must be 1.3.2");
  assert(sw.includes('ftokx-simple-pwa-v1.3.2'), "Service worker cache version must be 1.3.2");
  assert(changelog.includes("1.3.2"), "CHANGELOG missing 1.3.2");
  assert(readme.includes("BTC 20X Discipline Ticket"), "README missing V1.3 title");

  assert(app.includes("BTC-USDT-SWAP"), "Missing BTC-USDT-SWAP");
  assert(app.includes('symbol: "BTCUSDT"'), "Missing BTCUSDT symbol");
  assert(!app.includes("ETH-USDT-SWAP"), "ETH swap must be removed from V1.3 app logic");
  assert(!app.includes("OKB-USDT-SWAP"), "OKB swap must be removed from V1.3 app logic");
  assert(!app.includes('symbol: "ETHUSDT"'), "ETHUSDT must be removed from V1.3 app logic");
  assert(!app.includes('symbol: "OKBUSDT"'), "OKBUSDT must be removed from V1.3 app logic");

  assert(allText.includes("leverage: 20") || allText.includes("x20"), "Leverage x20 missing");
  assert(allText.includes("Cô lập") || allText.includes("Isolated"), "Isolated margin missing");
  assert(allText.includes("Always Plan, Conditional Trade"), "Always Plan principle missing");
  assert(allText.includes("EXECUTABLE"), "EXECUTABLE action missing");
  assert(allText.includes("WAIT_TRIGGER"), "WAIT_TRIGGER action missing");
  assert(allText.includes("PLAN_ONLY"), "PLAN_ONLY action missing");
  assert(allText.includes("LOCKED_RISK"), "LOCKED_RISK action missing");
  assert(allText.includes("Fitness") && allText.includes("Grade"), "Fitness/Grade UI missing");
  assert(allText.includes("MARGIN_BY_GRADE"), "Grade-based margin sizing missing");
  assert(allText.includes("TP_SL_BY_GRADE"), "Grade-based TP/SL missing");
  assert(allText.includes("noChasePct: 0.0025"), "No Chase 0.25% missing");
  assert(allText.includes("Vị thế danh nghĩa x20") || allText.includes("notionalUsdt"), "Notional x20 display missing");
  assert(allText.includes("Vốn ký quỹ") || allText.includes("marginUsdt"), "Default margin display missing");
  assert(allText.includes("Lãi nếu TP") && allText.includes("Lỗ nếu SL"), "TP/SL PnL display missing");
  assert(app.includes("defaultMarginUsdt: 50"), "Default 50 USDT margin missing");
  assert(app.includes("referenceCapitalMinUsdt: 50") && app.includes("referenceCapitalMaxUsdt: 100"), "50-100 USDT capital reference missing");
  assert(allText.includes("VỊ THẾ ĐỀ XUẤT"), "Compact suggested position card missing");
  assert(app.includes("function renderFocusTicket"), "renderFocusTicket function missing");
  assert(allText.includes("compact-details"), "Collapsed compact details UI missing");
  assert(html.includes("Watch Mode và ghi chú an toàn"), "Collapsed Watch Mode copy missing");
  assert(allText.includes("Morning Review") || allText.includes("MORNING REVIEW"), "Morning Review missing");
  assert(allText.includes("slogan") || allText.includes("Lão nhắc"), "Slogan logic/UI missing");
  assert(allText.includes("Không dời SL"), "No SL moving warning missing");
  assert(allText.includes("Không DCA futures"), "No DCA futures warning missing");
  assert(allText.includes("Không martingale") || !/martingale/i.test(allText), "Martingale safety missing");

  assert(app.includes("navigator.serviceWorker.register"), "App must register service worker");
  assert(sw.includes("caches.delete"), "Service worker must delete old caches in activate event");
  assert(!sw.includes("/api/okx/candles"), "Service worker must not cache candles API path specifically");
  assert(!sw.includes("/api/okx/ticker"), "Service worker must not cache ticker API path specifically");
  assert(sw.includes("/api/okx/"), "Service worker should bypass OKX API paths");

  assert(vercel.includes("/api/okx/candles"), "vercel.json missing candles rewrite");
  assert(vercel.includes("/api/okx/ticker"), "vercel.json missing ticker rewrite");
  assert(vercel.includes("https://www.okx.com/api/v5/market/candles"), "vercel.json missing OKX candles destination");
  assert(vercel.includes("https://www.okx.com/api/v5/market/ticker"), "vercel.json missing OKX ticker destination");

  const privateEndpointPattern = /api\/v5\/(trade|account|asset|users|broker|finance)/i;
  assert(!privateEndpointPattern.test(allText), "Private or account endpoint found");
  assert(!/secret\s*key/i.test(allText), "Secret key wording found");
  assert(!/passphrase/i.test(allText), "Passphrase wording found");
  assert(!/chắc thắng/i.test(allText), "Guaranteed-win wording found");
  assert(html.includes("App chỉ lập phiếu. Người giữ tay."), "Mandatory safety sentence missing in UI");
  assert(html.includes("Đang online") && html.includes("Offline chỉ xem lại phiếu đã lưu"), "Online/offline copy missing");
  assert(html.includes("Có thể") || html.includes("PWA"), "Install/PWA hint missing");

  assert(allText.includes("ftokx_simple_pwa_v1_history"), "History localStorage key missing");
  assert(allText.includes("ftokx_simple_pwa_v1_session"), "Session localStorage key missing");
  assert(allText.includes("ftokx_simple_pwa_v1_alert_log"), "Alert log localStorage key missing");
  assert(allText.includes("ftokx_simple_pwa_v1_paper_tests"), "Paper test localStorage key missing");
  assert(html.includes("LỊCH SỬ"), "History tab missing");
  assert(allText.includes("Xuất lịch sử JSON"), "History export missing");
  assert(allText.includes("Nhập lịch sử JSON"), "History import missing");
  assert(allText.includes("Xóa lịch sử"), "History clear missing");
  assert(allText.includes("7 ngày"), "7-day comparison missing");
  assert(allText.includes("30 ngày"), "30-day comparison missing");
  assert(allText.includes("Kết quả ngày"), "Daily result panel missing");
  assert(allText.includes("Lưu kết quả ngày"), "Save daily result missing");

  assert(html.includes("BẬT LUÔN ONLINE"), "Watch Mode start button missing");
  assert(html.includes("Test chuông/rung"), "Watch Mode test alert button missing");
  assert(html.includes("Dừng báo động"), "Watch Mode stop alert button missing");
  assert(app.includes("AUTO_WATCH_INTERVAL_MS = 5 * 60 * 1000"), "Five-minute watch interval missing");
  assert(app.includes('session.action !== "EXECUTABLE"'), "Watch Mode must alert only EXECUTABLE");

  const forbiddenInZip = [".env.local", ".vercel/project.json"];
  for (const forbidden of forbiddenInZip) {
    assert(!(await exists(forbidden)), `Sensitive/local file should not be present in release tree: ${forbidden}`);
  }

  const blankBugOne = "N" + "/" + "A";
  const blankBugTwo = "undef" + "ined";
  assert(!allText.includes(blankBugOne), "Visible blank placeholder found");
  assert(!allText.includes(blankBugTwo), "Raw empty-value word found");

  if (errors.length) {
    console.error("VALIDATION FAILED");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log("VALIDATION PASSED: FTOKX SIMPLE PWA V1.3.2 default 50 USDT margin PnL package looks safe.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
