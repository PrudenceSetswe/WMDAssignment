// DOM Elements
const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('#search-btn');
const searchBox = document.querySelector('#searchBox');
const header = document.querySelector('.header .header-2');
const loginBtn = document.getElementById('login-btn');
const loginFormContainer = document.getElementById('loginFormContainer');
const closeLoginForm = document.getElementById('closeLoginForm');
const bottomNavbar = document.querySelector('.bottom-navbar');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const cartCount = document.querySelector('.cart-count');

// Book Data
const books = [
    // Featured Books
    {
        id: 1,
        title: "Brideshead Revisited",
        author: "Evelyn Waugh",
        price: "₱150",
        image: "breadshead.jpg",
        category: "featured"
    },
    {
        id: 2,
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        price: "₱160",
        image: "images/crime-punishment.jpg",
        category: "featured"
    },
    {
        id: 3,
        title: "The Picture of Dorian Gray",
        author: "Oscar Wilde",
        price: "₱160",
        image: "images/dorian-gray.jpg",
        category: "featured"
    },
    {
        id: 4,
        title: "Faust",
        author: "Johann Wolfgang von Goethe",
        price: "₱160",
        image: "images/faust.jpg",
        category: "featured"
    },
    {
        id: 5,
        title: "Fear and Trembling",
        author: "Søren Kierkegaard",
        price: "₱150",
        image: "images/fear-trembling.jpg",
        category: "featured"
    },
    {
        id: 6,
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        price: "₱160",
        image: "images/karamazov.jpg",
        category: "featured"
    },
    {
        id: 7,
        title: "Wuthering Heights",
        author: "Emily Brontë",
        price: "₱150",
        image: "images/wuthering-heights.jpg",
        category: "featured"
    },
    {
        id: 8,
        title: "Secret History",
        author: "Donna Tartt",
        price: "₱160",
        image: "images/secret-history.jpg",
        category: "featured"
    },
    // New Arrivals
    {
        id: 9,
        title: "The Idiot",
        author: "Elif Batuman",
        price: "₱150",
        image: "images/the-idiot.jpg",
        category: "arrivals"
    },
    {
        id: 10,
        title: "If We Were Villains",
        author: "M.L Rio",
        price: "₱160",
        image: "images/villains.jpg",
        category: "arrivals"
    },
    {
        id: 11,
        title: "Babel: Arcane History",
        author: "R.F Kuang",
        price: "₱150",
        image: "images/babel.jpg",
        category: "arrivals"
    },
    {
        id: 12,
        title: "The Bell Jar",
        author: "Sylvia Plath",
        price: "₱100",
        image: "images/bell-jar.jpg",
        category: "arrivals"
    },
    {
        id: 13,
        title: "The House",
        author: "Simon Lelic",
        price: "₱150",
        image: "images/the-house.jpg",
        category: "arrivals"
    },
    {
        id: 14,
        title: "The Secret Garden",
        author: "Frances Burnett",
        price: "₱100",
        image: "images/secret-garden.jpg",
        category: "arrivals"
    },
    {
        id: 15,
        title: "Piranesi",
        author: "Susanna Clarke",
        price: "₱150",
        image: "images/piranesi.jpg",
        category: "arrivals"
    },
    {
        id: 16,
        title: "Little Women",
        author: "Louisa May Alcott",
        price: "₱150",
        image: "images/little-women.jpg",
        category: "arrivals"
    }
];

// Shopping cart
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load books
    loadBooks();
    
    // Initialize header state
    if (window.scrollY > 80) {
        header.classList.add('active');
        bottomNavbar.style.display = 'flex';
    }
});

// Search functionality
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchForm.classList.toggle('active');
    if (searchForm.classList.contains('active')) {
        searchBox.focus();
    }
});

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target) && e.target !== searchBtn) {
        searchForm.classList.remove('active');
    }
});

// Search form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchBox.value.toLowerCase().trim();
    
    if (searchTerm) {
        const results = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(results);
    } else {
        alert('Please enter a search term');
    }
});

function displaySearchResults(results) {
    const featuredBooksContainer = document.getElementById('featuredBooks');
    const arrivalBooksContainer = document.getElementById('arrivalBooks');
    
    if (results.length === 0) {
        featuredBooksContainer.innerHTML = '<p class="no-results">No books found matching your search.</p>';
        arrivalBooksContainer.innerHTML = '';
    } else {
        featuredBooksContainer.innerHTML = '';
        arrivalBooksContainer.innerHTML = '';
        
        results.forEach(book => {
            const bookElement = createBookElement(book);
            if (book.category === 'featured') {
                featuredBooksContainer.appendChild(bookElement);
            } else {
                arrivalBooksContainer.appendChild(bookElement);
            }
        });
        
        // Scroll to featured section
        document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
    }
    
    searchForm.classList.remove('active');
    searchBox.value = '';
}

// Header scroll effect
window.addEventListener('scroll', () => {
    searchForm.classList.remove('active');
    
    if (window.scrollY > 80) {
        header.classList.add('active');
        bottomNavbar.style.display = 'flex';
    } else {
        header.classList.remove('active');
        bottomNavbar.style.display = 'none';
    }
});

// Login form functionality
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close login form
closeLoginForm.addEventListener('click', () => {
    loginFormContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginFormContainer.classList.contains('active')) {
        loginFormContainer.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Toggle between login and register forms
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Form submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, you would validate and send to server
    alert('Login functionality would be implemented here');
    loginFormContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, you would validate and send to server
    alert('Registration functionality would be implemented here');
    loginFormContainer.classList.remove('active');
    document.body.style.overflow = 'auto';
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, you would send to server
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, you would send to server
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

// Load books into the page
function loadBooks() {
    const featuredBooksContainer = document.getElementById('featuredBooks');
    const arrivalBooksContainer = document.getElementById('arrivalBooks');
    
    featuredBooksContainer.innerHTML = '';
    arrivalBooksContainer.innerHTML = '';
    
    books.forEach(book => {
        const bookElement = createBookElement(book);
        if (book.category === 'featured') {
            featuredBooksContainer.appendChild(bookElement);
        } else {
            arrivalBooksContainer.appendChild(bookElement);
        }
    });
    
    // Add event listeners to all cart buttons
    document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

function createBookElement(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <div class="book-info">
            <h5>${book.title}</h5>
            <p class="author">by ${book.author}</p>
            <p class="price">${book.price}</p>
            <button class="cart-btn" data-id="${book.id}">Add to Cart</button>
        </div>
    `;
    return bookCard;
}

// Shopping cart functionality
function addToCart(e) {
    const bookId = parseInt(e.target.getAttribute('data-id'));
    const book = books.find(b => b.id === bookId);
    
    if (book) {
        cart.push(book);
        updateCartCount();
        
        // Visual feedback
        const originalText = e.target.textContent;
        e.target.textContent = 'Added!';
        e.target.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            e.target.textContent = originalText;
            e.target.style.backgroundColor = '#3A2C2A';
        }, 1500);
    }
}

function updateCartCount() {
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length ? 'flex' : 'none';
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                searchForm.classList.remove('active');
            }
        }
    });
});

// Responsive adjustments
function handleResponsiveChanges() {
    if (window.innerWidth <= 768) {
        bottomNavbar.style.display = 'flex';
    } else {
        if (window.scrollY <= 80) {
            bottomNavbar.style.display = 'none';
        }
    }
}

window.addEventListener('resize', handleResponsiveChanges);
handleResponsiveChanges();