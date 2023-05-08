const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Gerando o token do usuário
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Registrar usuário sign in
const register = async (req, res) => {
  //res.send("Registro!");

  const { name, email, password } = req.body;

  // Verifica se o usuário já existe no sistema
  const user = await User.findOne({ email });
  if (user) {
    res
      .status(422)
      .json({ errors: ["Por favor utilize outro e-mail.(UserController)"] });
    return;
  }

  // Gerando um hash password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Criar usuário
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // checar se o usuário foi criado com sucesso
  if (!newUser) {
    res.status(422).json({
      errors: [
        "Houve um erro (check create user), por favor tente mais tarde.(UserController)",
      ],
    });
    return;
  }
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Login do usuário
const login = async (req, res) => {
  //res.send("Login!");

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Ao efetuar o login, checa se o usuário existe.
  if (!user) {
    res
      .status(404)
      .json({ errors: ["Usuário não encontrado.(UserController)"] });
    return;
  }

  // Checar se a senha é compatível
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida.(UserController)"] });
    return;
  }

  // Retorna o usuário com o token
  res.status(202).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Pegar usuário atual
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

module.exports = {
  register,
  login,
  getCurrentUser,
};
