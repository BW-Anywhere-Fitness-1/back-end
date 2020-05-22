const router = require("express").Router();
const ClassesController = require("./../controllers/ClassesController");
const authenticate = require("./../controllers/auth/auth-middleware");
const authAsInstructor = require("./../controllers/auth/auth-instructor");

router.get(
  "/classes",
  authenticate,
  ClassesController.index.bind(ClassesController)
);
router.post(
  "/classes",
  authenticate,
  authAsInstructor,
  ClassesController.create.bind(ClassesController)
);
router.get(
  "/classes/:id",
  authenticate,
  ClassesController.show.bind(ClassesController)
);
router.put(
  "/classes/:id",
  authenticate,
  authAsInstructor,
  ClassesController.update.bind(ClassesController)
);
router.delete(
  "/classes/:id",
  authenticate,
  authAsInstructor,
  ClassesController.remove.bind(ClassesController)
);
router.get(
  "/classes/search",
  authenticate,
  ClassesController.search.bind(ClassesController)
);

module.exports = router;
