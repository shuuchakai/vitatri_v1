import { Link } from 'react-router-dom';

import MainHeader from '../../Components/MainHeader/MainHeader';

import Logo from '../../assets/Logo.png'

import './Home.css';

function Home() {
    return (
        <>
            <div className="landingPage_topSection"></div>
            <MainHeader />
            <div className="landingPage_fullContainer">
                <section className="landingPage_firstSection_container">
                    <div className="landingPage_firstSection_containerDescription">
                        <p className="landingPage_firstSection_containerDescriptionTitle">Software de Gestión Nutricional</p>
                        <p className="landingPage_firstSection_containerDescriptionIntroduction">Vitatri conecta nutriólogos y pacientes en una sola plataforma, simplificando el camino hacia tus objetivos de salud. Diseña, sigue y ajusta tu plan nutricional con facilidad y comunícate directamente con tu especialista. Con Vitatri, nutre tu vida y simplifica tu bienestar.</p>
                        <div className="landingPage_firstSection_containerDescriptionInteraction">
                            <p className="landingPage_firstSection_containerDescriptionInteractionText">¿Eres un especialista?</p>
                            <Link className="landingPage_firstSection_containerDescriptionInteractionButton" to="/signup">Empieza ahora</Link>
                        </div>
                    </div>
                    <img src={Logo} alt="" />
                </section>
                <section className="landignPage_secondSection_container">

                </section>
            </div>
        </>
    )
}

export default Home