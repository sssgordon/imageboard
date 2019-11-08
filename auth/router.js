const { Router } = require("express");
const { toJWT, toData } = require("./jwt");

const router = new Router();

router.post("/login", (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    response
      .status(400)
      .send({ message: "Please supply a valid email and password" });
  } else {
    response.send({ jwt: toJWT({ userId: 1 }) });
  }
});

module.exports = router;
