"use strict";
const META={"BASE":"/","NT":39,"CHS":[50,40,27,36,34,24,21,4,31,24,22,25,29,36,10,13,10,42,150,31,12,8,66,52,5,48,12,14,3,9,1,4,7,3,3,3,2,14,4,28,16,24,21,28,16,16,13,6,6,4,4,5,3,6,4,3,1,13,5,5,3,5,1,1,1,22],"GROUPS":[["Ngũ Kinh",0,4],["Lịch sử",5,16],["Thơ ca",17,21],["Tiên tri lớn",22,26],["Tiên tri nhỏ",27,38],["Phúc Âm",39,42],["Lịch sử",43,43],["Thư của Phao-lô",44,56],["Thư chung",57,64],["Tiên tri",65,65]],"VOD_DAYS":{"01-01":[25,3,22],"01-02":[25,3,23],"01-03":[23,43,19],"01-04":[47,5,17],"01-05":[50,3,13],"01-06":[50,3,14],"01-07":[19,90,12],"01-08":[20,16,3],"01-09":[19,37,5],"01-10":[24,29,11],"01-11":[20,3,5],"01-12":[20,3,6],"01-13":[6,1,9],"01-14":[19,119,105],"01-15":[40,6,33],"01-16":[19,1,1],"01-17":[19,1,2],"01-18":[19,1,3],"01-19":[6,1,8],"01-20":[55,3,16],"01-21":[58,4,12],"01-22":[23,40,8],"01-23":[40,4,4],"01-24":[19,119,11],"01-25":[59,1,22],"01-26":[51,3,16],"01-27":[45,10,17],"01-28":[19,19,7],"01-29":[19,119,18],"01-30":[43,8,31],"01-31":[43,8,32],"02-01":[46,13,4],"02-02":[46,13,5],"02-03":[46,13,6],"02-04":[46,13,7],"02-05":[46,13,8],"02-06":[46,13,13],"02-07":[62,4,7],"02-08":[62,4,8],"02-09":[62,4,16],"02-10":[62,4,18],"02-11":[62,4,19],"02-12":[43,13,34],"02-13":[43,15,12],"02-14":[22,8,7],"02-15":[45,5,8],"02-16":[45,8,38],"02-17":[45,8,39],"02-18":[49,4,2],"02-19":[49,4,32],"02-20":[51,3,14],"02-21":[60,4,8],"02-22":[1,2,24],"02-23":[49,5,25],"02-24":[20,17,17],"02-25":[8,1,16],"02-26":[21,4,9],"02-27":[21,4,12],"02-28":[19,133,1],"02-29":[20,22,6],"03-01":[23,40,29],"03-02":[23,40,31],"03-03":[23,41,10],"03-04":[50,4,13],"03-05":[47,12,9],"03-06":[16,8,10],"03-07":[19,46,1],"03-08":[19,18,2],"03-09":[19,28,7],"03-10":[19,73,26],"03-11":[19,27,1],"03-12":[5,31,6],"03-13":[5,31,8],"03-14":[23,26,3],"03-15":[23,26,4],"03-16":[19,56,3],"03-17":[19,62,1],"03-18":[19,62,2],"03-19":[19,9,10],"03-20":[34,1,7],"03-21":[20,18,10],"03-22":[19,125,1],"03-23":[24,17,7],"03-24":[24,17,8],"03-25":[19,112,7],"03-26":[35,3,17],"03-27":[35,3,18],"03-28":[19,27,14],"03-29":[19,31,24],"03-30":[49,6,10],"03-31":[55,1,7],"04-01":[23,53,5],"04-02":[23,53,6],"04-03":[43,1,29],"04-04":[43,10,11],"04-05":[43,15,13],"04-06":[45,6,23],"04-07":[49,2,8],"04-08":[49,2,9],"04-09":[49,2,10],"04-10":[56,3,5],"04-11":[60,2,24],"04-12":[60,3,18],"04-13":[47,5,21],"04-14":[48,2,20],"04-15":[51,1,13],"04-16":[51,1,14],"04-17":[58,9,22],"04-18":[62,1,7],"04-19":[62,1,9],"04-20":[44,4,12],"04-21":[43,14,6],"04-22":[43,11,25],"04-23":[43,11,26],"04-24":[46,15,3],"04-25":[46,15,4],"04-26":[46,15,55],"04-27":[46,15,57],"04-28":[45,6,4],"04-29":[45,10,9],"04-30":[45,10,13],"05-01":[44,1,8],"05-02":[44,2,38],"05-03":[43,14,26],"05-04":[43,14,16],"05-05":[45,8,26],"05-06":[48,5,22],"05-07":[48,5,23],"05-08":[48,5,25],"05-09":[49,5,18],"05-10":[20,31,10],"05-11":[20,31,25],"05-12":[20,31,26],"05-13":[20,31,30],"05-14":[23,66,13],"05-15":[52,5,16],"05-16":[52,5,17],"05-17":[52,5,18],"05-18":[50,4,6],"05-19":[50,4,7],"05-20":[40,7,7],"05-21":[40,7,8],"05-22":[24,33,3],"05-23":[40,6,6],"05-24":[59,5,16],"05-25":[41,11,24],"05-26":[62,5,14],"05-27":[19,145,18],"05-28":[40,18,20],"05-29":[40,21,22],"05-30":[58,4,16],"05-31":[19,66,20],"06-01":[19,127,3],"06-02":[41,10,14],"06-03":[19,103,13],"06-04":[20,1,7],"06-05":[20,4,23],"06-06":[49,6,1],"06-07":[49,6,2],"06-08":[49,6,4],"06-09":[5,6,5],"06-10":[5,6,6],"06-11":[5,6,7],"06-12":[6,24,15],"06-13":[20,9,10],"06-14":[59,1,5],"06-15":[20,2,6],"06-16":[20,15,1],"06-17":[20,16,9],"06-18":[20,16,24],"06-19":[20,27,17],"06-20":[20,19,21],"06-21":[20,20,7],"06-22":[19,103,17],"06-23":[20,11,25],"06-24":[20,12,25],"06-25":[20,14,30],"06-26":[20,17,22],"06-27":[21,3,1],"06-28":[21,3,11],"06-29":[21,12,1],"06-30":[21,12,13],"07-01":[43,14,27],"07-02":[43,16,33],"07-03":[40,11,28],"07-04":[40,11,29],"07-05":[40,11,30],"07-06":[19,23,1],"07-07":[19,23,2],"07-08":[19,23,3],"07-09":[19,23,4],"07-10":[19,23,6],"07-11":[19,4,8],"07-12":[19,55,22],"07-13":[60,5,7],"07-14":[23,43,2],"07-15":[19,34,18],"07-16":[19,147,3],"07-17":[66,21,4],"07-18":[40,5,4],"07-19":[47,1,3],"07-20":[47,1,4],"07-21":[19,30,5],"07-22":[19,42,11],"07-23":[23,41,13],"07-24":[36,3,17],"07-25":[19,121,1],"07-26":[19,121,2],"07-27":[19,121,7],"07-28":[19,121,8],"07-29":[19,91,1],"07-30":[19,91,2],"07-31":[19,91,11],"08-01":[58,11,1],"08-02":[58,11,6],"08-03":[45,15,13],"08-04":[45,12,12],"08-05":[58,10,23],"08-06":[41,9,23],"08-07":[40,17,20],"08-08":[47,5,7],"08-09":[45,1,17],"08-10":[45,5,1],"08-11":[45,5,3],"08-12":[45,5,4],"08-13":[45,5,5],"08-14":[19,16,11],"08-15":[19,118,24],"08-16":[50,4,4],"08-17":[43,15,11],"08-18":[19,126,5],"08-19":[19,30,11],"08-20":[23,12,2],"08-21":[23,61,10],"08-22":[19,32,11],"08-23":[59,1,2],"08-24":[59,1,3],"08-25":[59,1,12],"08-26":[60,1,8],"08-27":[19,100,1],"08-28":[19,100,2],"08-29":[19,100,4],"08-30":[19,100,5],"08-31":[19,37,4],"09-01":[51,3,23],"09-02":[51,3,17],"09-03":[46,10,31],"09-04":[46,15,58],"09-05":[48,6,9],"09-06":[48,6,2],"09-07":[48,6,10],"09-08":[41,10,45],"09-09":[40,5,14],"09-10":[40,5,16],"09-11":[40,5,13],"09-12":[45,12,1],"09-13":[45,12,2],"09-14":[45,12,10],"09-15":[45,12,21],"09-16":[33,6,8],"09-17":[60,4,10],"09-18":[58,13,16],"09-19":[58,13,8],"09-20":[58,12,1],"09-21":[58,12,2],"09-22":[54,4,12],"09-23":[55,2,15],"09-24":[55,4,7],"09-25":[20,22,29],"09-26":[20,10,4],"09-27":[20,13,4],"09-28":[20,21,5],"09-29":[19,90,17],"09-30":[40,25,21],"10-01":[1,1,1],"10-02":[1,1,27],"10-03":[1,1,31],"10-04":[19,19,1],"10-05":[19,8,3],"10-06":[19,8,4],"10-07":[19,24,1],"10-08":[19,139,13],"10-09":[19,139,14],"10-10":[19,139,23],"10-11":[19,139,24],"10-12":[23,55,8],"10-13":[23,55,9],"10-14":[23,55,11],"10-15":[19,103,1],"10-16":[19,103,2],"10-17":[19,103,8],"10-18":[19,103,11],"10-19":[19,103,12],"10-20":[19,145,8],"10-21":[19,145,9],"10-22":[19,136,1],"10-23":[19,150,6],"10-24":[19,96,1],"10-25":[19,95,6],"10-26":[19,34,1],"10-27":[19,34,8],"10-28":[4,6,24],"10-29":[4,6,25],"10-30":[4,6,26],"10-31":[45,11,36],"11-01":[19,107,1],"11-02":[19,118,1],"11-03":[19,9,1],"11-04":[19,92,1],"11-05":[19,95,2],"11-06":[51,3,15],"11-07":[51,2,7],"11-08":[49,5,20],"11-09":[50,4,19],"11-10":[40,6,26],"11-11":[40,6,34],"11-12":[19,34,10],"11-13":[19,84,11],"11-14":[47,9,8],"11-15":[39,3,10],"11-16":[59,1,17],"11-17":[25,3,24],"11-18":[25,3,25],"11-19":[5,7,9],"11-20":[46,1,9],"11-21":[53,3,3],"11-22":[50,1,6],"11-23":[45,8,28],"11-24":[45,8,31],"11-25":[45,8,32],"11-26":[45,8,37],"11-27":[19,116,12],"11-28":[19,116,17],"11-29":[19,50,23],"11-30":[47,9,15],"12-01":[23,7,14],"12-02":[23,9,6],"12-03":[23,9,7],"12-04":[33,5,2],"12-05":[23,11,1],"12-06":[23,40,3],"12-07":[39,4,2],"12-08":[42,1,37],"12-09":[42,1,38],"12-10":[42,1,46],"12-11":[42,1,47],"12-12":[42,1,78],"12-13":[42,1,79],"12-14":[40,1,21],"12-15":[40,1,23],"12-16":[43,1,14],"12-17":[43,1,4],"12-18":[43,1,5],"12-19":[43,1,12],"12-20":[48,4,4],"12-21":[42,2,7],"12-22":[42,2,10],"12-23":[40,2,10],"12-24":[42,2,14],"12-25":[42,2,11],"12-26":[40,2,11],"12-27":[42,2,20],"12-28":[43,3,17],"12-29":[54,1,15],"12-30":[19,90,1],"12-31":[66,21,5]},"VOD_SPECIAL":{"GOODFRI":[42,23,34],"EASTER":[40,28,6],"PENTECOST":[44,2,4],"TET1":[19,128,1],"TET2":[2,20,12],"TET3":[19,115,15]},"TET":{"2026":"2026-02-17","2027":"2027-02-06","2028":"2028-01-26","2029":"2029-02-13","2030":"2030-02-02","2031":"2031-01-23","2032":"2032-02-11","2033":"2033-01-31","2034":"2034-02-19","2035":"2035-02-08","2036":"2036-01-28","2037":"2037-02-15","2038":"2038-02-04","2039":"2039-01-24","2040":"2040-02-12","2041":"2041-02-01","2042":"2042-01-22","2043":"2043-02-10","2044":"2044-01-30","2045":"2045-02-17","2046":"2046-02-06","2047":"2047-01-26","2048":"2048-02-14","2049":"2049-02-02","2050":"2050-01-23","2051":"2051-02-11","2052":"2052-02-01","2053":"2053-02-18","2054":"2054-02-08","2055":"2055-01-28","2056":"2056-02-15","2057":"2057-02-04","2058":"2058-01-24","2059":"2059-02-12","2060":"2060-02-02"},"VODIMG":["01-01.jpg","01-02.jpg","01-03.jpg","01-04.jpg","01-05.jpg","01-06.jpg","01-07.jpg","01-08.jpg","01-09.jpg","01-10.jpg","01-11.jpg","01-12.jpg","01-13.jpg","01-14.jpg","01-15.jpg","01-16.jpg","01-17.jpg","01-18.jpg","01-19.jpg","01-20.jpg","01-21.jpg","01-22.jpg","01-23.jpg","01-24.jpg","01-25.jpg","01-26.jpg","01-27.jpg","01-28.jpg","01-29.jpg","01-30.jpg","01-31.jpg","02-01.jpg","02-02.jpg","02-03.jpg","02-04.jpg","02-05.jpg","02-06.jpg","02-07.jpg","02-08.jpg","02-09.jpg","02-10.jpg","02-11.jpg","02-12.jpg","02-13.jpg","02-14.jpg","02-15.jpg","02-16.jpg","02-17.jpg","02-18.jpg","02-19.jpg","02-20.jpg","02-21.jpg","02-22.jpg","02-23.jpg","02-24.jpg","02-25.jpg","02-26.jpg","02-27.jpg","02-28.jpg","02-29.jpg","03-01.jpg","03-02.jpg","03-03.jpg","03-04.jpg","03-05.jpg","03-06.jpg","03-07.jpg","03-08.jpg","03-09.jpg","03-10.jpg","03-11.jpg","03-12.jpg","03-13.jpg","03-14.jpg","03-15.jpg","03-16.jpg","03-17.jpg","03-18.jpg","03-19.jpg","03-20.jpg","03-21.jpg","03-22.jpg","03-23.jpg","03-24.jpg","03-25.jpg","03-26.jpg","03-27.jpg","03-28.jpg","03-29.jpg","03-30.jpg","03-31.jpg","04-01.jpg","04-02.jpg","04-03.jpg","04-04.jpg","04-05.jpg","04-06.jpg","04-07.jpg","04-08.jpg","04-09.jpg","04-10.jpg","04-11.jpg","04-12.jpg","04-13.jpg","04-14.jpg","04-15.jpg","04-16.jpg","04-17.jpg","04-18.jpg","04-19.jpg","04-20.jpg","04-21.jpg","04-22.jpg","04-23.jpg","04-24.jpg","04-25.jpg","04-26.jpg","04-27.jpg","04-28.jpg","04-29.jpg","04-30.jpg","05-01.jpg","05-02.jpg","05-03.jpg","05-04.jpg","05-05.jpg","05-06.jpg","05-07.jpg","05-08.jpg","05-09.jpg","05-10.jpg","05-11.jpg","05-12.jpg","05-13.jpg","05-14.jpg","05-15.jpg","05-16.jpg","05-17.jpg","05-18.jpg","05-19.jpg","05-20.jpg","05-21.jpg","05-22.jpg","05-23.jpg","05-24.jpg","05-25.jpg","05-26.jpg","05-27.jpg","05-28.jpg","05-29.jpg","05-30.jpg","05-31.jpg","06-01.jpg","06-02.jpg","06-03.jpg","06-04.jpg","06-05.jpg","06-06.jpg","06-07.jpg","06-08.jpg","06-09.jpg","06-10.jpg","06-11.jpg","06-12.jpg","06-13.jpg","06-14.jpg","06-15.jpg","06-16.jpg","06-17.jpg","06-18.jpg","06-19.jpg","06-20.jpg","06-21.jpg","06-22.jpg","06-23.jpg","06-24.jpg","06-25.jpg","06-26.jpg","06-27.jpg","06-28.jpg","06-29.jpg","06-30.jpg","07-01.jpg","07-02.jpg","07-03.jpg","07-04.jpg","07-05.jpg","07-06.jpg","07-07.jpg","07-08.jpg","07-09.jpg","07-10.jpg","07-11.jpg","07-12.jpg","07-13.jpg","07-14.jpg","07-15.jpg","07-16.jpg","07-17.jpg","07-18.jpg","07-19.jpg","07-20.jpg","07-21.jpg","07-22.jpg","07-23.jpg","07-24.jpg","07-25.jpg","07-26.jpg","07-27.jpg","07-28.jpg","07-29.jpg","07-30.jpg","07-31.jpg","08-01.jpg","08-02.jpg","08-03.jpg","08-04.jpg","08-05.jpg","08-06.jpg","08-07.jpg","08-08.jpg","08-09.jpg","08-10.jpg","08-11.jpg","08-12.jpg","08-13.jpg","08-14.jpg","08-15.jpg","08-16.jpg","08-17.jpg","08-18.jpg","08-19.jpg","08-20.jpg","08-21.jpg","08-22.jpg","08-23.jpg","08-24.jpg","08-25.jpg","08-26.jpg","08-27.jpg","08-28.jpg","08-29.jpg","08-30.jpg","08-31.jpg","09-01.jpg","09-02.jpg","09-03.jpg","09-04.jpg","09-05.jpg","09-06.jpg","09-07.jpg","09-08.jpg","09-09.jpg","09-10.jpg","09-11.jpg","09-12.jpg","09-13.jpg","09-14.jpg","09-15.jpg","09-16.jpg","09-17.jpg","09-18.jpg","09-19.jpg","09-20.jpg","09-21.jpg","09-22.jpg","09-23.jpg","09-24.jpg","09-25.jpg","09-26.jpg","09-27.jpg","09-28.jpg","09-29.jpg","09-30.jpg","10-01.jpg","10-02.jpg","10-03.jpg","10-04.jpg","10-05.jpg","10-06.jpg","10-07.jpg","10-08.jpg","10-09.jpg","10-10.jpg","10-11.jpg","10-12.jpg","10-13.jpg","10-14.jpg","10-15.jpg","10-16.jpg","10-17.jpg","10-18.jpg","10-19.jpg","10-20.jpg","10-21.jpg","10-22.jpg","10-23.jpg","10-24.jpg","10-25.jpg","10-26.jpg","10-27.jpg","10-28.jpg","10-29.jpg","10-30.jpg","10-31.jpg","11-01.jpg","11-02.jpg","11-03.jpg","11-04.jpg","11-05.jpg","11-06.jpg","11-07.jpg","11-08.jpg","11-09.jpg","11-10.jpg","11-11.jpg","11-12.jpg","11-13.jpg","11-14.jpg","11-15.jpg","11-16.jpg","11-17.jpg","11-18.jpg","11-19.jpg","11-20.jpg","11-21.jpg","11-22.jpg","11-23.jpg","11-24.jpg","11-25.jpg","11-26.jpg","11-27.jpg","11-28.jpg","11-29.jpg","11-30.jpg","12-01.jpg","12-02.jpg","12-03.jpg","12-04.jpg","12-05.jpg","12-06.jpg","12-07.jpg","12-08.jpg","12-09.jpg","12-10.jpg","12-11.jpg","12-12.jpg","12-13.jpg","12-14.jpg","12-15.jpg","12-16.jpg","12-17.jpg","12-18.jpg","12-19.jpg","12-20.jpg","12-21.jpg","12-22.jpg","12-23.jpg","12-24.jpg","12-25.jpg","12-26.jpg","12-27.jpg","12-28.jpg","12-29.jpg","12-30.jpg","12-31.jpg","EASTER.jpg","GOODFRI.jpg","PENTECOST.jpg","TET1.jpg","TET2.jpg","TET3.jpg"],"BOOKS":[["Sáng Thế Ký","Sáng"],["Xuất Ê-díp-tô Ký","Xuất"],["Lê-vi Ký","Lê-vi"],["Dân Số Ký","Dân"],["Phục Truyền Luật Lệ Ký","Phục"],["Giô-suê","Giô-suê"],["Các Quan Xét","Quan"],["Ru-tơ","Ru-tơ"],["I Sa-mu-ên","1 Sa"],["II Sa-mu-ên","2 Sa"],["I Các Vua","1 Vua"],["II Các Vua","2 Vua"],["I Sử Ký","1 Sử"],["II Sử Ký","2 Sử"],["E-xơ-ra","E-xơ"],["Nê-hê-mi","Nê"],["Ê-xơ-tê","Ê-xơ-tê"],["Gióp","Gióp"],["Thi Thiên","Thi"],["Châm Ngôn","Châm"],["Truyền Đạo","Truyền"],["Nhã Ca","Nhã"],["Ê-sai","Ê-sai"],["Giê-rê-mi","Giê"],["Ca Thương","Ca"],["Ê-xê-chi-ên","Ê-xê"],["Đa-ni-ên","Đa"],["Ô-sê","Ô-sê"],["Giô-ên","Giô-ên"],["A-mốt","A-mốt"],["Áp-đia","Áp"],["Giô-na","Giô-na"],["Mi-chê","Mi"],["Na-hum","Na"],["Ha-ba-cúc","Ha"],["Sô-phô-ni","Sô"],["A-ghê","A-ghê"],["Xa-cha-ri","Xa"],["Ma-la-chi","Ma-la"],["Ma-thi-ơ","Mat"],["Mác","Mác"],["Lu-ca","Lu"],["Giăng","Giăng"],["Công Vụ Các Sứ Đồ","Công"],["Rô-ma","Rô"],["I Cô-rinh-tô","1 Cô"],["II Cô-rinh-tô","2 Cô"],["Ga-la-ti","Ga"],["Ê-phê-sô","Êph"],["Phi-líp","Phil"],["Cô-lô-se","Côl"],["I Tê-sa-lô-ni-ca","1 Tê"],["II Tê-sa-lô-ni-ca","2 Tê"],["I Ti-mô-thê","1 Ti"],["II Ti-mô-thê","2 Ti"],["Tít","Tít"],["Phi-lê-môn","Phlm"],["Hê-bơ-rơ","Hê"],["Gia-cơ","Gia"],["I Phi-e-rơ","1 Phi"],["II Phi-e-rơ","2 Phi"],["I Giăng","1 Gi"],["II Giăng","2 Gi"],["III Giăng","3 Gi"],["Giu-đe","Giu"],["Khải Huyền","Khải"]],"SLUGS":["sang-the-ky","xuat-e-dip-to-ky","le-vi-ky","dan-so-ky","phuc-truyen-luat-le-ky","gio-sue","cac-quan-xet","ru-to","1-sa-mu-en","2-sa-mu-en","1-cac-vua","2-cac-vua","1-su-ky","2-su-ky","e-xo-ra","ne-he-mi","e-xo-te","giop","thi-thien","cham-ngon","truyen-dao","nha-ca","e-sai","gie-re-mi","ca-thuong","e-xe-chi-en","da-ni-en","o-se","gio-en","a-mot","ap-dia","gio-na","mi-che","na-hum","ha-ba-cuc","so-pho-ni","a-ghe","xa-cha-ri","ma-la-chi","ma-thi-o","mac","lu-ca","giang","cong-vu-cac-su-do","ro-ma","1-co-rinh-to","2-co-rinh-to","ga-la-ti","e-phe-so","phi-lip","co-lo-se","1-te-sa-lo-ni-ca","2-te-sa-lo-ni-ca","1-ti-mo-the","2-ti-mo-the","tit","phi-le-mon","he-bo-ro","gia-co","1-phi-e-ro","2-phi-e-ro","1-giang","2-giang","3-giang","giu-de","khai-huyen"],"DATAV":"ee3a1537"};
const { BASE, NT, CHS, GROUPS, VOD_DAYS, VOD_SPECIAL, TET, VODIMG, BOOKS, SLUGS } = META;
const PLANS = {
  year: { name: "Trọn Kinh Thánh trong 1 năm", desc: "Từ Sáng Thế Ký đến Khải Huyền, khoảng 3–4 đoạn mỗi ngày.", days: 365, from: 0, to: 66 },
  nt90: { name: "Tân Ước trong 90 ngày", desc: "260 đoạn Tân Ước, khoảng 3 đoạn mỗi ngày.", days: 90, from: NT, to: 66 },
};
const HL = { y: "var(--h-y)", g: "var(--h-g)", b: "var(--h-b)", p: "var(--h-p)", v: "var(--h-v)" };
const WD = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

/* ---------- Lưu trữ trên máy ---------- */
const KEY = "kt1925";
const DEF = { pos: null, size: 19, fam: "serif", lay: "flow", theme: "auto", rate: 1, hl: {}, notes: {}, bm: {}, plan: null };
let S = (() => { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { return Object.assign({}, DEF); } })();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Trình duyệt không cho lưu dữ liệu. Kiểm tra chế độ ẩn danh."); } }

/* ---------- Tiện ích ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const key = (b, c, v) => `${b}.${c}.${v}`;
const parseKey = (k) => k.split(".").map(Number);
const refName = (b, c, v) => `${BOOKS[b][0]} ${c}${v ? ":" + v : ""}`;
const chUrl = (b, c, v) => `${BASE}${SLUGS[b]}/${c}/${v ? "#v" + v : ""}`;
const bookUrl = (b) => `${BASE}${SLUGS[b]}/`;
const ic = (id) => `<svg class="icon"><use href="#i-${id}"/></svg>`;
function fold(s) { let o = ""; for (const ch of s) { if (ch === "Đ" || ch === "đ") { o += "d"; continue; } o += ch.normalize("NFD")[0].toLowerCase(); } return o; }
function toast(msg) { const t = $("#toast"); if (!t) return; t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => (t.hidden = true), 2600); }
function todayStr(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function daysBetween(a, b) { return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 864e5); }
async function copyText(t) {
  try { await navigator.clipboard.writeText(t); toast("Đã sao chép"); }
  catch (e) { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand("copy"); } catch (_) {} ta.remove(); toast(ok ? "Đã sao chép" : "Trình duyệt chặn sao chép"); }
}
function downloadBlob(blob, name) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); }

const cache = {}, pending = {};
function loadBook(b) {
  if (cache[b]) return Promise.resolve(cache[b]);
  if (pending[b]) return pending[b];
  pending[b] = fetch(`${BASE}data/b${String(b + 1).padStart(2, "0")}.json`)
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((d) => (cache[b] = d)).finally(() => delete pending[b]);
  return pending[b];
}

/* ---------- Cỡ chữ và giao diện ---------- */
function applyPrefs() {
  const d = document.documentElement;
  d.style.setProperty("--read-size", S.size + "px");
  if (S.theme === "auto") d.removeAttribute("data-theme"); else d.setAttribute("data-theme", S.theme);
  d.classList.toggle("sans", S.fam === "sans");
  d.classList.toggle("lines", S.lay === "lines");
  $("#fs").value = S.size; $("#fsVal").textContent = S.size;
  for (const [id, val] of [["#segFam", S.fam], ["#segLay", S.lay], ["#segTheme", S.theme]])
    $$(id + " button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === val));
}
$("#aaBtn").onclick = () => { $("#dAa").showModal(); offlineStatus(); };
$("#fs").oninput = (e) => { S.size = +e.target.value; save(); applyPrefs(); };
for (const [id, k] of [["#segFam", "fam"], ["#segLay", "lay"], ["#segTheme", "theme"]])
  $$(id + " button").forEach((b) => (b.onclick = () => { S[k] = b.dataset.v; save(); applyPrefs(); }));
$$("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) d.close(); }));

/* ---------- Đọc khi không có mạng ---------- */
const DATA_CACHE = "kt-data-" + META.DATAV;
async function offlineStatus() {
  const msg = $("#offlineMsg"), btn = $("#offlineBtn");
  if (!("caches" in window) || !("serviceWorker" in navigator)) { msg.textContent = "Trình duyệt này chưa hỗ trợ đọc khi không có mạng."; btn.hidden = true; return; }
  try { const c = await caches.open(DATA_CACHE); const n = (await c.keys()).length; if (n >= 66) { msg.textContent = "Đã tải đủ 66 sách. Có thể đọc khi không có mạng."; btn.textContent = "Tải lại toàn bộ"; } else if (n) msg.textContent = `Đã có ${n}/66 sách trên máy.`; } catch (e) {}
}
$("#offlineBtn").onclick = async () => {
  const msg = $("#offlineMsg"), btn = $("#offlineBtn"); btn.disabled = true;
  try {
    const c = await caches.open(DATA_CACHE); let n = 0;
    for (let i = 0; i < 66; i++) {
      const url = `${BASE}data/b${String(i + 1).padStart(2, "0")}.json`;
      const res = await fetch(url, { cache: "reload" }); if (!res.ok) throw new Error(res.status);
      await c.put(url, res); msg.textContent = `Đang tải ${++n}/66 sách…`;
    }
    const shell = await caches.open("kt-pages-v1"); await shell.add(`${BASE}doc/`).catch(() => {});
    msg.textContent = "Xong. Có thể đọc toàn bộ Kinh Thánh khi không có mạng."; toast("Đã tải xong 66 sách");
  } catch (e) { msg.textContent = "Tải chưa xong vì mất kết nối. Bấm lại để tải tiếp."; }
  btn.disabled = false;
};
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register(`${BASE}sw.js`, { scope: BASE }).catch(() => {}));

/* ---------- Chọn sách ---------- */
const bookKeys = BOOKS.map(([n, a]) => {
  const roman = (s) => s.replace(/^III\s/, "3").replace(/^II\s/, "2").replace(/^I\s/, "1");
  return [fold(roman(n)).replace(/[\s-]/g, ""), fold(a).replace(/[\s-]/g, "")];
});
let pickTab = "ot";
function curBook() { const b = document.body.dataset.b; return b != null ? +b : S.pos ? S.pos.b : -1; }
const chips = (list, cb) => list.map((i) => `<li><button data-b="${i}"${i === cb ? ' class="cur" aria-current="true"' : ""}>${esc(BOOKS[i][0])}<small>${CHS[i]}</small></button></li>`).join("");
function renderBooks(filter = "") {
  $("#pickTitle").textContent = "Chọn sách"; $("#pickBack").hidden = true;
  const f = fold(filter).replace(/[\s-]/g, "");
  const list = BOOKS.map((_, i) => i).filter((i) => (f ? bookKeys[i].some((k) => k.includes(f)) : pickTab === "ot" ? i < NT : i >= NT));
  const cb = curBook();
  $("#pickBody").innerHTML = `<label class="sr" for="bf">Lọc tên sách</label><input class="filter" id="bf" placeholder="Gõ tên sách…" value="${esc(filter)}">
   ${f ? "" : `<div class="seg" style="margin-top:12px"><button data-t="ot" aria-pressed="${pickTab === "ot"}">Cựu Ước · 39</button><button data-t="nt" aria-pressed="${pickTab === "nt"}">Tân Ước · 27</button></div>`}
   ${f ? `<ul class="bk" style="margin-top:12px">${chips(list, cb) || `<li class="muted">Không thấy sách nào.</li>`}</ul>`
       : GROUPS.filter(([, a]) => (pickTab === "ot" ? a < NT : a >= NT)).map(([g, a, z]) => `<div class="grp"><h4 class="grp-name">${esc(g)}</h4><ul class="bk">${chips(Array.from({ length: z - a + 1 }, (_, j) => a + j), cb)}</ul></div>`).join("")}`;
  const bf = $("#bf");
  bf.oninput = () => { const p = bf.selectionStart; renderBooks(bf.value); const n = $("#bf"); n.focus(); n.setSelectionRange(p, p); };
  $$("#pickBody [data-t]").forEach((x) => (x.onclick = () => { pickTab = x.dataset.t; renderBooks(); }));
  $$("#pickBody [data-b]").forEach((x) => (x.onclick = () => { const b = +x.dataset.b; if (CHS[b] === 1) location.href = chUrl(b, 1); else renderChapters(b); }));
}
function renderChapters(b) {
  $("#pickTitle").textContent = BOOKS[b][0]; $("#pickBack").hidden = false;
  const cur = document.body.dataset.page === "chapter" || document.body.dataset.page === "shell" ? S.pos : null;
  let h = `<ul class="chs">`;
  for (let c = 1; c <= CHS[b]; c++) h += `<li><a href="${chUrl(b, c)}" class="${cur && cur.b === b && cur.c === c ? "cur" : ""}">${c}</a></li>`;
  $("#pickBody").innerHTML = h + `</ul>`;
}
$("#pickBack").onclick = () => renderBooks();
$("#pickBtn").onclick = () => { const cb = curBook(); pickTab = cb >= NT ? "nt" : "ot"; if (document.body.dataset.page === "chapter" && cb >= 0) renderChapters(cb); else renderBooks(); $("#dPick").showModal(); };
function findBook(q) {
  const f = fold(q).replace(/[\s.-]/g, ""); if (f.length < 2) return -1;
  let i = bookKeys.findIndex((k) => k[1] === f); if (i >= 0) return i;
  i = bookKeys.findIndex((k) => k[0] === f); if (i >= 0) return i;
  return bookKeys.findIndex((k) => k[0].startsWith(f));
}
function parseRef(q) {
  const m = q.trim().match(/^((?:[1-3]|i{1,3})\s*)?([^\d:]+?)\s*(\d+)(?:\s*[:.,\s]\s*(\d+))?$/i); if (!m) return null;
  let pre = (m[1] || "").trim().toLowerCase(); pre = pre === "iii" ? "3" : pre === "ii" ? "2" : pre === "i" ? "1" : pre;
  const b = findBook(pre + m[2]); if (b < 0) return null;
  const c = +m[3]; if (c < 1 || c > CHS[b]) return null;
  return { b, c, v: m[4] ? +m[4] : null };
}

/* ---------- Tab "Đọc" mở đoạn đang đọc dở ---------- */
if (S.pos) $$('[data-tab="read"]').forEach((t) => (t.href = chUrl(S.pos.b, S.pos.c)));

/* ---------- Kế hoạch đọc ---------- */
const planListCache = {};
function planList(id) { if (planListCache[id]) return planListCache[id]; const p = PLANS[id], out = []; for (let b = p.from; b < p.to; b++) for (let c = 1; c <= CHS[b]; c++) out.push([b, c]); return (planListCache[id] = out); }
function planDay(id, d) { const L = planList(id), p = PLANS[id]; return L.slice(Math.floor((d * L.length) / p.days), Math.floor(((d + 1) * L.length) / p.days)); }
const planHas = (b) => !!S.plan && b >= PLANS[S.plan.id].from && b < PLANS[S.plan.id].to;
const planDone = (b, c) => !!(S.plan && S.plan.done[b + "." + c]);
function togglePlanCh(b, c) { if (!S.plan) return; const k = b + "." + c; if (S.plan.done[k]) delete S.plan.done[k]; else S.plan.done[k] = 1; save(); }

/* ---------- Trang đoạn ---------- */
let sel = new Set(), CH = null; // CH = {b, c, verses}
function chapterMarkup(b, c, vs) {
  const prev = c > 1 ? [b, c - 1] : b > 0 ? [b - 1, CHS[b - 1]] : null;
  const next = c < CHS[b] ? [b, c + 1] : b < 65 ? [b + 1, 1] : null;
  const nav = (x, dir) => x ? `<a class="btn" rel="${dir}" href="${chUrl(x[0], x[1])}">${dir === "prev" ? ic("left") : ""}${esc(refName(x[0], x[1]))}${dir === "next" ? ic("right") : ""}</a>` : `<span class="btn" aria-disabled="true">${dir === "prev" ? "Đầu Kinh Thánh" : "Hết Kinh Thánh"}</span>`;
  return `<nav class="crumbs" aria-label="Vị trí"><a href="${BASE}">Trang chủ</a><span>›</span><a href="${bookUrl(b)}">${esc(BOOKS[b][0])}</a><span>›</span><span>Đoạn ${c}</span></nav>
<div class="ch-head"><div><a class="book" href="${bookUrl(b)}">${esc(BOOKS[b][0])}</a><h1><span class="sr">${esc(BOOKS[b][0])} </span>Đoạn ${c}</h1></div><span class="small muted">${vs.length} câu</span></div>
<div class="scripture" id="scr"><p>${vs.map((t, i) => `<span class="v" id="v${i + 1}" data-v="${i + 1}"><span class="n">${i + 1}</span>${esc(t)}</span>`).join(" ")}</p></div>
<div class="done-row" id="planRow" hidden></div>
<nav class="ch-nav" aria-label="Chuyển đoạn">${nav(prev, "prev")}${nav(next, "next")}</nav>`;
}
function decorate() {
  const { b, c } = CH;
  $$("#scr .v").forEach((el) => {
    const v = +el.dataset.v, k = key(b, c, v);
    el.className = "v" + (S.hl[k] ? " hl-" + S.hl[k] : "") + (sel.has(v) ? " sel" : "") + (audio && audio.cur === v ? " playing" : "");
    const dot = el.querySelector(".notedot");
    if (S.notes[k] && !dot) el.insertAdjacentHTML("beforeend", `<button class="notedot" data-note="${v}" aria-label="Xem ghi chú câu ${v}">${ic("note")}</button>`);
    if (!S.notes[k] && dot) dot.remove();
  });
  const row = $("#planRow");
  if (planHas(b)) {
    const d = planDone(b, c); row.hidden = false;
    row.innerHTML = `<button class="btn${d ? "" : " primary"}" id="markDone">${d ? "✓ Đã đọc trong kế hoạch" : "Đánh dấu đã đọc đoạn này"}</button>`;
    $("#markDone").onclick = () => { togglePlanCh(b, c); decorate(); if (planDone(b, c)) toast("Đã ghi vào kế hoạch đọc"); };
  } else row.hidden = true;
}
async function initChapter(b, c) {
  S.pos = { b, c }; save();
  $$('[data-tab="read"]').forEach((t) => (t.href = chUrl(b, c)));
  if (!cache[b]) { try { await loadBook(b); } catch (e) {} }
  const vs = cache[b] ? cache[b][c - 1] : $$("#scr .v").map((el) => el.textContent.replace(/^\d+/, ""));
  CH = { b, c, verses: vs };
  decorate();
  $("#scr").addEventListener("click", (e) => {
    const nd = e.target.closest("[data-note]"); if (nd) { e.stopPropagation(); openNote(+nd.dataset.note); return; }
    const v = e.target.closest(".v"); if (!v) return;
    const n = +v.dataset.v; if (sel.has(n)) sel.delete(n); else sel.add(n);
    v.classList.toggle("sel", sel.has(n)); updateSelbar();
  });
  $("#listenBtn").onclick = () => (audio ? stopAudio() : startAudio(1));
  const m = location.hash.match(/^#v(\d+)$/);
  if (m) { const el = $("#v" + m[1]); if (el) { el.scrollIntoView({ block: "center" }); el.classList.add("flash"); } }
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input,textarea,select,dialog") || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "ArrowLeft") { const a = $('a[rel="prev"]'); if (a) location.href = a.href; }
    if (e.key === "ArrowRight") { const a = $('a[rel="next"]'); if (a) location.href = a.href; }
    if (e.key === "Escape" && sel.size) { e.preventDefault(); clearSel(); }
  });
  let tx = 0, ty = 0;
  $("#scr").addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  $("#scr").addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 80 && Math.abs(dy) < 50) { const a = $(`a[rel="${dx < 0 ? "next" : "prev"}"]`); if (a) location.href = a.href; }
  }, { passive: true });
}
function clearSel() { sel.clear(); $$(".v.sel").forEach((x) => x.classList.remove("sel")); updateSelbar(); }
function updateSelbar() {
  const on = sel.size > 0; $("#selbar").hidden = !on; if (!on) return;
  const all = [...sel].every((v) => S.bm[key(CH.b, CH.c, v)]); $("#aBmLabel").textContent = all ? "Bỏ đánh dấu" : "Đánh dấu";
}
function selected() {
  const vs = [...sel].sort((a, b) => a - b);
  let parts = [], s = vs[0], p = vs[0];
  for (const v of vs.slice(1).concat([null])) { if (v === p + 1) { p = v; continue; } parts.push(s === p ? `${s}` : `${s}–${p}`); s = p = v; }
  return { vs, text: vs.map((v) => CH.verses[v - 1]).join(" "), ref: `${BOOKS[CH.b][0]} ${CH.c}:${parts.join(", ")}` };
}
$("#selClose").onclick = clearSel;
$$("#selbar .color").forEach((btn) => (btn.onclick = () => {
  const c = btn.dataset.c;
  for (const v of sel) { const k = key(CH.b, CH.c, v); if (c) S.hl[k] = c; else delete S.hl[k]; }
  save(); sel.clear(); decorate(); updateSelbar(); toast(c ? "Đã tô màu" : "Đã bỏ tô màu");
}));
$("#aCopy").onclick = () => { const s = selected(); copyText(`“${s.text}” (${s.ref}, Kinh Thánh 1925)\n${location.origin}${chUrl(CH.b, CH.c, s.vs[0])}`); clearSel(); };
$("#aBm").onclick = () => {
  const vs = [...sel], all = vs.every((v) => S.bm[key(CH.b, CH.c, v)]);
  for (const v of vs) { const k = key(CH.b, CH.c, v); if (all) delete S.bm[k]; else S.bm[k] = Date.now(); }
  save(); toast(all ? "Đã bỏ đánh dấu" : "Đã đánh dấu"); clearSel();
};
$("#aNote").onclick = () => openNote(Math.min(...sel));
$("#aImg").onclick = () => { const s = selected(); openImage(s.text, s.ref, null, chUrl(CH.b, CH.c, s.vs[0])); clearSel(); };
$("#aListen").onclick = () => { const from = Math.min(...sel); clearSel(); startAudio(from); };

/* ---------- Ghi chú ---------- */
let noteFor = null;
function openNote(v) {
  const { b, c } = CH; noteFor = { b, c, v }; const k = key(b, c, v);
  $("#noteTitle").textContent = "Ghi chú · " + refName(b, c, v);
  $("#noteVerse").textContent = CH.verses[v - 1];
  $("#noteText").value = S.notes[k] ? S.notes[k].t : "";
  $("#noteDel").hidden = !S.notes[k];
  $("#dNote").showModal(); setTimeout(() => $("#noteText").focus(), 50);
}
function afterNote(msg) { save(); $("#dNote").close(); sel.clear(); updateSelbar(); if (CH) decorate(); if (document.body.dataset.page === "saved") renderSaved(); toast(msg); }
$("#noteSave").onclick = () => { const k = key(noteFor.b, noteFor.c, noteFor.v), t = $("#noteText").value.trim(); if (t) S.notes[k] = { t, at: Date.now() }; else delete S.notes[k]; afterNote(t ? "Đã lưu ghi chú" : "Đã xóa ghi chú"); };
$("#noteDel").onclick = () => { delete S.notes[key(noteFor.b, noteFor.c, noteFor.v)]; afterNote("Đã xóa ghi chú"); };

/* ---------- Ảnh chia sẻ ---------- */
let lastBlob = null, lastName = "";
const loadImg = (src) => new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = no; im.src = src; });
async function openImage(text, ref, bg = null, url = "") {
  text = cleanVerse(text);
  try { await Promise.all([document.fonts.load('400 48px "Literata"'), document.fonts.load('600 30px "Be Vietnam Pro"')]); } catch (e) {}
  const W = 1080, H = 1350, cv = document.createElement("canvas"); cv.width = W; cv.height = H; const g = cv.getContext("2d");
  g.fillStyle = "#1B2028"; g.fillRect(0, 0, W, H);
  let bgIm = null; if (bg) { try { bgIm = await loadImg(bg); } catch (e) {} }
  if (bgIm) { // ảnh nền phủ kín khung, thêm lớp tối để chữ dễ đọc
    const s = Math.max(W / bgIm.width, H / bgIm.height), w = bgIm.width * s, h = bgIm.height * s; g.drawImage(bgIm, (W - w) / 2, (H - h) / 2, w, h);
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "rgba(12,14,18,.55)"); gr.addColorStop(.5, "rgba(12,14,18,.62)"); gr.addColorStop(1, "rgba(12,14,18,.78)"); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }
  g.fillStyle = "#A3283A"; g.beginPath(); g.moveTo(860, 0); g.lineTo(930, 0); g.lineTo(930, 190); g.lineTo(895, 160); g.lineTo(860, 190); g.closePath(); g.fill();
  const pad = 110, maxW = W - pad * 2; let size = 60, lines;
  const wrap = (fs) => { g.font = `400 ${fs}px Literata, Georgia, serif`; const out = []; let cur = ""; for (const w of `“${text}”`.split(" ")) { const t = cur ? cur + " " + w : w; if (g.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else cur = t; } if (cur) out.push(cur); return out; };
  for (;;) { lines = wrap(size); if (lines.length * size * 1.45 < H - 560 || size <= 30) break; size -= 3; }
  const lh = size * 1.45; let y = (H - lines.length * lh) / 2 - 30; g.fillStyle = "#F1EEE7"; g.textBaseline = "top";
  for (const l of lines) { g.fillText(l, pad, y); y += lh; }
  g.font = '600 36px "Be Vietnam Pro", system-ui, sans-serif'; g.fillStyle = bgIm ? "#F6C7CE" : "#E27C89"; g.fillText(ref, pad, y + 36);
  g.font = '500 26px "Be Vietnam Pro", system-ui, sans-serif'; g.fillStyle = bgIm ? "#C9CED6" : "#8D95A0"; g.fillText("KINH THÁNH · BẢN TRUYỀN THỐNG 1925", pad, H - 130);
  g.fillText("kinhthanh1925.com", pad, H - 92);
  lastBlob = await new Promise((r) => cv.toBlob(r, "image/jpeg", 0.92));
  lastName = "kinh-thanh-" + fold(ref).replace(/[^a-z0-9]+/g, "-").replace(/-$/, "") + ".jpg";
  lastUrl = location.origin + (url || location.pathname);
  lastRef = ref;
  // data: URL để nhấn giữ ảnh lưu/chia sẻ được cả trong trình duyệt của Zalo, Facebook
  $("#shareImg").src = cv.toDataURL("image/jpeg", 0.9); $("#shareImg").alt = `Ảnh câu ${ref}`;
  lastFile = new File([lastBlob], lastName, { type: "image/jpeg" });
  lastPng = await new Promise((r) => cv.toBlob(r, "image/png")); // bộ nhớ tạm của iPhone/Chrome chỉ nhận PNG
  const canFile = !!(navigator.canShare && (() => { try { return navigator.canShare({ files: [lastFile] }); } catch (e) { return false; } })());
  const canCopyImg = !!(navigator.clipboard && window.ClipboardItem);
  const ua = navigator.userAgent;
  const mobile = /Android|iPhone|iPad|iPod/i.test(ua) || (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform));
  const inApp = /Zalo|FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\//i.test(ua);
  const iosOther = /CriOS|FxiOS|EdgiOS/.test(ua);
  $("#imgShare").hidden = !(canFile || navigator.share);
  $("#imgCopy").hidden = !canCopyImg || canFile;
  $("#imgCopy").classList.toggle("primary", $("#imgShare").hidden);
  $("#imgFb").hidden = mobile || canFile;
  $("#imgFb").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(lastUrl);
  const hint = $("#shareHint"); let h = "";
  if (canFile) h = "";
  else if (inApp) h = "Bạn đang mở trang bên trong ứng dụng khác. Nhấn giữ vào ảnh để lưu, hoặc bấm nút ••• chọn “Mở bằng trình duyệt” để có nút Chia sẻ thẳng sang Zalo, Facebook.";
  else if (iosOther) h = (canCopyImg ? "Bấm “Sao chép ảnh” rồi mở Zalo, Messenger… và dán vào ô chat. " : "") + "Nhấn giữ vào ảnh để lưu vào thư viện Ảnh. Mở trang bằng Safari sẽ có nút Chia sẻ thẳng sang Zalo, Facebook.";
  else if (mobile) h = (canCopyImg ? "Bấm “Sao chép ảnh” rồi dán vào Zalo, Messenger… " : "") + "Hoặc nhấn giữ vào ảnh để lưu.";
  else if (canCopyImg) h = "Bấm “Sao chép ảnh” rồi dán (Ctrl+V) vào Zalo, Messenger hoặc tin nhắn. Hoặc tải ảnh về để đăng lên mạng xã hội.";
  hint.textContent = h; hint.hidden = !h;
  $("#dImg").showModal();
}
let lastFile = null, lastUrl = "", lastRef = "", lastPng = null;
$("#imgShare").onclick = async () => {
  try {
    if (navigator.canShare && navigator.canShare({ files: [lastFile] })) await navigator.share({ files: [lastFile], title: lastRef });
    else await navigator.share({ title: lastRef, text: `${lastRef} – Kinh Thánh 1925`, url: lastUrl });
  } catch (e) { if (e && e.name !== "AbortError") toast("Máy chưa hỗ trợ chia sẻ, hãy tải ảnh về"); }
};
$("#imgCopy").onclick = async () => {
  try { await navigator.clipboard.write([new ClipboardItem({ "image/png": lastPng || lastBlob })]); toast("Đã sao chép ảnh, dán vào nơi muốn gửi"); }
  catch (e) {
    try { const png = await new Promise((r) => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"); c.width = im.width; c.height = im.height; c.getContext("2d").drawImage(im, 0, 0); c.toBlob(r, "image/png"); }; im.src = $("#shareImg").src; });
      await navigator.clipboard.write([new ClipboardItem({ "image/png": png })]); toast("Đã sao chép ảnh, dán vào nơi muốn gửi"); }
    catch (e2) { toast("Không sao chép được, hãy tải ảnh về"); }
  }
};
$("#imgSave").onclick = () => { if (lastBlob) downloadBlob(lastBlob, lastName); };

/* ---------- Nghe đọc (giọng đọc của máy) ---------- */
let audio = null;
$("#pRate").value = String(S.rate);
function viVoice() { if (!("speechSynthesis" in window)) return null; return speechSynthesis.getVoices().find((v) => /^vi/i.test(v.lang)) || null; }
if ("speechSynthesis" in window) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) {} }
function markPlaying(v) {
  $$(".v.playing").forEach((x) => x.classList.remove("playing"));
  const el = $("#v" + v);
  if (el) { el.classList.add("playing"); el.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
  if (audio) { audio.cur = v; $("#pSub").textContent = `Câu ${v} / ${audio.n}`; }
}
function syncPlayer() {
  $("#player").hidden = !audio; $("#listenBtn") && $("#listenBtn").setAttribute("aria-pressed", String(!!audio)); if (!audio) return;
  $("#pTitle").textContent = refName(audio.b, audio.c);
  $("#pPause").innerHTML = ic(audio.paused ? "play" : "pause"); $("#pPause").setAttribute("aria-label", audio.paused ? "Tiếp tục" : "Tạm dừng");
}
function startAudio(from = 1) {
  if (!CH) return; stopAudio();
  if (!("speechSynthesis" in window)) { toast("Trình duyệt này chưa hỗ trợ đọc to."); return; }
  const voice = viVoice(); if (!voice) toast("Máy chưa có giọng tiếng Việt, âm đọc có thể không chuẩn.");
  const { b, c, verses } = CH; audio = { b, c, n: verses.length, cur: from, paused: false }; syncPlayer();
  let wake = null; try { navigator.wakeLock && navigator.wakeLock.request("screen").then((w) => (wake = w)).catch(() => {}); } catch (e) {}
  audio.release = () => { try { wake && wake.release(); } catch (e) {} };
  const speakFrom = (v) => {
    if (!audio || audio.stopped) return;
    if (v > verses.length) { endAudio(true); return; }
    const u = new SpeechSynthesisUtterance(verses[v - 1]); u.lang = "vi-VN"; if (voice) u.voice = voice; u.rate = S.rate;
    u.onstart = () => markPlaying(v); u.onend = () => { if (audio && !audio.stopped) speakFrom(v + 1); };
    speechSynthesis.speak(u);
  };
  speakFrom(from);
}
function endAudio(completed) {
  const a = audio; audio = null; if (a && a.release) a.release();
  $$(".v.playing").forEach((x) => x.classList.remove("playing")); syncPlayer();
  if (completed) { const n = $('a[rel="next"]'); if (n) toast(`Hết đoạn. Chạm “${n.textContent.trim()}” để đọc tiếp.`); }
}
function stopAudio() { if (!audio) return; audio.stopped = true; try { speechSynthesis.cancel(); } catch (e) {} endAudio(false); }
$("#pStop").onclick = stopAudio;
$("#pPause").onclick = () => { if (!audio) return; if (audio.paused) speechSynthesis.resume(); else speechSynthesis.pause(); audio.paused = !audio.paused; syncPlayer(); };
$("#pRate").onchange = (e) => { S.rate = +e.target.value; save(); if (audio) { const v = audio.cur; stopAudio(); setTimeout(() => startAudio(v), 80); } };
window.addEventListener("pagehide", () => { try { speechSynthesis.cancel(); } catch (e) {} });

/* ---------- Câu gốc mỗi ngày ---------- */
const pad2 = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
function easter(y) { // Lịch Gregory
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1; return new Date(y, mo - 1, da);
}
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const SPECIAL_LABEL = { GOODFRI: "Thứ Sáu Tuần Thánh", EASTER: "Chúa Nhật Phục Sinh", PENTECOST: "Lễ Ngũ Tuần", TET1: "Mùng 1 Tết", TET2: "Mùng 2 Tết", TET3: "Mùng 3 Tết" };
function vodFor(d) {
  const today = ymd(d), y = d.getFullYear(), ea = easter(y);
  const sp = { [ymd(addDays(ea, -2))]: "GOODFRI", [ymd(ea)]: "EASTER", [ymd(addDays(ea, 49))]: "PENTECOST" };
  if (TET[y]) { const [ty, tm, td] = TET[y].split("-").map(Number); for (let n = 0; n < 3; n++) sp[ymd(new Date(ty, tm - 1, td + n))] = "TET" + (n + 1); }
  const key = sp[today] || `${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const ref = VOD_SPECIAL[key] || VOD_DAYS[key] || VOD_DAYS["01-01"];
  const img = VODIMG.find((f) => f.replace(/\.\w+$/, "") === key);
  return { key, ref, label: SPECIAL_LABEL[key] || "", img: img ? `${BASE}assets/vod/${img}` : null };
}
const cleanVerse = (t) => t.replace(/^\(\d+:\d+\)\s*/, "");

/* ---------- Trang chủ ---------- */
async function initHome() {
  const d = new Date();
  $("#todayDate").textContent = `${WD[d.getDay()]}, ${d.getDate()} tháng ${d.getMonth() + 1}`;
  const vod = vodFor(d), [vb, vc, vv] = vod.ref, b = vb - 1;
  if (vod.label) $("#vodLabel").textContent = "Câu gốc hôm nay · " + vod.label;
  if (vod.img) { const box = $("#vodImgBox"); box.style.backgroundImage = `url("${vod.img}")`; box.hidden = false; $("#vod").classList.add("has-img"); }
  $("#vodRef").textContent = refName(b, vc, vv); $("#vodRead").href = chUrl(b, vc, vv);
  let vt = $("#vodText").textContent;
  try { const data = await loadBook(b); vt = cleanVerse(data[vc - 1][vv - 1]); $("#vodText").textContent = vt; } catch (e) {}
  $("#vodCopy").onclick = () => copyText(`“${vt}” (${refName(b, vc, vv)}, Kinh Thánh 1925)`);
  $("#vodImg").onclick = () => openImage(vt, refName(b, vc, vv), vod.img, chUrl(b, vc, vv));
  if (S.pos) { const cb = $("#contBtn"); cb.href = chUrl(S.pos.b, S.pos.c); cb.querySelector(".muted").textContent = "Đọc tiếp"; cb.querySelector("b").textContent = refName(S.pos.b, S.pos.c); }
  renderPlan();
}
function renderPlan() {
  const box = $("#planBox"); let h;
  if (!S.plan) {
    h = `<h2>Kế hoạch đọc</h2><p class="lead">Chọn một kế hoạch để đọc đều mỗi ngày. Có thể đổi bất cứ lúc nào.</p><div class="plan-pick">${Object.entries(PLANS).map(([id, p]) => `<button class="plan-card" data-plan="${id}"><span class="label">${p.days} ngày</span><b>${esc(p.name)}</b><span class="small muted">${esc(p.desc)}</span></button>`).join("")}</div>`;
  } else {
    const id = S.plan.id, p = PLANS[id], L = planList(id);
    const dayIdx = Math.max(0, Math.min(p.days - 1, daysBetween(S.plan.start, todayStr())));
    const doneN = L.filter(([b, c]) => S.plan.done[b + "." + c]).length, today = planDay(id, dayIdx);
    let behind = 0; for (let i = 0; i < dayIdx; i++) behind += planDay(id, i).filter(([b, c]) => !S.plan.done[b + "." + c]).length;
    h = `<h2>${esc(p.name)}</h2><div class="small muted">Ngày ${dayIdx + 1} trên ${p.days} · đã đọc ${doneN}/${L.length} đoạn</div>
    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${L.length}" aria-valuenow="${doneN}" aria-label="Tiến độ kế hoạch"><i style="width:${((doneN / L.length) * 100).toFixed(1)}%"></i></div>
    ${behind ? `<p class="small" style="margin:6px 0 0">Còn ${behind} đoạn của những ngày trước. <button class="linkbtn" id="catchUp">Đọc bù</button></p>` : ""}
    <div class="label" style="margin-top:16px">Hôm nay đọc</div>
    <ul class="today-list">${today.map(([b, c]) => `<li><a href="${chUrl(b, c)}">${esc(refName(b, c))}</a><button class="check" data-done="${b}.${c}" aria-pressed="${planDone(b, c)}" aria-label="Đã đọc ${esc(refName(b, c))}">${ic("check")}</button></li>`).join("")}</ul>
    <p class="small" style="margin-top:14px" id="endRow"><button class="linkbtn" id="endPlan">Đổi hoặc dừng kế hoạch</button></p>`;
  }
  box.innerHTML = h;
  $$("[data-plan]", box).forEach((x) => (x.onclick = () => { S.plan = { id: x.dataset.plan, start: todayStr(), done: {} }; save(); renderPlan(); toast("Đã bắt đầu kế hoạch"); }));
  $$("[data-done]", box).forEach((x) => (x.onclick = () => { const [b, c] = x.dataset.done.split(".").map(Number); togglePlanCh(b, c); renderPlan(); }));
  const cu = $("#catchUp");
  if (cu) cu.onclick = () => { const id = S.plan.id, dayIdx = Math.min(PLANS[id].days - 1, daysBetween(S.plan.start, todayStr())); for (let i = 0; i < dayIdx; i++) { const m = planDay(id, i).find(([b, c]) => !planDone(b, c)); if (m) { location.href = chUrl(m[0], m[1]); return; } } };
  const ep = $("#endPlan");
  if (ep) ep.onclick = () => {
    $("#endRow").innerHTML = `Dừng kế hoạch sẽ xóa tiến độ đã đánh dấu. <button class="linkbtn" id="endYes">Dừng kế hoạch</button> · <button class="linkbtn" id="endNo" style="color:var(--muted)">Giữ lại</button>`;
    $("#endYes").onclick = () => { S.plan = null; save(); renderPlan(); }; $("#endNo").onclick = renderPlan;
  };
}

/* ---------- Trang sách ---------- */
function initBook() {
  const b = +document.body.dataset.b;
  $$("#bookChs a").forEach((a) => { const c = +a.dataset.c; if (S.pos && S.pos.b === b && S.pos.c === c) a.classList.add("cur"); else if (planDone(b, c)) a.classList.add("read"); });
}

/* ---------- Tìm kiếm ---------- */
let scope = "all", sTimer = null, allLoaded = false, FOLD = null;
async function loadAll(onProg) {
  if (allLoaded) return; let n = 0;
  await Promise.all(BOOKS.map((_, i) => loadBook(i).then(() => onProg(++n))));
  FOLD = BOOKS.map((_, b) => cache[b].map((ch) => ch.map(fold))); allLoaded = true;
}
function initSearch() {
  const q = $("#q"), qs = new URLSearchParams(location.search).get("q");
  if (S.pos) $("#scopeBook").textContent = "Sách " + BOOKS[S.pos.b][0]; else $("#scopeBook").hidden = true;
  $$("#scope .chip").forEach((c) => (c.onclick = () => { scope = c.dataset.s; $$("#scope .chip").forEach((x) => x.setAttribute("aria-pressed", x === c)); doSearch(); }));
  q.addEventListener("input", () => { clearTimeout(sTimer); sTimer = setTimeout(doSearch, 250); });
  $("#sForm").addEventListener("submit", (e) => { e.preventDefault(); const r = parseRef(q.value); if (r) location.href = chUrl(r.b, r.c, r.v); else doSearch(); });
  if (qs) { q.value = qs; doSearch(); } else q.focus();
}
async function doSearch() {
  const q = $("#q").value.trim(), out = $("#sOut");
  try { history.replaceState(null, "", q ? "?q=" + encodeURIComponent(q) : location.pathname); } catch (e) {}
  if (!q) { out.innerHTML = `<p class="muted small">Gõ không dấu cũng tìm được: “yeu thuong” sẽ ra “yêu thương”. Gõ có dấu để tìm đúng từng chữ.</p>`; return; }
  const ref = parseRef(q);
  const head = ref ? `<a class="goto" href="${chUrl(ref.b, ref.c, ref.v)}">${ic("book")}Mở ${esc(refName(ref.b, ref.c, ref.v))}</a>` : "";
  if (q.length < 2) { out.innerHTML = head; return; }
  if (!allLoaded) {
    out.innerHTML = head + `<p class="count" id="prog">Đang tải toàn bộ Kinh Thánh để tìm… 0/66</p>`;
    try { await loadAll((n) => { const p = $("#prog"); if (p) p.textContent = `Đang tải toàn bộ Kinh Thánh để tìm… ${n}/66`; }); }
    catch (e) { out.innerHTML = head + `<p class="count">Không tải được dữ liệu. Kiểm tra kết nối mạng.</p>`; return; }
    if ($("#q").value.trim() !== q) return;
  }
  const exact = fold(q) !== q.toLowerCase(), needle = exact ? q.toLowerCase() : fold(q);
  const cb = S.pos ? S.pos.b : 0;
  const [b0, b1] = scope === "ot" ? [0, NT] : scope === "nt" ? [NT, 66] : scope === "book" ? [cb, cb + 1] : [0, 66];
  const hits = []; let total = 0;
  for (let b = b0; b < b1; b++) { const chs = cache[b]; for (let c = 0; c < chs.length; c++) { const vs = chs[c]; for (let v = 0; v < vs.length; v++) {
    const hay = exact ? vs[v].toLowerCase() : FOLD[b][c][v]; if (hay.indexOf(needle) < 0) continue; total++; if (hits.length < 200) hits.push([b, c + 1, v + 1, hay, vs[v]]);
  } } }
  const mk = (hay, orig) => { let o = "", p = 0, i; while ((i = hay.indexOf(needle, p)) >= 0) { o += esc(orig.slice(p, i)) + "<mark>" + esc(orig.slice(i, i + needle.length)) + "</mark>"; p = i + needle.length; } return o + esc(orig.slice(p)); };
  out.innerHTML = head + `<p class="count">${total ? `${total.toLocaleString("vi-VN")} câu${total > 200 ? " · hiện 200 câu đầu" : ""}` : "Không tìm thấy câu nào. Thử bỏ dấu hoặc mở rộng phạm vi."}</p>
   <ul class="results">${hits.map(([b, c, v, hay, orig]) => `<li><a href="${chUrl(b, c, v)}"><div class="ref">${esc(refName(b, c, v))}</div><div class="txt">${mk(hay, orig)}</div></a></li>`).join("")}</ul>`;
}

/* ---------- Đã lưu ---------- */
let savedKind = "hl";
function initSaved() {
  $$("#savedSeg button").forEach((b) => (b.onclick = () => { savedKind = b.dataset.k; $$("#savedSeg button").forEach((x) => x.setAttribute("aria-pressed", x === b)); renderSaved(); }));
  $("#backupBtn").onclick = () => {
    const data = JSON.stringify({ app: "kinhthanh1925", v: 1, at: new Date().toISOString(), hl: S.hl, notes: S.notes, bm: S.bm, plan: S.plan }, null, 1);
    downloadBlob(new Blob([data], { type: "application/json" }), `kinh-thanh-1925-sao-luu-${todayStr()}.json`); toast("Đã tải bản sao lưu");
  };
  $("#restoreFile").onchange = async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try { const d = JSON.parse(await f.text()); if (d.app !== "kinhthanh1925") throw 0; Object.assign(S.hl, d.hl || {}); Object.assign(S.notes, d.notes || {}); Object.assign(S.bm, d.bm || {}); if (d.plan && !S.plan) S.plan = d.plan; save(); renderSaved(); toast("Đã khôi phục"); }
    catch (_) { toast("Tệp này không phải bản sao lưu của Kinh Thánh 1925"); }
    e.target.value = "";
  };
  renderSaved();
}
async function renderSaved() {
  const L = $("#savedList"), src = S[savedKind];
  const keys = Object.keys(src).sort((a, b) => { const A = parseKey(a), B = parseKey(b); return A[0] - B[0] || A[1] - B[1] || A[2] - B[2]; });
  if (!keys.length) {
    const msg = { hl: ["Chưa tô màu câu nào", "Khi đọc, chạm vào một câu rồi chọn màu."], notes: ["Chưa có ghi chú", "Chạm vào một câu rồi chọn Ghi chú."], bm: ["Chưa đánh dấu câu nào", "Chạm vào một câu rồi chọn Đánh dấu."] }[savedKind];
    L.innerHTML = `<li class="empty" style="background:none;border:0"><b>${msg[0]}</b>${msg[1]}</li>`; return;
  }
  L.innerHTML = `<li class="empty" style="background:none;border:0">Đang tải…</li>`;
  try { await Promise.all([...new Set(keys.map((k) => parseKey(k)[0]))].map(loadBook)); } catch (e) { L.innerHTML = `<li class="empty">Không tải được dữ liệu. Kiểm tra kết nối mạng.</li>`; return; }
  L.innerHTML = keys.map((k) => {
    const [b, c, v] = parseKey(k), t = cache[b][c - 1][v - 1], hl = S.hl[k];
    return `<li><div class="top-row">${hl ? `<span class="swatch" style="background:${HL[hl]}"></span>` : ""}<a class="ref" href="${chUrl(b, c, v)}">${esc(refName(b, c, v))}</a><button class="ibtn" data-del="${k}" aria-label="Xóa ${esc(refName(b, c, v))}">${ic("trash")}</button></div>
    <a class="txt" href="${chUrl(b, c, v)}">${esc(t)}</a>${savedKind === "notes" ? `<div class="note">${esc(S.notes[k].t)}</div>` : ""}</li>`;
  }).join("");
  $$("[data-del]", L).forEach((x) => (x.onclick = () => { delete S[savedKind][x.dataset.del]; save(); renderSaved(); toast("Đã xóa"); }));
}

/* ---------- Trang khung khi không có mạng ---------- */
async function initShell() {
  const rel = decodeURIComponent(location.pathname).slice(BASE.length - 1).replace(/^\//, "");
  const m = rel.match(/^([a-z0-9-]+)\/(\d+)\/?$/);
  const box = $("#shell");
  const b = m ? SLUGS.indexOf(m[1]) : -1, c = m ? +m[2] : 0;
  if (b < 0 || c < 1 || c > CHS[b]) {
    box.innerHTML = `<h1 class="page">Đang không có mạng</h1><p class="lead">Trang này chưa được lưu trên máy. Hãy mở một đoạn Kinh Thánh đã tải, hoặc vào Cỡ chữ và giao diện để tải toàn bộ khi có mạng.</p><div class="section row"><a class="btn" href="${BASE}muc-luc/">Mục lục</a></div>`;
    return;
  }
  try { await loadBook(b); } catch (e) { box.innerHTML = `<h1 class="page">Đang không có mạng</h1><p class="lead">${esc(BOOKS[b][0])} chưa được tải về máy. Khi có mạng, mở Cỡ chữ và giao diện rồi bấm “Tải toàn bộ Kinh Thánh”.</p>`; return; }
  document.title = `${refName(b, c)} – Kinh Thánh 1925`;
  document.body.dataset.page = "chapter"; document.body.dataset.b = b; document.body.dataset.c = c;
  $("#pickBtn span").textContent = refName(b, c);
  box.innerHTML = chapterMarkup(b, c, cache[b][c - 1]);
  initChapter(b, c);
}

/* ---------- Khởi động ---------- */
applyPrefs();
({
  home: initHome,
  book: initBook,
  chapter: () => initChapter(+document.body.dataset.b, +document.body.dataset.c),
  search: initSearch,
  saved: initSaved,
  shell: initShell,
}[document.body.dataset.page] || (() => {}))();
