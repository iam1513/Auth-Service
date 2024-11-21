const express = require("express")

const router = express.Router();

const UserController = require("../../controllers/user-controller");
const { AuthRequestValidator } = require("../../middlewares");

router.post('/signup', AuthRequestValidator.validateUserAuth, UserController.create)
router.post('/signin', AuthRequestValidator.validateUserAuth, UserController.signIn)
module.exports = router