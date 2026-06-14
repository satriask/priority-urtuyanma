const express = require("express");

const Authentication = require("../middleware/authentication");
const { route } = require("../app");
const AuthController = require("../controllers/authControllers");
const DashboardController = require("../controllers/dashBoardController");
const router = express.Router();
const upload = require("../utils/multer");
const SuratController = require("../controllers/SuratControllers");

router.post("/Auth", AuthController.login);

router.use(Authentication);

router.get("/Dashboard", DashboardController.getDashboard);

router.post(
  "/create-surat",
  upload.single("surat"),
  SuratController.createSurat,
);

router.get("/get-surat", SuratController.getSurat);
router.delete("/delete-surat/:id", SuratController.deleteSurat);
router.put(
  "/edit-surat/:id",
  upload.single("fileSurat"),
  SuratController.editSurat,
);

router.put("/edit-status-surat/:id", SuratController.updateStatusSurat);

module.exports = router;
