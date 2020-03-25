const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();

socket.on('message', event => addMessage(event.author, event.content));
socket.on('join', name => addMessage('Chat Bot', `<i><b>${name}</b> has joined the conversation!</i>`));
socket.on('leave', name => addMessage('Chat Bot', `<i><b>${name}</b> has left the conversation!</i>`));

let userName = '';

loginForm.addEventListener('submit', function(event){
    login(event);
  });

login = (event) => {
  event.preventDefault()

  if(!userNameInput.value){
    event.preventDefault();
    alert('Enter your name');
  } else{
    userName = userNameInput.value;
    socket.emit('join',  userName )
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  };
};

function addMessage(author, content) {
  const message = document.createElement('li');

  message.classList.add('message');
  message.classList.add('message--received');

  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">${content}</div>
  `;
  messagesList.appendChild(message);
}

function sendMessage(event) {
  event.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('Enter your message');
  } else {
    addMessage(userName, messageContent);
    messageContentInput.value = '';
    socket.emit('message', { author: userName, content: messageContent })
  };
};

addMessageForm.addEventListener('submit', function(event){
  event.preventDefault();

  sendMessage(event);
});