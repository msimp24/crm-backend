const express = require('express')
const itemController = require('./../controllers/itemController')
const { authenticate, restrictTo } = require('../middleware/auth')
const router = express.Router()

router
  .route('/')
  .post(authenticate, restrictTo, itemController.addNewItem)
  .get(itemController.getAllItems)

router
  .route('/:id')
  .get(itemController.getItemById)
  .patch(authenticate, restrictTo, itemController.updateItem)
  .delete(authenticate, restrictTo, itemController.deleteItem)

module.exports = router
