import { useState } from 'react';

import DashboardSidebar from '../../Components/DashboardSidebar/DashboardSidebar';

import './DashboardRecipes.css';

function DashboardRecipes() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [recipe, setRecipe] = useState([]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${search}&api_key=NRsXWjydSeNIXPVRM2S9GOcNqYdPu2gcRmfnu0Ly`);
        const data = await response.json();

        setResults(data.foods);
        console.log(data.foods);
    }

    const handleAddToRecipe = (food) => {
        setRecipe([...recipe, food]);
    }

    const handleRemoveFromRecipe = (indexToRemove) => {
        setRecipe(recipe.filter((food, index) => index !== indexToRemove));
    }

    const getTotalNutrients = () => {
        let totalCalories = 0;
        let totalFat = 0;
        let totalProtein = 0;
        let totalCarbs = 0;

        recipe.forEach(food => {
            totalCalories += food.foodNutrients.find(nutrient => nutrient.nutrientId === 1008).value;
            totalFat += food.foodNutrients.find(nutrient => nutrient.nutrientId === 1004).value;
            totalProtein += food.foodNutrients.find(nutrient => nutrient.nutrientId === 1003).value;
            totalCarbs += food.foodNutrients.find(nutrient => nutrient.nutrientId === 1005).value;
        });

        return { totalCalories, totalFat, totalProtein, totalCarbs };
    }

    // Modificar esta madre, no funciona aún del todo, se necesita implementar el código del back para la subida de las recetas.
    const handleSaveRecipe = async () => {
        const response = await fetch('http://localhost:5000/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Mi receta',
                foods: recipe,
            }),
        });
    
        const data = await response.json();
    
        console.log(data);
    }

    return (
        <>
            <DashboardSidebar />
            <div className="dashboardRecipesContainer">
                <div className="dashboardRecipeContainer_inputContainer">
                    <p className="dashboardRecipeContainer_title">Crea tus recetas:</p>
                    <form onSubmit={handleSearchSubmit}>
                        <input className="dashboardRecipeContainer_input" type="text" value={search} onChange={handleSearchChange} placeholder="Buscar alimento..." />
                        <button className="dashboardRecipeContainer_inputButton" type="submit">Buscar</button>
                    </form>
                </div>
                <div className="dashboardRecipeContainer_recipeContainer">
                    <div className="dashboardRecipeContainer_recipeContainer_nutrients">
                        <p>Total de calorías: {getTotalNutrients().totalCalories}</p>
                        <p>Total de grasas: {getTotalNutrients().totalFat}</p>
                        <p>Total de proteínas: {getTotalNutrients().totalProtein}</p>
                        <p>Total de carbohidratos: {getTotalNutrients().totalCarbs}</p>
                    </div>
                    {recipe.map((food, index) => (
                        <div className="dashboardRecipeContainer_productAdded" key={index}>
                            <p className="dashboardRecipeContainer_productAddedTitle">{food.description}</p>
                            <p className="dashboardRecipeContainer_productAddedDescription">Calorías: {food.foodNutrients.find(nutrient => nutrient.nutrientId === 1008).value}</p>
                            <p className="dashboardRecipeContainer_productAddedDescription">Grasas: {food.foodNutrients.find(nutrient => nutrient.nutrientId === 1004).value}</p>
                            <p className="dashboardRecipeContainer_productAddedDescription">Proteína: {food.foodNutrients.find(nutrient => nutrient.nutrientId === 1003).value}</p>
                            <p className="dashboardRecipeContainer_productAddedDescription">Carbohidratos: {food.foodNutrients.find(nutrient => nutrient.nutrientId === 1005).value}</p>
                            <button className="dashboardRecipeContainer_productAddedButton" onClick={() => handleRemoveFromRecipe(index)}>Eliminar de la receta</button>
                        </div>
                    ))}
                    <button onClick={handleSaveRecipe} className="dashboardRecipeContainer_productSaveRecipe">Guardar receta</button>
                </div>
                <div className="dashboardRecipesContainer_container">
                    {results.map((food) => (
                        <div className="dashboardRecipeContainer_product" key={food.fdcId}>
                            {/* <img src={food.image} alt={food.description} /> */}
                            <p className="dashboardRecipeContainer_productTitle">{food.description}</p>
                            <p className="dashboardRecipeContainer_productDescription">Calorías: {food.foodNutrients.find(nutrient => nutrient.nutrientId === 1008).value}</p>
                            <p className="dashboardRecipeContainer_productDescription">Grasas: {food.foodNutrients.find(nutrient => nutrient.nutrientId === 1004).value}</p>
                            <p className="dashboardRecipeContainer_productDescription">Proteína: {food.foodNutrients.find(nutrient => nutrient.nutrientId === 1003).value}</p>
                            <p className="dashboardRecipeContainer_productDescription">Carbohidratos: {food.foodNutrients.find(nutrient => nutrient.nutrientId === 1005).value}</p>
                            {/* <p>Azúcares: {food.foodNutrients.find(nutrient => nutrient.nutrientId == 2000).value}</p> */}
                            <button className="dashboardRecipeContainer_productButton" onClick={() => handleAddToRecipe(food)}>Agregar a la receta</button>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default DashboardRecipes;