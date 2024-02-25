import { Link } from 'react-router-dom';

import './DashboardSidebar.css';

function DashboardSidebar() {
    return (
        <section className="dashboardSidebar">
            <div className="dashboardSidebar_container">
                <Link className="dashboardSidebar_title" to="/dashboard">vitatri</Link>
                
            </div>
        </section>
    )
}

export default DashboardSidebar