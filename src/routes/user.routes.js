const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get("/list", userController.list);
router.get("/view", userController.view);
router.post("/add", userController.create);
router.put("/update", userController.update);
router.delete("/delete", userController.delete);

module.exports = router;