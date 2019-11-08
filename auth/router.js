const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../user/model");
const bcrypt = require("bcrypt");
const auth = require("./middleware");

const router = new Router();

router.post("/login", (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response
      .status(400)
      .send({ message: "Please supply a valid email and password" });
  } else {
    // 1. find user based on email address
    User.findOne({
      where: {
        email: request.body.email
      }
    })
      .then(entity => {
        if (!entity) {
          response.status(400).send({
            message: "User with that email does not exist"
          });
        }

        // 2. use bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(request.body.password, entity.password)) {
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          response.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          response.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(error => {
        console.error(error);
        response.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});

router.get("/secret-endpoint", auth, (request, response) => {
  response.send({
    message: `Thanks for visiting the secret endpoint ${request.user.email}.`
  });
});

module.exports = router;
