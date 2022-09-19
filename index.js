const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
const cors = require("cors");
const app = express();

const blogModel = require("./models/Blog");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://newuser:newuser1@crud.4xk1ijq.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const articleTitle = req.body.articleTitle;
  const articleDescription = req.body.articleDescription;
  const article = req.body.article;

  const blog = new blogModel({
    title: articleTitle,
    description: articleDescription,
    article: article,
  });

  try {
    await blog.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  blogModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const newArticleTitle = req.body.newArticleTitle;
  const newArticleDescription = req.body.newArticleDescription;
  const newArticleContent = req.body.newArticleContent;
  const id = req.body.id;

  try {
    await blogModel.findById(id, (err, updatedValue) => {
      updatedValue.title = newArticleTitle;
      updatedValue.description = newArticleDescription;
      updatedValue.description = newArticleContent;
      updatedValue.save();
      res.send("updated");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await blogModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(4001, () => {
  console.log("Server running on port 4001!");
});
