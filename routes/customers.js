var express = require('express');
var router = express.Router();
const MongoHelper = require('../db/mongo_helper.js');

/* GET users listing. */
router.get('/', function(req, res) {
  MongoHelper.get('customers').then(results => {
    res.status(200).json(results)
  })
});

router.get('/:id', function(req, res) {
  MongoHelper.getById('customers', req.params.id).then(results => {
    res.status(200).json(results)
  })
});

/* Create a new post */
router.post('/', function(req,res) {
  MongoHelper.create('customers', req.body).then(results => {
    res.status(201).json('new post created')
  })
});

router.delete('/:id', function(req, res) {
  MongoHelper.delete('customers', req.params.id).then(results => {
    res.status(201).json(`${req.params.id} deleted`)
  })
})

router.put('/:id', function(req, res) {
  MongoHelper.update('customers', req.params.id, req.body).then(results => {
    res.status(201).json(`${req.params.id} updated`)
  })
})

router.put('/accounts/:id', function(req, res) {
  MongoHelper.updateAccount('customers', req.params.id, req.body).then(results => {
    res.status(201).json(`${req.params.id} updated`)
  })
})

module.exports = router;
