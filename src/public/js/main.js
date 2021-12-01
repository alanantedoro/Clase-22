console.log({io});
const socket = io.connect();

const renderMessages = (messages) => {
  const htmls = messages.map( message => {
    return(`
      <div class="text-white">
        <strong>${message.author.id}</strong>:  
        <em>${message.text}</em>
        <img class="mx-1 rounded-circle" 
            width="40"
            height="40"
            src="${message.author.avatar}" 
        >
      </div>
    `);
  });

  const html = htmls.join(" ");

  document.getElementById('messages').innerHTML = html;
}

const addMessage = (event) => {
  event.preventDefault(); 

  const mensaje = {
    author: {
        id: document.getElementById('id').value, 
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value, 
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value,
    },
    text: document.getElementById('text').value
  };

  socket.emit('new-message', mensaje);

  document.getElementById('mensaje').value = '';
};

const form = document.getElementById('form');
form.addEventListener('submit', addMessage);

const schemaAuthor = new normalizr.schema.Entity('author', {}, {idAttribute: 'id'});

const schemaMessage = new normalizr.schema.Entity('message', {
  author: schemaAuthor
});

const schemaMessages = new normalizr.schema.Entity('messages', {
  messages: [schemaMessage]
});

socket.on('messages', (data) => {
  const dataDenormalized = normalizr.denormalize(data.result, schemaMessages, data.entities);
  console.log('datadenom: ', dataDenormalized);
  renderMessages(dataDenormalized);
});

const compression = (normalize, denormalize) => {
    const lengthNormalize = JSON.stringify(denormalize).length
    const lengthDenormalize = JSON.stringify(normalize).length
    const compression = (lengthNormalize * 100 / lengthDenormalize).toFixed(0);
    const compressionHTML = document.querySelector('.compression');
    compressionHTML.innerHTML = compression;
}