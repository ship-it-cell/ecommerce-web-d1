const productsContainer = document.getElementById("productsContainer");
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");
const cartCount = document.getElementById("cartCount");

let allProducts = [];
let myBasket = JSON.parse(localStorage.getItem("myBasket")) || [];

if (!localStorage.getItem("activeUser")) {
  window.location.href = "index.html";
}
// Update cart count
function updateCartCount() {
  cartCount.textContent = myBasket.length;
}

// Fetch products
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    allProducts = products;
    displayProducts(products);
  } catch (error) {
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
  }
}

// Display products
function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title.substring(0, 40)}...</h3>
            <p><strong>$${product.price}</strong></p>
            <p>${product.category}</p>
            <button onclick="viewProduct(${product.id})">View Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>        `;
    productsContainer.appendChild(productCard);
  });
}

// Add to cart
function addToCart(productId) {
  const selectedProduct = allProducts.find(
    (product) => product.id === productId,
  );

  myBasket.push(selectedProduct);

  localStorage.setItem("myBasket", JSON.stringify(myBasket));

  updateCartCount();

  alert("Product added to cart!");
}

// Search products
searchBar.addEventListener("input", function () {
  const searchValue = searchBar.value.toLowerCase();

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchValue),
  );

  displayProducts(filteredProducts);
});

// View products
function viewProduct(productId) {
    localStorage.setItem("selectedProductId", productId);
    window.location.href = "product.html";
}

// Filter category
categoryFilter.addEventListener("change", function () {
  const selectedCategory = categoryFilter.value;

  if (selectedCategory === "all") {
    displayProducts(allProducts);
  } else {
    const filteredProducts = allProducts.filter(
      (product) => product.category === selectedCategory,
    );

    displayProducts(filteredProducts);
  }
});

// Go to cart
function goToCart() {
  window.location.href = "cart.html";
}

// Logout
function logoutUser() {
  localStorage.removeItem("activeUser");
  window.location.href = "index.html";
}

// Initialize
fetchProducts();
updateCartCount();
