document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const quantitySelect = document.querySelector('.product-quantity');
    const description = document.getElementById('description').innerText;
    const price = parseFloat(document.querySelector('.price-update').innerText);
    const imageUrl = document.querySelector('.product-main-image img').src;

    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(quantitySelect.value);
        const cartItem = {
            description: description,
            price: price,
            quantity: quantity,
            imageUrl: imageUrl, 
            bestseller: '#1 Best Seller in Amazon',
            stock: 'In Stock',
            delivery: 'Free Delivery Mon, Jan 29 available at checkout',
            returns: 'Free Returns'
        };

        // Get existing cart items from localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the product already exists in the cart
        const existingItemIndex = cartItems.findIndex(item => item.description === cartItem.description);

        if (existingItemIndex !== -1) {
            // Product already exists, update the quantity
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            // Add the new item to the cart
            cartItems.push(cartItem);
        }

        // Save updated cart back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        updateCartCount(cartItems.length);

        
    });



    // Initialize cart count and display cart items on page load
    updateCartCount();
    displayCartItems();
});

// Function to display cart items
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.querySelector('.cart-left');

    if (!cartContainer) {
        console.error('Cart container not found');
        return;
    }

    cartContainer.innerHTML = '<h1>Shopping Cart</h1><hr>';

    cartItems.forEach((item, index) => {
        cartContainer.innerHTML += `
            <div class="product-cart-list">
                <img src="${item.imageUrl}" alt="" width="200px">
                <div>
                    <div class="product-cart-titleprice">
                        <p>${item.description}</p>
                        <p><b>₹${item.price.toFixed(2)}</b></p>
                    </div>
                    <p class="product-cart-bestseller"><span>${item.bestseller}</span></p>
                    <p class="product-cart-stock">${item.stock}</p>
                    <p class="product-cart-delivery">${item.delivery}</p>
                    <p class="product-cart-returns">${item.returns}</p>

                    <div class="cart-list-action">
                        <button class="decrement-btn" data-index="${index}">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="increment-btn" data-index="${index}">+</button>
                        <hr>
                        <p class="action-btn" onclick="removeItem(${index})">Delete</p>
                        <hr>
                        <p class="action-btn">Save for later</p>
                        <hr>
                        <p class="action-btn">Compare with similar items</p>
                        <hr>
                        <p class="action-btn">Share</p>
                    </div>
                </div>
            </div>
            <hr>
        `;
    });

    if (cartItems.length === 0) {
        cartContainer.innerHTML += '<p>Your cart is empty!</p>';
    }

    updateSubtotal(cartItems);

    // Add event listeners for increment and decrement buttons
    document.querySelectorAll('.increment-btn').forEach(button => {
        button.addEventListener('click', incrementQuantity);
    });

    document.querySelectorAll('.decrement-btn').forEach(button => {
        button.addEventListener('click', decrementQuantity);
    });
}

// Function to update the subtotal
function updateSubtotal(cartItems) {
    const subtotalContainer = document.querySelector('.cart-subtotal');
    let subtotal = 0;

    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    subtotalContainer.innerHTML = `Subtotal (${cartItems.length} items): <b>₹${subtotal.toFixed(2)}</b>`;
}

// Function to remove an item from the cart
function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems.splice(index, 1);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    updateCartCount(cartItems.length);
    displayCartItems();
}

// Function to update the cart count
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    cartCount.innerText = cartItems.length > 0 ? cartItems.length : '';
}

// Function to increment the quantity of an item
function incrementQuantity(event) {
    const index = event.target.getAttribute('data-index');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems[index].quantity += 1;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems(); // Re-display items with updated quantity
}

// Function to decrement the quantity of an item
function decrementQuantity(event) {
    const index = event.target.getAttribute('data-index');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems(); // Re-display items with updated quantity
}




document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayCartItems();
});      