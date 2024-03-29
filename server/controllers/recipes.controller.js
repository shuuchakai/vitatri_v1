import Recipe from "../models/recipe.model.js";

export const createRecipe = async (req, res) => {
    try {
        const { name, foods, user } = req.body;

        if (!name || !foods || !user) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newRecipe = new Recipe({ name, foods, user });

        const savedRecipe = await newRecipe.save();

        res.json(savedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecipes = async (req, res) => {
    try {
        const userId = req.query.userId;
        let recipes;

        if (userId) {
            recipes = await Recipe.find({ user: userId });
        } else {
            recipes = await Recipe.find();
        }

        if (!recipes) throw new Error('No recipes found');

        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const getRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);

        if (!recipe) throw new Error('No recipe found');

        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
};