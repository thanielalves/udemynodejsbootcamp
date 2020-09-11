//Módulos
//Modulo do express instalado
const express = require("express");
//Le arquivos
const fs = require('fs');

//Funcao que cria instancia do express
const app = express();

//Middleware faz a ponte entre a requisição e a resposta
//app.use(express.json);

//Rotas
/* app.get('/',(req,res) => {
    res.status(200).json({message: "Hello from the server side!", app: 'Natours'});
})

app.post('/',(req,res) => {
    res.send('You can post to this endpoint...');
}) */

//Lendo o arquivo (tours-simple) e convertendo para JSON
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Retornando status ok e dados do arquivo
app.get('/ap1/v1/tours',(req,res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data:{
            tours
        }
    });
})

//
/* app.post ('/ap1/v1/tours',(req,res) => {
    console.log(req.body);
    res.send('Done');
}) */

//Servidor escutando na porta 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})