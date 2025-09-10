import path,{dirname} from 'path'
import {fileURLToPath} from 'url'
import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import colors from 'colors'

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
    socket.on('clientAdd',message => {
        io.emit('messageForAll',`${botName} : ${message}`)
    })
})

server.listen(port, ()=>{
    console.log(`Server is running in port ${port}`.bgGreen)
})