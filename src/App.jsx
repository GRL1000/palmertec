import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login/Login';
import Agenda from './views/Agenda/Agenda';
import Pacientes from './views/Agenda/components/Pacientes/Pacientes';
import Personal from './views/Agenda/components/Personal/Personal';
import Citas from './views/Agenda/components/Citas/Citas';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/agenda" element={<Agenda />}>
                <Route path="pacientes" element={<Pacientes />} />
                <Route path="enfermeria" element={<Personal />} />
                <Route path="citas" element={<Citas />} />
            </Route>
        </Routes>
    );
};

export default App;
