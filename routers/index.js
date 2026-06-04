const express = require("express");

const Authentication = require("../middleware/authentication");
const { route } = require("../app");
const AuthController = require("../controllers/authControllers");
const DashboardController = require("../controllers/dashBoardController");
const router = express.Router();

router.post("/Auth", AuthController.login);

router.use(Authentication);

router.get("/Dashboard", DashboardController.getDashboard);

module.exports = router;
