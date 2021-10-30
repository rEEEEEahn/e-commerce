const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../models')

// The `/api/tags` endpoint

router.get('/tags', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
    }
  })
    // be sure to include its associated Products
    .then(tags => res.json(tags))
    .catch(err => console.log(err))
})

router.get('/tags/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
    }
  })
    .then(tag => res.json(tag))
    .catch(err => console.log(err))
})

router.post('/tags', (req, res) => {
  // create a new tag
  Tag.create({ tag_name: req.body.tag_name })
    .then(tag => res.json(tag))
      .catch(err => console.log(err))
})

router.put('/tags/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({ tag_name: req.body.tag_name },
    {
      where: { id: req.params.id }
    })
    .then(tag => {
      if (!tag) {
        res.status(404).json({ message: 'No Tag with that ID' })
        return
      }
      res.json(tag)
    })
    .catch(err => console.log(err))
})

router.delete('/tags/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
    .then(tag => {
      if (!tag) {
        res.status(404).json({ message: 'No Tag with that ID' })
        return
      }
      res.json(tag)
    })
    .catch(err => console.log(err))
})

module.exports = router
