# 📚 Literary Haven - Interactive Bookstore Website

A beautiful, fully interactive bookstore website built with pure HTML, CSS, and JavaScript. No backend required - everything runs locally in your browser!

![Bookstore Preview](https://img.shields.io/badge/Status-Complete-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🏠 **Home Page**
- **Hero Banner** with animated floating books
- **Featured Books Carousel** showcasing bestsellers
- **Genre Grid** with beautiful icons and hover effects
- **Personalized Recommendations** based on user preferences

### 📖 **Book Management**
- **Interactive Book Cards** with hover animations
- **Search Functionality** - search by title, author, or genre
- **Genre Filtering** - browse books by category
- **Sorting Options** - sort by title, author, price, or rating
- **Grid/List View Toggle** for different browsing experiences

### 👤 **User Personalization**
- **User Login/Logout** system (localStorage)
- **Wishlist Management** - save your favorite books
- **Recently Viewed** tracking
- **Personalized Recommendations** based on your preferences
- **Dark/Light Theme Toggle** with persistent settings

### 🛒 **Shopping Experience**
- **Shopping Cart** with quantity controls
- **Add/Remove Items** with real-time updates
- **Cart Total Calculation** with tax simulation
- **Checkout Process** with form validation
- **Order Confirmation** with success animations

### 📚 **Book Details**
- **Detailed Book Information** in modal popups
- **Book Reviews & Ratings** display
- **Add to Cart/Wishlist** from detail view
- **Responsive Design** for all screen sizes

### 📄 **Additional Pages**
- **About Page** with company statistics and FAQ
- **Contact Form** with JavaScript validation
- **FAQ Accordion** with smooth animations
- **Genre Browsing** pages

## 🚀 Quick Start

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required!

### Installation
1. **Clone or Download** the project files
2. **Open `index.html`** in your web browser
3. **Start exploring!** The website is fully functional immediately

```bash
# If you have the files locally, simply open:
open index.html
# or double-click the index.html file
```

## 📁 Project Structure

```
bookstore/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Design Features

### **Modern UI/UX**
- **Responsive Design** - works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - CSS transitions and hover effects
- **Beautiful Typography** - Playfair Display for headings, Inter for body text
- **Color Themes** - Light and dark mode support
- **Interactive Elements** - buttons, modals, and form controls

### **CSS Features**
- **CSS Grid & Flexbox** for modern layouts
- **CSS Custom Properties** (variables) for theming
- **Media Queries** for responsive design
- **Animations & Transitions** for smooth interactions
- **Box Shadows & Gradients** for depth and visual appeal

### **JavaScript Features**
- **Modular Architecture** with organized functions
- **LocalStorage Integration** for data persistence
- **Event-Driven Interactions** for smooth user experience
- **Dynamic Content Rendering** without page reloads
- **Form Validation** and error handling

## 📖 Sample Data

The website includes 8 classic books across different genres:

| Book | Author | Genre | Price | Rating |
|------|--------|-------|-------|--------|
| The Great Gatsby | F. Scott Fitzgerald | Classic | $12.99 | 4.5 |
| To Kill a Mockingbird | Harper Lee | Classic | $14.99 | 4.8 |
| 1984 | George Orwell | Dystopian | $11.99 | 4.6 |
| The Hobbit | J.R.R. Tolkien | Fantasy | $16.99 | 4.7 |
| Pride and Prejudice | Jane Austen | Romance | $13.99 | 4.4 |
| The Catcher in the Rye | J.D. Salinger | Coming-of-age | $10.99 | 4.2 |
| Lord of the Flies | William Golding | Dystopian | $12.99 | 4.3 |
| Animal Farm | George Orwell | Political | $9.99 | 4.5 |

## 🎯 How to Use

### **Browsing Books**
1. **Home Page** - View featured books and genres
2. **Books Section** - Browse all available books
3. **Search** - Use the search bar to find specific books
4. **Genre Filter** - Click on genre cards to filter books

### **User Account**
1. **Login** - Click the user icon to create an account
2. **Wishlist** - Click the heart icon on any book
3. **Recently Viewed** - Your browsing history is automatically tracked
4. **Theme Toggle** - Switch between light and dark modes

### **Shopping**
1. **Add to Cart** - Click "Add to Cart" on any book
2. **View Cart** - Click the cart icon to see your items
3. **Adjust Quantities** - Use +/- buttons in the cart
4. **Checkout** - Fill out the checkout form and place your order

### **Book Details**
1. **Click any book** to view detailed information
2. **Read reviews** and ratings
3. **Add to cart or wishlist** from the detail view
4. **Close modal** to return to browsing

## 🔧 Customization

### **Adding More Books**
Edit the `booksData` array in `script.js`:

```javascript
const booksData = [
    {
        id: 9,
        title: "Your New Book",
        author: "Author Name",
        genre: "Genre",
        price: 15.99,
        rating: 4.5,
        description: "Book description here...",
        reviews: [
            { author: "Reviewer", rating: 5, comment: "Great book!" }
        ],
        featured: true
    }
    // ... more books
];
```

### **Adding New Genres**
Update the `genresData` array:

```javascript
const genresData = [
    // ... existing genres
    { name: "New Genre", icon: "fas fa-icon-name", count: 1 }
];
```

### **Customizing Colors**
Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
    /* ... other variables */
}
```

## 🌟 Key Features Explained

### **LocalStorage Integration**
- **User Data** - Login information and preferences
- **Shopping Cart** - Items persist between sessions
- **Wishlist** - Saved books remain available
- **Theme Settings** - Dark/light mode preference

### **Responsive Design**
- **Mobile-First** approach
- **Flexible Grid** layouts
- **Adaptive Typography** and spacing
- **Touch-Friendly** interactions

### **Performance Optimizations**
- **Efficient DOM Manipulation** with minimal reflows
- **Event Delegation** for better performance
- **Lazy Loading** of content sections
- **Optimized Animations** using CSS transforms

## 🐛 Troubleshooting

### **Common Issues**

**Website doesn't load properly:**
- Ensure all files are in the same directory
- Check that `index.html`, `styles.css`, and `script.js` are present
- Try refreshing the page (Ctrl+F5 or Cmd+Shift+R)

**Features not working:**
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled in your browser
- Try a different browser if issues persist

**Styling looks wrong:**
- Clear browser cache
- Check that `styles.css` is properly linked
- Verify internet connection (for Google Fonts)

### **Browser Compatibility**
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📱 Mobile Experience

The website is fully optimized for mobile devices:
- **Touch-friendly** buttons and interactions
- **Responsive navigation** that adapts to screen size
- **Optimized layouts** for portrait and landscape orientations
- **Fast loading** with minimal data usage

## 🎨 Design Philosophy

This project demonstrates modern web development best practices:
- **Progressive Enhancement** - works without JavaScript
- **Accessibility** - keyboard navigation and screen reader support
- **Performance** - fast loading and smooth interactions
- **User Experience** - intuitive navigation and clear feedback

## 🤝 Contributing

Feel free to contribute to this project:
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Fonts** for beautiful typography
- **Font Awesome** for icons
- **Modern CSS** techniques and best practices
- **Vanilla JavaScript** community for inspiration

## 📞 Support

If you have any questions or need help:
- **Check** the troubleshooting section above
- **Review** the code comments for implementation details
- **Test** in different browsers and devices

---

**Happy Reading! 📚✨**

*Built with ❤️ using HTML, CSS, and JavaScript*
