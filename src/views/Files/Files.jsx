import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import "./Files.css";

const Files = () => {
  const [historias, setHistorias] = useState([]);
  const [historiaSeleccionada, setHistoriaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const response = await fetch('http://localhost:5000/historias', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setHistorias(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchHistorias();
  }, []);

  const handleClick = (historia) => {
    setHistoriaSeleccionada(historia);
  };

  const handleCloseModal = () => {
    setHistoriaSeleccionada(null);
  };

  return (
    <div className="historias-container">
      <h2>Historias</h2>
      {historias.length === 0 ? (
        <p>No hay historias disponibles</p>
      ) : (
        historias.map((historia, index) => (
          <div key={index} className="historia-item" onClick={() => handleClick(historia)}>
            <h3 className="historia-nombre">{historia.nombre}</h3>
          </div>
        ))
      )}
      <Modal
        isOpen={!!historiaSeleccionada}
        onClose={handleCloseModal}
        historia={historiaSeleccionada}
      />
    </div>
  );
};

export default Files;
