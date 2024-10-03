const socket = io();

// Handle send message
document.getElementById('sendButton').addEventListener('click', () => {
    sendMessage();
});

document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Send message to server
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;

    if (message.trim() !== '') {
        // Emit the message to the server
        socket.emit('chatMessage', message);
        
        // Append sent message to chat box
        appendMessage(message, 'sent');
        
        // Clear input
        input.value = '';
    }
}

// Append received message to chat box
socket.on('chatMessage', (message) => {
    appendMessage(message, 'received');
});

// Function to append message
function appendMessage(message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;

    messageElement.appendChild(messageContent);
    chatBox.appendChild(messageElement);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}
