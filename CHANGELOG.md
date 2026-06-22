# CHANGELOG

## V2.2.0 — CONFIG180 POSITION RANGE 500–1000

Ngày: 2026-06-22

### Thay đổi chính

- Nâng V2.1 CONFIG180 WATCHLIST thành **V2.2 CONFIG180 POSITION RANGE**.
- Thêm yêu cầu vị thế vào lệnh **500–1000 USD**.
- Thêm ladder: BASE 500 USD, BOOST 750 USD, MAX WATCH 1000 USD.
- Giữ leverage x5, suy ra margin hợp lệ 100–200 USDT.
- Siết input `Margin/lệnh` trong Capital Guard thành 100–200 USDT.
- Cập nhật UI: hero, focus ticket, risk panel, copy ticket, score details, README.
- Mặc định vẫn `WATCHLIST / OBSERVATION_ONLY / NO_LIVE`; không mở live trade.
- Cập nhật service worker cache: `ftokx-simple-pwa-v2.2.0-config180-position-range`.
- Thêm config file `config/FTOKX_SHORT_TREND_CONFIG_180_V2_2_0_POSITION_RANGE.json`.

### Giữ nguyên

- PWA tĩnh HTML/CSS/JS.
- Không backend.
- Không private API.
- Không auto trade.
- Dữ liệu localStorage cũ không bị đổi key.
- SHORT only, Trend Down only, Grade A only, Min Fitness 92.
- TP1 0.70%, TP2 0.70%, SL 0.30%, Expiry 12 nến 15M.

### Test

- `npm run check`
- `npm run validate`

## V2.1.0 — CONFIG180 WATCHLIST SHORT TREND

Ngày: 2026-06-22

### Thay đổi chính

- Nhúng bộ tham chiếu `LÃO SHORT TREND V1.4.2 — WATCHLIST CONFIG 180`.
- Chuyển core từ BTC x20 hai chiều sang BTC/USDT-SWAP **SHORT only x5**.
- Mặc định `WATCHLIST / OBSERVATION_ONLY / NO_LIVE`.
- Thêm action `WATCHLIST_HIT` khi setup khớp bộ lọc nhưng vẫn chỉ quan sát/paper.
- Siết điều kiện hợp lệ: Trend Down only, Grade A only, Fitness ≥ 92.
- Cập nhật ATR filter: 0.6%–2.0%.
- Cập nhật EMA20 distance filter: 1.0%–2.8%.
- Cập nhật No Chase: 0.15%.
- Cập nhật TP1 0.70%, TP2 0.70%, SL 0.30%.
- Cập nhật Expiry: 12 nến 15M / 180 phút.
- Cập nhật vốn: notional 500 USD, leverage x5, margin 100 USDT.
- Cập nhật Daily Max Loss: 3 USDT.
- Cập nhật service worker cache: `ftokx-simple-pwa-v2.1.0-config180`.
- Thêm config file `config/FTOKX_SHORT_TREND_CONFIG_180_V2_1_0.json`.
- Xóa file local/nhạy cảm khỏi release: `.env.local`, `.vercel/project.json`.

### Giữ nguyên

- PWA tĩnh HTML/CSS/JS.
- Không backend.
- Không private API.
- Không auto trade.
- Dữ liệu localStorage cũ không bị đổi key.
- Export/import lịch sử JSON.
- Watch Mode, Paper Test, Morning Review, Mistake Counter, Weekly Review.

### Test

- `npm run check`
- `npm run validate`

## V2.0.0 FINAL — Futures Discipline OS

Ngày: 2026-06-21

- Command Center UI.
- Market Regime Pro.
- Session Quality.
- Pre-Trade Contract.
- Capital Ladder.
- Mistake Counter.
- Weekly Review & BTC Sweep.
- Paper Mode setting.
- Weekly Max Loss setting.
