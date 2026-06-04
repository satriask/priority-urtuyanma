class DashboardController {
  static async getDashboard(req, res, next) {
    try {
      res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DashboardController;
