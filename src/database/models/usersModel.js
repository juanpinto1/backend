const bcrypt = require('bcrypt');
const database = require('../dbConfig');

// Función para agregar un nuevo usuario
const addUser = async (email, password, username, profile_picture, is_admin) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const consulta = "INSERT INTO users (email, password, username, profile_picture, created_at, is_admin) VALUES ($1, $2, $3, $4, NOW(), $5) RETURNING *";
        const values = [email, passwordHash, username, profile_picture, is_admin];
        const { rows } = await database.query(consulta, values);
        return { msg: 'Usuario registrado con éxito', user: rows[0] };
    } catch (error) {
        throw new Error('Error al registrar el usuario: ' + error.message);
    }
};

// Función para obtener un usuario por email
const getUserByEmail = async (email) => {
    try {
        const consulta = "SELECT * FROM users WHERE email = $1";
        const { rows } = await database.query(consulta, [email]);
        return rows[0] || null;
    } catch (error) {
        throw new Error('Error al obtener el usuario por email: ' + error.message);
    }
};

// Función para obtener la contraseña de un usuario por email
const getPasswordUserByEmail = async (email) => {
    try {
        const consulta = "SELECT password FROM users WHERE email = $1";
        const { rows } = await database.query(consulta, [email]);
        if (rows.length === 0) {
            throw new Error('El correo electrónico no está registrado.');
        }
        return rows[0].password;
    } catch (error) {
        throw new Error('Error al obtener la contraseña del usuario: ' + error.message);
    }
};

// Función para obtener todos los usuarios
const getAllUsers = async () => {
    try {
        const consulta = "SELECT * FROM users";
        const { rows } = await database.query(consulta);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener todos los usuarios: ' + error.message);
    }
};

// Función para actualizar un usuario por id
const updateUser = async (user_id, email, password, username, profile_picture, is_admin) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(typeof passwordHash, passwordHash, "contraseña actualizada")
        const consulta = "UPDATE users SET email = $1, password = $2, username = $3, profile_picture = $4, is_admin = $5 WHERE user_id = $6 RETURNING *";
        const values = [email, passwordHash, username, profile_picture, is_admin, user_id];
        const { rows } = await database.query(consulta, values);
        return { msg: 'Usuario actualizado con éxito', user: rows[0] };
    } catch (error) {
        throw new Error('Error al actualizar el usuario: ' + error.message);
    }
};

// Función para eliminar un usuario por id
const deleteUser = async (user_id) => {
    try {
        const consulta = "DELETE FROM users WHERE user_id = $1 RETURNING *";
        const { rows } = await database.query(consulta, [user_id]);
        return { msg: 'Usuario eliminado con éxito', user: rows[0] };
    } catch (error) {
        throw new Error('Error al eliminar el usuario: ' + error.message);
    }
};

const UsersCollection = {
    addUser,
    getUserByEmail,
    getPasswordUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser
};

module.exports = {
    UsersCollection
};