import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, historia }) => {
  const [historiaDesencriptada, setHistoriaDesencriptada] = useState(null);
  const public_key = sessionStorage.getItem("public_key");

  useEffect(() => {
    const decryptData = async () => {
        if (!historia) return;
        if (public_key !== 'not available' && (historia.historia.split(".").length === 3)) {
        try {
            const response = await fetch("http://localhost:5000/decrypt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: historia.historia,
                public_key: public_key,
            }),
            });
            const dataDecrypted = await response.json();
            console.log(dataDecrypted);
            setHistoriaDesencriptada(dataDecrypted);
        } catch (error) {
            console.error("Error al desencriptar:", error);
        }
        } else {
            if (historia.historia.split(".").length === 3) {
             setHistoriaDesencriptada(null);   
            }else{
                setHistoriaDesencriptada(historia);
            }
      }
    };

    decryptData();
  }, [isOpen, historia]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {historiaDesencriptada ? (
            <div>
                <h2>{historia.nombre}</h2>
                <p>{historiaDesencriptada.historia}</p>
            </div>
        ) : (
            <p>Contenido no disponible</p>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
