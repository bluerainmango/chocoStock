const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db = {
  whiteChoco: 10,
  milkChoco: 10,
  darkChoco: 10,
  strawberryChoco: 10,
  caramelChoco: 10
};

// API
app
  .route("/api/v1/choco")
  .get(getChocoHandler)
  .post(postChocoHandler);

//Rendered pages
app.get("/", (req, res) => {
  res.send(path.join(__dirname, "public", "index.html"));
});

app.get("/stock", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stock.html"));
});

function getChocoHandler(req, res) {
  res.status(200).json({
    status: "success",
    chocos: db
  });
}
function postChocoHandler(req, res) {
  const { item, qty } = req.body;
  db[item] = qty;

  res.status(200).json({
    status: "success",
    data: db
  });
}

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log("Listening...");
});
