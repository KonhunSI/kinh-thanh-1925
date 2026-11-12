# Kinh Thánh 1925

Web đọc Kinh Thánh tiếng Việt bản Truyền Thống 1925 (Tân Ước 1923, Cựu Ước 1925).

- 66 sách, 1.189 đoạn, 31.102 câu; mỗi đoạn là một trang riêng (ví dụ `/giang/3/`) để công cụ tìm kiếm lập chỉ mục.
- Tìm kiếm có dấu và không dấu, gõ thẳng tên đoạn như "Giăng 3:16".
- Tô màu, ghi chú, đánh dấu, ảnh chia sẻ câu gốc, kế hoạch đọc, câu gốc mỗi ngày.
- Nghe đọc bằng giọng đọc của máy (tiếng Việt).
- Cài như ứng dụng (PWA) và đọc khi không có mạng.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `data/bNN.json` | Văn bản từng sách: mảng đoạn, mỗi đoạn là mảng câu |
| `src/books.mjs` | Tên sách, tên viết tắt, đường dẫn, câu gốc mỗi ngày |
| `src/app.js` | Phần tương tác trên trình duyệt |
| `src/style.css` | Giao diện |
| `src/sw.js` | Service worker cho chế độ không có mạng |
| `src/static/` | Biểu tượng ứng dụng, ảnh chia sẻ |
| `build.mjs` | Sinh toàn bộ web tĩnh vào `dist/` |

## Chạy trên máy

Cần Node.js 18 trở lên, không cần cài thêm thư viện.

```bash
node build.mjs            # sinh web vào dist/ với BASE="/"
npx serve dist            # xem thử tại http://localhost:3000
```

Biến môi trường: `BASE` (đường dẫn gốc, mặc định `/`), `SITE` (địa chỉ đầy đủ, dùng cho canonical và sitemap), `CNAME` (tên miền riêng).

## Đưa lên mạng

Mỗi lần đẩy lên nhánh `main`, GitHub Actions sinh web và đẩy sang nhánh `gh-pages`, GitHub Pages phục vụ từ nhánh đó.

**Gắn tên miền riêng:** tạo file `CNAME` ở thư mục gốc chứa tên miền (ví dụ `kinhthanh1925.vn`), trỏ DNS theo hướng dẫn của GitHub Pages, rồi đẩy lên `main`. Workflow sẽ tự đổi đường dẫn gốc thành `/`.

## Sửa văn bản

Văn bản lấy từ bản công cộng (scrollmapper/bible_databases, đối chiếu eBible.org vie1934), đã sửa lỗi mã chữ "Đ", lỗi VNI ở chữ hoa và 38 câu lỗi ký tự. Còn một số lỗi gõ nhỏ cần đối chiếu với bản in 1925. Để sửa một câu, sửa trực tiếp trong `data/bNN.json` (sách thứ NN, đoạn và câu đánh số từ 1).

## Bản quyền

Văn bản Kinh Thánh bản Truyền Thống 1925 thuộc phạm vi công cộng.
