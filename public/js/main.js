//const chatform = document.getElementById('')

socket = io()

socket.emit('clientAdd','User connected')

//User connection notification
socket.on('messageForAll',message => {
    console.log(message)
})