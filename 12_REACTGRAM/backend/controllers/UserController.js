const User = require("../models/User");

const mongoose = require("mongoose");

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

// Update usuário
const update = async (req, res) => {
  //res.send("update");

  const { name, password, bio } = req.body;

  let profileImage = null;
  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;
  //const ObjectId = new ObjectId();
  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id)
  ).select("-password");

  if (name) {
    user.name = name;
  }
  if (password) {
    // Gerando um hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }
  if (profileImage) {
    user.profileImage = profileImage;
  }
  if (bio) {
    user.bio = bio;
  }

  // Metodo para salvar os dados utilizado pelo MongoDB
  await user.save();

  // Se estiver tudo OK, retorna o usuário no front
  res.status(200).json(user);
};

// Get user by id | Obter usuário pelo ID
const getUserById = async (req, res) => {
  // pegar a requisição da URL, utiliza params porque é um GET
  const { id } = req.params;

  try {
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select(
      "-password"
    );
    // Checa se o usuário existe
    if (!user) {
      res
        .status(404)
        .json({ errors: ["Usuário não encontrado(try - UserController)."] });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      errors: ["Usuário não encontrado(catch - UserController)."],
    });
    return;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
