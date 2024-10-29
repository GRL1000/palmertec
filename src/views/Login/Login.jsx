import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "./Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }
  
      const data = await response.json();
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      
      if (data.user.rol_id === "1") {
        navigate("/agenda");
      } else if (data.user.rol_id === "3") {
        navigate("/citas-medicas");
      } else {
        console.error("Rol no reconocido:", data.user.rol_id);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = { nombre, email, password, rol_id: role };
    console.log('Usuario a registrar:', newUser);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Error al registrarse");

      const data = await response.json();
      
      setIsModalOpen(true);
      setNombre("");
      setEmail("");
      setPassword("");
      setRole("");
      
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            className={`sign-in-form ${isSignUp ? "hidden" : ""}`}
            onSubmit={handleSubmit}
          >
            <h2 className="title">Iniciar Sesión</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Usuario"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              Ingresar
            </button>
          </form>

          <form
            className={`sign-up-form ${isSignUp ? "" : "hidden"}`}
            onSubmit={handleRegister}
          >
            <h2 className="title">Regístrate</h2>
            <div className="input-field">
              <i className="fas fa-id-card"></i>
              <input
                type="text"
                placeholder="Nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Correo electrónico"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user-tag"></i>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Selecciona tu rol</option>
                <option value="1">Administrador</option>
                <option value="3">Personal Médico</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Registrarse
            </button>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Aún no tienes cuenta?</h3>
            <p>Regístrate para conocer nuestros servicios.</p>
            <button className="btn transparent" onClick={toggleForm}>
              Registrarse
            </button>
          </div>
          <img src="image1.jpg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>¿Ya estás registrado?</h3>
            <p>Si ya tienes una cuenta, inicia sesión.</p>
            <button className="btn transparent" onClick={toggleForm}>
              Ingresar
            </button>
          </div>
          <img src="image2.jpg" className="image" alt="" />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Login;
