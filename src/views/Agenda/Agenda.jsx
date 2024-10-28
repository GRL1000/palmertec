import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Agenda.css';

function Agenda() {
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            navigate('/');
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        // Lógica para cerrar sesión
        localStorage.removeItem('user');
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="agenda-container">
            <header className="agenda-header">
                <div className="logo">
                    <img src="ruta/a/tu/logo.png" alt="PalmerTec Logo" />
                </div>
                <nav className="navbar">
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/agenda/pacientes">Pacientes</Link></li>
                        <li><Link to="/agenda/enfermeria">Personal de enfermería</Link></li>
                        <li><Link to="/agenda/citas">Citas</Link></li>
                    </ul>
                </nav>
                <div className="user-info">
                    <img src="ruta/a/tu/icono-usuario.png" alt="User Icon" className="user-icon" />
                    <span className="user-name" onClick={toggleDropdown}>
                        {user.email} <span className="dropdown-arrow">▼</span>
                    </span>
                    <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                </div>
            </header>

            <main className="agenda-content">
                <Outlet /> {/* Aquí se renderizarán las vistas de las opciones */}
            </main>
        </div>
    );
}

export default Agenda;
