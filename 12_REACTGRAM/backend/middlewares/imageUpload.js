const multer = require("multer");
const path = require("path");

// Onde a imgem irá ser salva
const imageStorage = multer.diskStorage({
  // Mudando o destino padrão
  destination: (req, file, cb) => {
    let folder = "";
    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    // configura o destino da imagem
    cb(null, `uploads/${folder}/`);
  },
  // Mudando o nome do arquivo padrão
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg formate
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
