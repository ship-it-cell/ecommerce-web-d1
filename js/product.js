// Protect page
if (!localStorage.getItem("activeUser")) {
    window.location.href = "login.html";
}

const productDetailsContainer = document.getElementById("productDetailsContainer");

let myBasket = JSON.parse(localStorage.getItem("myBasket")) || [];
const selectedProductId = localStorage.getItem("selectedProductId");

// Fetch selected product
async function fetchSelectedProduct() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${selectedProductId}`);
        const product = await response.json();

        displayProductDetails(product);

    } catch (error) {
        productDetailsContainer.innerHTML = "<p>Failed to load product details.</p>";
    }
}

// Display product details
function displayProductDetails(product) {
    productDetailsContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        
        <div class="product-info">
            <h1>${product.title}</h1>

            <p class="product-price">$${product.price}</p>

            <p><strong>Category:</strong> ${product.category}</p>

            <p><strong>Description:</strong> ${product.description}</p>

            <p><strong>Rating:</strong> ${product.rating.rate} / 5</p>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
}

// Add to cart
async function addToCart(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();

        myBasket.push(product);

        localStorage.setItem("myBasket", JSON.stringify(myBasket));

        alert("Product added to cart!");

    } catch (error) {
        alert("Failed to add product.");
    }
}

// Navigation
function goToDashboard() {
    window.location.href = "dashboard.html";
}

function goToCart() {
    window.location.href = "cart.html";
}

function logoutUser() {
    localStorage.removeItem("activeUser");
    window.location.href = "index.html";
}

// Initialize
fetchSelectedProduct();