const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // separar o token com split (Bearer ueyhbhrbtye)
  const token = authHeader && authHeader.split(" ")[1];

  // chegar se o cabeçalho da requisição existe ou não
  if (!token)
    return res.status(401).json({ errors: ["Acesso negado! (authGuard)"] });

  // Checar se o token é válido
  try {
    const verified = jwt.verify(token, jwtSecret);

    req.user = await User.findById(verified.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido. (authGuard)"] });
  }
};

module.exports = authGuard;
