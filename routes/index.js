const router = require("express").Router();
const classesRouter = require("./classesRouter");
const registrationRouter = require("./registrationRouter");

router.use(classesRouter);
router.use(registrationRouter);

module.exports = router;
