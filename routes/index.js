const router = require("express").Router();
const classesRouter = require("./classesRouter");

router.use(classesRouter);

module.exports = router;
