# FTOKX SIMPLE PWA — X5 OKX TICKET

Mini app PWA một màn hình để lập phiếu OKX thủ công. Mỗi ngày mở app, bấm **CẬP NHẬT DỮ LIỆU & LẬP PHIẾU**, app lấy dữ liệu thị trường công khai từ OKX, chấm bối cảnh 4H BTC/ETH, rồi đưa ra **LONG**, **SHORT**, hoặc **KHÔNG GIAO DỊCH**.

Câu lõi của app: **App chỉ lập phiếu. Người giữ tay.**

## App làm gì

- Lấy nến 4H đã đóng của `BTC-USDT-SWAP` và `ETH-USDT-SWAP`.
- Lấy ticker mới của `BTC-USDT-SWAP`, `ETH-USDT-SWAP`, `OKB-USDT-SWAP`.
- Tính EMA20, EMA50 bằng JavaScript thuần.
- Chấm Long/Short theo 8 tiêu chí và bộ lọc chất lượng tín hiệu V1.2.1.
- Có **Luôn Online Watch Mode**: khi app đang mở, tự quét mỗi 5 phút, giữ màn hình sáng nếu trình duyệt hỗ trợ, phát âm thanh/rung khi có tín hiệu.
- Nếu đủ điều kiện, lập bảng nhập Limit cho `BTCUSDT`, `ETHUSDT`, `OKBUSDT`.
- Lưu phiên gần nhất vào LocalStorage.
- Lưu lịch sử từng ngày để so sánh 7 ngày và 30 ngày.
- Cho người dùng tự cập nhật trạng thái: Chờ đặt, Đã đặt Limit, Đã khớp, Không khớp đã hủy, Đã TP, Đã SL.
- Cho nhập kết quả ngày, Net PnL và ghi chú.
- Xuất, nhập và xóa lịch sử JSON trên máy.

## App không làm gì

- Không đăng nhập sàn.
- Không cần khóa truy cập sàn.
- Không có endpoint tài khoản, tài sản, hoặc đặt lệnh.
- Không tự đặt lệnh thật.
- Không hứa lợi nhuận.
- Không đuổi giá.
- Không có lệnh thứ 4.
- Không gửi Telegram ở V1.2.1 và không để bất kỳ mã bí mật nào trong frontend.

## Thông số X5 cố định

- Cặp: `BTCUSDT`, `ETHUSDT`, `OKBUSDT`.
- Vị thế: 50 USDT mỗi lệnh.
- Đòn bẩy: x5.
- Ký quỹ ước tính: 10 USDT mỗi lệnh.
- Chế độ ký quỹ: Cô lập.
- Loại lệnh: Limit.
- Thời gian chờ khớp: 20 phút.
- Phí dự phòng: 0.05 USDT mỗi lệnh.

| Cặp | TP | SL | Lãi sau phí | Lỗ sau phí |
| --- | ---: | ---: | ---: | ---: |
| BTCUSDT | 3% | 2% | +1.45 USDT | -1.05 USDT |
| ETHUSDT | 3% | 2% | +1.45 USDT | -1.05 USDT |
| OKBUSDT | 4% | 2.5% | +1.95 USDT | -1.30 USDT |

Tổng nếu thắng cả 3: **+4.85 USDT**.  
Tổng nếu thua cả 3: **-3.40 USDT**.  
Lỗ thực tế chạm **-4 USDT** thì dừng ngày.

## Logic 4H và Signal Quality V1.2.1

App chỉ dùng nến 4H đã đóng. Nến có timestamp + 4 giờ <= thời điểm hiện tại mới được tính.

Quy tắc quyết định V1.2.1:

- Score 5/8 chỉ là **WATCH**: quan sát, không lập phiếu.
- Long score >= 6 và Long - Short >= 2: có thể **LONG** nếu qua bộ lọc chất lượng.
- Short score >= 6 và Short - Long >= 2: có thể **SHORT** nếu qua bộ lọc chất lượng.
- Score 7/8 hoặc 8/8 là **STRONG**, nhưng vẫn giữ nguyên vốn và vẫn chỉ có 3 lệnh.
- Nếu nến BTC cực đoan, nghỉ.
- Nếu BTC sát EMA20 dưới 0.25%, xem là vùng nhiễu và nghỉ.
- Nếu BTC không đạt tối thiểu 4/5 tiêu chí lõi, không lập phiếu dù ETH đẹp.
- Nếu ngày liền trước lỗ, bật cooldown: hôm nay phải đạt 7/8 mới lập phiếu.
- Nếu không lấy được dữ liệu công khai, app báo nghỉ và không dựng dữ liệu giả.

Cấu hình tín hiệu chính:

```js
SIGNAL_CONFIG = {
  minTradeScore: 6,
  watchScore: 5,
  minScoreGap: 2,
  strongScore: 7,
  extremeRangeMultiplier: 1.8,
  ema50SlopeLookback: 3,
  minDistanceFromEma20: 0.0025,
  btcMustLead: true,
  btcLeadMinScore: 4,
  lossCooldownEnabled: true,
  lossCooldownMinScore: 7,
  atrPctMin: 0.00755,
  atrPctMax: 0.03,
  requireVolumePositive: true,
  longRequireGreenCandle: true
}
```


## Luôn Online Watch Mode

V1.2.1 có nút **BẬT LUÔN ONLINE** dành cho điện thoại phụ. Khi bật:

- App tự cập nhật dữ liệu công khai mỗi 5 phút khi app còn mở.
- App cố giữ màn hình sáng bằng Screen Wake Lock nếu trình duyệt hỗ trợ.
- App xin quyền notification nếu trình duyệt cho phép.
- Khi phát hiện LONG hoặc SHORT mới, app phát chuông bằng Web Audio và gọi rung bằng Vibration API nếu thiết bị hỗ trợ.
- Có nút **Test chuông/rung** để kiểm tra điện thoại trước khi canh thật.
- Có nút **Dừng báo động**. Báo động cũng tự dừng sau khoảng 2 phút để tránh hú vô hạn.

Giới hạn thực tế:

- Điện thoại phải mở app, còn màn hình, nên cắm sạc nếu canh lâu.
- Nếu khóa màn hình hoặc đưa trình duyệt xuống nền, hệ điều hành có thể giảm hoặc dừng timer.
- iPhone/iOS có thể hạn chế rung hoặc âm thanh hơn Android/Chrome.
- Watch Mode chỉ báo tín hiệu, không đặt lệnh, không đuổi giá, không tự giao dịch.

## Chạy local

Dùng một static server bất kỳ:

```bash
npx serve .
```

Lưu ý: rewrite `/api/okx/*` hoạt động khi chạy qua Vercel. Khi chạy local bằng static server đơn giản, dữ liệu OKX có thể không cập nhật nếu không có proxy tương ứng.

## Lịch sử và so sánh

V1.2.1 giữ tab **LỊCH SỬ** từ V1.1. Mỗi ngày app lưu một bản ghi vào LocalStorage key `ftokx_simple_pwa_v1_history`.

Thông tin lưu gồm:

- Ngày và giờ lập phiếu.
- Quyết định LONG, SHORT hoặc KHÔNG GIAO DỊCH.
- Long score, Short score và cấp tín hiệu `WATCH`, `VALID_LONG`, `VALID_SHORT`, `STRONG_LONG`, `STRONG_SHORT` hoặc `NO_TRADE`.
- Giá BTCUSDT, ETHUSDT, OKBUSDT tại lúc lập phiếu.
- Bảng phiếu và trạng thái thủ công.
- Kết quả ngày, Net PnL USDT và ghi chú.

Nếu cùng một ngày bấm cập nhật nhiều lần, app hỏi xác nhận trước khi ghi đè phiên hôm nay.

## Kết quả ngày

Dưới phiếu hôm nay có khu vực **Kết quả ngày**. Người dùng tự chọn:

- Chưa chốt.
- Không giao dịch.
- Không khớp đã hủy.
- Thắng cả 3.
- Thua cả 3.
- Kết quả hỗn hợp.

Gợi ý tự điền:

- Thắng cả 3: `+4.85` USDT.
- Thua cả 3: `-3.40` USDT.
- Không giao dịch hoặc không khớp đã hủy: `0` USDT.
- Kết quả hỗn hợp: người dùng tự nhập.

## Backup lịch sử

Trong tab **LỊCH SỬ** có:

- **Xuất lịch sử JSON**: tải file `ftokx-history-YYYY-MM-DD.json`.
- **Nhập lịch sử JSON**: merge theo ngày, bản mới hơn theo `updatedAt` thắng.
- **Xóa lịch sử**: chỉ xóa `ftokx_simple_pwa_v1_history`, không xóa phiên hôm nay.

LocalStorage có thể mất nếu xóa dữ liệu trình duyệt, đổi máy, đổi profile hoặc reset PWA. Nên export lịch sử định kỳ.

## Có gì mới ở V1.2.1

- Nâng ngưỡng lập phiếu từ 5/8 lên 6/8.
- 5/8 chuyển thành WATCH, không lập phiếu.
- Thêm cấp tín hiệu VALID và STRONG.
- Thêm bộ lọc BTC phải dẫn hướng tối thiểu 4/5 tiêu chí lõi.
- Thêm vùng nhiễu sát EMA20: dưới 0.25% thì nghỉ.
- Thêm kiểm tra độ dốc EMA50 trong 3 nến.
- Thêm cooldown sau ngày lỗ: phải đạt 7/8 mới lập phiếu.
- Thêm V3.3 safety gate: BTC ATR% từ 0.755% đến 3.0%, volume BTC phải hợp lệ, LONG cần nến BTC 4H đóng xanh.
- Thêm Luôn Online Watch Mode: tự quét 5 phút khi app mở, giữ màn hình sáng nếu hỗ trợ, phát chuông/rung khi có tín hiệu.
- Không tăng vốn khi tín hiệu mạnh.

## Test

```bash
node --check app.js
node --check service-worker.js
node --check tools/validate-app.js
node tools/validate-app.js
```

Hoặc:

```bash
npm run check
npm run validate
```

## Deploy Vercel

1. Đưa toàn bộ thư mục lên GitHub.
2. Import repo vào Vercel.
3. Framework preset: Other.
4. Build command: để trống.
5. Output directory: `.`.
6. Deploy.

`vercel.json` đã có rewrite:

- `/api/okx/candles` → OKX public candles.
- `/api/okx/ticker` → OKX public ticker.

## Cài PWA

- Trên Chrome/Brave desktop: mở app, bấm biểu tượng cài đặt trên thanh địa chỉ.
- Trên Android: mở app, chọn menu trình duyệt, chọn thêm vào màn hình chính.
- Trên iPhone Safari: Share, Add to Home Screen.

## Offline và cache

- Online: cập nhật dữ liệu thị trường mới.
- Offline: chỉ mở lại shell app và xem phiên đã lưu.
- Service worker chỉ cache shell app, không cache dữ liệu OKX.
- Cache version: `ftokx-simple-pwa-v1.2.1`.

Nếu thấy bản cũ:

1. Mở DevTools → Application → Service Workers.
2. Chọn Unregister.
3. Clear site data.
4. Tải lại trang.

## Cảnh báo

Đây không phải lời khuyên tài chính. App chỉ lập phiếu tham khảo để người dùng tự nhập thủ công vào OKX. Người dùng tự chịu trách nhiệm với mọi quyết định và rủi ro.
