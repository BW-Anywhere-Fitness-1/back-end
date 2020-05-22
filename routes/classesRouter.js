const router = require("express").Router();
const ClassesController = require("./../controllers/ClassesController");
const authenticate = require("./../controllers/auth/auth-middleware");
const authAsInstructor = require("./../controllers/auth/auth-instructor");

// required to be logged in as instructor
// create class
router.post(
  "/classes",
  authenticate,
  authAsInstructor,
  ClassesController.create.bind(ClassesController)
);
// update class
router.put(
  "/classes/:id",
  authenticate,
  authAsInstructor,
  ClassesController.update.bind(ClassesController)
);
// delete class
router.delete(
  "/classes/:id",
  authenticate,
  authAsInstructor,
  ClassesController.remove.bind(ClassesController)
);
// not required to be logged in as instructor routes
// retrieve class list
router.get(
  "/classes",
  authenticate,
  ClassesController.index.bind(ClassesController)
);
// get one class by id
router.get(
  "/classes/:id",
  authenticate,
  ClassesController.show.bind(ClassesController)
);
// search by name, start_time, duration, schedule, type, level
router.get(
  "/search/classes",
  authenticate,
  ClassesController.search.bind(ClassesController)
);

module.exports = router;
