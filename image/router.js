const { Router } = require("express");
const Image = require("./model");
const router = new Router();

router.get("/image", (request, response, next) => {
  Image.findAll()
    .then(images => response.send(images))
    .catch(next);
});

router.post("/image", (request, response, next) => {
  Image.create(request.body)
    .then(newImage => response.send(newImage))
    .catch(next);
});

module.exports = router;
