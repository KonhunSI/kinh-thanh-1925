# Soát chính tả văn bản (12/11/2026)

Văn bản ban đầu lấy từ scrollmapper/bible_databases (bản gõ "Kinh Thánh Tiếng Việt 1934"). Bản này giữ đúng lối viết 1925 (nhơn, chơn, đờn, đương, nhứt, chánh…) nhưng có nhiều lỗi gõ: sót chữ, sót cả cụm, gõ nhầm chữ, sai tên riêng.

Cách soát: đối chiếu từng câu với bản gõ độc lập thứ hai (eBible.org vie1934, bản của Cadman).

- Chỗ hai bản khác nhau về nội dung: theo eBible. Lấy mẫu ngẫu nhiên cho thấy eBible đúng trong khoảng 9/10 trường hợp.
- Chỗ chỉ khác lối viết (nhơn/nhân, chơn/chân, đờn/đàn, đương/đang, nhứt/nhất, chánh/chính…): giữ lối viết 1925.
- Chỗ eBible bị lỗi mã chữ (Aùp, Eùp, ỗch, k” …) hoặc dùng chữ rất hiếm: giữ bản gốc.
- 136 câu eBible không có (cách đánh số câu khác): giữ bản gốc.
- Sửa thêm lỗi mã VNI ở chữ hoa (Oùc → Óc, Uûa → Ủa), khoảng trắng thừa trong tên riêng (Bê -e-Sê-ba → Bê-e-Sê-ba) và một số lỗi gõ lẻ.

Kết quả: 2.936 câu được sửa nội dung, 381 câu chỉ sửa khoảng trắng. Danh sách đầy đủ: `soat-chinh-ta-2026-11-12.csv`. Cột "Ưu tiên kiểm tra" = Cao cho chỗ đổi danh xưng Đức Chúa Trời/Đức Chúa Jêsus hoặc thêm/bớt từ 4 chữ trở lên; nên đối chiếu những dòng này với bản in trước.

## Đối chiếu lần hai với kinhthanh.httlvn.org (12/11/2026)

So toàn bộ 1.189 đoạn với bản VI1934 trên kinhthanh.httlvn.org (Hội Thánh Tin Lành Việt Nam). Trang này ghi "©1998 Thánh Kinh Hội giữ bản quyền", nên chỉ dùng làm thước đo để chọn giữa hai bản công cộng, không chép văn bản của trang.

- 2.562 câu đã sửa khớp với trang Hội Thánh.
- 63 câu trang Hội Thánh khớp bản gốc chứ không khớp eBible: đã trả lại bản gốc.
- 34 câu có lỗi gõ rõ ràng mà cả hai bản công cộng đều sai (lữa → lửa, bẩy → bẫy, lúa mình → lúa mì…): đã sửa.
- 273 câu trang Hội Thánh khác cả hai bản công cộng. Phần lớn là lối viết của bản 1998 (bịnh → bệnh, yên ủi → an ủi, chê-ru-bin → chê-ru-bim); để người đối chiếu bản in quyết định.


## Sửa theo kinhthanh.httlvn.org (12/11/2026)

Theo yêu cầu của chủ dự án, 243 câu trong danh sách 273 câu còn khác đã được sửa cho khớp chữ với kinhthanh.httlvn.org (bản VI1934). Chi tiết từng câu (trước/sau) trong `theo-httlvn-2026-11-12.csv`.

Không đổi:
- 25 câu chỉ khác cách đánh số câu và 2 câu chỉ khác dấu câu.
- 5 câu mà phần "thiếu" thật ra đang nằm ở câu kề bên (khác ranh giới câu): Thi Thiên 49:9, II Các Vua 2:24, II Sử Ký 35:26, I Cô-rinh-tô 3:22, II Cô-rinh-tô 13:12.
- Giữ chính tả 1925 ở các chữ đờn/đàn, nhơn/nhân, nầy/này.

Mác 9:50 được tách đoạn "Các ngươi phải có muối trong lòng mình…" ra thành câu 51 như trang Hội Thánh.
