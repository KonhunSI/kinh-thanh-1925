# Logo Kinh Thánh 1925

Sách bìa đen, chữ "Kinh Thánh 1925" mạ vàng trên bìa, ruy-băng đỏ (#8A1C2B).
Mẫu gốc vẽ bằng Google Flow (Nano Banana 2.1): `flow-goc.jpg`. Bản dùng thật là bản vẽ lại dạng vector:

- `logo.svg`: sách có chữ, nền trong suốt (dùng từ khoảng 64px trở lên)
- `logo-mark.svg`: sách không chữ, cho cỡ nhỏ (đầu trang web, favicon)
- `app-icon.svg`, `app-icon-1024.png`: biểu tượng app nền kem (App Store, CH Play)
- `app-icon-maskable.svg`: bản thu nhỏ vào vùng an toàn cho Android

Tạo lại: `python3 make-logo.py <literata-latin-400-normal.woff> <thư mục ra>` (chữ trên bìa đổi thành đường nét, không cần phông).
