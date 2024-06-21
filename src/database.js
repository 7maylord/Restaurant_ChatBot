const menuItems = [
  { id: 2, name: "Burger", price: 6 },
  { id: 3, name: "Pizza", price: 14 },
  { id: 4, name: "Fries", price: 3 },
  { id: 5, name: "Pasta", price: 9 },
  { id: 6, name: "Hot wings", price: 10 },
];

function getMenuItems() {
  return menuItems;
}

function sendOptions(socket) {
  const options = `
Select 1 to Place an order
Select 99 to checkout order
Select 98 to see order history
Select 97 to see current order
Select 0 to cancel order
`;
  socket.emit("message", options);
}

function validateInput(message) {
  const validCommands = ["1", "99", "98", "97", "0"];
  const validMenuItems = menuItems.map((item) => item.id.toString());
  return (
    validCommands.includes(message.trim()) ||
    validMenuItems.includes(message.trim())
  );
}

function handleUserMessage(socket, message, session) {

  //const session = sessions[socket.id]; // Fetch session data for the current user

  if (!validateInput(message)) {
    socket.emit("message", "Invalid input. Please try again.");
    sendOptions(socket);
    return;
  }

  switch (message.trim()) {
    case "1":
      const menu = menuItems
        .map((item) => `${item.id}. ${item.name} - $${item.price}`)
        .join("\n");
      socket.emit("message", `Please select an item by number:\n${menu}`);
      break;
    case "99":
      if (session.currentOrder.length > 0) {
        session.orderHistory.push(...session.currentOrder);
        session.currentOrder = [];
        socket.emit(
          "message",
          "Order placed! Would you like to place a new order? Select 1 to start a new order."
        );
      } else {
        socket.emit(
          "message",
          "No order to place. Select 1 to place an order."
        );
      }
      sendOptions(socket);
      break;
    case "98":
      if (session.orderHistory.length > 0) {
        let totalPrice = 0;
        let history = "";

        session.orderHistory.forEach((item, index) => {
          totalPrice += item.price; // Add item price to total price
          history += `${index + 1}. ${item.name}: $${item.price.toFixed(2)}\n`; // Format item with name and price
        });

        socket.emit(
          "message",
          `Order History:\n ${history}Total Price: $${totalPrice.toFixed(2)}`
        );
      } else {
        socket.emit("message", "No order history.");
      }
      sendOptions(socket);
      break;
    case "97":
      if (session.currentOrder.length > 0) {
        let totalPrice = 0; //Initializes a variable totalPrice to accumulate the total price of all items in the current order
        let currentOrder = "";
        // Iterates over each item in currentOrder and performs actions within the callback function for each item.
        session.currentOrder.forEach((item, index) => {
          totalPrice += item.price; // Adds each item's price to totalPrice as we iterate through currentOrder
          currentOrder += `${index + 1}. ${item.name}: $${item.price.toFixed(
            2
          )}\n`; // Format item with name and price
        });

        socket.emit(
          "message",
          `Current Order:\n${currentOrder}Total Price: $${totalPrice.toFixed(
            2
          )}`
        );
      } else {
        socket.emit("message", "No current order.");
      }
      sendOptions(socket);
      break;
    case "0":
      if (session.currentOrder.length > 0) {
        session.currentOrder = [];
        socket.emit("message", "Order canceled.");
      } else {
        socket.emit("message", "No order to cancel.");
      }
      sendOptions(socket);
      break;
    default:
      const item = menuItems.find((i) => i.id.toString() === message.trim());
      if (item) {
        session.currentOrder.push(item);
        socket.emit("message", `${item.name} added to your order.`);
      } else {
        socket.emit("message", "I'm sorry, I didn't understand that.");
      }
      break;
  }
  // Save the session after any change
  session.save();
}

module.exports = { getMenuItems, handleUserMessage, sendOptions };
