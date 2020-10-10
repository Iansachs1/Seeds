const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  function isIdUnique(reason) {
    return db.Reason.count({ where: { reason: reason } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
      });
  }


  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function (req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/post", function (req, res) {
    db.Post.create({
      day_quality: req.body.day_quality,
      gratitude: req.body.gratitude,
      user_id: req.body.user_id,
      reason: req.body.reason
    })
      .then(function () {
        res.status(200).end();
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/reason", function (req, res) {
    isIdUnique(req.body.reason).then(isUnique => {
      if (isUnique) {
        db.Reason.create({
          reason: req.body.reason,
          user_id: req.body.user_id
        })
          .then(function () {
            res.status(200).end();
          })
          .catch(function (err) {
            res.status(401).json(err);
          });
      }
    });

  });

  app.get("/api/reasons", function (req, res) {
    db.Reason.findAll()
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/api/posts", function (req, res) {
    db.Post.findAll()
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });



  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};