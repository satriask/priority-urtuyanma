const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary");
const { Surat, PenilaianSurat } = require("../models");

class SuratController {
  static async createSurat(req, res, next) {
    try {
      const { judulSurat, nomorSurat, tanggalSurat, C1, C2, C3, C4, C5 } =
        req.body;

      let fileUrl = null;

      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "surat",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        fileUrl = result.secure_url;
      }

      const surat = await Surat.create({
        judulSurat,
        nomorSurat,
        tanggalSurat,
        statusSurat: "1",
        fileSurat: fileUrl,
      });

      await PenilaianSurat.create({
        SuratId: surat.id,
        C1,
        C2,
        C3,
        C4,
        C5,
      });

      res.status(201).json({
        message: "Surat berhasil dibuat",
        data: surat,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getSurat(req, res, next) {
    try {
      const data = await PenilaianSurat.findAll({
        include: [
          {
            model: Surat,
            as: "Surat",
          },
        ],
      });

      /*
    BOBOT AHP
    */

      const bobot = {
        C1: 0.45,
        C2: 0.17,
        C3: 0.087,
        C4: 0.043,
        C5: 0.25,
      };

      /*
    LANGKAH 1
    HITUNG PENYEBUT
    */

      const penyebut = {
        C1: Math.sqrt(
          data.reduce((sum, item) => sum + Math.pow(item.C1, 2), 0),
        ),

        C2: Math.sqrt(
          data.reduce((sum, item) => sum + Math.pow(item.C2, 2), 0),
        ),

        C3: Math.sqrt(
          data.reduce((sum, item) => sum + Math.pow(item.C3, 2), 0),
        ),

        C4: Math.sqrt(
          data.reduce((sum, item) => sum + Math.pow(item.C4, 2), 0),
        ),

        C5: Math.sqrt(
          data.reduce((sum, item) => sum + Math.pow(item.C5, 2), 0),
        ),
      };

      /*
    LANGKAH 2
    NORMALISASI + BOBOT
    */

      const hasil = data.map((item) => {
        const normalisasi = {
          C1: item.C1 / penyebut.C1,
          C2: item.C2 / penyebut.C2,
          C3: item.C3 / penyebut.C3,
          C4: item.C4 / penyebut.C4,
          C5: item.C5 / penyebut.C5,
        };

        /*

      LANGKAH 3
      HITUNG Yi
      Semua Benefit

      */

        const Yi =
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
          fileSurat: item.Surat.fileSurat,

          C1: item.C1,
          C2: item.C2,
          C3: item.C3,
          C4: item.C4,
          C5: item.C5,

          normalisasi: {
            C1: Number(normalisasi.C1.toFixed(3)),
            C2: Number(normalisasi.C2.toFixed(3)),
            C3: Number(normalisasi.C3.toFixed(3)),
            C4: Number(normalisasi.C4.toFixed(3)),
            C5: Number(normalisasi.C5.toFixed(3)),
          },

          skor: Number(Yi.toFixed(3)),
        };
      });

      /*
    LANGKAH 4
    RANKING
    */

      hasil.sort((a, b) => b.skor - a.skor);

      hasil.forEach((item, index) => {
        item.ranking = index + 1;
      });

      res.status(200).json({
        message: "Surat berhasil diambil",

        bobotAHP: bobot,

        penyebutNormalisasi: {
          C1: Number(penyebut.C1.toFixed(3)),
          C2: Number(penyebut.C2.toFixed(3)),
          C3: Number(penyebut.C3.toFixed(3)),
          C4: Number(penyebut.C4.toFixed(3)),
          C5: Number(penyebut.C5.toFixed(3)),
        },

        data: hasil,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SuratController;
