import express from 'express';

import { createRecipe, getRecipes } from '../controllers/recipes.controller.js';

const router = express.Router();

router.post('/createRecipe', createRecipe);
router.get('/recipes', getRecipes);

export default router;