import React, { useEffect, useState } from 'react';
import './Pacientes.css';

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/pacientes');
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                setPacientes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPacientes();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPacientes = pacientes.filter((paciente) =>
        paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pacientes-container">
            <h2>Gestionar Pacientes</h2>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-button">
                    <img src="ruta/a/icono-busqueda.png" alt="Buscar" />
                </button>
            </div>
            <table className="pacientes-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Cliente</th>
                        <th>Edad</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                        <th>Alcaldía</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPacientes.length > 0 ? (
                        filteredPacientes.map((paciente, index) => (
                            <tr key={paciente.id_paciente}>
                                <td>{index + 1}</td>
                                <td>{paciente.nombre}</td>
                                <td>{paciente.edad}</td>
                                <td>{paciente.telefono}</td>
                                <td>{paciente.estado}</td>
                                <td>{paciente.alcaldia}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No se encontraron pacientes.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Pacientes;
