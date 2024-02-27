import Event from '../models/event.model.js';

export const getEvents = async (req, res) => {
    try {
        const userId = req.query.userId;
        let events;

        if (userId) {
            events = await Event.find({ user: userId });
        } else {
            events = await Event.find();
        }

        if (!events) throw new Error('No events found');

        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);

        const savedEvent = await newEvent.save();

        res.json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) throw new Error('No event found');

        const deletedEvent = await event.remove();

        res.json(deletedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};