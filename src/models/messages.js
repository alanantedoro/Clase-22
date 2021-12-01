const messages = [
    {
    id: 0,
    author: {
        id: 'alanantedoro@gmail', 
        nombre: 'Alan', 
        apellido: 'Antedoro', 
        edad: '26', 
        alias: 'alanantedoro',
        avatar: 'www.mifoto.com'
    },
    text: 'Hola!'
},{
    id: 1,
    author: {
        id: 'pepepepe@gmail', 
        nombre: 'Pepe', 
        apellido: 'Sanchez', 
        edad: '23', 
        alias: 'pepesanchez',
        avatar: 'www.mifoto.com'
    },
    text: 'Como andan?!'
}
  ];
  

// const { normalizeMessages } = require('../utils/normalizar');
// const { MessagesDao } = require('./../daos/index');

  
// const myMessages = new MessagesDao();

// const getMessages = async () => {
//   return normalizeMessages({id: 'messages', messages});
// };
  
// const saveMessage = async (message) => {
//   messages.push(message);
//   return message.id;
// }
  
// module.exports = {
//   getMessages,
//   saveMessage
// };

// //buscar el lugar en donde tengo que hacer el sabe y el readall de los msjs en mongo