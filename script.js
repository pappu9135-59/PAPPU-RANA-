// Bookstore Application - Main JavaScript File

// Sample Data
const booksData = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        price: 12.99,
        rating: 4.5,
        description: "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
        reviews: [
            { author: "John Doe", rating: 5, comment: "A masterpiece of American literature." },
            { author: "Jane Smith", rating: 4, comment: "Beautifully written with complex characters." }
        ],
        featured: true
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        price: 14.99,
        rating: 4.8,
        description: "The story of young Scout Finch and her father Atticus in a racially divided Alabama town.",
        reviews: [
            { author: "Mike Johnson", rating: 5, comment: "Powerful and moving story." }
        ],
        featured: true
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        price: 11.99,
        rating: 4.6,
        description: "A dystopian novel about totalitarianism and surveillance society.",
        featured: true
    },
    {
        id: 4,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        price: 16.99,
        rating: 4.7,
        description: "The adventure of Bilbo Baggins, a hobbit who embarks on a quest.",
        featured: true
    },
    {
        id: 5,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        price: 13.99,
        rating: 4.4,
        description: "The story of Elizabeth Bennet and Mr. Darcy in Georgian-era England.",
        featured: true
    },
    {
        id: 6,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Coming-of-age",
        price: 10.99,
        rating: 4.2,
        description: "The story of Holden Caulfield's journey through New York City.",
        featured: true
    },
    {
        id: 7,
        title: "Lord of the Flies",
        author: "William Golding",
        genre: "Dystopian",
        price: 12.99,
        rating: 4.3,
        description: "A group of boys stranded on an island descend into savagery.",
        featured: true
    },
    {
        id: 8,
        title: "Animal Farm",
        author: "George Orwell",
        genre: "Political",
        price: 9.99,
        rating: 4.5,
        description: "An allegorical novella about the Russian Revolution.",
        featured: true
    }
];

const genresData = [
    { name: "Classic", icon: "fas fa-crown", count: 2 },
    { name: "Fantasy", icon: "fas fa-dragon", count: 1 },
    { name: "Romance", icon: "fas fa-heart", count: 1 },
    { name: "Dystopian", icon: "fas fa-exclamation-triangle", count: 2 },
    { name: "Coming-of-age", icon: "fas fa-child", count: 1 },
    { name: "Political", icon: "fas fa-balance-scale", count: 1 }
];

const faqData = [
    {
        question: "How do I place an order?",
        answer: "Simply browse our books, add them to your cart, and proceed to checkout. All orders are processed securely."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
        question: "Can I return a book?",
        answer: "We accept returns within 30 days of purchase, provided the book is in its original condition."
    },
    {
        question: "Do you have e-books?",
        answer: "Currently, we focus on physical books, but we're working on expanding to digital formats."
    }
];

// Application State
let currentUser = null;
let cart = [];
let wishlist = [];
let recentlyViewed = [];
let currentTheme = 'light';

// DOM Elements
const elements = {
    // Navigation
    searchToggle: document.getElementById('searchToggle'),
    searchContainer: document.getElementById('searchContainer'),
    searchInput: document.getElementById('searchInput'),
    themeToggle: document.getElementById('themeToggle'),
    userToggle: document.getElementById('userToggle'),
    cartToggle: document.getElementById('cartToggle'),
    cartCount: document.getElementById('cartCount'),
    
    // Sections
    sections: document.querySelectorAll('.section'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Modals
    userModal: document.getElementById('userModal'),
    cartModal: document.getElementById('cartModal'),
    bookDetailModal: document.getElementById('bookDetailModal'),
    checkoutModal: document.getElementById('checkoutModal'),
    successModal: document.getElementById('successModal'),
    
    // Content areas
    featuredCarousel: document.getElementById('featuredCarousel'),
    genresGrid: document.getElementById('genresGrid'),
    recommendationsGrid: document.getElementById('recommendationsGrid'),
    booksGrid: document.getElementById('booksGrid'),
    genresDetailGrid: document.getElementById('genresDetailGrid'),
    faqContainer: document.getElementById('faqContainer'),
    profileSection: document.getElementById('profileSection'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    bookDetailTitle: document.getElementById('bookDetailTitle'),
    bookDetailContent: document.getElementById('bookDetailContent'),
    checkoutForm: document.getElementById('checkoutForm'),
    
    // Forms
    contactForm: document.getElementById('contactForm'),
    
    // Loading
    loadingOverlay: document.getElementById('loadingOverlay')
};

// Initialize Application
function init() {
    loadUserData();
    setupEventListeners();
    renderHomePage();
    showLoading(false);
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    elements.searchToggle?.addEventListener('click', toggleSearch);
    elements.themeToggle?.addEventListener('click', toggleTheme);
    elements.userToggle?.addEventListener('click', () => showModal('userModal'));
    elements.cartToggle?.addEventListener('click', () => showModal('cartModal'));
    
    // Search
    elements.searchInput?.addEventListener('input', handleSearch);
    
    // Navigation links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href').substring(1);
            navigateToSection(target);
        });
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            hideModal(modal.id);
        });
    });
    
    // Contact form
    elements.contactForm?.addEventListener('submit', handleContactSubmit);
    
    // Checkout
    document.getElementById('checkoutBtn')?.addEventListener('click', showCheckout);
    document.getElementById('successBtn')?.addEventListener('click', () => hideModal('successModal'));
}

// Navigation Functions
function navigateToSection(sectionId) {
    // Update active nav link
    elements.navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`[href="#${sectionId}"]`)?.classList.add('active');
    
    // Show section
    elements.sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId)?.classList.add('active');
    
    // Render section content
    switch(sectionId) {
        case 'home':
            renderHomePage();
            break;
        case 'books':
            renderBooksPage();
            break;
        case 'genres':
            renderGenresPage();
            break;
        case 'about':
            renderAboutPage();
            break;
        case 'contact':
            renderContactPage();
            break;
    }
}

// Search Functions
function toggleSearch() {
    elements.searchContainer?.classList.toggle('active');
    if (elements.searchContainer?.classList.contains('active')) {
        elements.searchInput?.focus();
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const filteredBooks = booksData.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
    );
    renderBooks(filteredBooks, elements.booksGrid);
}

// Theme Functions
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Update theme toggle icon
    const icon = elements.themeToggle?.querySelector('i');
    if (icon) {
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// User Management
function loadUserData() {
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedUser) currentUser = JSON.parse(savedUser);
    if (savedCart) cart = JSON.parse(savedCart);
    if (savedWishlist) wishlist = JSON.parse(savedWishlist);
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
    
    updateCartCount();
}

function saveUserData() {
    localStorage.setItem('user', JSON.stringify(currentUser));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function loginUser() {
    const name = prompt('Enter your name:');
    if (name) {
        currentUser = { name, id: Date.now() };
        saveUserData();
        renderUserProfile();
        alert(`Welcome back, ${name}!`);
    }
}

// Cart Functions
function addToCart(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    const existingItem = cart.find(item => item.id === bookId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    
    saveUserData();
    updateCartCount();
    renderCart();
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    saveUserData();
    updateCartCount();
    renderCart();
}

function updateQuantity(bookId, change) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(bookId);
        } else {
            saveUserData();
            updateCartCount();
            renderCart();
        }
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    elements.cartCount.textContent = count;
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Wishlist Functions
function toggleWishlist(bookId) {
    const index = wishlist.indexOf(bookId);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(bookId);
    }
    saveUserData();
}

// Rendering Functions
function renderHomePage() {
    renderFeaturedBooks();
    renderGenres();
    renderRecommendations();
}

function renderFeaturedBooks() {
    const featuredBooks = booksData.filter(book => book.featured);
    const carouselHTML = featuredBooks.map(book => `
        <div class="book-card" onclick="showBookDetail(${book.id})">
            <div class="book-cover">
                <i class="fas fa-book"></i>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-meta">
                    <span class="book-price">$${book.price}</span>
                    <div class="book-rating">
                        <span class="stars">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5-Math.floor(book.rating))}</span>
                        <span>${book.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    elements.featuredCarousel.innerHTML = carouselHTML;
}

function renderGenres() {
    const genresHTML = genresData.map(genre => `
        <div class="genre-card" onclick="filterByGenre('${genre.name}')">
            <div class="genre-icon">
                <i class="${genre.icon}"></i>
            </div>
            <h3 class="genre-name">${genre.name}</h3>
            <p class="genre-count">${genre.count} books</p>
        </div>
    `).join('');
    
    elements.genresGrid.innerHTML = genresHTML;
}

function renderRecommendations() {
    const recommendations = getRecommendations();
    renderBooks(recommendations, elements.recommendationsGrid);
}

function renderBooks(books, container) {
    const booksHTML = books.map(book => `
        <div class="book-card" onclick="showBookDetail(${book.id})">
            <div class="book-cover">
                <i class="fas fa-book"></i>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-meta">
                    <span class="book-price">$${book.price}</span>
                    <div class="book-rating">
                        <span class="stars">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5-Math.floor(book.rating))}</span>
                        <span>${book.rating}</span>
                    </div>
                </div>
                <div class="book-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${book.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); toggleWishlist(${book.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = booksHTML;
}

function renderBooksPage() {
    renderBooks(booksData, elements.booksGrid);
}

function renderGenresPage() {
    const genresHTML = genresData.map(genre => `
        <div class="genre-section">
            <h3>${genre.name}</h3>
            <div class="books-grid">
                ${renderBooks(booksData.filter(book => book.genre === genre.name), null)}
            </div>
        </div>
    `).join('');
    
    elements.genresDetailGrid.innerHTML = genresHTML;
}

function renderAboutPage() {
    const faqHTML = faqData.map((faq, index) => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(${index})">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer" id="faq-${index}">
                <p>${faq.answer}</p>
            </div>
        </div>
    `).join('');
    
    elements.faqContainer.innerHTML = faqHTML;
}

function renderContactPage() {
    // Contact form is already in HTML
}

function renderUserProfile() {
    if (!currentUser) {
        elements.profileSection.innerHTML = `
            <div class="profile-login">
                <h3>Welcome Guest</h3>
                <button class="btn btn-primary" onclick="loginUser()">Login</button>
            </div>
        `;
    } else {
        elements.profileSection.innerHTML = `
            <div class="profile-info">
                <h3>Welcome, ${currentUser.name}!</h3>
                <div class="profile-stats">
                    <div class="stat">
                        <span class="stat-number">${wishlist.length}</span>
                        <span class="stat-label">Wishlist Items</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${recentlyViewed.length}</span>
                        <span class="stat-label">Recently Viewed</span>
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="logoutUser()">Logout</button>
            </div>
        `;
    }
}

function renderCart() {
    if (cart.length === 0) {
        elements.cartItems.innerHTML = '<p>Your cart is empty</p>';
        elements.cartTotal.textContent = '$0.00';
        return;
    }
    
    const cartHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-cover">
                <i class="fas fa-book"></i>
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-author">${item.author}</p>
                <span class="cart-item-price">$${item.price}</span>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="quantity-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    elements.cartItems.innerHTML = cartHTML;
    elements.cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
}

// Book Detail Functions
function showBookDetail(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    // Add to recently viewed
    if (!recentlyViewed.includes(bookId)) {
        recentlyViewed.unshift(bookId);
        if (recentlyViewed.length > 10) recentlyViewed.pop();
        saveUserData();
    }
    
    elements.bookDetailTitle.textContent = book.title;
    elements.bookDetailContent.innerHTML = `
        <div class="book-detail-cover">
            <i class="fas fa-book"></i>
        </div>
        <div class="book-detail-info">
            <h4>${book.title}</h4>
            <div class="book-detail-meta">
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Price:</strong> $${book.price}</p>
                <p><strong>Rating:</strong> ${book.rating}/5</p>
            </div>
            <div class="book-detail-description">
                <p>${book.description}</p>
            </div>
            <div class="book-actions">
                <button class="btn btn-primary" onclick="addToCart(${book.id}); hideModal('bookDetailModal')">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="toggleWishlist(${book.id})">
                    <i class="fas fa-heart"></i> Wishlist
                </button>
            </div>
            <div class="book-detail-reviews">
                <h4>Reviews</h4>
                ${book.reviews.map(review => `
                    <div class="review-item">
                        <div class="review-header">
                            <span class="review-author">${review.author}</span>
                            <span class="review-rating">${'★'.repeat(review.rating)}</span>
                        </div>
                        <p>${review.comment}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    showModal('bookDetailModal');
}

// Utility Functions
function getRecommendations() {
    if (!currentUser) {
        return booksData.slice(0, 4);
    }
    
    // Simple recommendation based on wishlist and recently viewed
    const userGenres = new Set();
    wishlist.forEach(bookId => {
        const book = booksData.find(b => b.id === bookId);
        if (book) userGenres.add(book.genre);
    });
    
    return booksData
        .filter(book => userGenres.has(book.genre) || book.rating >= 4.5)
        .slice(0, 4);
}

function filterByGenre(genre) {
    const filteredBooks = booksData.filter(book => book.genre === genre);
    renderBooks(filteredBooks, elements.booksGrid);
    navigateToSection('books');
}

function toggleFAQ(index) {
    const answer = document.getElementById(`faq-${index}`);
    answer.classList.toggle('active');
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        
        // Render specific content
        switch(modalId) {
            case 'userModal':
                renderUserProfile();
                break;
            case 'cartModal':
                renderCart();
                break;
        }
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function showCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    elements.checkoutForm.innerHTML = `
        <h3>Checkout Information</h3>
        <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="checkoutName" required>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" id="checkoutEmail" required>
        </div>
        <div class="form-group">
            <label>Address</label>
            <textarea id="checkoutAddress" required></textarea>
        </div>
        <div class="form-group">
            <label>Card Number</label>
            <input type="text" id="checkoutCard" placeholder="1234 5678 9012 3456" required>
        </div>
        <div class="checkout-summary">
            <h4>Order Summary</h4>
            ${cart.map(item => `
                <div class="checkout-item">
                    <span>${item.title} x${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('')}
            <div class="checkout-total">
                <strong>Total: $${getCartTotal().toFixed(2)}</strong>
            </div>
        </div>
        <button type="button" class="btn btn-primary" onclick="processOrder()">
            <i class="fas fa-credit-card"></i> Place Order
        </button>
    `;
    
    hideModal('cartModal');
    showModal('checkoutModal');
}

function processOrder() {
    // Simulate order processing
    showLoading(true);
    
    setTimeout(() => {
        showLoading(false);
        hideModal('checkoutModal');
        
        // Clear cart
        cart = [];
        saveUserData();
        updateCartCount();
        
        showModal('successModal');
    }, 2000);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showLoading(true);
    
    setTimeout(() => {
        showLoading(false);
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    }, 1500);
}

function showLoading(show) {
    if (elements.loadingOverlay) {
        elements.loadingOverlay.classList.toggle('active', show);
    }
}

function logoutUser() {
    currentUser = null;
    saveUserData();
    renderUserProfile();
    hideModal('userModal');
}

function scrollToSection(sectionId) {
    navigateToSection(sectionId);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Global functions for onclick handlers
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.showBookDetail = showBookDetail;
window.filterByGenre = filterByGenre;
window.toggleFAQ = toggleFAQ;
window.scrollToSection = scrollToSection;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.processOrder = processOrder;
