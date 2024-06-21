# Restaurant ChatBot Documentation

This is a restaurant chatbot built with `Node.js`, `Express`, `socket.io`, and `express-session`. It allows users to interact with a restaurant's menu, place orders, view current and past orders, and cancel orders. The chatbot uses sessions to persist user data.The main idea is that we want customers to send options and the backend would have a chat app that would respond to the options

## Table of Contents

- [Requirements](#Requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Key Files](#key-files)
- [Dependencies](#dependencies)
- [License](#license)

## Requirements

- ChatBot interface would be like a chat interface.

- No need for authentication but we should be able to store user session based on devices.

- When a customer lands on the chatbot page, the bot should send these options to the customer:
    - Select 1 to Place an order
    - Select 99 to checkout order
    - Select 98 to see order history
    - Select 97 to see current order
    - Select 0 to cancel order

- When a customer selects “1”, the bot should return a list of items from the restaurant. It is up to you to create the items in your restaurant for the customer. The order items can have multiple options but the customer should be able to select the preferred items from the list using this same number select system and place an order.

- When a customer selects “99” out an order, the bot should respond with “order placed” and if none the bot should respond with “No order to place”. Customer should also see an option to place a new order.

- When a customer selects “98”, the bot should be able to return all placed order.

- When a customer selects “97”, the bot should be able to return current order.

- When a customer selects “0”, the bot should cancel the order if there is.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/7maylord/Restaurant_ChatBot.git
   cd restaurant-chatbot

2. Install dependencies:
    ```bash
    npm install

3. Create a .env file in the root directory and add your configuration variables:
    ```plaintext
    PORT=4000
    SESSION_SECRET=your_session_secret
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Usage
Open your browser and navigate to http://localhost:4000.
Open the console in your browser's developer tools to interact with the chatbot.
Follow the prompts to place an order, view your order history, and more.

## API

### Socket Events
- connection: Triggered when a new client connects.
- message: Triggered when a client sends a message.
- disconnect: Triggered when a client disconnects.

### Chatbot Commands
- 1: Place an order.
- 99: Checkout order.
- 98: See order history.
- 97: See current order.
- 0: Cancel order.


## Key Files
- public/index.html: The HTML file served to the client.
- public/index.css: CSS file for styling the elements in the index.html.
- public/index.js: JavaScript file for client-side functionality.
- src/middleware.js: Middleware for session handling.
- src/database.js: Functions for handling user messages and managing orders.
- src/socket.js: Socket.io setup and event handling.
- src/server.js: Main server file to set up Express and Socket.io.

## Dependencies
- express: Fast, unopinionated, minimalist web framework for Node.js.
- socket.io: Enables real-time bidirectional event-based communication.
- express-session: Simple session middleware for Express.
- memorystore: Memory store for Express session.


This `README.md` file provides a comprehensive guide to setting up and running the restaurant chatbot, including code snippets, installation instructions, and usage information. Adjust the details and add any specific notes as needed for your project.
