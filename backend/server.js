const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data/data');
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();

connectDB();
const app = express();

app.use(express.json()); //to accept json data

app.get('/', (req, res) => {
    res.send('API is running Successfully');
})

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);
// app.get('/api/chat', (req, res) => {
//     res.send(chats);
// }) ;

// app.get('/api/chat/:id', (req, res) => {
//     // console.log(req.params.id);
//     const singleChat = chats.find(c => c._id === req.params.id);
//     res.send(singleChat);
// })

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server started on port ${PORT}`.yellow.bold));


// const io = require('socket.io')(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: "https://localhost:3000",
//         Credentials: true
//     },
// });
const socketIo = require('socket.io');
const io = socketIo(server);


io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on("setup", (userData) => {
        try {
            socket.join(userData._id);
            console.log("User setup complete:", userData._id);
            socket.emit("connected");
        } catch (error) {
            console.log("Error in setup", error);
        }
    });

    socket.on("join chat", (room) => {
        try {
            socket.join(room);
            console.log("User Joined Room: " + room);
        } catch (error) {
            console.log("Error in joining chat:", error);
        }
    });

    socket.on('typing', (room)=> socket.in(room).emit('typing'));
    socket.on('stop typing', (room)=> socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageRecieved) => {
        try {
            const chat = newMessageRecieved.chat;

            if (!chat.users){
                console.log("chat.users not defined");
                return;
            } 

            chat.users.forEach(user => {
                // if (user._id == newMessageRecieved.sender._id) return;
                // socket.in(user._id).emit('message recieved', newMessageRecieved);
                if(user._id !== newMessageRecieved.sender._id){
                    io.to(user._id).emit('message recieved', newMessageRecieved);
                }
            });
        } catch (error){
            console.error("Error in handling new message:", error);
        }

    });

    socket.off('setup', ()=> {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
    // socket.emit('setup user data', userData);
});