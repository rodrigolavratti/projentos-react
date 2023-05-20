const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

// Inserindo uma foto com um usuário relacionado a foto
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  //console.log(req.body);
  //res.send("Insert Photo");

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  // Criando a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    res.status(422).json({ errors: ["Houve um problema, tente mais tarde."] });
    return;
  }
  res.status(201).json(newPhoto);
};

// Remover imagem do DB
const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, por favor tente mais tarde."] });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);
    res
      .status(202)
      .json({ id: photo._id, message: "Foto excluída com sucesso!" });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
};

// Exibir todas as fotos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt, -1"]])
    .exec();

  return res.status(200).json(photos);
};

// Exubir as fotos do usuário
const getUserPhotos = async (req, res) => {
  const { id } = req.params;
  const photos = await Photo.find({ userId: id })
    .sort([["createdAt, -1"]])
    .exec();

  return res.status(200).json(photos);
};

// Visualizar a foto individualmente | Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;
  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
  res.status(202).json(photo);
};

// Alterar a foto
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;
  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, favor tente mais tarde."] });
    return;
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();
  res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

// update like da foto do usuário
const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }
  // Verifica se o usuário já deu like na foto
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Você já curtiu a foto"] });
    return;
  }
  // adicionar o id do usuário em likes array
  photo.likes.push(reqUser._id);
  photo.save();
  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida." });
};

// Comentário da foto
const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);
  const photo = await Photo.findById(id);
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }

  // put comment | adicionar comentário
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  photo.comments.push(userComment);
  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "O comentário foi adicionado com sucesso!",
  });
};

// Busca de imagens por meio do título
const searchPhotos = async (req, res) => {
  const { q } = req.query;
  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
