import { useNavigate } from 'react-router-dom';

import DashboardSidebar from '../../Components/DashboardSidebar/DashboardSidebar';

import './Dashboard.css';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    if (!user) {
        navigate("/login");
        return null;
    }

    const { firstName, lastName, email, weight, height } = user.result;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return 'Por debajo del peso normal';
        if (bmi >= 18.5 && bmi < 25) return 'Normal';
        if (bmi >= 25 && bmi < 30) return 'Sobrepeso';
        if (bmi >= 30) return 'Obesidad';
    }

    return (
        <>
            <DashboardSidebar />
            <section className="dashboardPrincipal_container">
                <p className="dashboardPrincipal_containerTitle">Bienvenido, {firstName} {lastName}</p>
                <div className="dashboardPrincipal_info">
                    <p className="dashboardPrincipal_infoTitle">Información personal</p>
                    <p className="dashboardPrincipal_infoText">Peso: {weight} kg</p>
                    <p className="dashboardPrincipal_infoText">Altura: {height} cm</p>
                    <p className="dashboardPrincipal_infoText">IMC: {bmi.toFixed(2)} ({getBMICategory(bmi)})</p>
                </div>
            </section>
        </>
    );
}

export default Dashboard;