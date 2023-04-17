const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require("../models/User");

// Inserindo uma foto com um uruário relacionada a "ela"(foto)
const insertPhoto = async (req, res) => {

    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user;
    const user = await User.findById(reqUser._id);

    // Create Photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })

    // Verifica se a photo foi criada com sucesso...
    if(!newPhoto) {
        res.status(422).json({errors: ["Houve um problema, por favor tente novamente mais tarde."]})
        return
    }
    res.status(201).json(newPhoto)
    //res.send("Photo insert");
};

// Removendo a photo do DB
const deletePhoto = async(req, res) => {

    const {id} = req.params
    const reqUser = req.user

    try {
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

        // Verifica se a photo existe
        if(!photo) {
            res.status(404).json({errors: ["Foto não encontrada."]})
            return
        }
        // Verifica se a photo é do usuário
        if(!photo.userId.equals(reqUser._id)) {
            res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde."]})
            return
        }

        await Photo.findByIdAndDelete(photo._id);
        res.status(200).json({id: photo._id, message: "Foto excluída com sucesso."})
    } catch (error) {
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }
};

// Get all photos | Pegar todas as fotos do sistema
const getAllPhotos = async (req, res) => {

    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();
    return res.status(200).json(photos); 
    
};

// Pegar as fotos do USUÁRIO | get user photos
const getUserPhotos = async (req, res) => {

    const {id} = req.params
    const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec();

    return res.status(200).json(photos);

};

// Pegar uma foto pelo ID da photo | Get photo by id
const getPhotoById = async (req, res) => {

    const {id} = req.params
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

    // check if photo exist
    if (!photo) {
        res.status(404).json({errors: ["Foto não encontrada."]});
        return
    }
    res.status(200).json(photo);
};

// Alterar a photo | Update a photo
const updatePhoto = async(req, res) => {

    const {id} = req.params
    const {title} = req.body

    const reqUser = req.user;
    const photo = await Photo.findById(id);

    // Check if photo exist
    if(!photo) {
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    // Check se a foto pertence ao usuário | check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
        res.status(404).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde."]})
        return
    }

    if(title) {
        photo.title = title
    }
    await photo.save();
    res.status(200).json({photo, message: "Foto atualizada com sucesso!"})

};

// Funcionalidade do like | Like functionality
const likePhoto = async(req, res) => {
    const {id} = req.params
    const reqUser = req.user;

    const photo = await Photo.findById(id)
    // check if photo exist
    if(!photo) {
        res.status(404).json({errors: ["Foto não encontrada."]});
        return;
    }

    // Check se a foto está com like | Check if user already liked the photo
    if(photo.likes.includes(reqUser._id)) {
        res.status(422).json({errors: ["Você já curtiu a foto."]})
        return;
    }

    // Put user id in likes array | dar like na foto.
    photo.likes.push(reqUser._id);
    await photo.save();

    res.status(200).json({photoId: id, userId: reqUser._id, message: "A foto foi curtida."})

};

// Função de comentários da foto | Comment functionality
const commentPhoto = async(req, res) => {
    const {id} = req.params;
    const {comment} = req.body;
    const reqUser = req.user;

    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    // check photo exist
    if(!photo) {
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    // Put comment in the array comments
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id,
    }

    photo.comments.push(userComment);
    await photo.save();

    res.status(200).json({
        comment: userComment,
        message: "O comentário foi adicionado com sucesso!"
    })
};

// Busca da imagem | search photo by title
const searchPhoto = async(req, res) => {
    const {q} = req.query;

    const photos = await Photo.find({title: new RegExp(q, "i")}).exec();

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
    searchPhoto,
}