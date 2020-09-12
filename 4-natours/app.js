//Módulos
//Modulo do express instalado
const express = require('express');
//Le arquivos
const fs = require('fs');

//Funcao que cria instancia do express
const app = express();

//Middleware faz a ponte entre a requisição e a resposta
app.use(express.json());

//Rotas

//Lendo o arquivo (tours-simple) e convertendo para JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Funcoes para as rotas
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
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

//Busca todos ou grava novo tour
app.route('/ap1/v1/tours').get(getAllTours).post(postTour);

//Busca objeto pelo id
app.route('/ap1/v1/tours/:id').get(getById);

//Update Fake
app.route('/ap1/v1/tours/:id').patch(updateTour);

//Delete Fake
app.route('/ap1/v1/tours/:id').delete(deleteTour);

//Servidor escutando na porta 3000
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
