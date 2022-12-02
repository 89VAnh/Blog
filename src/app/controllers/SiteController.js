const Course = require("../models/Course");

class SiteController {
  //[GET] /
  index(req, res) {
    Course.find({}, function (err, courses) {
      if (!err) {
        res.json(courses);
        console.log(2);
      } else res.status(404).json({ error: "ERROR!!!" });
    });

    // res.render("home");
  }

  //[GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
