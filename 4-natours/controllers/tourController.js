//Le arquivos
const fs = require('fs');

const userModel = require('./../models/tourModel');

//Lendo o arquivo (tours-simple) e convertendo para JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

//Funcoes para as rotas
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours
    }
  });
};

exports.postTour = (req, res) => {
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
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.getById = (req, res) => {
  console.log(req.params);

  //Transforma string em number.
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

exports.deleteTour = (req, res) => {
  //NO content
  res.status(204).json({
    status: 'success',
    data: null
  });
};

exports.getUserTeste = (req, res) => {
  console.log('Vou mostrar userModel');
  console.log(userModel);

  res.status(200).json({
    status: 'success',
    message: 'Teste'
    // data: {
    //   null;
    //   // userModel
    // }
  });
};
