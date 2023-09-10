const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = process.env.PORT || 5000;

//middleware
app.use(cors()); //access different domains to interact with each other
app.use(express.json()); //access to request.body connected to JSON

//ROUTES//

//create tweet
app.post("/tweets", async (req, res) => {
  try {
    console.log(req.body);
    const { name, description } = req.body;
    const newTweet = await pool.query(
      "INSERT INTO tweet (name, description) VALUES($1, $2) RETURNING *",
      [name, description]
    );
    res.json(newTweet.rows[0]); //sends response to requester ex.POSTMAN
  } catch (err) {
    console.error(err.message);
  }
});

//get all tweets
app.get("/tweets", async (req, res) => {
  try {
    const allTweets = await pool.query("SELECT * FROM tweet");
    res.json(allTweets.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get tweet
app.get("/tweets/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const getTweet = await pool.query(
      "SELECT * FROM tweet WHERE tweet_id = $1",
      [id]
    );
    res.json(getTweet.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update tweet
app.put("/tweets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTweet = await pool.query(
      "UPDATE tweet SET description = $1 WHERE tweet_id = $2",
      [description, id]
    );
    res.json("tweet table was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete tweet
app.delete("/tweets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTweet = await pool.query(
      "DELETE FROM tweet WHERE tweet_id = $1",
      [id]
    );
    res.json("tweet was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log("server started on port 5000");
});
