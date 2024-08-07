const { UsersCollection } = require('../../database/models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Controlador para registrar un nuevo usuario
const add_user_controller = async (req, res, next) => {
    try {
        const { email, password, username, profile_picture, is_admin } = req.body;

        const existingUser = await UsersCollection.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        const response = await UsersCollection.addUser(email, password, username, profile_picture, is_admin);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

// Controlador para obtener el perfil del usuario
const get_profile_controller = async (req, res, next) => {
    try {
        const { email } = req.user;
        const user = await UsersCollection.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ user });
    } catch (error) {
        next(error);
    }
};

// Controlador para actualizar el perfil del usuario
const update_profile_controller = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const { email, password, username, profile_picture, is_admin } = req.body;

        const existingUser = await UsersCollection.getUserByEmail(email);
        if (existingUser && existingUser.user_id != user_id) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        const response = await UsersCollection.updateUser(user_id, email, password, username, profile_picture, is_admin);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Controlador para manejar el inicio de sesión
const login_controller = async (req, res, next) => {
    try {
        const token = req.token;
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

const delete_user_controller = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const response = await UsersCollection.deleteUser(user_id);
        if (!response) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ msg: 'Usuario eliminado con éxito' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    add_user_controller,
    login_controller,
    get_profile_controller,
    update_profile_controller,
    delete_user_controller
};