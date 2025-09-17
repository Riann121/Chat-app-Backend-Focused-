const chatForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages')
const params = new URLSearchParams(window.location.search)
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')
const username = params.get('username');
const roomname = params.get('room');
socket = io()

socket.emit('clientAdd',{username,roomname})

//User Add messages
socket.on('messageForAll',message => {
    showInChat(message)
    chatMessage.scrollTop = chatMessage.scrollHeight;
})

//get room and users
socket.on('roomUsers',({room, users}) => {
    outputRoom(room)
    outputUsers(users)

})

//User message send to the server
chatForm.addEventListener('submit',(m)=>{
    m.preventDefault();
    
    const msg = m.target.elements.msg.value;
    socket.emit('message',msg);
    
    //Clear the message bar
    m.target.elements.msg.value = '';
    m.target.elements.msg.focus();

})

showInChat = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.userName} <span>${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>
					</div>`
    document.querySelector('.chat-messages').appendChild(div)
}

//Add room to the dom
function outputRoom(room){
    roomName.innerText = room
}

//Add users to the dom 
function outputUsers(users){
    userList.innerHTML = `
        ${users.map(user =>`<li>${user.name}</li>`).join('')}
    `;
}