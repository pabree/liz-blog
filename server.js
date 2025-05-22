// server.js
import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;

const uri = "your_mongodb_connection_string";
const client = new MongoClient(uri);

await client.connect();
const db = client.db("lizBlog");
const posts = db.collection("posts");

app.use(express.static("public")); // serve your static files

app.get("/api/posts", async (req, res) => {
  const allPosts = await posts.find({}).sort({ date: -1 }).toArray();
  res.json(allPosts);
});

app.get("/api/posts/:slug", async (req, res) => {
  const post = await posts.findOne({ slug: req.params.slug });
  if (post) res.json(post);
  else res.status(404).send("Post not found");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
