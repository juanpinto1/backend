require('dotenv').config();
const express = require('express')
const routes = require('./routes/index');
const cors = require('cors')
const morgan = require('morgan');
const { handleErrors } = require('./middlewares/errorsHandler');
const HandleDatabaseLogs = require('./middlewares/logsMiddleware');
const jwt =require('jsonwebtoken');

const app = express();

// middlewares
app.use(express.json());

app.use(morgan('dev'))

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// routes
app.use('/api', HandleDatabaseLogs, routes)

// Handle errors
app.use(handleErrors)

app.get("/api/users/perfil", async (req, res)=> {
    try{
        const usuarios= await getUsuarios()
        res.json(usuarios)
    } catch(error){
    res.status(error.code || 500).send(error)
    }
})
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Email no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, 'tu_secreto', { expiresIn: '1h' });

    res.json({
      token,
      username: user.username,
      profile_picture: user.profile_picture,
      role: user.role,
      events: user.events,
      favs: user.favs,
      cart: user.cart,
      tickets: user.tickets,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Consultar el usuario por email en la base de datos
      const query = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await pool.query(query, [email]);
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
  
      // Comparar la contraseña con la almacenada en la base de datos
      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
  
      // Generar el token JWT
      const token = jwt.sign(
        { email: user.email, username: user.username, isAdmin: user.is_admin },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Devolver el token como respuesta
      res.json({ token });
    } catch (error) {
      console.error('Error en login:', error.message);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });



app.post("/api/users/registrarse", async (req, res) => {
    try {
    const usuario = req.body
    await registrarUsuario(usuario)
    res.send("Usuario creado con éxito")
    } catch (error) {
    res.status(500).send(error)
    }
    })
    app.put('/api/profile/perfil/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const { email, username, profile_picture } = req.body;
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        users[index] = { id, email, username, profile_picture };
        res.json(users[index]);
      } else {
        res.status(404).send('Pelicula no Encontrada');
      }
    });


module.exports = app;


