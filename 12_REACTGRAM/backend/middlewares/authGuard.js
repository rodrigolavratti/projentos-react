const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Criando validação de autenticação.
const authGuard = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // a const acima com o split, pega somente os números do token: "Bearer yy3423k324khf939kd3"

    // check if header has a token
    if(!token) return res.status(401).json({errors: ["Acesso negado!"]});

    // check if token is valid
    try {

        const verified = jwt.verify(token, jwtSecret);

        req.user = await User.findById(verified.id).select("-password")

        next()
        
    } catch (error) {
        res.status(401).json({errors: ["Token inválido."]})
    }

}

module.exports = authGuard;
