// IMPORT DEPENDENCIES & CONFIGURE EXPRESS
const express = require("express");
const path = require("path");
const app = express();
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.set("view engine", "pug");
const { projects } = require("./data.json");
const { releases } = require("./releases.json");

/* ROUTES */
/* GET HOME PAGE */
app.get("/", (req, res) => {
  const completed = projects.filter((project) => project.type === "completed");
  res.render("index", { projects: completed });
});

/* GET ABOUT PAGE */
app.get("/about", (req, res) => {
  res.render("about");
});

/* GET PROJECTS PAGE */
app.get("/projects/:id", (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  if (project) {
    res.render("project", { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "Project not found.";
    next(err);
  }
});

/* GET FUTURE PROJECTS PAGE */
app.get("/future_projects", (req, res) => {
  const future_projects = projects.filter(
    (project) => project.type === "future",
  );
  res.render("future_projects", { projects: future_projects });
});

/* GET RELEASES PAGE */
app.get("/releases", (req, res) => {
  res.render("releases", { releases });
});

/* ERRORS */
app.use(function handleNotFound(req, res, next) {
  const err = new Error();
  err.status = 404;
  err.message = "Page not found";
  console.log(err.message, err.status);
  next(err);
});

app.use(function handleGlobalError(err, req, res, next) {
  if (!err.status) {
    err.status = 500;
  }
  if (!err.message) {
    err.message = "Oops... Something went wrong!";
  }

  console.log(err.status, err.message);
  res.status(err.status);
  if (err.status === 404) {
    res.render("page-not-found", { error: err });
  } else {
    res.render("error", { error: err });
  }
});

// TURN ON EXPRESS SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The application is running on localhost:${port}!`);
});
