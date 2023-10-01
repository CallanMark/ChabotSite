let serverPort;

if (window.location.pathname === '/index.html') {
    serverPort = 3000;
} else if (window.location.pathname === '/pages/os.html') {
    serverPort = 3001;
}else if (window.location.pathname === '/pages/bio.html') {
    serverPort = 3002;
}

console.log(`Using server on port: ${serverPort}`);


let messages = []
const chatLog = document.getElementById('chat-log');
const message = document.getElementById('message');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = message.value;
    const newMessage = {"role": "user", "content": `${messageText}`}
    messages.push(newMessage)
    message.value = '';
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('message--sent');
    messageElement.innerHTML = `
        <div class="message__text">${messageText}</div>
    `;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
   
    fetch(`http://localhost:${serverPort}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages
        })
    })
    . then(res => res.json())
    .then(data => {
        const newAssistantMessage = {"role": "assistant", "content": data.completion.content};
        messages.push(newAssistantMessage);
        appendMessage(newAssistantMessage);
    })
});

function appendMessage(messageObj) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (messageObj.role === 'user') {
        messageElement.classList.add('message--sent');
    } else {
        messageElement.classList.add('message--received');
    }
    messageElement.innerHTML = `
        <div class="message__text">${messageObj.content}</div>
    `;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
    }


console.log(messages);