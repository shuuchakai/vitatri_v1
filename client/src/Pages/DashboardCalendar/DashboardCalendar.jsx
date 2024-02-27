import { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";

import DashboardSidebar from '../../Components/DashboardSidebar/DashboardSidebar';

import './DashboardCalendar.css';

const DAYS_OF_WEEK = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const API_URL = 'http://localhost:3000/api';

function DashboardCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [recipes, setRecipes] = useState([]);

    const userId = JSON.parse(localStorage.getItem('user'))?.result?._id;

    useEffect(() => {
        if (!userId) return;

        fetch(`${API_URL}/recipes?userId=${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, [userId]);

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
        if (!selectedRecipe || !selectedTime) {
            alert('Por favor, selecciona una receta y una hora');
            return;
        }

        const event = { day: selectedDay, recipe: selectedRecipe, time: selectedTime, user: userId };

        setEvents([...events, event]);

        fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error saving event:', error));

        setModalOpen(false);
    };

    const handleEventDelete = (eventToDelete) => {
        setEvents(events.filter(event => event !== eventToDelete));

        fetch(`${API_URL}/events/${eventToDelete.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error deleting event:', error));
    };
    return (
        <>
            <DashboardSidebar />
            <div className="dashboardCalendar">
                <div className="dashboardCalendarContainer">
                    <div className="dashboardCalendar_titleContainer">
                        <button className="dashboardCalendar_titleButtons" onClick={handlePrevMonth}>Anterior</button>
                        <p className="dashboardCalendar_title">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</p>
                        <button className="dashboardCalendar_titleButtons" onClick={handleNextMonth}>Siguiente</button>
                    </div>
                    <div className="dashboardCalendar_calendarDays">
                        {DAYS_OF_WEEK.map((day, index) => (
                            <p className="dashboardCalendar_calendarDay" key={index}>{day}</p>
                        ))}
                    </div>
                    <div className="dashboardCalendar_calendarCubeContainer">
                        {Array(startDay).fill(null).map((_, index) => (
                            <div className="dashboardCalendar" key={index} style={{ width: '14.28%', height: '100px' }}></div>
                        ))}
                        {days.map((day, index) => (
                            <button
                                className="dashboardCalendar_calendarCube"
                                key={index}
                                style={{ backgroundColor: today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear() ? '#F2AC3E' : '#9D3700' }}
                                onClick={() => handleDayClick(day)}>
                                <p className="dashboardCalendar_calendarCubeDay">{day}</p>
                                {events.filter(event => event.day === day).map((event, index) => (
                                    <div className="dashboardCalendar_calendarCubeRecipe" key={index}>
                                        <p className="dashboardCalendar_calendarCubeRecipeName">{event.recipe}</p>
                                        <button className="dashboardCalendar_calendarCubeRecipeButton" onClick={() => handleEventDelete(event)}><MdDelete /></button>
                                    </div>
                                ))}
                            </button>
                        ))}
                    </div>
                    {modalOpen && (
                        <div className="calendarModalBackground">
                            <div className="calendarModalContent">
                                <p className="calendarModalContent_title">Selecciona una receta y una hora</p>
                                <select className="calendarModalContent_select" value={selectedRecipe} onChange={e => setSelectedRecipe(e.target.value)}>
                                    {recipes.map((recipe, index) => (
                                        <option className="calendarModalContent_option" key={index} value={recipe.name}>{recipe.name}</option>
                                    ))}
                                </select>
                                <select className="calendarModalContent_select" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
                                    {hours.map((hour, index) => (
                                        <option className="calendarModalContent_option" key={index} value={hour}>{hour}</option>
                                    ))}
                                </select>
                                <div className="calendarModalContent_buttonContainer">
                                    <button className="calendarModalContent_button" onClick={handleEventSave}>Guardar</button>
                                    <button className="calendarModalContent_button" onClick={() => setModalOpen(false)}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DashboardCalendar;