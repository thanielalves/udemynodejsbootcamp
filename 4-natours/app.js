//Módulos
//Modulo do express instalado
const express = require('express');
//Le arquivos
const fs = require('fs');
//Manipula saida do console
const morgan = require('morgan');

//Funcao que cria instancia do express
const app = express();

//MIDDLEWARE

app.use(morgan('dev'));

//Middleware faz a ponte entre a requisição e a resposta
app.use(express.json());

//Manipulação de Middleware padrão. Sempre definir os tres parametros req,res,next
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
//Lendo o arquivo (tours-simple) e convertendo para JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Funcoes para as rotas
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

const postTour = (req, res) => {
  //   console.log(req.body);

  //incrementa id
  const newId = tours[tours.length - 1].id + 1;

  //Criando um novo objeto para o novo tour
  const newTour = Object.assign({ id: newId }, req.body);

  //Colocando novoTour na coleção
  tours.push(newTour);

  //Escrevendo de volta no arquivo
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getById = (req, res) => {
  console.log(req.params);

  //Transforma string em number.
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  //if(id > tours.length){
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  //NO content
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Não implementado ainda.',
  });
};
//Users functions
const getNovo = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Não implementado ainda.',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Não implementado ainda.',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Não implementado ainda.',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Não implementado ainda.',
  });
};

//ROTAS
const tourRouter = express.Router();
const userRouter = express.Router();

//Tours
//Busca todos ou grava novo tour
tourRouter.route('/').get(getAllTours).post(postTour);

//Busca objeto pelo id
tourRouter.route('/:id').get(getById).patch(updateTour).delete(deleteTour);

//Users
userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/ap1/v1/users/', userRouter);
app.use('/ap1/v1/tours/', tourRouter);

//SERVER

//Servidor escutando na porta 3000
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
