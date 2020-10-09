const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const socketIo = require('socket.io');

const io = socketIo.listen(server);

server.listen(3000, () => {console.log('Bora desenhar')})

app.use(express.static(__dirname + '/public'))

const historic = []

io.on('connection', (socket) => {
    console.log('nova conexão')
    historic.forEach(line =>{
        socket.emit('draw', line)
    })
    // Parte do testes
    // socket.on('mensagem', ()=>{
    //     console.log('mensagem recebida')
    //     io.emit('resposta');
    // })

    socket.on('draw', (line) => {
        historic.push(line)
        io.emit('draw', line)
    })
})