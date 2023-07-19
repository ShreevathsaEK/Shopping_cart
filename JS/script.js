
const laptop = [
    {
        id: 1,
        name: "Lenovo IdeaPad Slim 3",
        image: "https://m.media-amazon.com/images/I/61Dw5Z8LzJL._SX679_.jpg",
        price: 31999,
        quantity: 0
    },
    {
        id: 2,
        name: "HP 15s-Fq3071TU Intel Celeron",
        image: "https://img3.gadgetsnow.com/gd/images/products/additional/large/G448534_View_1/computer-laptop/laptops/hp-15s-fq3071tu-intel-celeron-n4500-15-6-inches-entertainment-laptop-8gb-512gb-ssd-windows-11-natural-silver-1-69-kg-.jpg",
        price: 32490,
        quantity: 0
    },
    {
        id: 3,
        name: "Samsung Galaxy Book2 Pro",
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/np930xed-kb2in/gallery/in-galaxy-book2-pro-13inch-np930xeda-417479-np930xed-kb2in-thumb-532813280?imwidth=480",
        price: 108999,
        quantity: 0
    },
    {
        id: 4,
        name: "Microsoft Surface Go Intel Core i5",
        image: "https://m.media-amazon.com/images/I/51tUzSUFd+L._SX679_.jpg",
        price: 84999,
        quantity: 0
    },
    {
        id: 5,
        name: "hp envy",
        image: "https://rukminim2.flixcart.com/image/416/416/l2ghgnk0/computer/v/3/7/-original-imagdsjsjszc65fh.jpeg?q=70",
        price: 79500,
        quantity: 0
    },
    {
        id: 6,
        name: "Asus tuf A 15",
        image: "https://m.media-amazon.com/images/I/91zVSkGGZbS._SL1500_.jpg",
        price: 74999,
        quantity: 0
    },
    {
        id: 7,
        name: "Asus vivabook pro 14",
        image: "https://m.media-amazon.com/images/I/41oiOXKJ4NL.jpg",
        price: 49999,
        quantity: 0
    }
];

// Cart data
let cartItems = [];

// Function to store cart items in localStorage
function storeCartItems() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function retrieveCartItems() {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
    } else {
        cartItems = [];
    }
}

function renderProductCards() {
    const productList = document.getElementById("laptop-list");
    if (!productList) return;

    productList.innerHTML = "";

    const alllaptop = [...laptop];

    alllaptop.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-4");
        card.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h4 class="card-title">${product.name}</h4>
            <span class="card-text">&#8377;${product.price}</span>
            <div class="d-grid gap-2">
              <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Add to cart</button>
            </div>
          </div>
        </div>
      `;


        if (product instanceof Object && product.id >= 9 && product.id <= 16) {
            const laptoplist = document.getElementById("laptop-list");
            if (laptoplist) {
                laptoplist.appendChild(card);
            }
        } else {
            productList.appendChild(card);
        }
    });

    const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addToCart);
    }
}

function addToCart(event) {
    const productId = parseInt(event.target.getAttribute("data-product-id"));

    const existingCartItem = cartItems.find(item => item.id === productId);
    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        const product = [...laptop].find(item => item.id === productId);
        cartItems.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    storeCartItems();

    showNotification("Added to cart! , Checkout in your Cart");

    setTimeout(() => {
        resetNotification();
    }, 2000);
}

function removeFromCart(event) {
    const productId = parseInt(event.target.getAttribute("data-product-id"));
    cartItems = cartItems.filter(item => item.id !== productId);
    renderCartItems();
    updateTotalPrice();
    updateCartCount();

    if (cartItems.length > 0) {
        storeCartItems();
    } else {
        clearCart();
    }
}

function clearCart() {
    cartItems = [];
    renderCartItems();
    updateTotalPrice();
    updateCartCount();
    localStorage.removeItem("cartItems");
}

function decreaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute("data-product-id"));
    const cartItem = cartItems.find(item => item.id === productId);

    if (cartItem.quantity > 1) {
        cartItem.quantity--;
        renderCartItems();
        updateTotalPrice();
        storeCartItems();
    }
}

function increaseQuantity(event) {
    const productId = parseInt(event.target.getAttribute("data-product-id"));
    const cartItem = cartItems.find(item => item.id === productId);

    cartItem.quantity++;
    renderCartItems();
    updateTotalPrice();
    storeCartItems();
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("mb-1");
        cartItem.innerHTML = `
    <div class="card">
      <div class="row g-0">
        <div class="col-md-1">
          <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text price">&#8377;${item.price}</p> <!-- Use &#8377; for the rupee symbol -->
            <div class="d-flex align-items-center">
              <button class="btn btn-secondary decrease-quantity-btn" data-product-id="${item.id}">-</button>
              <span class="mx-2">${item.quantity}</span>
              <button class="btn btn-secondary increase-quantity-btn" data-product-id="${item.id}">+</button>
              <button class="btn btn-danger remove-from-cart-btn ms-auto" data-product-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

        cartItemsContainer.appendChild(cartItem);
    });




    const decreaseQuantityButtons = document.getElementsByClassName("decrease-quantity-btn");
    const increaseQuantityButtons = document.getElementsByClassName("increase-quantity-btn");
    const removeFromCartButtons = document.getElementsByClassName("remove-from-cart-btn");

    for (let i = 0; i < decreaseQuantityButtons.length; i++) {
        decreaseQuantityButtons[i].addEventListener("click", decreaseQuantity);
        increaseQuantityButtons[i].addEventListener("click", increaseQuantity);
        removeFromCartButtons[i].addEventListener("click", removeFromCart);
    }

    updateTotalPrice();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;

    cartCount.textContent = cartItems.length;

    const navLink = document.querySelector(".nav-link");
    if (cartItems.length > 0) {
        navLink.classList.add("has-count");
    } else {
        navLink.classList.remove("has-count");
    }

    storeCartItems();
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById("total-price");
    if (!totalPriceElement) return;

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;
}

function checkout() {
    if (cartItems && cartItems.length > 0) {
        alert("Order placed successfully!");
    } else {
        alert("No items in Cart, Update your Cart");
    }
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    if (!notification) return;
    notification.textContent = message;
    notification.style.color = "black";
}

function resetNotification() {
    const notification = document.getElementById("notification");
    if (!notification) return;

    notification.textContent = "";
    notification.style.display = "none";
}

function renderCartItemsOnLoad() {
    retrieveCartItems();
    renderCartItems();
    updateTotalPrice();
    updateCartCount();

    if (cartItems.length === 0) {
        localStorage.removeItem("cartItems");
    }
}


document.addEventListener("DOMContentLoaded", function () {
    renderProductCards();
    renderCartItemsOnLoad();
});
