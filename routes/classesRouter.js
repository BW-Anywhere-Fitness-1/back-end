const router = require("express").Router();
const ClassesController = require("./../controllers/ClassesController");
const authenticate = require("./../controllers/auth/auth-middleware");
const authAsInstructor = require("./../controllers/auth/auth-instructor");
const ClassesLevelController = require("./../controllers/ClassesLevelController");
const ClassesTypeController = require("./../controllers/ClassesTypeController");
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
// get class types
router.post(
  "/class-types",
  authenticate,
  authAsInstructor,
  ClassesTypeController.create.bind(ClassesTypeController)
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

// get class types
router.get(
  "/class-types",
  authenticate,
  ClassesTypeController.index.bind(ClassesTypeController)
);
// get class levels
router.get(
  "/class-levels",
  authenticate,
  ClassesLevelController.index.bind(ClassesLevelController)
);
module.exports = router;
