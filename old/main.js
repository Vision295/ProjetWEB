// Initialize counter, routers, and router price from localStorage or set default values
let counter = localStorage.getItem('counter') ? parseInt(localStorage.getItem('counter')) : 0;
let routers = localStorage.getItem('routers') ? parseInt(localStorage.getItem('routers')) : 0;
let routerPrice = localStorage.getItem('routerPrice') ? parseInt(localStorage.getItem('routerPrice')) : 10;

// Get references to DOM elements
const counterDisplay = document.getElementById('counter');
const antenne = document.getElementById('antenne');
const routerButton = document.getElementById('buy-router');
const routerCountDisplay = document.getElementById('router-count');
const routerPriceDisplay = document.getElementById('router-price');
const productionDisplay = document.getElementById('production');

// Update the displayed values
counterDisplay.textContent = counter;
routerCountDisplay.textContent = routers;
routerPriceDisplay.textContent = routerPrice;
productionDisplay.textContent = routers;

// Increment counter when the antenna is clicked
antenne.addEventListener('click', () => {
    counter++;
    counterDisplay.textContent = counter;
    localStorage.setItem('counter', counter);
});

// Handle router purchase
routerButton.addEventListener('click', () => {
    if (counter >= routerPrice) {
        counter -= routerPrice;
        routers++;
        routerPrice *= 2;
        counterDisplay.textContent = counter;
        routerCountDisplay.textContent = routers;
        routerPriceDisplay.textContent = routerPrice;
        productionDisplay.textContent = routers;
        localStorage.setItem('counter', counter);
        localStorage.setItem('routers', routers);
        localStorage.setItem('routerPrice', routerPrice);
    }
});

// Increment counter based on the number of routers every second
setInterval(() => {
    counter += routers;
    counterDisplay.textContent = counter;
    localStorage.setItem('counter', counter);
}, 1000);