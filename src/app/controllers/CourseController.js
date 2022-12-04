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
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hqdefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
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
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new CourseController();
