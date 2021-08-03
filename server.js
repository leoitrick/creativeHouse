const express = require("express");
const server = express();

const db = require("./db");

const ideas = [
  {
    img: "https://image.flaticon.com/icons/png/512/4696/4696759.png",
    title: "Coding class",
    category: "Study",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, natus.",
    url: "http://google.com",
  },
  {
    img: "https://image.flaticon.com/icons/png/512/4696/4696759.png",
    title: "Coding class",
    category: "Study",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, natus.",
    url: "http://google.com",
  },
  {
    img: "https://image.flaticon.com/icons/png/512/4696/4696759.png",
    title: "Coding class",
    category: "Study",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, natus.",
    url: "http://google.com",
  },
  {
    img: "https://image.flaticon.com/icons/png/512/4696/4696759.png",
    title: "Coding class",
    category: "Study",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, natus.",
    url: "http://google.com",
  },
  {
    img: "https://image.flaticon.com/icons/png/512/4696/4696759.png",
    title: "Coding class",
    category: "Study",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, natus.",
    url: "http://google.com",
  },
];

//configuration of statics files (css, scripts, images)
server.use(express.static("public"));

//req.body use permission
server.use(express.urlencoded({ extended: true }));
//Nunjucks configuration
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true,
});

//Create routes
server.get("/", function (req, res) {
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    const reversedIdeas = [...rows].reverse();
    let lastIdeas = [];
    for (idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }

    return res.render("index.html", { ideas: lastIdeas });
  });
});

server.get("/ideas", function (req, res) {
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    const reversedIdeas = [...rows].reverse();
    return res.render("ideas.html", { ideas: reversedIdeas });
  });
});

//insert data into database

server.post("/", function (req, res) {
  const query = `
    INSERT INTO ideas(
      image,
      title,
      category,
      description,
      link
    ) VALUES (?,?,?,?,?)
  `;

  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ];

  db.run(query, values, function (err) {
    if (err) {
      console.log(err);
      return res.send("Database Error");
    }

    return res.redirect("/ideas");
  });
});
// start server on port
server.listen(2001);
