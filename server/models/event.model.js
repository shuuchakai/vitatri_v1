import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    day: {
        type: Number,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Event = model("Event", eventSchema);

export default Event;