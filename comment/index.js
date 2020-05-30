const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
app.use(express.json());
const commentByPostId = {};
app.get("/posts/:id/comment", (req, res) => {
  res.send(commentByPostId[req.params.id] || []);
});

app.post("/posts/:id/comment", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentByPostId[req.params.id] || [];
  comments.push({ id, content });
  commentByPostId[req.params.id] = comments;
  res.status(201).json(comments);
});
app.listen(4001, () => console.log("comment server"));
