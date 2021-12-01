const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')
const express = require('express');
const faker = require('faker');

const app = express();
const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

const { normalizeMessages } = require('./utils/normalizar');
const { MessagesDao } = require('./daos/index');

const myMessages = new MessagesDao();

io.on('connection', async (socket) => {
  console.log(`Nuevo cliente conectado! ${socket.id}`)
  
  const messages = await myMessages.getAll();
  console.log('messages: ', messages);
  const messagesNormalized = normalizeMessages(messages);

  socket.emit('messages', messagesNormalized);

  socket.on('new-message', async (message) => {
    console.log('new-message', message);
    await myMessages.create(message)

    const messages = await myMessages.getAll();

    const messagesNormalized = normalizeMessages(messages);

    io.sockets.emit('messages', messagesNormalized);
  })
})


app.use(express.static('public'));
app.use( express.json() );
app.use( express.urlencoded( { extended: true }) );
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.get('/api/productos-test', (req, res) => {
  const products = [... new Array(5)].map((_, index) => ({
    id: index,
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(),
  }));
  res.json(products);
});


httpServer.listen(8080, () => 
  console.log(`Servidor abierto en http://localhost:${8080}/`)
);


// armar front con ejs y crear un par de msjs en mongo para que se muestren