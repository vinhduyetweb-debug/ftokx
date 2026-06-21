# FTOKX SIMPLE PWA V2.0 FINAL — Futures Discipline OS

PWA tĩnh HTML/CSS/JS dùng dữ liệu public OKX để lập phiếu thủ công BTC/USDT Futures. App không đặt lệnh, không đọc tài khoản, không private API, không auto trade, không backend.

## Tinh thần

Always Plan, Conditional Trade. App luôn dựng kế hoạch để nhìn thị trường, nhưng không ép xuống tiền. BTC là kho thóc; futures chỉ là xưởng phụ.

## V2.0 FINAL có gì

- Command Center UI: LONG/SHORT/LOCKED, Fitness, Grade, Limit, TP1, TP2, SL, lãi/lỗ, Copy OKX.
- Market Regime Pro: Trend Up, Trend Down, Range, Chop, Expansion.
- Session Quality: đánh giá giờ giao dịch; sau 23:30 siết mạnh nếu không phải Grade A.
- Pre-Trade Contract: bắt tick cam kết trước khi đánh dấu `Đã đặt Limit`.
- Capital Ladder: hiển thị margin hiện tại và margin Lão khuyến nghị.
- Mistake Counter: đếm lỗi kỷ luật như chase, Market, dời SL, vào lại sau SL, DCA futures.
- Weekly Review & BTC Sweep: gợi ý quét một phần lợi nhuận futures sang BTC.
- Paper Mode: lưu cài đặt chế độ ưu tiên giấy thử trước khi dùng tiền thật.
- Kill Switch & Capital Guard: One Trade Per Day, Daily Max Loss, Weekly Max Loss, Futures Fund Guard.

## Mặc định

- Cặp: BTC/USDT Futures
- Margin mode: Isolated / Cô lập
- Leverage: x20
- Margin mỗi lệnh: 50 USDT
- Quỹ futures tham chiếu: 100 USDT
- Daily Max Loss: 6 USDT
- Weekly Max Loss: 15 USDT
- TP1: chốt 50% vị thế
- TP2: chốt phần còn lại
- Sau TP1: gợi ý dời SL về hòa vốn

## Chạy local

```bash
npm run check
npm run validate
```

Có thể mở trực tiếp `index.html`, hoặc deploy lên Vercel/GitHub Pages.

## Deploy Vercel qua GitHub

```bash
npm run check
npm run validate
git status
git add .
git commit -m "Release V2.0 Final Futures Discipline OS"
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

Giữ key cũ để không phá dữ liệu V1.x.

## Giới hạn

- Không phải bot tự động.
- Không bảo đảm lợi nhuận.
- Không thay người dùng đặt SL/TP trên OKX.
- Dữ liệu OKX public có thể lỗi/chậm; khi dữ liệu không sạch, app sẽ khóa rủi ro.

Slogan: App tốt không cho nhiều lệnh hơn; app tốt giữ tay lâu hơn.
