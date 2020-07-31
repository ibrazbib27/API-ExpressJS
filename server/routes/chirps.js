const express = require("express");
const chirpsRoute = require("../chirpstore");
let router = express.Router();

router.get("/:id?", (req, res) => {
  let id = req.params.id;
  if (id) res.json(chirpsRoute.GetChirp(id));
  else res.send(chirpsRoute.GetChirps());
});

router.post("/", (req, res) => {
  chirpsRoute.CreateChirp(req.body);
  res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  chirpsRoute.DeleteChirp(id);
  res.sendStatus(200);
});
router.put("/:id", (req, res) => {
  let id = req.params.id;
  chirpsRoute.UpdateChirp(id, req.body);
  res.sendStatus(200);
});

module.exports = router;
