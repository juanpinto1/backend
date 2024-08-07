const { add_user_controller, login_controller, get_profile_controller, update_profile_controller, delete_user_controller } = require('../../controllers/users/usersController')
const { handleLoginMiddleware } = require('../../middlewares/handleLogin')
const { authMiddleware } = require('../../middlewares/authMiddleware')

const router = require('express').Router()

router.post('/registrarse', add_user_controller)

router.post('/login', handleLoginMiddleware, login_controller,);
router.get('/perfil', authMiddleware, get_profile_controller);
router.put('/update/:user_id', update_profile_controller); // Puede agregar authMiddleware si se requiere autenticación
router.delete('/delete/:user_id', delete_user_controller);





module.exports = router