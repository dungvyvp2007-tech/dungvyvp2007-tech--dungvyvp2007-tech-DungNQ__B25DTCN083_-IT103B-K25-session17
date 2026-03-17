/*
    BROWSER STORAGE:
    - Dịch vụ cho phép lưu trữ dữ liệu phía trình duyệt web!
        Cung cấp 3 kiểu lưu dữ liệu
        1.Local Storage
            + Dung lượng lưu: 5_ 10 MB ( 1MB ~ 1024kb)
            1 ảnh trong máy tính khoảng 100kb
            + Dữ liệu khi lưu( đóng trình duyệt, tắt máy) thì dữ liệu không bị mất!
        2.Session Storage
            + Dung lượng lưu: 5_10MB
            + Phiên làm việc : khi đóng trình duyệt, tắt máy thì dữ liệu bị mất
        3.Cookies
            + Có thể set được thời gian tồn tại

        **************8
    - CÁCH LƯU TRỮ DỮ LIỆU.
I. LƯU: localStorage.setItem(Tên KEY, VALUE)

Đối với dữ liệu là mảng hoặc object khi lưu Phải chuyển sang định dang JSON.
    JSON.stringify(DỰ LIỆU)

*/
let fullName = "Vũ Hồng Văn";
localStorage.setItem("fullName", fullName);

let age = 18;
localStorage.setItem("age", age);

let students = ["Thu","Hồng","Huyền"];
localStorage.setItem("STUDENTS", JSON.stringify(students));

let products = [
    { id: 1, name:"Sản phẩm 1" },
    { id: 2, name:"Sản phẩm 2" }
];

localStorage.setItem("PRODUCTS", JSON.stringify(products));

