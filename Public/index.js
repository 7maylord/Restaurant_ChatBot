const socket = io();

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Display a message in the chat box
function displayMessage(message, sender = 'bot') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Send the user's message to the server
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        displayMessage(message, 'user');
        socket.emit('message', message);
        userInput.value = '';
    }
}

// Listen for messages from the server
socket.on('message', (message) => {
    displayMessage(message);
});

// Add event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
