//Modulo do express instalado
const express = require("express");

//Funcao que cria instancia do express
const app = express();

//Rotas
app.get('/',(req,res) => {
    res.status(200).json({message: "Hello from the server side!", app: 'Natours'});
})

app.post('/',(req,res) => {
    res.send('You can post to this endpoint...');
})

//Servidor escutando na porta 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})