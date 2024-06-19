const { getMenuItems, handleUserMessage, sendOptions } = require('./database.js');

const sessions = {};

function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        // Initialize session for the new user
        if (!sessions[socket.id]) {
            sessions[socket.id] = {
                currentOrder: [],
                orderHistory: []
            };
        }

        // Send initial options to the user
        sendOptions(socket);

        socket.on('message', (message) => {
            console.log(`Received: ${message}`, socket.id);
            handleUserMessage(socket, message, sessions);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
            delete sessions[socket.id];
        });
    });
}



module.exports = { setupSocket };
