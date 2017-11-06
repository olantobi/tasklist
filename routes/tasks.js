var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var dbconnUrl = 'mongodb://tobi:adetoberu@ds149855.mlab.com:49855/liferon_tasks';
//var dbconnUrl = 'mongodb://tobi:adetoberu@localhost:27017/mytasklist';
var collectionList = ['tasks'];
var db = mongojs(dbconnUrl, collectionList);

router.get('/tasks', function(req, res, next) {
  db.tasks.find(function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  })
});

module.exports = router;
