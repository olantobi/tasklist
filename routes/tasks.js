var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
//var dbconnUrl = 'mongodb://tobi:adetoberu@ds149855.mlab.com:49855/liferon_tasks';
var dbconnUrl = 'mongodb://tobi:adetoberu@localhost:27017/mytasklist';
var collectionList = ['tasks'];
var db = mongojs(dbconnUrl, collectionList);

// Get all tasks
router.get('/task', function(req, res, next) {
  db.tasks.find(function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  })
});

// Get Single task
router.get('/task/:id', function(req, res, next) {
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  })
});

// Save task
router.post('/task', function(req, res, next) {
  var task = req.body;
  console.log(task);
  if (!task.title || !(task.isDone+'')) {
    res.status(400);
    res.json({
      "error": "Bad data"
    });
  } else {
    db.tasks.save(task, function (err, task) {
      if (err) {
        res.end(err);
      }
      res.json(task);
    });
  }
});

// Delete task
router.delete('/task/:id', function(req, res, next) {
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err) {
    if (err) {
      res.send(err);
    }
    res.status(200);
  })
});

// Update task
router.put('/task/:id', function(req, res, next) {
  var task = req.body;
  var updatedTask = {};

  if (task.isDone) {
    updatedTask.isDone = task.isDone;
  }

  if (task.title) {
    updatedTask.title = task.title;
  }

  if (!updatedTask) {
    res.status(400);
    res.json({
      "error": "Bad data"
    })
  } else {
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updatedTask, {}, function(err, task) {
      if (err) {
        res.send(err);
      }
      res.json(task);
    })
  }
});
module.exports = router;
