const auth = require('./authMiddleware')

module.exports = function chequearAuth(){
    function middleware(req, res, next){
        const id = req.body.id;
        
        // Permitir crear usuario con id = 0 sin token
        if (id !== 0) {
            try {
                auth.chequeartoken.confirmarToken(req, id);
            } catch (err) {
                // Si el token no es válido o no se proporciona, se lanza un error
                return next(err);
            }
        }
        
        next();
    }

    return middleware
}