import { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';

import DashboardSidebar from '../../Components/DashboardSidebar/DashboardSidebar';

import './DashboardCalendar.css';

const localizer = momentLocalizer(moment);

function DashboardCalendar() {
    const [events, setEvents] = useState([]);

    const handleSelect = ({ start, end }) => {
        const title = window.prompt('Nuevo evento');
        if (title)
            setEvents([
                ...events,
                {
                    start,
                    end,
                    title,
                },
            ]);
    };

    return (
        <>
            <DashboardSidebar />
            <div className="dashboardCalendar_container">
                <div className="dashboardCalendar">
                    <Calendar
                        selectable
                        localizer={localizer}
                        events={events}
                        defaultView='week'
                        scrollToTime={new Date(1970, 1, 1, 6)}
                        defaultDate={new Date()}
                        onSelectEvent={event => alert(event.title)}
                        onSelectSlot={handleSelect}
                    />
                </div>
            </div>
        </>
    );
}

export default DashboardCalendar;