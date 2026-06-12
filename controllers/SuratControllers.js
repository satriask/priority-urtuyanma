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
}

module.exports = SuratController;
