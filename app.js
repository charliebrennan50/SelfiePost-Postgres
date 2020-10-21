var express = require('express');
const pool = require("./db");
const cors = require("cors");
require("dotenv").config();
var app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

var server = app.listen(PORT, function () {
  console.log(`Express app listening at ${PORT}`);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get('/api', async (request, response) => {

  try {
    const getPosts = await pool.query(
      `SELECT * FROM posts;`
    )
    console.log(getPosts.rows);
    response.json(getPosts.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/api', async (request, response) => {
  console.log(request.body);
  let md = request.body.mood;
  let lt = request.body.lat;
  let ln = request.body.long;
  let timestamp = new Date().toLocaleString();
  request.body.timestamp = timestamp;

  try {
    const newPost = await pool.query(
      `INSERT INTO posts(TimeStamp, Mood, Latitude, Longitude) VALUES('${timestamp}','${md}', '${lt}', '${ln}');`
    )
  } catch (error) {
    console.log(error.message);
  }
});