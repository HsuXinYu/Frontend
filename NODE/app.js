const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const language = [
    { name: "Python", rating: 9.5, popularity: 9.7, trending: "super hot" },
    { name: "Java", rating: 9.4, popularity: 8.5, trending: "hot" },
    { name: "C++", rating: 9.2, popularity: 7.7, trending: "hot" },
    { name: "PHP", rating: 9.0, popularity: 5.7, trending: "decreasing" },
    { name: "JS", rating: 8.5, popularity: 8.7, trending: "hot" },
  ];
  res.render("index", { language });
});

// app.get("/:name", (req, res) => {
//   //   res.render("index.ejs");
//   let { name } = req.params;
//   //js出現object屬性與值的變數名稱相同時可省略變數名稱
//   res.render("index", { name });
// });

app.get("/example", (req, res) => {
  let { name, age } = req.query;
  res.render("response", { name, age });
});

app.listen(3000, () => {
  console.log("伺服器正在port3000");
});
