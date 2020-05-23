const router = require("express").Router();
const authenticate = require("./../controllers/auth/auth-middleware");
const RegistrationController = require("./../controllers/RegistrationController");

router.get(
  "/registrations",
  authenticate,
  RegistrationController.index.bind(RegistrationController)
);
router.post(
  "/registrations",
  authenticate,
  RegistrationController.create.bind(RegistrationController)
);
router.get(
  "/registrations/:id",
  authenticate,
  RegistrationController.show.bind(RegistrationController)
);
router.delete(
  "/registrations/:id",
  authenticate,
  RegistrationController.remove.bind(RegistrationController)
);
router.get(
  "/search/registrations",
  authenticate,
  RegistrationController.search.bind(RegistrationController)
);

module.exports = router;
