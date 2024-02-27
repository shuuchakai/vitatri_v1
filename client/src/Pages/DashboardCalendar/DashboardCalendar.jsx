import { useState, useEffect } from 'react';

function DashboardCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Reemplaza esto con la llamada a tu API
        fetch('/api/events')
            .then(response => response.json())
            .then(data => setEvents(data));

        // Obtén las recetas disponibles
        fetch('/api/recipes')
            .then(response => response.json())
            .then(data => setRecipes(data));
    }, []);

    const today = new Date();
    const hours = Array.from({ length: 24 }, (v, i) => (i < 10 ? '0' + i : i) + ':00');
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setModalOpen(true);
    };

    const handleEventSave = () => {
        const event = { day: selectedDay, recipe: selectedRecipe, time: selectedTime };
        setEvents([...events, event]);

        // Hacer una llamada a tu API para guardar el evento en el servidor
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setModalOpen(false);
    };

    const handleEventDelete = (eventToDelete) => {
        setEvents(events.filter(event => event !== eventToDelete));

        // Hacer una llamada a tu API para eliminar el evento del servidor
        fetch(`/api/events/${eventToDelete.id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1>
                <button onClick={handlePrevMonth}>Anterior</button>
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                <button onClick={handleNextMonth}>Siguiente</button>
            </h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day, index) => (
                    <div key={index}>{day}</div>
                ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {Array(startDay).fill(null).map((_, index) => (
                    <div key={index} style={{ width: '14.28%', height: '100px' }}></div>
                ))}
                {days.map((day, index) => (
                    <div key={index} style={{ width: '14.28%', height: '100px', backgroundColor: today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear() ? 'lightgreen' : 'white' }} onClick={() => handleDayClick(day)}>
                        {day}
                        {events.filter(event => event.day === day).map((event, index) => (
                            <div key={index}>
                                {event.recipe.name}
                                <button onClick={() => handleEventDelete(event)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {modalOpen && (
                <div>
                    <h2>Selecciona una receta y una hora</h2>
                    <select value={selectedRecipe} onChange={e => setSelectedRecipe(e.target.value)}>
                        {recipes.map((recipe, index) => (
                            <option key={index} value={recipe.name}>{recipe.name}</option>
                        ))}
                    </select>
                    <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
                        {hours.map((hour, index) => (
                            <option key={index} value={hour}>{hour}</option>
                        ))}
                    </select>
                    <button onClick={handleEventSave}>Guardar</button>
                </div>
            )}
        </div>
    );
}

export default DashboardCalendar;