const router = require('express').Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
    get_events_controller,
    get_Event_by_id,
    add_Event_controller,
    update_Event_controller,
    delete_Event_controller,
    get_events_by_user
} = require('../../controllers/Events/EventsController');

router.get('/get-all', get_events_controller);
router.get('/get/:id', get_Event_by_id);
router.post('/mis-eventos', authMiddleware, get_events_by_user); // Cambiado a POST y ruta actualizada

router.post('/add', add_Event_controller);
router.put('/update/:id', update_Event_controller);
router.delete('/delete/:id', delete_Event_controller);

module.exports = router;
