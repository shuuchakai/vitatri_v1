import { Schema, model } from 'mongoose';

const goalSchema = new Schema({
    title: String,
    description: String,
    status: String,
}, { _id: false });

const recordSchema = new Schema({
    date: Date,
    weight: Number,
    exercise: String,
    food: String,
}, { _id: false });

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
    },
    height: {
        type: Number,
        required: true,
        min: 0,
    },
    goals: [goalSchema],
    records: [recordSchema],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'BlogPost',
    }],
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
    }],
}, { timestamps: true });

const User = model('User', userSchema);
export default User;