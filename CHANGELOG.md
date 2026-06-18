# Changelog

## 1.2.1 — 2026-06-18

- Thêm Signal Quality Pack.
- Nâng ngưỡng lập phiếu từ 5/8 lên 6/8.
- 5/8 chuyển thành WATCH, không lập phiếu.
- Thêm cấp tín hiệu VALID_LONG, VALID_SHORT, STRONG_LONG, STRONG_SHORT.
- Thêm bộ lọc BTC dẫn hướng tối thiểu 4/5 tiêu chí lõi.
- Thêm vùng nhiễu sát EMA20 dưới 0.25% thì nghỉ.
- Thêm kiểm tra độ dốc EMA50 trong 3 nến.
- Thêm cooldown sau ngày lỗ: phải đạt 7/8 mới lập phiếu.
- Thêm V3.3 Safety Gate: ATR% 0.755%–3.0%, volume BTC > 0, LONG cần BTC 4H đóng xanh.
- Thêm Luôn Online Watch Mode: tự quét mỗi 5 phút khi app mở.
- Thêm âm thanh/rung kiểu báo động khi Watch Mode phát hiện LONG/SHORT.
- Thêm Screen Wake Lock nếu trình duyệt hỗ trợ.
- Tăng service worker cache lên `ftokx-simple-pwa-v1.2.1`.
- Cập nhật README và validator cho V1.2.1.

## 1.1.0 — 2026-06-18

- Thêm tab LỊCH SỬ.
- Thêm LocalStorage key `ftokx_simple_pwa_v1_history`.
- Lưu lịch sử từng ngày theo quyết định LONG / SHORT / KHÔNG GIAO DỊCH.
- Thêm khu vực Kết quả ngày với Net PnL USDT và ghi chú.
- Thêm thống kê so sánh 7 ngày và 30 ngày.
- Thêm xuất lịch sử JSON, nhập lịch sử JSON và xóa lịch sử.
- Tăng service worker cache lên `ftokx-simple-pwa-v1.1.0`.
- Cập nhật validator cho lịch sử và backup.

## 1.0.0 — 2026-06-18

- Tạo mới FTOKX SIMPLE PWA — X5 OKX TICKET.
- HTML/CSS/JavaScript thuần.
- PWA cơ bản với manifest và service worker version `ftokx-simple-pwa-v1.0.0`.
- Vercel rewrite cho OKX public candles/ticker.
- Chấm bối cảnh 4H bằng EMA20/EMA50.
- Lập phiếu thủ công cho BTCUSDT, ETHUSDT, OKBUSDT.
- Theo dõi trạng thái thủ công bằng LocalStorage.
- Validator dự án trong `tools/validate-app.js`.
