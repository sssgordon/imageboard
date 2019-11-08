const { Router } = require("express");
const Image = require("./model");
const router = new Router();
const auth = require("../auth/middleware");

router.get("/image", (request, response, next) => {
  Image.findAll()
    .then(images => response.send(images))
    .catch(next);
});

router.post("/image", auth, (request, response, next) => {
  Image.create(request.body)
    .then(newImage => response.send(newImage))
    .catch(next);
});

module.exports = router;
