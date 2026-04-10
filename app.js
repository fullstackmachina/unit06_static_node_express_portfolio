// Import app dependencies, load project data, and configure Express middleware.
const express = require("express");
const { projects } = require("./data.json");
const path = require("path");
const app = express();
app.use("/static", express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

/* ROUTES */
/* GET HOME PAGE */
app.get("/", (req, res) => {
  res.render("index", { projects });
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
  res.render("future_projects");
});

/* GET RELEASES PAGE */
app.get("/releases", (req, res) => {
  res.render("releases");
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
    err.message = "Oops! Something went wrong!";
  }

  console.log(err.status, err.message);
  res.status(err.status);
  res.send(err.message);
});

// Turn on Express server
app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
