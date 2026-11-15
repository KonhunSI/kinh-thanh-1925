Bản sao trang đăng nhập của Firebase (lấy từ https://kinhthanh1925.firebaseapp.com/__/auth/…)
để cửa sổ đăng nhập Google hiện "kinhthanh1925.com" thay vì "kinhthanh1925.firebaseapp.com".
build.mjs chép vào dist/__/auth/. GitHub Pages không phục vụ tệp không đuôi nên handler và iframe
nằm ở thư mục …/handler/index.html; đoạn script đầu trang bỏ dấu "/" cuối địa chỉ cho khớp redirect URI.
Nên tải lại các tệp này định kỳ (vài tháng một lần) khi Firebase cập nhật.
