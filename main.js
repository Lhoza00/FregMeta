const pcSpecs = {
  "Defender X PC": {
    "CPU": "AMD Ryzen 5 5600",
    "GPU": "Radeon 5600GT (or integrated)",
    "RAM": "16 GB DDR4",
    "Storage": "Likely 512 GB SSD",
    "Purpose": "Entry-level gaming"
  },
  "Custom S PC": {
    "CPU": "AMD Ryzen 5 5500",
    "GPU": "Budget GPU (e.g. GTX 1650 or integrated)",
    "RAM": "8–16 GB DDR4",
    "Storage": "500 GB – 1 TB SSD",
    "Purpose": "Budget-friendly gaming or general use"
  },
  "Cyber PC Built": {
    "CPU": "AMD Ryzen 7 5700X",
    "GPU": "NVIDIA RTX 4060",
    "RAM": "16 GB DDR4 (RGB)",
    "Storage": "1 TB NVMe SSD",
    "Purpose": "Mid-high end gaming and streaming"
  },
  "Lenovo Legion PC": {
    "CPU": "Intel Core i9-14900KF",
    "GPU": "NVIDIA RTX 4080 SUPER",
    "RAM": "32 GB DDR5",
    "Storage": "2 TB SSD + 2 TB HDD",
    "Purpose": "4K gaming and content creation"
  },
  "Mini Cafe PC": {
    "CPU": "Intel Core i5-12400F",
    "GPU": "Intel Arc B580",
    "RAM": "32 GB DDR4",
    "Storage": "Likely 1 TB SSD",
    "Purpose": "Office, café, or school PC"
  }
}

const gameCard = document.querySelectorAll('form.gameCard');
const gameName = document.querySelectorAll('.gameName');
const gamePrice = document.querySelectorAll('.gamePrice'); 
const pcCard = document.querySelectorAll('form.pcCard');

let cart = loadCart();
gameCard.forEach(gameCard => {
    gameCard.addEventListener('submit', function(e) {
        e.preventDefault();
        addToCart(
            gameCard.querySelector('.gameName').value,
            gameCard.querySelector('.gamePrice').value
        );
        let btn = gameCard.querySelector('.btnAddToCart'); 
        let originalText = btn.innerText;

        btn.innerText = "Added";

        setTimeout(() => {
            btn.innerText = originalText;
        }, 1000);
            });
});

pcCard.forEach(pcCard => {
    pcCard.addEventListener('submit', function(e) {
        e.preventDefault();
        const pcName = pcCard.querySelector('.pcName').value;
        const pcPrice = pcCard.querySelector('.pcPrice').value;
        openDialog(pcName, pcPrice);
            });
});
function closeDialog() {
    const dialog = document.getElementById('productDialog');
    dialog.close();
}

function openDialog(pcName, pcPrice) {
    const dialog = document.getElementById('productDialog');
    const dialogCard = document.querySelector('#productDialog form');
    const Name = document.querySelector('.dialogHeader h2');
    const Price = document.querySelector('.dialogPrice');
    const specList = document.querySelector('.specs ul');

    // Set name and price
    Name.innerText = pcName;

    // Clear old specs
    specList.innerHTML = "";

    // Add specs if pcName matches
    if (pcSpecs.hasOwnProperty(pcName)) {
        const specs = pcSpecs[pcName];
        for (const [key, value] of Object.entries(specs)) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            specList.appendChild(li);
            
        }
    } else {
        const li = document.createElement('li');
        li.textContent = "Specs not found.";
        specList.appendChild(li);
    }
    
    
    // Show dialog
    dialog.showModal();

    // Add submit handler (once only)
    dialogCard.onsubmit = function(e) {
        addToCart(pcName, pcPrice);
    };
}
function addToCart(productName, productPrice) {
    // Try to find the product in the cart
    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        // If found, increase quantity
        existingItem.quant += 1;
    } else {
        // If not found, add new item
        cart.push({
            id: cart.length + 1,
            name: productName,
            price: productPrice,
            quant: 1
        });
    }

    saveCart();
}

//alert(JSON.stringify(cart));
function saveCart() {
    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
}
function loadCart() {
    const cartJson = localStorage.getItem('cart') || '[]';
    const cart = JSON.parse(cartJson);
    return cart;
}
//this functions are for the cart page
function submitCart() {
    const form = document.getElementById('cart-layout');

    if (!form.checkValidity()) {
        form.reportValidity(); // Shows validation messages
        return; // Stop if the form is invalid
    }

    cart = [];
    localStorage.removeItem('cart');
    window.location.href = 'success.html';
    return true
}
function removeItem(itemId) {
    let existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        if (existingItem.quant > 1) {
            // Decrease quantity if more than 1
            existingItem.quant -= 1;
        } else {
            // Remove item from cart if quantity is 1
            cart = cart.filter(item => item.id !== itemId);
        }
    }

    saveCart();
    updateCartList();
}
function addItem(itemId){
    let existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        existingItem.quant += 1;
    }
    saveCart();
    updateCartList();
}
if (cart.length > 0) {
   var btnCheckout = document.getElementById('checkOut');
   btnCheckout.style = "display: flex;"
}

function updateCartList() {
    const container = document.querySelector('.itemsContainer');
    container.innerHTML = ''; // Clear existing content
    const load = loadCart();
    
    let total = 0;
    container.innerHTML += `
        <div class="cartDetails">
            <h3>Total Items: <i>${cart.length}</i></h3>
            <h3 id="totalPrice"></h3>
        </div>
    `;
    load.map(item => {
        total += Number(item.price) * item.quant;

        const itemHTML = `
            <hr>
            <div id="itemCart">
                
                <h3 class="NameCart">${item.name}</h3>
                <div id="btnCrement">
                    <button onclick="removeItem(${item.id})">Remove</button>
                    <input type="number" class="QuantCart" value="${item.quant}" min="1" max="20">
                    <button onclick="addItem(${item.id})">Add</button>
                </div>
                <h3 class="gamePrice">R${item.price}</h3>
            </div>
        `;
        container.innerHTML += itemHTML;
    });
   
    // Append total
    document.getElementById('totalPrice').innerText = 'Total: R' + total + '.00';
}

document.addEventListener('DOMContentLoaded', updateCartList);


/* */
function formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 3) {
            let month = parseInt(value.substring(0, 2), 10);
            let year = value.slice(2, 4);
            if (month < 1 || month > 12) {
                value = value[0];
            } else {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
        }
        input.value = value;
        
    }
    
    function formatCardNumber(input) {
        // Remove all non-digit characters
        let value = input.value.replace(/\D/g, '');
        
        // Add a space every 4 digits
        value = value.match(/.{1,4}/g);
        if (value) {
            input.value = value.join(' ');
        } else {
            input.value = '';
        }
    }
    
//localStorage.removeItem('cart');
