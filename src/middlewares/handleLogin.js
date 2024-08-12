require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { UsersCollection } = require('../database/models/usersModel');

const handleLoginMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const passwordHash = await UsersCollection.getPasswordUserByEmail(email);
        console.log(typeof passwordHash, passwordHash, "llego bien"); 
        const match = bcrypt.compareSync(String(password), passwordHash);
        if (match) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            req.token = token;
            next();
        } else {
            res.status(403).json({ error: 'Error de credenciales' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleLoginMiddleware
};