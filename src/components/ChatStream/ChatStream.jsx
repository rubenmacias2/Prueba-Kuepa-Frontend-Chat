import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import io from "socket.io-client";
import chatApi from "../../api/chatApi";

const socket = io("http://localhost:8080");
const ChatStream = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("nuevoMensaje", (mensaje) => {
      setMessages((prevMessages) => [...prevMessages, mensaje]);
    });
    chatApi.showMensages();
    return () => {
      socket.off("nuevoMensaje");
    };
  }, []);

  const saveMessage = async (message) => {
    const ahora = new Date();
    const data = {
      contenido: message,
      fecha: ahora.toISOString(),
      usuario: JSON.parse(localStorage.getItem("user")).nombreUsuario,
    };
    socket.emit("mensajeEnviado", data);
  };

  const handleMessageSend = () => {
    if (messageInput.trim() !== "") {
      saveMessage(messageInput);
      setMessageInput("");
    }
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        border: "2px solid #007FFF",
        cursor: "pointer",
        width: "100%",
        height: "82%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ color: "white", marginBottom: 2 }}>
        Chat del curso
      </Typography>
      <Box
        sx={{
          flex: 1,
          marginBottom: 2,
          overflowY: "auto",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {messages.map((message, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{ marginBottom: 1, color: "white" }}
          >
            {message.usuario}: {message.contenido} -{" "}
            {new Date(message.fecha).toLocaleString()}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "8px",
          }}
          value={messageInput}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={handleMessageSend}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default ChatStream;
