import { Schema, model } from 'mongoose';

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    foods: [{
        description: String,
        nutrients: {
            calories: Number,
            protein: Number,
            carbs: Number,
            fat: Number
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Recipe = model('Recipe', RecipeSchema);
export default Recipe;