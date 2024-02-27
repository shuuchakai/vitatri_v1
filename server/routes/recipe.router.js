import express from 'express';

import { createRecipe, getRecipes, getRecipe } from '../controllers/recipes.controller.js';

const router = express.Router();

router.post('/createRecipe', createRecipe);

router.get('/recipes', getRecipes);
router.get('/recipes/:id', getRecipe);

export default router;