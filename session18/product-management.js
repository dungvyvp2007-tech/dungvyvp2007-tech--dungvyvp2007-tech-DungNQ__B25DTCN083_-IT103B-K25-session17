let products = [];
let currentId = 1;
let editingId = null;

const form = document.getElementById("productForm");
const tableBody = document.getElementById("productTableBody");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const clearAllBtn = document.getElementById("clearAllBtn");

const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

function loadProducts() {
  try {
    const data = localStorage.getItem("products");
    const id = localStorage.getItem("currentId");

    if (data) products = JSON.parse(data);
    if (id) currentId = Number(id);
  } catch {
    products = [];
    currentId = 1;
  }
}

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("currentId", currentId);
}

function formatCurrency(price) {
  return price.toLocaleString("vi-VN") + " VNĐ";
}

function renderProducts() {
  const keyword = searchInput.value.toLowerCase();
  const category = filterCategory.value;

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword);

    const matchCategory = !category || p.category === category;

    return matchSearch && matchCategory;
  });

  tableBody.innerHTML = "";

  if (filtered.length === 0) {
    document.getElementById("emptyState").classList.add("show");
  } else {
    document.getElementById("emptyState").classList.remove("show");
  }

  filtered.forEach((p,index) => {
    const row = document.createElement("tr");

    const lowStock = p.quantity < 10 ? "low-stock" : "";

    row.innerHTML = `
        <td>${index + 1}</td>
        <td><strong>${p.name}</strong></td>
        <td>${p.category}</td>
        <td class="price">${formatCurrency(p.price)}</td>
        <td class="quantity ${lowStock}">${p.quantity}</td>
        <td class="description">${p.description}</td>
        <td>
            <div class="action-buttons">
                <button class="btn-edit" onclick="editProduct(${p.id})">✏️ Sửa</button>
                <button class="btn-delete" onclick="deleteProduct(${p.id})">🗑️ Xóa</button>
            </div>
        </td>
        `;

    tableBody.appendChild(row);
  });

  updateStats();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const category = document.getElementById("productCategory").value;
  const price = +document.getElementById("productPrice").value;
  const quantity = +document.getElementById("productQuantity").value;
  const description = document
    .getElementById("productDescription")
    .value.trim();

  if (!name || !category) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (price < 0) {
    alert("Giá phải >= 0");
    return;
  }

  if (quantity < 0) {
    alert("Số lượng phải >= 0");
    return;
  }

  if (editingId) {
    const product = products.find((p) => p.id === editingId);

    product.name = name;
    product.category = category;
    product.price = price;
    product.quantity = quantity;
    product.description = description;

    editingId = null;

    formTitle.textContent = "Thêm Sản Phẩm Mới"; 
    submitBtn.textContent = "➕ Thêm Sản Phẩm";
    cancelBtn.style.display = "none";
  } else {
    const product = {
      id: currentId++,
      name,
      category,
      price,
      quantity,
      description,
    };

    products.push(product);
  }

  saveProducts();
  form.reset();
  renderProducts();
});

function editProduct(id) {
  const product = products.find((p) => p.id === id);

  document.getElementById("productName").value = product.name;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productQuantity").value = product.quantity;
  document.getElementById("productDescription").value = product.description;

  editingId = id;

  formTitle.textContent = "Chỉnh Sửa Sản Phẩm";
  submitBtn.textContent = "Cập Nhật";
  cancelBtn.style.display = "inline-block";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteProduct(id) {
  const product = products.find((p) => p.id === id);

  if (!confirm(`Bạn có chắc muốn xóa ${product.name}?`)) return;

  products = products.filter((p) => p.id !== id);

  if (editingId === id) {
    form.reset();
    editingId = null;

    formTitle.textContent = "Thêm Sản Phẩm Mới";
    submitBtn.textContent = "➕ Thêm Sản Phẩm";
    cancelBtn.style.display = "none";
  }

  saveProducts();
  renderProducts();
}

cancelBtn.addEventListener("click", function () {
  form.reset();
  editingId = null;

  formTitle.textContent = "Thêm Sản Phẩm Mới";
  submitBtn.textContent = "➕ Thêm Sản Phẩm";
  cancelBtn.style.display = "none";
});

clearAllBtn.addEventListener("click", function () {
  if (!confirm("Bạn có chắc muốn xóa TẤT CẢ sản phẩm?")) return;

  products = [];
  currentId = 1;

  localStorage.removeItem("products");
  localStorage.removeItem("currentId");

  form.reset();
  editingId = null;

  renderProducts();
});

searchInput.addEventListener("input", renderProducts);

filterCategory.addEventListener("change", renderProducts);

function updateStats() {
  const totalProducts = products.length;
  let totalQuantity = 0;
  let totalValue = 0;

  products.forEach((p) => {
    totalQuantity += p.quantity;
    totalValue += p.price * p.quantity;
  });

  document.getElementById("totalProducts").textContent = totalProducts;
  document.getElementById("totalQuantity").textContent = totalQuantity;
  document.getElementById("totalValue").textContent =
    totalValue.toLocaleString("vi-VN") + " VNĐ";
}

loadProducts();
renderProducts();