const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "79c7b206577f425092773bc9d6f6d97c",
});

const hanldeApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("Unable to update entries"));
};

module.exports = {
  handleImage: handleImage,
  hanldeApiCall: hanldeApiCall,
};
