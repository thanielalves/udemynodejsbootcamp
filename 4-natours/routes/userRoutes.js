const express = require('express');
const userController = require('./../controllers/userController');

//ROTAS
const router = express.Router();

//Users
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//Necessario para ser importado no arquivo principal
module.exports = router;
