const { Op } = require("sequelize");
const { Surat, PenilaianSurat } = require("../models");

class LaporanControllers {
  static async getLaporan(req, res) {
    try {
      const data = await Surat.findAll();

      const hasil = data.map((item) => ({
        id: item.id,
        nomorSurat: item.nomorSurat,
        judulSurat: item.judulSurat,
        tanggalInput: item.tanggalSurat,
        status: item.statusSurat,
      }));

      res.status(200).json({
        success: true,
        message: "Berhasil mengambil laporan",
        total: hasil.length,
        data: hasil,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = LaporanControllers;
