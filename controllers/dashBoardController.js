const { Surat, PenilaianSurat } = require("../models");

class DashboardController {
  static async getDashboard(req, res, next) {
    try {
      const data = await PenilaianSurat.findAll({
        include: [
          {
            model: Surat,
            as: "Surat",
          },
        ],
      });

      const filteredData = data.filter(
        (item) => item.Surat && item.Surat.statusSurat !== "3",
      );

      const bobot = {
        C1: 0.45,
        C2: 0.17,
        C3: 0.087,
        C4: 0.043,
        C5: 0.25,
      };

      const penyebut = {
        C1: Math.sqrt(data.reduce((sum, item) => sum + item.C1 ** 2, 0)),
        C2: Math.sqrt(data.reduce((sum, item) => sum + item.C2 ** 2, 0)),
        C3: Math.sqrt(data.reduce((sum, item) => sum + item.C3 ** 2, 0)),
        C4: Math.sqrt(data.reduce((sum, item) => sum + item.C4 ** 2, 0)),
        C5: Math.sqrt(data.reduce((sum, item) => sum + item.C5 ** 2, 0)),
      };

      const hasil = data.map((item) => {
        const normalisasi = {
          C1: item.C1 / penyebut.C1,
          C2: item.C2 / penyebut.C2,
          C3: item.C3 / penyebut.C3,
          C4: item.C4 / penyebut.C4,
          C5: item.C5 / penyebut.C5,
        };

        const skor =
          normalisasi.C1 * bobot.C1 +
          normalisasi.C2 * bobot.C2 +
          normalisasi.C3 * bobot.C3 +
          normalisasi.C4 * bobot.C4 +
          normalisasi.C5 * bobot.C5;

        return {
          id: item.id,
          SuratId: item.SuratId,

          nomorSurat: item.Surat.nomorSurat,
          judulSurat: item.Surat.judulSurat,
          tanggalSurat: item.Surat.tanggalSurat,
          statusSurat: item.Surat.statusSurat,

          skor: Number(skor.toFixed(3)),
        };
      });

      // ranking
      hasil.sort((a, b) => b.skor - a.skor);

      hasil.forEach((item, index) => {
        item.ranking = index + 1;
      });

      // summary
      const totalSurat = hasil.length;

      const rataRataSkor =
        hasil.reduce((a, b) => a + b.skor, 0) / (totalSurat || 1);

      const prioritasTinggi = hasil.filter((i) => i.skor >= 0.8).length;

      const belumDitindaklanjuti = hasil.filter(
        (i) => i.statusSurat === "1",
      ).length;

      const topPriority = hasil.slice(0, 15).map((item) => ({
        nomor: item.nomorSurat,
        pengirim: item.judulSurat,
        skor: item.skor,
      }));

      return res.status(200).json({
        message: "Success",
        summary: {
          totalSurat,
          prioritasTinggi,
          rataRataSkor: Number(rataRataSkor.toFixed(2)),
          belumDitindaklanjuti,
        },
        topPriority,
        data: hasil,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DashboardController;
