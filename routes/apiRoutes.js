var express = require("express");
var router = express.Router();
const workout = require("../public/workout");


module.exports = function(app) {
  // middleware that is specific to this router
  router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
  });
  
  router.get("/api/workout", (req, res) => {
    workout.find()
      .then(dbworkout => {
        res.json(dbworkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  router.post("/api/workout", (req, res) => {
  workout.create({})
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/api/workout/:id", ({ body, params }, res) => {
  workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },

    { new: true, runValidators: true }
  )
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workout/range", (req, res) => {
  workout.find({})
    .then(dbworkout => {
      // console.log(dbworkout)
      res.json(dbworkout);
    })
    .catch(err => {
      res.json(err);
    });
});
};