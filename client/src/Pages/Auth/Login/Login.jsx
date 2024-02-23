import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);
            console.log(response.data);

            // Guardar el usuario en el almacenamiento local
            localStorage.setItem('user', JSON.stringify(response.data));

            // Redirigir al dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="loginFormContainer">
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </>
    );
}

export default Login;