const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  //[GET] /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) =>
        res.render("courses/show", { course: mongooseToObject(course) })
      )
      .catch(next);
  }

  create(req, res) {
    res.render("courses/create");
  }

  //[POST] /course/store
  store(req, res) {
    const formData = req.body;
    formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hqdefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch((err) => {});
  }
  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", { course: mongooseToObject(course) })
      )
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    const data = req.body;
    data.image = `https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`;
    const course = new Course(data);
    Course.updateOne({ _id: req.params.id }, data)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
  //[DELETE] /courses/:id
  destroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
}

module.exports = new CourseController();
