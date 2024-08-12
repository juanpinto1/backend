const { eventsCollection } = require('../../database/models/eventsModel')

const get_events_by_user = async (req, res) => {
    try {
        const { email } = req.body; // Lee el email desde el cuerpo de la solicitud

        // Verificar que el email está presente
        if (!email) {
            return res.status(400).send({ error: 'El email es requerido' });
        }

        const response = await eventsCollection.geteventsByUser(email);
        res.send(response);
    } catch (error) {
        console.error('ERROR', error);
        res.status(500).send({ error: 'Error al obtener eventos del usuario' });
    }
};



const add_Event_controller = async (req, res) => {
    try {
        const nuevoevento = req.body;

        // Asegúrate de que 'user_id' esté en el body del request
        const response = await eventsCollection.addevent(nuevoevento);

        res.status(201).send(response);
    } catch (error) {
        console.error('ERROR', error);
        res.status(500).send({ error: 'Error al agregar el evento' });
    }
}


const get_events_controller = async (req, res) => {

    try {
        const response = await eventsCollection.getevents()

        res.send(response)

    } catch (error) {
        res.send(error)
    }
}

const get_Event_by_id = async (req, res) => {
    const {event_id} = req.params

    try {
        const response = await eventsCollection.getEventById(event_id)

        res.send(response)

    } catch (error) {
        res.send(error)
    }
}


const update_Event_controller = async (req, res, next) => {
    try {
      const { event_id } = req.params;
      const { title, description, date, location, ticket_price, tickets_available, img_url} = req.body;
  
      const response = await eventsCollection.updateevent(event_id, title, description, date, location, ticket_price, tickets_available, img_url);
      res.send(response);
    } catch (error) {
      next(error);
    }
  };



const delete_Event_controller = async (req, res) => {
    const { event_id } = req.params;
    try {
        const response = await eventsCollection.deleteevent(event_id);
        res.send(response);
    } catch (error) {
        console.error('ERROR', error);
        res.status(500).send({ error: 'Error al eliminar el evento' });
    }
}



module.exports = {
    get_events_controller,
    get_Event_by_id,
    add_Event_controller,
    update_Event_controller,
    delete_Event_controller,
    get_events_by_user
}