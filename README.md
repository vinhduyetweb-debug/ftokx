# FTOKX SIMPLE PWA V1.3 — BTC 20X Discipline Ticket

App PWA tĩnh HTML/CSS/JS dùng dữ liệu thị trường công khai OKX để lập phiếu futures thủ công cho **BTC/USDT**.

Triết lý V1.3:

> Always Plan, Conditional Trade — mở app lúc nào cũng có kế hoạch, nhưng không phải kế hoạch nào cũng đáng xuống tiền.

## Cảnh báo

- App chỉ lập phiếu. Người giữ tay.
- Không hứa lợi nhuận.
- Không auto trade.
- Không private API.
- Không kết nối tài khoản sàn.
- Không đọc số dư, vị thế hoặc lịch sử giao dịch OKX.
- Không khuyến khích all-in, martingale, DCA futures hoặc gỡ lỗ bằng đòn bẩy.
- 20x là rủi ro cao. Nếu không chấp nhận SL thì không dùng futures.

## App làm gì

- Lấy nến 4H đã đóng và ticker public của `BTC-USDT-SWAP` qua rewrite Vercel `/api/okx/*`.
- Chỉ dùng **BTC/USDT Futures**.
- Mặc định **Isolated x20**.
- Luôn dựng 01 phiếu phân tích BTC.
- Chấm **Fitness %** so với bộ phiếu chuẩn 100 điểm.
- Gắn **Grade A/B/C/D/F**.
- Gắn **Action** rõ ràng:
  - `EXECUTABLE`: có thể xem xét thủ công.
  - `WAIT_TRIGGER`: chỉ chờ giá về vùng, không chase.
  - `PLAN_ONLY`: chỉ lập kế hoạch, không khuyến nghị vào lệnh.
  - `LOCKED_RISK`: khóa rủi ro, position mặc định 0 USDT.
- Có slogan/câu nhắc của Lão phù hợp từng trạng thái.
- Có Morning Review để tự ghi kết quả và bài học.
- Có Watch Mode quét 5 phút/lần khi app đang mở; chỉ hú chuông khi action = `EXECUTABLE`.
- Có lịch sử 7 ngày / 30 ngày, export/import JSON.

## Thông số giao dịch V1.3

| Mục | Giá trị |
| --- | --- |
| Cặp | BTC/USDT Futures |
| Instrument | `BTC-USDT-SWAP` |
| Margin | Isolated / Cô lập |
| Leverage | x20 |
| Loại lệnh | Limit |
| Số phiếu mỗi lần mở app | 01 phiếu |
| No Chase | 0.25% khỏi Limit |
| Chờ Limit | 20 phút |
| Private API | Không |
| Auto trade | Không |

## Size tự co theo Grade

| Grade | Fitness | Position notional mặc định | Ý nghĩa |
| --- | ---: | ---: | --- |
| A | 90–100% | 50 USDT | Phiếu rất đẹp, vẫn vào nhỏ |
| B | 80–89% | 35 USDT | Phiếu tốt, giảm size |
| C | 70–79% | 25 USDT | Chờ trigger, không chase |
| D | 55–69% | 15 USDT | Phiếu yếu, ưu tiên chỉ xem |
| F | <55% | 0 USDT | Không đáng xuống tiền |

`LOCKED_RISK` luôn đặt position mặc định **0 USDT** dù Grade/Fitness ra sao.

## TP/SL mặc định theo Grade

| Grade | TP | SL |
| --- | ---: | ---: |
| A | 1.00% | 0.45% |
| B | 0.80% | 0.40% |
| C | 0.65% | 0.35% |
| D | 0.50% | 0.30% |
| F | 0.40% | 0.25% |

Với 20x, SL nhỏ là bắt buộc. Không dời SL. Không gồng lỗ.

## Fitness Score 100 điểm

| Nhóm | Điểm |
| --- | ---: |
| Xu hướng BTC / EMA / cấu trúc giá | 25 |
| Momentum nến 4H | 15 |
| Khoảng cách BTC tới EMA20 | 10 |
| ATR trong vùng đẹp | 15 |
| Volume xác nhận | 10 |
| Không có extreme candle | 10 |
| Long/Short gap rõ ràng | 10 |
| Dữ liệu OKX fresh | 5 |

## Hard veto / LOCKED_RISK

App vẫn dựng phiếu phân tích, nhưng khóa hành động và để position = 0 USDT nếu có:

- Dữ liệu không fresh.
- ATR% dưới 1.0% hoặc trên 2.0%.
- Volume không đủ tin cậy.
- Nến 4H quá cực đoan.
- Đang cooldown sau ngày lỗ mà điểm chưa đủ mạnh.
- Long/Short quá nhiễu, chưa xác định được bên ít xấu hơn.

## Slogan theo trạng thái

- `EXECUTABLE`: “Lệnh đẹp vẫn phải nhỏ, vì thị trường không nợ ta điều gì.”
- `WAIT_TRIGGER`: “Giá chạy mất thì để nó chạy; tiền còn là cơ hội còn.”
- `PLAN_ONLY`: “Phiếu yếu là bản đồ, không phải lời mời xuống tiền.”
- `LOCKED_RISK`: “Khi rủi ro khóa cửa, người sống sót không phá khóa.”
- Cooldown: “Sau một lệnh thua, việc đầu tiên là giữ tay.”
- Lỗi dữ liệu: “Không có dữ liệu sạch thì không có quyết định sạch.”

## Morning Review

Sáng hôm sau ghi:

- Phiếu tối qua.
- LONG/SHORT.
- Entry, TP, SL.
- Kết quả: TP / SL / Manual Close / Not Filled / Still Open.
- PnL nhập tay.
- Cảm xúc lúc vào lệnh.
- Ghi chú bài học.
- Có dời SL không, có gồng lỗ không, có vào lại sau SL không.

Nếu lỗ hoặc phá luật, phiên sau phải để cooldown kéo tay lại.

## LocalStorage

Giữ các key cũ để không phá dữ liệu người dùng:

- `ftokx_simple_pwa_v1_session`
- `ftokx_simple_pwa_v1_settings`
- `ftokx_simple_pwa_v1_history`
- `ftokx_simple_pwa_v1_alert_log`
- `ftokx_simple_pwa_v1_paper_tests`

## Chạy local

```bash
npm run check
npm run validate
npx serve .
```

Lưu ý: rewrite `/api/okx/*` hoạt động khi chạy qua Vercel. Nếu chạy local bằng static server đơn giản, dữ liệu OKX có thể không cập nhật nếu không có proxy tương ứng.

## Deploy Vercel

Nếu repo đã nối Vercel:

```bash
git status
git add .
git commit -m "Add V1.3 BTC 20X Discipline Ticket"
git push origin main
```

Push xong Vercel tự deploy.

Slogan: Có kế hoạch mỗi ngày, nhưng không cần xuống tiền mỗi ngày.
