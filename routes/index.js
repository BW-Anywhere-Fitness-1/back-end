const router = require("express").Router();
const ClassesController = require("./../controllers/ClassesController");

router.get("/classes", ClassesController.index.bind(ClassesController));
