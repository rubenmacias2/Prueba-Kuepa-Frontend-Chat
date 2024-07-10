import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import chatApi from "../../api/chatApi";

const ChatStream = () => {
  const [messages, setMessages] = useState([
    "Mensaje 1",
    "Mensaje 2",
    "Mensaje 3",
    "Mensaje 4",
    "Mensaje 5",
    "Mensaje 6",
    "Mensaje 7",
    "Mensaje 8",
    "Mensaje 9",
    "Mensaje 10",
    "Mensaje 11",
  ]);

  const saveMensage = async (mensage) => {
    const ahora = new Date();
    const data = {
      contenido: mensage,
      fecha: ahora.toLocaleString(),
      usuario: JSON.parse(localStorage.getItem("user")).nombreUsuario,
    };
    chatApi.sendMensage(data);
  };

  const [messageInput, setMessageInput] = useState("");
  const handleMessageSend = () => {
    if (messageInput.trim() !== "") {
      saveMensage(messageInput);
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
            {message}
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
