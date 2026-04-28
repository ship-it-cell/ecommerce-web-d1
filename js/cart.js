// Protect cart page
if (!localStorage.getItem("activeUser")) {
    window.location.href = "login.html";
}

const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let myBasket = JSON.parse(localStorage.getItem("myBasket")) || [];

// Display cart items
function displayCartItems() {
    cartItemsContainer.innerHTML = "";

    if (myBasket.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0.00";
        return;
    }

    let totalAmount = 0;

    myBasket.forEach((product, index) => {
        totalAmount += product.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="cart-details">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
            </div>
            <button class="remove-btn" onclick="removeCartItem(${index})">
                Remove
            </button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = totalAmount.toFixed(2);
}

// Remove cart item
function removeCartItem(index) {
    myBasket.splice(index, 1);

    localStorage.setItem("myBasket", JSON.stringify(myBasket));

    displayCartItems();
}

// Checkout
checkoutBtn.addEventListener("click", function() {
    if (myBasket.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    localStorage.removeItem("myBasket");

    window.location.href = "success.html";
});

// Continue shopping
function goToDashboard() {
    window.location.href = "dashboard.html";
}

// Logout
function logoutUser() {
    localStorage.removeItem("activeUser");
    window.location.href = "login.html";
}

// Initialize
displayCartItems();