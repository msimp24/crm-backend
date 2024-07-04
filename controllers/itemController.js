const Item = require('./../models/Item')

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find(req.query)

    res.status(200).json({
      status: 'success',
      data: items,
    })
  } catch (err) {
    res.status(501).json({
      status: 'error',
      message: err,
    })
  }
}

const getItemById = async (req, res) => {
  const id = req.params.id

  try {
    const item = await Item.findById(id)

    res.status(200).json({
      status: 'success',
      data: item,
    })
  } catch (err) {
    res.status(501).json({
      status: 'error',
      message: err,
    })
  }
}

const addNewItem = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body
  console.log(name)

  try {
    const item = new Item({ name, description, price, category, stock, images })
    await item.save()

    res.status(200).json({
      status: 'success',
      data: item,
    })
  } catch (err) {
    res.status(501).json({
      status: 'error',
      message: err,
    })
  }
}

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!item) {
      res.status(404).json({
        status: 'failed',
        message: 'No item with that ID was found',
      })
    }
    res.status(200).json({
      message: 'success',
      data: item,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)

    if (!item) {
      return res.status(404).json({
        status: 'fail',
        message: err,
      })
    }

    res.status(200).json({
      message: 'success',
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

module.exports = {
  getAllItems,
  getItemById,
  addNewItem,
  updateItem,
  deleteItem,
}
