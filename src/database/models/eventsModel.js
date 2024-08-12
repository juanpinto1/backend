const database = require('../dbConfig')

const addevent = async (nuevoevento) => {
    try {
        const { user_id, title, description, date, location, ticket_price, tickets_available, img_url } = nuevoevento;
        const consulta = `
            INSERT INTO eventos (user_id, title, description, date, location, ticket_price, tickets_available, img_url) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`;
        const values = [user_id, title, description, date, location, ticket_price, tickets_available, img_url];
        const result = await database.query(consulta, values);

        if (result.rowCount) {
            return {
                msg: 'Evento agregado correctamente ✅',
                data: result.rows[0]
            };
        } else {
            return {
                msg: 'Evento no agregado',
                data: []
            };
        }
    } catch (error) {
        throw error;
    }
}
const updateevent = async (event_id, title, description, date, location, ticket_price, tickets_available, img_url) => {
    try {
        const consulta = `
            UPDATE eventos 
            SET title = $1, description = $2, date = $3, location = $4, ticket_price = $5, tickets_available = $6, img_url = $7
            WHERE event_id = $8
            RETURNING *`;
        const values = [title, description, date, location, ticket_price, tickets_available, img_url, event_id];
        const result = await database.query(consulta, values);
        return result.rowCount ? { msg: 'Evento actualizado correctamente', data: result.rows[0] } : { msg: 'Evento no encontrado', data: [] };
    } catch (error) {
        throw error;
    }
};


const geteventById = async (id) => {

    try {

        const consulta = 
        "SELECT ev.user_id, ev.title, ev.description, ev.date, ev.location, ev.ticket_price, ev.tickets_available, ev.img_url, us.user_id, FROM eventos ev INNER JOIN usuarios us ON us.user_id = ev.user_id "

        const { rows } = await database.query(consulta, [event_id])

        if (rows.length) {

            return {
                msg: `evento ID: ${event_id}`,
                data: rows[0]
            }

        } else {

            return {
                msg: 'evento no encontrado',
                data: []
            }
        }

    } catch (error) {
        throw error
    }
}

const deleteevent = async (event_id) => {
    try {
        const consulta = "DELETE FROM eventos WHERE event_id = $1 RETURNING *";
        const result = await database.query(consulta, [event_id]);
        
        if (result.rowCount) {
            return {
                msg: 'Evento eliminado correctamente',
                data: result.rows[0]
            };
        } else {
            return {
                msg: 'Evento no encontrado',
                data: []
            };
        }
    } catch (error) {
        throw error;
    }
}


const geteventsByUser = async (email) => {
    try {
        const consulta = `
        SELECT ev.event_id, ev.title, ev.description, ev.date, ev.location, ev.ticket_price, ev.tickets_available, ev.img_url, u.email, u.user_id
        FROM eventos ev
        INNER JOIN users u ON u.user_id = ev.user_id 
        WHERE u.email = $1
        ORDER BY ev.event_id`;

        const { rows } = await database.query(consulta, [email]);

        if (rows.length) {
            return {
                msg: `Eventos del usuario con email: ${email}`,
                data: rows
            };
        } else {
            return {
                msg: 'No hay eventos para este usuario',
                data: []
            };
        }
    } catch (error) {
        throw error;
    }
}

// Obtener todos los eventos
const getevents = async () => {
    try {
        const consulta = `
        SELECT ev.event_id, ev.title, ev.description, ev.date, 
        ev.location, ev.ticket_price, ev.tickets_available, ev.img_url, u.user_id
        FROM eventos ev
        INNER JOIN users u ON u.user_id = ev.user_id;`;

        const { rows } = await database.query(consulta);

        if (rows.length) {
            return {
                msg: 'Eventos obtenidos correctamente',
                data: rows
            };
        } else {
            return {
                msg: 'No hay eventos disponibles',
                data: []
            };
        }
    } catch (error) {
        throw error;
    }
}


const eventsCollection = {
    addevent,
    getevents,
    geteventById,
    updateevent,
    deleteevent,
    geteventsByUser
}

module.exports = { eventsCollection }