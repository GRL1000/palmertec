import React, { useState, useEffect } from 'react';
import './Pacientes.css';

function PacienteModal({ paciente, onClose }) {
    const [formData, setFormData] = useState({
        nombre: '',
        edad: '',
        telefono: '',
        estado: '',
        alcaldia: '',
        usuario_id: 2
    });

    useEffect(() => {
        if (paciente) {
            setFormData({
                nombre: paciente.nombre,
                edad: paciente.edad,
                telefono: paciente.telefono,
                estado: paciente.estado,
                alcaldia: paciente.alcaldia,
                usuario_id: paciente.usuario_id || 2
            });
        }
    }, [paciente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = paciente
                ? await fetch(`http://localhost:5000/api/paciente/${paciente.id_paciente}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
                : await fetch('http://localhost:5000/api/paciente', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
    
            if (!response.ok) throw new Error('Error en la operación');
            const result = await response.json();
            onClose(result);
        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al guardar el paciente');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{paciente ? 'Editar Paciente' : 'Registrar Paciente'}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                    />
                    <input
                        type="number"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                        placeholder="Edad"
                        required
                    />
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        required
                    />
                    <input
                        type="text"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        placeholder="Estado"
                        required
                    />
                    <input
                        type="text"
                        name="alcaldia"
                        value={formData.alcaldia}
                        onChange={handleChange}
                        placeholder="Alcaldía"
                        required
                    />
                    <input type="hidden" name="usuario_id" value={formData.usuario_id} />

                    <button type="submit">{paciente ? 'Guardar Cambios' : 'Registrar'}</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
}

export default PacienteModal;
