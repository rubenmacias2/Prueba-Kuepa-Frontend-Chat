import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const Mensaje = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  return <div>hola</div>;
};

export default Mensaje;
