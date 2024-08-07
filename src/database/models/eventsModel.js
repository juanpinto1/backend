const database = require('../dbConfig');

const addEvent = async (user_id, title, description, date, location, ticket_price, tickets_available, img_url) => {
    try {
        const consulta = `
            INSERT INTO eventos (user_id, title, description, date, location, ticket_price, tickets_available, img_url) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`;
        const values = [user_id, title, description, date, location, ticket_price, tickets_available, img_url];
        const result = await database.query(consulta, values);
        return result.rowCount ? { msg: 'Evento agregado correctamente', data: result.rows[0] } : { msg: 'Evento no agregado', data: [] };
    } catch (error) {
        throw error;
    }
};

const getEvents = async () => {
    try {
        const consulta = "SELECT * FROM eventos";
        const { rows } = await database.query(consulta);
        return rows.length ? { msg: 'Todos los eventos', data: rows } : { msg: 'No hay eventos', data: [] };
    } catch (error) {
        throw error;
    }
};

const updateEvent = async (event_id, title, description, date, location, ticket_price, tickets_available, img_url) => {
    try {
        const consulta = `
            UPDATE eventos 
            SET title = $1, description = $2, date = $3, location = $4, ticket_price = $5, tickets_available = $6, img_url = $7
            WHERE id = $8
            RETURNING *`;
        const values = [title, description, date, location, ticket_price, tickets_available, img_url, event_id];
        const result = await database.query(consulta, values);
        return result.rowCount ? { msg: 'Evento actualizado correctamente', data: result.rows[0] } : { msg: 'Evento no encontrado', data: [] };
    } catch (error) {
        throw error;
    }
};

const deleteEvent = async (event_id) => {
    try {
        const consulta = "DELETE FROM eventos WHERE id = $1 RETURNING *";
        const values = [event_id];
        const result = await database.query(consulta, values);
        return result.rowCount ? { msg: 'Evento eliminado correctamente', data: result.rows[0] } : { msg: 'Evento no encontrado', data: [] };
    } catch (error) {
        throw error;
    }
};

const eventsCollection = {
    addEvent,
    getEvents,
    updateEvent,
    deleteEvent
};

module.exports = { eventsCollection };
