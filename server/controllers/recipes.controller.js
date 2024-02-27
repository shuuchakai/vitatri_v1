import Recipe from "../models/recipe.model.js";

export const createRecipe = async (req, res) => {
    const newRecipe = new Recipe(req.body);

    try {
        const recipe = await newRecipe.save();

        if (!recipe) throw new Error('An error occurred saving the recipe');

        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
};