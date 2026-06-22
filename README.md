# FTOKX SIMPLE PWA V2.2 CONFIG180 POSITION RANGE

PWA tĩnh HTML/CSS/JS dùng dữ liệu public OKX để soi BTC/USDT-SWAP theo bộ tham chiếu **LÃO SHORT TREND V1.4.2 — WATCHLIST CONFIG 180**, nhưng nâng thêm lớp **Position Range 500–1000 USD** để không còn cứng một size.

App không đặt lệnh, không đọc tài khoản, không private API, không auto trade, không backend. Bản này mặc định **WATCHLIST / OBSERVATION_ONLY / NO_LIVE** để kiểm chứng thêm bộ thông số backtest trước khi dùng thật.

## Tinh thần

Backtest chỉ là bộ lọc. App này giúp ông mở lên là biết: thị trường có đang đúng cửa SHORT Trend hay không, nếu khớp thì ghi paper/watchlist, nếu không khớp thì khóa tay.

## Bộ thông số V2.2 CONFIG180 POSITION RANGE

- Pair: BTC/USDT-SWAP
- Signal TF: 4H closed candles only
- Execution TF: 15M
- Direction: SHORT only
- Position notional: 500–1000 USD
- Position ladder: BASE 500 / BOOST 750 / MAX WATCH 1000 USD
- Leverage: x5
- Margin range: 100–200 USDT
- Default margin: 100 USDT
- Mode: Isolated
- Regime: Trend Down only
- Grade: A only
- Min Fitness: 92
- ATR: 0.6% đến 2.0%
- EMA20 distance: 1.0% đến 2.8%
- No Chase: 0.15%
- TP1: 0.70%
- TP2: 0.70%
- SL: 0.30%
- Expiry: 12 nến 15M / 180 phút
- Daily Max Loss: 3 USDT
- One Trade Per Day: ON
- Kill Switch: ON
- Volume Filter: ON

## Nâng cấp chính so với V2.1

- Đổi bản từ một size cứng 500 USD sang **vùng vị thế 500–1000 USD**.
- Thêm Position Ladder trong Capital Guard:
  - BASE: 500 USD / margin 100 USDT.
  - BOOST: 750 USD / margin 150 USDT.
  - MAX WATCH: 1000 USD / margin 200 USDT.
- Siết input margin/lệnh chỉ trong vùng 100–200 USDT để tương ứng vị thế x5 500–1000 USD.
- Mặc định vẫn **NO_LIVE / WATCHLIST**; MAX 1000 ưu tiên paper/quan sát trước.
- Cập nhật copy phiếu OKX, tiêu đề, mô tả kỹ thuật và README theo vùng vị thế mới.
- Cập nhật PWA cache name lên `ftokx-simple-pwa-v2.2.0-config180-position-range`.
- Giữ nguyên localStorage key cũ để không phá lịch sử.

## Chạy local

```bash
npm run check
npm run validate
```

Có thể mở trực tiếp `index.html` để xem shell và lịch sử local. Dữ liệu live OKX cần deploy có rewrite `/api/okx/*` như trong `vercel.json`.

## Deploy Vercel qua GitHub

```bash
npm run check
npm run validate
git status
git add .
git commit -m "Release V2.2 Config180 Position Range"
git push origin main
```

Nếu dùng Vercel CLI:

```bash
npx vercel --prod
```

## Dữ liệu

App lưu dữ liệu local trên máy bằng localStorage:

- `ftokx_simple_pwa_v1_session`
- `ftokx_simple_pwa_v1_settings`
- `ftokx_simple_pwa_v1_history`
- `ftokx_simple_pwa_v1_alert_log`
- `ftokx_simple_pwa_v1_paper_tests`
- `ftokx_simple_pwa_v2_pretrade_contract`

Giữ key cũ để không phá dữ liệu V1/V2. Khi mở V2.2 lần đầu, settings được migrate sang profile Config 180 Position Range.

## Giới hạn

- Đây là app quan sát, không phải bot giao dịch.
- Bộ Config 180 lấy từ backtest tham chiếu, chưa được xác nhận hoàn hảo.
- Không bảo đảm lợi nhuận.
- Vị thế 1000 USD ở x5 có rủi ro phí + SL lớn hơn mốc BASE; chỉ dùng sau khi có nhật ký paper đủ sạch.
- App không tự biết tài khoản OKX, margin thật, liquidation thật.
- Nếu OKX public API lỗi/chậm, app sẽ khóa rủi ro.

Slogan: Size lớn không cứu được setup yếu; sống sót mới có lượt tiếp theo.
