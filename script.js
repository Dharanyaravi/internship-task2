// Variables to store current price and alert value
let currentPrice = 0;
let alertPrice = null;
let previousPrice = 0;

// Get references to DOM elements
const currentPriceElement = document.getElementById("currentPrice");
const alertPriceInput = document.getElementById("alertPrice");
const alertMessage = document.getElementById("alertMessage");
const trendElement = document.getElementById("trend");
const setAlertButton = document.getElementById("setAlertButton");

// Function to generate a random price between 50 and 200
function generateRandomPrice() {
    previousPrice = currentPrice; // Store previous price for comparison
    currentPrice = (Math.random() * 150 + 50).toFixed(2);
    currentPriceElement.innerText = `$${currentPrice}`;
    analyzePriceTrend();
    checkPriceAlert();
}

// Function to set the alert price
function setPriceAlert() {
    alertPrice = parseFloat(alertPriceInput.value);
    if (!isNaN(alertPrice) && alertPrice > 0) {
        alertMessage.style.visibility = "hidden";
        alert(`Price alert set for $${alertPrice}`);
    } else {
        alert("Please enter a valid positive number for the alert price.");
    }
}

// Analyze price trend (increasing, decreasing, stable)
function analyzePriceTrend() {
    if (currentPrice > previousPrice) {
        trendElement.innerText = "Increasing";
        trendElement.className = "up";
    } else if (currentPrice < previousPrice) {
        trendElement.innerText = "Decreasing";
        trendElement.className = "down";
    } else {
        trendElement.innerText = "Stable";
        trendElement.className = "stable";
    }
}

// Check if the current price meets or exceeds the alert
function checkPriceAlert() {
    if (alertPrice !== null && currentPrice >= alertPrice) {
        alertMessage.innerText = `🔔 Alert! Price has reached $${currentPrice}`;
        alertMessage.style.visibility = "visible";
    }
}

// Event listener for the "Set Alert" button
setAlertButton.addEventListener("click", setPriceAlert);

// Automatically generate random prices every 2 seconds
setInterval(generateRandomPrice, 2000);
