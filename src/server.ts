
// server.js
import 'reflect-metadata';
import { DataSource } from "typeorm"
import express from 'express';
import http from 'http';
import {Server as SocketIOServer} from 'socket.io';
import path from 'path';
import bodyParser from 'body-parser';
import chatRoutes from './routes/chat';
import { errorHandler } from './middleware/errorhandler';
import { startJobProcessor } from './sideprocesses/jobprocessor';
import  friendRoutes  from './routes/friend';
const app = express();


export const AppData = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [path.join(__dirname, './entities/*.ts')],
  synchronize: true,
  logging: true,
});
AppData.initialize().then(() => {
  console.log('Database connected');
}
).catch((error) => {
  console.log('Database connection failed');
  console.log(error);
});

//AppData.isInitialized ? console.log('Database connected') : console.log('Database connection failed');
// Middleware
app.use(bodyParser.json());
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

//Chat Routing EndPoints
app.use('/chat',chatRoutes); 
app.use('/friend',friendRoutes);
const server = http.createServer(app);
export const IonSocket = new SocketIOServer(server);
IonSocket.on('connection', (socket) => {
  IonSocket.emit('connectionMade', 'User connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chatUpdate', (msg) => {
  });
  socket.on('connectionMade',(response)=>console.log(response));
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    IonSocket.emit('message', msg); // Broadcast the message to all clients
  });
});
//startJobProcessor();
app.get('/notify', (req, res) => {
  IonSocket.emit('Notification', 'A new notification has been sent');
  res.send('Welcome to the server!');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});