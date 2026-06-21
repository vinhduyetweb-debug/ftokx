# FTOKX V1.3 Discipline Notes

Bản V1.3 bỏ mô hình 3 cặp x5 của V1.2.4 để chuyển sang một cặp duy nhất: BTC/USDT Futures, isolated x20.

App luôn dựng một phiếu kế hoạch. Tuy nhiên, Action mới là thứ quyết định:

- EXECUTABLE: có thể xem xét thủ công.
- WAIT_TRIGGER: chỉ chờ giá về vùng.
- PLAN_ONLY: chỉ xem, không ép trade.
- LOCKED_RISK: khóa rủi ro, position 0 USDT.

Điểm sống còn: luôn có phiếu để nhìn, nhưng tiền chỉ giữ được khi bỏ qua phiếu xấu.
