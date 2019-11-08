const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/user", (request, response, next) => {
  const user = {
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 10)
  };

  User.create(user)
    .then(newUser => response.send(newUser))
    .catch(next);
});

module.exports = router;
