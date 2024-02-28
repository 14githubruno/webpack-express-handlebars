import express from "express";
import { engine } from "express-handlebars";
const app = express();

import path from "path";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "dist", "views"));

app.use(express.static(path.join(__dirname, "dist")));

// nav items begins
const navItems = {
  home: "home",
  faqs: "faqs",
  about: "about",
};
// nav items ends

app.get("/", (req, res) => {
  res.render("home", {
    ...navItems,
    title: "Home",
    headingOne: "This is the homepage",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    ...navItems,
    title: "About",
    headingOne: "Here you can read about us",
  });
});

app.get("/faqs", (req, res) => {
  res.render("faqs", {
    ...navItems,
    title: "Frequently Asked Questions",
    headingOne: "We want to answer your questions",
  });
});

const port = process.env.PORT || 1234;
app.listen(port, () => console.log(`Listen on port ${port}`));
