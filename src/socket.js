const { getMenuItems, handleUserMessage, sendOptions } = require('./database.js');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const sessionMiddleware = require('./middleware.js');


function setupSocket(io) {
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res || {}, next);
    });


    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        const session = socket.request.session;
        //Initialize session for the new user
        if (!session.currentOrder) {
            session.currentOrder = [];
        }
        if (!session.orderHistory) {
            session.orderHistory = [];
        }

        // Save session data
        session.save();
        
        // Send initial options to the user
        socket.emit('message', 'Welcome to the Restaurant Chatbot!')
        sendOptions(socket);

        socket.on('message', (message) => {
            try {
                console.log(`Received: ${message}`, socket.id);
                handleUserMessage(socket, message, session); // Pass session data
                
            } catch (error) {
                console.error('Error handling message:', error);
                socket.emit('message', 'Sorry, there was an error processing your message. Please try again.');
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
        });

        // socket.on('error', (error) => {
        //     console.error('Socket error:', error);
        // });
    });
}



module.exports = { setupSocket };
