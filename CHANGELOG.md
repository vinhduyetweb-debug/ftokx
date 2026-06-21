# CHANGELOG

## V2.0.0 FINAL — Futures Discipline OS

Ngày: 2026-06-21

### Thêm mới

- Command Center UI: gom hướng, Fitness, Grade, Limit, TP1, TP2, SL, PnL, Copy OKX lên vùng trọng tâm.
- Market Regime Pro: phân loại Trend Up, Trend Down, Range, Chop, Expansion.
- Session Quality: đánh giá chất lượng giờ giao dịch; sau 23:30 siết mạnh nếu không phải Grade A.
- Pre-Trade Contract: yêu cầu tick đủ 5 cam kết trước khi đánh dấu `Đã đặt Limit`.
- Capital Ladder: hiển thị margin hiện tại và margin Lão khuyến nghị theo Grade/action/quỹ futures.
- Mistake Counter: ghi lỗi kỷ luật trong Morning Review và tổng hợp 7/30 ngày.
- Weekly Review & BTC Sweep: gợi ý quét lợi nhuận futures sang BTC theo tỷ lệ cài đặt.
- Paper Mode setting: cho phép ghi nhớ ưu tiên quan sát/giấy thử trước.
- Weekly Max Loss setting: thêm phanh lỗ tuần.

### Giữ nguyên

- Chỉ BTC/USDT.
- Isolated x20.
- Limit only.
- Survival TP1/TP2.
- Kill Switch & Capital Guard.
- Không backend.
- Không private API.
- Không auto trade.
- Không martingale.
- Không DCA futures.
- Không phá localStorage key cũ.

### Test

- `npm run check`
- `npm run validate`

## V1.3.5 — Kill Switch & Capital Guard

- One Trade Per Day.
- Daily Max Loss.
- Futures Fund Guard.
- Copy Ticket OKX.
