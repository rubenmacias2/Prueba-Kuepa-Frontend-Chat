import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import io from "socket.io-client";
import chatApi from "../../api/chatApi";
import userApi from "../../api/userApi";

const socket = io(process.env.REACT_APP_API_URL);

const ChatStream = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const chatEndRef = useRef(null);

  const identifyUserMessage = async (mail) => {
    try {
      const userData = await userApi.getInfoUser(mail);
      return userData.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const ShowOldMensajes = async () => {
      try {
        const oldMenasje = (await chatApi.showMensages())?.data.listChats;
        const allMensaje = [];
        const userCache = {};
        for (let res of oldMenasje) {
          if (userCache[res.usuario]) {
            allMensaje.push({
              ...userCache[res.usuario],
              ...res,
            });
          } else {
            const userData = await identifyUserMessage(res.usuario);
            userCache[res.usuario] = userData?.user;

            allMensaje.push({
              ...userData?.user,
              ...res,
            });
          }
        }
        setMessages(allMensaje);
      } catch (error) {
        console.error(error);
      }
    };

    ShowOldMensajes();

    socket.on("nuevoMensaje", async (mensaje) => {
      const userData = (await identifyUserMessage(mensaje.usuario))?.user;
      const mensajeUser = { ...mensaje, ...userData };
      setMessages((prevMessages) => [...prevMessages, mensajeUser]);
    });

    return () => {
      socket.off("nuevoMensaje");
    };
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        border: "2px solid #007FFF",
        cursor: "pointer",
        width: "100%",
        height: "70vh",
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
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                minWidth: "80%",
                marginBottom: 1,
                padding: 1,
                borderRadius: 1,
                backgroundColor: "#333",
                alignSelf:
                  message.usuario ===
                  JSON.parse(localStorage.getItem("user")).nombreUsuario
                    ? "flex-end"
                    : "flex-start",
                color: "white",
              }}
            >
              <Typography
                sx={{
                  color: message.rol === "moderador" ? "#2aff00" : "#1976D2",
                  fontWeight: "bold",
                }}
              >
                {message.nombre}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                {message.contenido}
              </Typography>
              <Typography variant="overline" sx={{ color: "#aaa" }}>
                {new Date(message.fecha).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={chatEndRef} />
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
          onKeyPress={handleKeyPress}
        />
        <Button variant="contained" color="primary" onClick={handleMessageSend}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default ChatStream;
