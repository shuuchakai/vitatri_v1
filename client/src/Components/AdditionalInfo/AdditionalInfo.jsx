import { redirect, useLocation } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function AdditionalInfo() {
    const [weight, setWeight] = useState(40);
    const [height, setHeight] = useState(145);

    const location = useLocation();
    const userId = location.state.userId;

    if (!userId) {
        return redirect("/signup");
    };

    const handleAdditionalInfo = async (event) => {
        event.preventDefault();

        try {
            const additionalInfo = {
                userId,
                weight,
                height,
            };

            const response = await axios.post('/additional-info', additionalInfo);
            console.log('Información adicional guardada exitosamente');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={handleAdditionalInfo}>
            <h1>Información adicional</h1>
            <label>
                Peso: {weight}kg
                <input
                    type="range"
                    min="40"
                    max="150"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
            </label>
            <label>
                Altura: {height}cm
                <input
                    type="range"
                    min="145"
                    max="200"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </label>
            <button type="submit">Guardar</button>
        </form>
    );
};

export default AdditionalInfo;