import React, { useEffect, useState } from 'react';
import PacienteModal from './PacienteModal';
import './Pacientes.css';

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState(null);

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

    const handleAddPaciente = () => {
        setSelectedPaciente(null);
        setShowModal(true);
    };

    const handleEditPaciente = (paciente) => {
        setSelectedPaciente(paciente);
        setShowModal(true);
    };

    const handleDeletePaciente = async (id_paciente) => {
        if (window.confirm('¿Estás seguro de eliminar este paciente?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/paciente/${id_paciente}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Error al eliminar paciente');
                setPacientes((prev) => prev.filter((p) => p.id_paciente !== id_paciente));
            } catch (error) {
                console.error(error);
                alert('Ocurrió un error al eliminar el paciente');
            }
        }
    };
    
    const handleCloseModal = (updatedPaciente) => {
        setShowModal(false);
        if (updatedPaciente) {
            if (selectedPaciente) {
                setPacientes((prev) =>
                    prev.map((p) => (p.id_paciente === updatedPaciente.id_paciente ? updatedPaciente : p))
                );
            } else {
                setPacientes((prev) => [...prev, updatedPaciente]);
            }
        }
    };
    
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
                <button className="add-button" onClick={handleAddPaciente}>Registrar Paciente</button>
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
                        <th>Acciones</th>
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
                                <td>
                                    <button onClick={() => handleEditPaciente(paciente)}>Editar</button>
                                    <button onClick={() => handleDeletePaciente(paciente.id_paciente)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No se encontraron pacientes.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showModal && (
                <PacienteModal
                    paciente={selectedPaciente}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default Pacientes;
