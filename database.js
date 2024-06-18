const menuItems = [
    { id: 2, name: 'Burger', price: 6 },
    { id: 3, name: 'Pizza', price: 14 },
    { id: 4, name: 'Fries', price: 3 },
    { id: 5, name: 'Pasta', price: 9 },
    { id: 6, name: 'Hot wings', price: 10 }
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
    socket.emit('message', options);
}

function validateInput(message) {
    const validCommands = ['1', '99', '98', '97', '0'];
    const validMenuItems = menuItems.map(item => item.id.toString());
    return validCommands.includes(message.trim()) || validMenuItems.includes(message.trim());
}

function handleUserMessage(socket, message, sessions) {
    if (!validateInput(message)) {
        socket.emit('message', "Invalid input. Please try again.");
        sendOptions(socket);
        return;
    }

    const session = sessions[socket.id];
    switch (message.trim()) {
        case '1':
            const menu = menuItems.map(item => `${item.id}. ${item.name} - $${item.price}`).join('\n');
            socket.emit('message', `Please select an item by number:\n${menu}`);
            break;
        case '99':
            if (session.currentOrder.length > 0) {
                session.orderHistory.push(...session.currentOrder);
                session.currentOrder = [];
                socket.emit('message', 'Order placed. To place a new order select 1.');
            } else {
                socket.emit('message', 'No order to place. To place a new order select 1.');
            }
            sendOptions(socket);
            break;
        case '98':
            if (session.orderHistory.length > 0) {
                const history = session.orderHistory.map(item => item.name).join(', ');
                socket.emit('message', `Order History: ${history}`);
            } else {
                socket.emit('message', 'No order history.');
            }
            sendOptions(socket);
            break;
        case '97':
            if (session.currentOrder.length > 0) {
                const currentOrder = session.currentOrder.map(item => item.name).join(', ');
                socket.emit('message', `Current Order: ${currentOrder}`);
            } else {
                socket.emit('message', 'No current order.');
            }
            sendOptions(socket);
            break;
        case '0':
            if (session.currentOrder.length > 0) {
                session.currentOrder = [];
                socket.emit('message', 'Order canceled.');
            } else {
                socket.emit('message', 'No order to cancel.');
            }
            sendOptions(socket);
            break;
        default:
            const item = menuItems.find(i => i.id.toString() === message.trim());
            if (item) {
                session.currentOrder.push(item);
                socket.emit('message', `${item.name} added to your order.`);
            } else {
                socket.emit('message', "I'm sorry, I didn't understand that.");
            }
            // sendOptions(socket);
            break;
    }
}

module.exports = { getMenuItems, handleUserMessage, sendOptions };
