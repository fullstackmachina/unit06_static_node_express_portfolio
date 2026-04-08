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
app.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  res.render("project", { project });
});

/* GET FUTURE PROJECTS PAGE */
app.get("/future_projects", (req, res) => {
  res.render("future_projects");
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
