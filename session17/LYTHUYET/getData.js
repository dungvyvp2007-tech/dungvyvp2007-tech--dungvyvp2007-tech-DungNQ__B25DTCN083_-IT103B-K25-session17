/*

LẤY DỮ LIỆU:
localStorage.getItem("Tên_KEY");
đối với mảng hoặc object khi lấy về Phải chuyển từ định dạng JSON sang dạng ban đầu của nó.

JSON.parse(GIÁ TRỊ LẤY VỀ );


******************

XÓA DỮ LIỆU
1.Xóa từng key
    localStorage.removeItem("Tên KEY");
2.Xóa hết
    localStorage.clear();
*/

age = localStorage.getItem("age");
console.log("age:", age);

fullName = localStorage.getItem("fullName");
console.log("Fullname:", fullName);

students = JSON.parse(localStorage.getItem("STUDENTS"));
console.log("Students:", students);

products = JSON.parse(localStorage.getItem("PRODUCTS"));
console.log("Products:", products);

localStorage.clear();

