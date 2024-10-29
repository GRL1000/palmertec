import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CitasMedicas = () => {
    const [citas, setCitas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/citas');
                const data = await response.json();
                setCitas(data);
            } catch (error) {
                console.error('Error al obtener las citas:', error);
            }
        };

        fetchCitas();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="citas-medicas">
            <h2>Citas Programadas</h2>
            <button onClick={handleLogout}>Cerrar Sesión</button>
            {citas.length === 0 ? (
                <p>No hay citas programadas.</p>
            ) : (
                <ul>
                    {citas.map((cita) => (
                        <li key={cita.id}>
                            <strong>Paciente:</strong> {cita.pacienteNombre} <br />
                            <strong>Fecha:</strong> {cita.fecha} <br />
                            <strong>Hora:</strong> {cita.hora} <br />
                            <strong>Detalles:</strong> {cita.detalles}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CitasMedicas;
