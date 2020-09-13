//Módulos
//Modulo do express instalado
const express = require('express');
//Manipula saida do console
const morgan = require('morgan');

//Importando o controle de rotas
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//Funcao que cria instancia do express
const app = express();

if (process.env.NODE_ENV === 'development') {
  //Habilita o morgan com a opcao dev
  app.use(morgan('dev'));
}

//MIDDLEWARE

//Middleware faz a ponte entre a requisição e a resposta
app.use(express.json());
//Servindo os arquivos da pasta public
app.use(express.static(`${__dirname}/public`));
//Manipulação de Middleware padrão. Sempre definir os tres parametros req,res,next
//next() é necessario para evitar um loop do ciclo de requisição e passar para a próxima
//middleware
app.use((req, res, next) => {
  console.log('Oi estou na middleware..');
  next();
});

app.use((req, res, next) => {
  // req.requestTime = new Date().toUTCString();
  req.requestTime = new Date().toISOString();
  next();
});

//MANIPULAÇÃO DAS ROTAS
app.use('/ap1/v1/users', userRouter);
app.use('/ap1/v1/tours', tourRouter);

module.exports = app;
