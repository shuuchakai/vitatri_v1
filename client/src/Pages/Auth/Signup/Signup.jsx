import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';

import './Signup.css';

// Define validation schema
const schema = yup.object().shape({
    firstName: yup.string().required('El nombre es obligatorio.'),
    lastName: yup.string().required('El apellido es obligatorio.'),
    username: yup.string().required('EL nombre de usuario es obligatorio.'),
    email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
    password: yup.string().min(8, 'La contraseña debe tener al menos 8 carácteres.').required('La contraseña es requerida'),
    weight: yup.number().positive('El peso debe ser un número positivo.').required('El peso es obligatorio.'),
    height: yup.number().positive('La altura tiene que ser un número positivo.').required('La altura es obligatoria.'),
});

function Signup() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/api/signup', data);
            console.log(response.data);

            localStorage.setItem('user', JSON.stringify(response.data));

            navigate("/dashboard")
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {/* <div className="signupPageBackeffect"></div> */}
            <div className="signupFormContainer">
                <div className="signupFormContainerText">
                    <div className="signupFormContainerText_container">
                        <Link className="signupFormContainerText_title" to="/">vitatri</Link>
                        <nav className="signupFormContainerText_description">
                            <p className="signupFormContainerText_descriptionTitle">Empieza de inmediato</p>
                            <p className="signupFormContainerText_descriptionContent">
                                Con vitatri puedes llevar tu seguimiento nutricional a sólo un botón de distancia.
                            </p>
                        </nav>
                        <nav className="signupFormContainerText_description">
                            <p className="signupFormContainerText_descriptionTitle">Descubre nuestros algoritmos</p>
                            <p className="signupFormContainerText_descriptionContent">
                                Mejora tu salud nutricional con nuestros especializados algoritmos de seguimiento.
                            </p>
                        </nav>
                        <nav className="signupFormContainerText_description">
                            <p className="signupFormContainerText_descriptionTitle">Personalización completa</p>
                            <p className="signupFormContainerText_descriptionContent">
                                Una personalización total y completa para tu seguimiento nutricional. ¡Es tu elección!
                            </p>
                        </nav>
                        <nav className="signupFormContainerText_description">
                            <p className="signupFormContainerText_descriptionTitle">Alcanza tus metas en poco tiempo</p>
                            <p className="signupFormContainerText_descriptionContent">
                                Nuestro seguimiento nutricional te ayudará a alcanzar tus metas en poco tiempo.
                            </p>
                        </nav>
                    </div>
                    <p className="signupFormContainerText_underTitle">¿Ya tienes una cuenta? <Link className="signupFormContainerText_underTitleSpan" to="/login">Inicia Sesión</Link>.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="signupForm">
                    <p className="signupFormTitle">Crear Cuenta</p>
                    <nav className="signupFormNav">
                        <p className="signupFormNav_title">Nombre:</p>
                        <input {...register('firstName')} className="signupFormInput" />
                        <p className="signupFormInputError">{errors.firstName?.message}</p>
                    </nav>

                    <nav className="signupFormNav">
                        <p className="signupFormNav_title">Apellidos:</p>
                        <input {...register('lastName')} className="signupFormInput" />
                        <p className="signupFormInputError">{errors.lastName?.message}</p>
                    </nav>

                    <nav className="signupFormNav">
                        <p className="signupFormNav_title">Nombre de usuario:</p>
                        <input {...register('username')} className="signupFormInput" />
                        <p className="signupFormInputError">{errors.username?.message}</p>
                    </nav>

                    <nav className="signupFormNav">
                        <p className="signupFormNav_title">Correo electrónico:</p>
                        <input {...register('email')} className="signupFormInput" />
                        <p className="signupFormInputError">{errors.email?.message}</p>
                    </nav>

                    <nav className="signupFormNav">
                        <p className="signupFormNav_title">Contraseña:</p>
                        <input {...register('password')} className="signupFormInput" />
                        <p className="signupFormInputError">{errors.password?.message}</p>
                    </nav>

                    <nav className="signupFormNav">
                        <p className="signupFormNav_title">Peso:</p>
                        <select {...register('weight')} className="signupFormInput">
                            {[...Array(111).keys()].map(i => <option value={i + 40}>{i + 40}</option>)}
                        </select>
                        <p className="signupFormInputError">{errors.weight?.message}</p>
                    </nav>

                    <nav className="signupFormNav">
                        <p className="signupFormNav_title">Altura:</p>
                        <select {...register('height')} className="signupFormInput">
                            {[...Array(81).keys()].map(i => <option value={i + 120}>{i + 120}</option>)}
                        </select>
                        <p className="signupFormInputError">{errors.height?.message}</p>
                    </nav>

                    <button type="submit" className="signupFormButton">Crear Cuenta</button>
                </form>
            </div>
            <svg className="svgss" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f67b2d" fill-opacity="1" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,218.7C672,224,768,192,864,154.7C960,117,1056,75,1152,48C1248,21,1344,11,1392,5.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            <svg className="svgss" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f2ac3e" fill-opacity="1" d="M0,224L60,229.3C120,235,240,245,360,256C480,267,600,277,720,240C840,203,960,117,1080,74.7C1200,32,1320,32,1380,32L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            <svg className="svgss" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#986C27" fill-opacity="1" d="M0,288L24,282.7C48,277,96,267,144,224C192,181,240,107,288,85.3C336,64,384,96,432,122.7C480,149,528,171,576,186.7C624,203,672,213,720,218.7C768,224,816,224,864,224C912,224,960,224,1008,224C1056,224,1104,224,1152,218.7C1200,213,1248,203,1296,170.7C1344,139,1392,85,1416,58.7L1440,32L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
        </>
    );
}

export default Signup;