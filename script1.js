// DOM Elements
const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('#search-btn');
const navbar = document.querySelector('.navbar');
const cartCount = document.querySelector('.cart-count');

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Initialize header state
    if (window.scrollY > 80) {
        navbar.classList.add('active');
    }
});

// Search functionality
if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchForm.classList.toggle('active');
    });
}

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target) && e.target !== searchBtn) {
        searchForm.classList.remove('active');
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
});

// Add to cart functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault();
        const bookCard = e.target.closest('.book-card');
        const bookId = bookCard.dataset.id;
        const bookTitle = bookCard.querySelector('h5').textContent;
        const bookPrice = bookCard.querySelector('.price').textContent;
        const bookImage = bookCard.querySelector('img').src;
        
        addToCart({
            id: bookId,
            title: bookTitle,
            price: bookPrice,
            image: bookImage,
            quantity: 1
        });
        
        // Visual feedback
        const originalText = e.target.textContent;
        e.target.textContent = 'Added!';
        e.target.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            e.target.textContent = originalText;
            e.target.style.backgroundColor = '';
        }, 1500);
    }
});

// Add item to cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }
    
    updateCartCount();
    saveCartToLocalStorage();
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart page
if (document.querySelector('.cart-container')) {
    renderCart();
}

// Render cart items
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('#total');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <div class="quantity-control">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners for quantity controls
    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.dataset.id;
            updateQuantity(itemId, -1);
        });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.dataset.id;
            updateQuantity(itemId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.dataset.id;
            removeItem(itemId);
        });
    });
}

// Update item quantity
function updateQuantity(itemId, change) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        saveCartToLocalStorage();
        updateCartCount();
        renderCart();
    }
}

// Remove item from cart
function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToLocalStorage();
    updateCartCount();
    renderCart();
}