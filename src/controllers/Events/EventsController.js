const { eventsCollection } = require('../../database/models/eventsModel');

const add_event_controller = async (req, res, next) => {
  try {
      const { user_id, title, description, date, location, ticket_price, tickets_available, img_url } = req.body;
      const response = await eventsCollection.addEvent(user_id, title, description, date, location, ticket_price, tickets_available, img_url);
      res.send(response);
  } catch (error) {
      next(error);
  }
};

const get_events_controller = async (req, res, next) => {
  try {
    const response = await eventsCollection.getEvents();
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const update_event_controller = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    const { title, description, date, location, ticket_price, tickets_available, img_url} = req.body;

    const response = await eventsCollection.updateEvent(event_id, title, description, date, location, ticket_price, tickets_available, img_url);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const delete_event_controller = async (req, res, next) => {
  try {
    const { event_id } = req.params;

    const response = await eventsCollection.deleteEvent(event_id);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get_events_controller,
  add_event_controller,
  update_event_controller,
  delete_event_controller
};