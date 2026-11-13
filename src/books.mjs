// Danh sách 66 sách theo Kinh Thánh bản Truyền Thống 1925.
// [tên đầy đủ, tên viết tắt]
export const BOOKS = [
  ["Sáng Thế Ký", "Sáng"], ["Xuất Ê-díp-tô Ký", "Xuất"], ["Lê-vi Ký", "Lê-vi"], ["Dân Số Ký", "Dân"],
  ["Phục Truyền Luật Lệ Ký", "Phục"], ["Giô-suê", "Giô-suê"], ["Các Quan Xét", "Quan"], ["Ru-tơ", "Ru-tơ"],
  ["I Sa-mu-ên", "1 Sa"], ["II Sa-mu-ên", "2 Sa"], ["I Các Vua", "1 Vua"], ["II Các Vua", "2 Vua"],
  ["I Sử Ký", "1 Sử"], ["II Sử Ký", "2 Sử"], ["E-xơ-ra", "E-xơ"], ["Nê-hê-mi", "Nê"], ["Ê-xơ-tê", "Ê-xơ-tê"],
  ["Gióp", "Gióp"], ["Thi Thiên", "Thi"], ["Châm Ngôn", "Châm"], ["Truyền Đạo", "Truyền"], ["Nhã Ca", "Nhã"],
  ["Ê-sai", "Ê-sai"], ["Giê-rê-mi", "Giê"], ["Ca Thương", "Ca"], ["Ê-xê-chi-ên", "Ê-xê"], ["Đa-ni-ên", "Đa"],
  ["Ô-sê", "Ô-sê"], ["Giô-ên", "Giô-ên"], ["A-mốt", "A-mốt"], ["Áp-đia", "Áp"], ["Giô-na", "Giô-na"],
  ["Mi-chê", "Mi"], ["Na-hum", "Na"], ["Ha-ba-cúc", "Ha"], ["Sô-phô-ni", "Sô"], ["A-ghê", "A-ghê"],
  ["Xa-cha-ri", "Xa"], ["Ma-la-chi", "Ma-la"],
  ["Ma-thi-ơ", "Mat"], ["Mác", "Mác"], ["Lu-ca", "Lu"], ["Giăng", "Giăng"], ["Công Vụ Các Sứ Đồ", "Công"],
  ["Rô-ma", "Rô"], ["I Cô-rinh-tô", "1 Cô"], ["II Cô-rinh-tô", "2 Cô"], ["Ga-la-ti", "Ga"], ["Ê-phê-sô", "Êph"],
  ["Phi-líp", "Phil"], ["Cô-lô-se", "Côl"], ["I Tê-sa-lô-ni-ca", "1 Tê"], ["II Tê-sa-lô-ni-ca", "2 Tê"],
  ["I Ti-mô-thê", "1 Ti"], ["II Ti-mô-thê", "2 Ti"], ["Tít", "Tít"], ["Phi-lê-môn", "Phlm"], ["Hê-bơ-rơ", "Hê"],
  ["Gia-cơ", "Gia"], ["I Phi-e-rơ", "1 Phi"], ["II Phi-e-rơ", "2 Phi"], ["I Giăng", "1 Gi"], ["II Giăng", "2 Gi"],
  ["III Giăng", "3 Gi"], ["Giu-đe", "Giu"], ["Khải Huyền", "Khải"],
];
export const NT = 39;

// Bỏ dấu tiếng Việt, giữ nguyên độ dài chuỗi (mỗi ký tự → một ký tự).
export function fold(s) {
  let o = "";
  for (const ch of s) {
    if (ch === "Đ" || ch === "đ") { o += "d"; continue; }
    o += ch.normalize("NFD")[0].toLowerCase();
  }
  return o;
}
const roman = (s) => s.replace(/^III\s/, "3 ").replace(/^II\s/, "2 ").replace(/^I\s/, "1 ");
export const slugOf = (name) => fold(roman(name)).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const SLUGS = BOOKS.map(([n]) => slugOf(n));

// Câu gốc mỗi ngày: [sách (1-66), đoạn, câu]

// Giới thiệu ngắn từng sách (dùng cho trang sách và mô tả SEO).
export const INTRO = {
  0: "Sách khởi đầu: sự sáng tạo, sa ngã, nước lụt, và lời hứa Đức Chúa Trời lập với Áp-ra-ham, Y-sác, Gia-cốp, Giô-sép.",
  1: "Đức Chúa Trời giải cứu dân Y-sơ-ra-ên khỏi Ê-díp-tô, ban luật pháp tại núi Si-na-i và đền tạm.",
  18: "150 bài thi ca, lời cầu nguyện và ngợi khen dân Đức Chúa Trời đã hát qua nhiều thế hệ.",
  19: "Những lời khôn ngoan cho đời sống hằng ngày, phần lớn của vua Sa-lô-môn.",
  22: "Lời tiên tri về sự phán xét và cứu rỗi, cùng hình ảnh Đấng Mết-si-a chịu khổ.",
  39: "Phúc Âm về Đức Chúa Jêsus Christ, Vua của dân Giu-đa, với Bài Giảng Trên Núi.",
  42: "Phúc Âm nhấn mạnh Đức Chúa Jêsus là Con Đức Chúa Trời, để ai tin thì được sự sống đời đời.",
  43: "Hội Thánh đầu tiên được thành lập và Tin Lành lan từ Giê-ru-sa-lem đến La-mã.",
  44: "Thư Phao-lô trình bày sự công bình bởi đức tin trong Đức Chúa Jêsus Christ.",
  65: "Sự mặc thị cho Giăng về sự đắc thắng sau cùng của Đấng Christ, trời mới và đất mới.",
};

// Nhóm sách theo cách chia quen thuộc: [tên nhóm, chỉ số sách đầu, chỉ số sách cuối (tính cả)]
export const GROUPS = [
  ["Ngũ Kinh", 0, 4], ["Lịch sử", 5, 16], ["Thơ ca", 17, 21], ["Tiên tri lớn", 22, 26], ["Tiên tri nhỏ", 27, 38],
  ["Phúc Âm", 39, 42], ["Lịch sử", 43, 43], ["Thư của Phao-lô", 44, 56], ["Thư chung", 57, 64], ["Tiên tri", 65, 65],
];
export const groupOf = (b) => GROUPS.find(([, a, z]) => b >= a && b <= z)[0];
