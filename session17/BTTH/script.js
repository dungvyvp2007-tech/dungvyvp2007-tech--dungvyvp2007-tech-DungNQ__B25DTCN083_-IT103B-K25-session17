// const products = [
//   { id: 1, name: "Bánh Chưng Tranh Khúc", price: 150000 },
//   { id: 2, name: "Giò Lụa Ước Lễ", price: 180000 },
//   { id: 3, name: "Cành Đào Nhật Tân", price: 500000 },
//   { id: 4, name: "Mứt Tết Thập Cẩm", price: 120000 },
//   { id: 5, name: "Lì Xì May Mắn", price: 20000 },
//   { id: 6, name: "Dưa Hấu Khắc Chữ", price: 60000 },
// ];

// let cart = [];

// const cartList = document.getElementById("cart-list");
// const totalPrice = document.getElementById("total-price");
// const checkoutBtn = document.getElementById("btn-checkout");
// const addButtons = document.querySelectorAll(".btn-add");

// function loadCart() {
//   const data = localStorage.getItem("cart");

//   if (data) {
//     cart = JSON.parse(data);
//   } else {
//     cart = [];
//   }

//   renderCart();
// }

// function renderCart() {
//   cartList.innerHTML = "";

//   if (cart.length === 0) {
//     cartList.innerHTML = `<li class="empty-msg">Chưa có món nào...</li>`;
//     totalPrice.innerText = "0đ";
//     return;
//   }

//   let total = 0;

//   cart.forEach((item, index) => {
//     total += item.price;

//     const li = document.createElement("li");

//     li.innerHTML = `
//             <span class="cart-item-name">${item.name}</span>
//             <div>
//                 <span class="cart-item-price">${formatMoney(item.price)}</span>
//                 <button class="btn-remove" data-index="${index}">X</button>
//             </div>
//         `;

//     cartList.appendChild(li);
//   });

//   totalPrice.innerText = formatMoney(total) + "đ";

//   const removeButtons = document.querySelectorAll(".btn-remove");

//   removeButtons.forEach((btn) => {
//     btn.addEventListener("click", function () {
//       const index = this.getAttribute("data-index");

//       removeItem(index);
//     });
//   });
// }

// function formatMoney(number) {
//   return number.toLocaleString("vi-VN");
// }

// function addToCart(productIndex) {
//   const product = products[productIndex];

//   cart.push(product);

//   localStorage.setItem("cart", JSON.stringify(cart));

//   renderCart();
// }

// addButtons.forEach((btn, index) => {
//   btn.addEventListener("click", function () {
//     addToCart(index);
//   });
// });

// function removeItem(index) {
//   cart.splice(index, 1);

//   localStorage.setItem("cart", JSON.stringify(cart));

//   renderCart();
// }

// checkoutBtn.addEventListener("click", function () {
//   if (cart.length === 0) {
//     alert("Giỏ hàng đang trống");
//     return;
//   }

//   alert("Đã thanh toán thành công");

//   localStorage.removeItem("cart");

//   cart = [];

//   renderCart();
// });

// loadCart();

// const products = [
//   {id: 1, name:" Sản phẩm 1",price : 15000},
//   {id: 2, name:" Sản phẩm 2",price : 15000},
//   {id: 3, name:" Sản phẩm 3",price : 15000},
//   {id: 4, name:" Sản phẩm 4",price : 15000},
// ];
// localStorage.setItem("products", JSON.stringify(products));
let products = [
  { id: 1, name: "Bánh Chưng", price: 150000, img: "../Image/banhchung.webp" },

  { id: 2, name: "Giò Lụa", price: 180000, img: "../Image/giolua.jpg" },

  { id: 3, name: "Cành Đào", price: 500000, img: "../Image/canhdao.webp" },

  { id: 4, name: "Mứt Tết", price: 120000, img: "../Image/muttet.webp" },

  { id: 5, name: "Lì Xì (Tệp)", price: 20000, img: "../Image/lixi.webp" },

  { id: 6, name: "Dưa Hấu", price: 60000, img: "../Image/duahau.jpg" },
];
let savedData = localStorage.getItem("myCart");
let cart = savedData
  ? JSON.parse(savedData)
  : [
      {
        id: 1,
        name: "Bánh Chưng",
        price: 150000,
        img: "../Image/banhchung.webp",
        quantity: 1,
      },

      {
        id: 2,
        name: "Giò Lụa",
        price: 180000,
        img: "../Image/giolua.jpg",
        quantity: 1,
      },
    ];
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
function renderProducts() {
  let htmlStr = "";
  for (let i = 0; i < products.length; i++) {
    htmlStr += `<div class="product-card">
                    <img src="${products[i].img}" alt="">
                    <h3>${products[i].name}</h3>
                    <p class="price">${formatter.format(products[i].price)}</p>
                    <button class="btn-add" onclick="clickAdd(${i})">Thêm vào giỏ</button>
                </div>`;
  }
  document.getElementById("product-list").innerHTML = htmlStr;
}
renderProducts();
function renderCart() {
  let cartStr = "";
  for (let i = 0; i < cart.length; i++) {
    cartStr += `<li>
                        <span class="cart-item-name">${cart[i].name}</span>
                        <span> Quanity:${cart[i].quantity}</span>
                        <div>
                            <span class="cart-item-price">${formatter.format(cart[i].price)}</span>
                            <button class="btn-remove" onclick = "clickDel(${cart[i].id})">X</button>
                        </div>
                    </li>`;
  }
  document.getElementById("cart-list").innerHTML = cartStr;
  localStorage.setItem("myCart", JSON.stringify(cart));
  clickConfirm();
}
renderCart();
function clickAdd(index) {
  console.log("Product: ", products[index]);
  let newProduct = { ...products[index], quantity: 1 };
  cart.push(newProduct);

  renderCart();
}
function clickConfirm() {
  let total = cart.reduce((acc, value) => {
    return acc + value.price;
  }, 0);

  let sumStr = `
    <div class="summary-container">
        <p>Tổng cộng:</p>
        <h3 id="total-price">${formatter.format(total)}</h3>
        <button id="btn-checkout" class="btn-checkout"
            onclick="alert('Cảm ơn bạn đã mua hàng! Chúc mừng năm mới!')">
            Thanh Toán
        </button>
    </div>`;
  document.getElementById("cart-summary").innerHTML = sumStr;
}
clickConfirm();
function clickDel(index) {
  if (confirm("Wanna delete this?")) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == index) {
        cart.splice(i, 1);
      }
    }
  }
  renderCart();
}
