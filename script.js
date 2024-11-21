let cardContainer = document.getElementById("item_box");

let itemCard = [];
let RESULT;

function handleAddItem(id) {
  let obj = RESULT.find((val) => val.id === id);

  itemCard.push(obj);
  if (itemCard.length >= 3) {
    restaurantProcess();
  }
  console.log(itemCard);
}
console.log(itemCard);
async function getMenu() {
  try {
    const res = await fetch("./data.json");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const result = await res.json();
    if (!result || !result.result || !Array.isArray(result.result)) {
      throw new Error("Invalid data format");
    }
    RESULT = result?.result ?? [];
    const cardsHTML = result.result.map((val, i) => createCardHTML(val));
    cardContainer.innerHTML = cardsHTML.join("");
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
}

function createCardHTML(val) {
  return `
      <div class="card">
        <div class="img_box">
          <img src="${val.imgSrc}" />
        </div>
        <div class="card_detail_box">
          <div class="item_price_detail">
            <p>${val.name}</p>
            <span>$ ${val.price}/-</span>
          </div>
          <button onclick="handleAddItem(${val.id})">+</button>
        </div>
      </div>`;
}

// Function to take order
function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const burgers = itemCard;
      const order = {
        items: burgers[Math.floor(Math.random() * burgers.length)],
        quantity: 3,
      };
      console.log("Order taken:", order);
      resolve(order);
    }, 2500);
  });
}

// Function for order preparation
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderStatus = { order_status: true, paid: false };
      console.log("Order prepared:", orderStatus);
      resolve(orderStatus);
    }, 1500);
  });
}

// Function to pay order
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const paymentStatus = { order_status: true, paid: true };
      console.log("Payment status:", paymentStatus);
      resolve(paymentStatus);
    }, 1000);
  });
}

// Function to thank customer
function thankYou() {
  window.alert("Thank you for eating with us today!");
}

// Main function to handle the process
async function restaurantProcess() {
  try {
    await takeOrder();
    await orderPrep();
    const paymentStatus = await payOrder();
    if (paymentStatus.paid) {
      thankYou();
    }
  } catch (error) {
    console.error("Error in restaurant process:", error);
  }
}
getMenu();
// Run the restaurant process
