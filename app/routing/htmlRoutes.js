var path = require("path");
var questions = require("../data/questions");
// console.log(questions)
module.exports = function(app) {
  // Home
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));

    // res.render("home", { });
  });
  // Survey
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));

    // res.render("survey",
    // {
    //   questions: questions
    // });
  });
};