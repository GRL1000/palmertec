const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'agenda',
    password: 'admin',
    port: 5432,
});

// Ruta de inicio de sesión
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuario WHERE email = $1 AND password = $2', [email, password]); // Cambia aquí también
        if (result.rows.length > 0) {
            res.json({ message: 'Inicio de sesión exitoso', user: result.rows[0] });
        } else {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (err) {
        console.error('Error en el inicio de sesión:', err);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta de registro
app.post('/api/register', async (req, res) => {
    const { nombre, email, password, rol_id } = req.body; 
    console.log('Datos recibidos:', { nombre, email, password, rol_id }); // Agrega este log
    try {
        const result = await pool.query(
            'INSERT INTO usuario (nombre, email, password, rol_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, email, password, rol_id]
        );
        res.json({ message: 'Registro exitoso', user: result.rows[0] });
    } catch (err) {
        console.error('Error en el registro:', err);
        res.status(500).send('Error en el servidor');
    }
});

//Obtener usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuario');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// Obtener todos los pacientes
app.get('/api/pacientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM paciente');
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener pacientes:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Crear un nuevo paciente
app.post('/api/paciente', async (req, res) => {
    const { nombre, edad, telefono, estado, alcaldia, usuario_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO paciente (nombre, edad, telefono, estado, alcaldia, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nombre, edad, telefono, estado, alcaldia, usuario_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error al crear paciente:', err);  // Agregado para depuración
        res.status(500).send('Error al crear paciente');
    }
});

// Actualizar un paciente
app.put('/api/paciente/:id_paciente', async (req, res) => {
    const { id_paciente } = req.params;
    const { nombre, edad, telefono, estado, alcaldia } = req.body;
    try {
        const result = await pool.query(
            'UPDATE paciente SET nombre = $1, edad = $2, telefono = $3, estado = $4, alcaldia = $5 WHERE id_paciente = $6 RETURNING *',
            [nombre, edad, telefono, estado, alcaldia, id_paciente]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error al actualizar paciente:', err);
        res.status(500).send('Error al actualizar paciente');
    }
});

// Eliminar un paciente
app.delete('/api/paciente/:id_paciente', async (req, res) => {
    const { id_paciente } = req.params;
    try {
        await pool.query('DELETE FROM paciente WHERE id_paciente = $1', [id_paciente]);
        res.json({ message: 'Paciente eliminado exitosamente' });
    } catch (err) {
        console.error('Error al eliminar paciente:', err);
        res.status(500).send('Error al eliminar paciente');
    }
});

// Obtener todo el personal medico
app.get('/api/personal-medico', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM personal_consultorio');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// Crear un nuevo personal
app.post('/api/personal', async (req, res) => {
    const { nombre, email, estado, alcaldia, especialidad, horas_laboradas, usuario_id } = req.body; // Asegúrate de incluir email
    try {
        const result = await pool.query(
            'INSERT INTO personal_consultorio (nombre, email, estado, alcaldia, especialidad, horas_laboradas, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nombre, email, estado, alcaldia, especialidad, horas_laboradas, usuario_id] // Asegúrate de pasar el email aquí
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error al crear personal:', err);
        res.status(500).send('Error al crear personal');
    }
});

// Actualizar un personal
app.put('/api/personal/:id_personal', async (req, res) => {
    const { id_personal } = req.params;
    const { nombre, email, estado, alcaldia, especialidad, horas_laboradas } = req.body; // Asegúrate de incluir todos los campos necesarios
    try {
        const result = await pool.query(
            'UPDATE personal_consultorio SET nombre = $1, email = $2, estado = $3, alcaldia = $4, especialidad = $5, horas_laboradas = $6 WHERE id_personal = $7 RETURNING *',
            [nombre, email, estado, alcaldia, especialidad, horas_laboradas, id_personal]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error al actualizar personal:', err);
        res.status(500).send('Error al actualizar personal');
    }
});

// Eliminar un personal
app.delete('/api/personal/:id_personal', async (req, res) => {
    const { id_personal } = req.params;
    try {
        await pool.query('DELETE FROM personal_consultorio WHERE id_personal = $1', [id_personal]);
        res.json({ message: 'Miembro del personal eliminado exitosamente' });
    } catch (err) {
        console.error('Error al eliminar miembro del personal:', err);
        res.status(500).send('Error al eliminar miembro del personal');
    }
});

// Crear una cita médica
app.post('/api/cita', async (req, res) => {
    const { id_paciente, id_personal, indicaciones, fecha, cotizacion } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO cita (id_paciente, id_personal, indicaciones, fecha, cotizacion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id_paciente, id_personal, indicaciones, fecha, cotizacion]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error al crear cita:', err)
        res.status(500).send('Error al crear cita');
    }
});

// Obtener citas
app.get('/api/citas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cita');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});
