const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

//Checa o id antes das outras rotas
router.param('id', tourController.checkID);

//Tours
//Busca todos ou grava novo tour
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.postTour);

//Busca objeto pelo id
router
  .route('/:id')
  .get(tourController.getById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

//Necessario para ser importado no arquivo principal
module.exports = router;
