import path,{dirname} from 'path'
import {fileURLToPath} from 'url'
import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import colors from 'colors'
import { getRoomUser, User, userAdd, userRemove, getUser} from './utils/user.js'
import { formatMessage } from './utils/message.js'

const app = express()
const port = 3000 | process.env.PORT
const server = http.createServer(app)
const io = new Server(server)
//Bot name
const botName = 'CHIKKY ';

//Directory things
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Static Content
app.use(express.static(path.join(__dirname,'public')))

io.on('connection',socket=>{
    console.log("Socket Connection Established...\n".bgYellow)

    //Greetings
    const greet = formatMessage(botName,`Welcome to the Chat-Cord...`) 
    socket.emit('messageForAll',greet);

    //Client add message
    socket.on('clientAdd',userInfo => {
        const user = User(userInfo.username,socket.id,userInfo.roomname)
        userAdd(user);

        //join in the room
        socket.join(user.room)      
        const message = formatMessage(botName,`${userInfo.username} joined the Chat...`)    
        io.to(user.room).emit('messageForAll',message);
         //Send Users and Room Info
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUser(user.room),

    })

    }) 

    //Cliend message pass
    socket.on('message',(msg)=>{
        const user = getUser(socket.id)
        const message = formatMessage(user.name, msg)
        io.to(user.room).emit('messageForAll',message)
    })
    
    socket.on('disconnect',()=>{
        const user = getUser(socket.id) 
        if(user){    
            const msg =`${user.name} Left the chat`
            const message = formatMessage(botName, msg)
            io.to(user.room).emit('messageForAll',message)
            userRemove(user);
        }
    })
})

server.listen(port, ()=>{
    console.log(`Server is running in port ${port}`.bgGreen)
})