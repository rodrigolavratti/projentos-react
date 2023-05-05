const User = required("../model/User");

const bcrypt = required("bryptjs");
const jwt = required("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Gerando o token do usuário
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Registrar usuário sign in
const register = async (req, res) => {
  res.send("Registro!");
};

module.exports = {
  register,
};
