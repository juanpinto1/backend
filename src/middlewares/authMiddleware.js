require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
    try {
        const authorization = req.header("Authorization");
        if (!authorization) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authorization.split("Bearer ")[1];
        if (!token) {
            return res.status(401).json({ error: "Malformed token" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { email: decodedToken.email, user_id: decodedToken.user_id }; // Incluye user_id en el token
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Funciones de manejo de tokens
const asignarToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET);
};

const verificarToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const obtenerToken = (autorizacion) => {
    if (!autorizacion) {
        throw new Error('No token provided');
    }
    if (autorizacion.indexOf('Bearer ') === -1) {
        throw new Error('Malformed token');
    }

    return autorizacion.replace('Bearer ', '');
};

const decodificarCabecera = (req) => {
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado = verificarToken(token);

    req.user = decodificado;

    return decodificado;
};

const chequeartoken = {
    confirmarToken: (req, id) => {
        const decodificado = decodificarCabecera(req);
        if (decodificado.user_id !== id) { // Asegúrate de comparar el ID de usuario
            throw new Error("No tienes privilegios para hacer esto");
        }
    }
};

module.exports = {
    authMiddleware,
    asignarToken,
    verificarToken,
    chequeartoken
};