# Discord Clone

Welcome to the Discord Clone, a web application inspired by the popular communication platform, Discord. This project aims to replicate the essential features of Discord, such as real-time messaging, channel-based conversations, and user presence indicators. It's built using modern web technologies including React, Vite, Tailwind CSS for styling, and WebSocket/socket.IO for real-time communication.

## Features

The Discord Clone offers a simplified yet immersive chat experience, enabling users to:

    -Sign in with a unique username.
    -Join and participate in various chat channels.
    -Send and receive messages in real-time.
    -See who's online at any given moment.
    -Seamlessly switch between different chat rooms.

# Technical Overview

## Frontend

The frontend of the application is developed with React, utilizing the fast build tool Vite for an optimized development experience. Tailwind CSS is integrated for styling, providing a sleek and responsive design.

## Real-Time Communication

For real-time communication, the application uses WebSocket with socket.io, ensuring instant message delivery and updates across all connected clients. This allows for a dynamic and interactive user experience similar to the real Discord platform.

## WebSocket server

The core of the real-time functionality lies within the WebSocket server, which is built using socket.io. It handles all the real-time events such as user connections, message broadcasting, and channel management.

### Key Events

- `connect` - emitted to the client when WebSocket connection is established with the server.
- `session` - emitted when session is initialized after connecting to the server.
- `channels` - returns list of channels along with contained messages in each channel.
- `message:channel` - emitted to all clients in the `<channel>` when the user sends a message to that channel. The event is also emitted to the sender.
- `users` - returns list of users (both online and offline).
- `user:join` - emitted to all clients in the `welcome` channel when a new user joins the server.
- `user:disconnect` - emitted to all clients when the user disconnects (WebSocket connection closed).
- `disconnect` - emitted to the client when WebSocket connection is closed.

- `user:leave` - client should emit this event when user explicitly leaves the server.
- `message:channel:send` - client should emit this event when user sends a message to a specific channel.

## Persistence

Currently, all user data, sessions, and messages are stored in memory. This means that upon restarting the WebSocket server, all existing data will be lost.

## Getting Started

To run the Discord Clone locally, follow these steps:

## Prerequisites

Ensure you have Node.js installed on your system to manage dependencies and run the project.

### Running the server

After installing dependencies with `npm install`, use the following command to start the WebSocket server:

```sh
npm run server
```

Alternatively, you can invoke Node.js directly with the given server file:

```sh
node server.cjs
```

React + Vite dev server must be running separately:

```sh
npm run dev
```
This will launch the Discord Clone in your default web browser, ready for you to explore and use.

Enjoy the simplified Discord experience!