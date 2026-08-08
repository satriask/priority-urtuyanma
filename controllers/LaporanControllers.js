const { Surat, PenilaianSurat } = require("../models");

class LaporanControllers {
  static async getLaporan(req, res) {
    try {
      const data = await Surat.findAll({
        include: [
          {
            model: PenilaianSurat,
            as: "PenilaianSurats",
            attributes: ["C4"],
          },
        ],
      });

      const getPengirim = (c4) => {
        switch (c4) {
          case 1:
            return "Masyarakat / Perorangan";
          case 2:
            return "Satuan Kerja Internal";
          case 3:
            return "Instansi Pemerintah";
          case 4:
            return "Polda Metro Jaya";
          case 5:
            return "Mabes Polri";
          default:
            return "-";
        }
      };

      const hasil = data.map((item) => {
        const c4 = item.PenilaianSurats?.C4;

        return {
          id: item.id,
          nomorSurat: item.nomorSurat,
          judulSurat: item.judulSurat,
          pengirimSurat: getPengirim(c4),
          tanggalInput: item.tanggalSurat,
          status: item.statusSurat,
        };
      });

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
