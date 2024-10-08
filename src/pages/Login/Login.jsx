import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import userApi from "../../api/userApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import SchoolIcon from "@mui/icons-material/School";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username.trim() === "") {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    if (password.trim() === "") {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    try {
      const userData = await userApi.loginUser(username, password);
      if (userData.data !== undefined) {
        alert(userData.data.mensaje);
        localStorage.setItem("user", JSON.stringify(userData.data.findUser));
        localStorage.setItem("Authenticated", "true");
        navigate("/home");
      } else {
        alert(userData.response.data.mensaje);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className={"contenLogin"}>
      <Box
        sx={{
          backgroundColor: "rgba(47, 47, 47, 0.95)",
          maxWidth: 400,
          minWidth: 300,
          width: "80%",
          borderRadius: "10px",
          padding: 2,
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h4" color="white">
          <SchoolIcon sx={{ fontSize: "40pt" }} />
          <br />
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Nombre de Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
            helperText={
              usernameError ? "Ingrese un nombre de usuario válido" : ""
            }
            InputProps={{
              sx: {
                backgroundColor: "#f5f5f5",
              },
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? "Ingrese una contraseña válida" : ""}
            InputProps={{
              sx: {
                backgroundColor: "#f5f5f5",
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Iniciar Sesión
            </Button>
          </Box>
        </form>

        <Box sx={{ textAlign: "center", paddingTop: 2, color: "white" }}>
          <Typography variant="body2" color="inherit">
            ¿No tienes una cuenta? <br />
            <Link
              onClick={() => navigate("/register")}
              underline="hover"
              sx={{ cursor: "pointer" }}
              color="inherit"
            >
              Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
