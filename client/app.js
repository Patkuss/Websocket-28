const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

loginForm.addEventListener('submit', event => {
    login(event);
});

const login = event => {
  event.preventDefault();

  if (userNameInput.value === '') {
    alert('Enter your name');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');

  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author}</h3>
      <div class="message__content">${content}</div>
    `;
  messagesList.appendChild(message);
};

const sendMessage = event => {
  event.preventDefault();

  if (messageContentInput.value === '') {
    alert('Enter your message');
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
};

addMessageForm.addEventListener('submit', event => {
  sendMessage(event);
});