const router = require('express').Router();
const { get_events_controller, add_event_controller, update_event_controller, delete_event_controller } = require('../../controllers/Events/EventsController');

// Ruta para obtener todos los eventos
router.get('/get-all', get_events_controller);

// Ruta para agregar un nuevo evento
router.post('/add', add_event_controller);

// Ruta para actualizar un evento existente
router.put('/update/:event_id', update_event_controller);

// Ruta para eliminar un evento
router.delete('/delete/:event_id', delete_event_controller);

module.exports = router;