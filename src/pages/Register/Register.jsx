import React, { useState } from "react";
import userApi from "../../api/userApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nameError, setNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [role, setRole] = useState("estudiante");

  const handleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
  };

  const handleRegister = () => {
    if (name.trim() === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (username.trim() === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (password.trim() === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError(true);
    } else {
      setPasswordConfirmError(false);
    }

    fetchUserData();
  };
  const fetchUserData = async () => {
    console.log(
      !usernameError,
      !passwordError,
      !passwordConfirmError,
      !usernameError,
      !nameError
    );
    if (
      !usernameError &&
      !passwordError &&
      !passwordConfirmError &&
      !usernameError &&
      !nameError
    ) {
      try {
        let regis = await userApi.registerUser({
          nombreUsuario: username,
          nombre: name,
          contrasena: password,
          rol: role,
        });
        if (regis.data !== undefined) {
          alert(regis.data.mensaje);
          navigate("/");
        } else {
          alert(regis.response.data.mensaje);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.log("error en contraseña o usuario");
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
        <Typography sx={{ textAlign: "center" }} variant="h5" color="white">
          <SchoolIcon sx={{ fontSize: "30pt" }} />
          <br />
          Registro
        </Typography>

        <TextField
          label="Nombre Completo"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          helperText={nameError ? "Ingrese un nombre válido" : ""}
          InputProps={{
            sx: {
              backgroundColor: "#f5f5f5",
            },
          }}
        />

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

        <TextField
          label="Confirmar Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          error={passwordConfirmError}
          helperText={
            passwordConfirmError ? "Las contraseñas no coinciden" : ""
          }
          InputProps={{
            sx: {
              backgroundColor: "#f5f5f5",
            },
          }}
        />

        <Box>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: "white" }}>
              Selecciona tu rol:
            </FormLabel>
            <RadioGroup
              row
              value={role}
              onChange={handleChange}
              sx={{ color: "white" }}
            >
              <FormControlLabel
                value="estudiante"
                control={<Radio />}
                label="Estudiante"
              />
              <FormControlLabel
                value="moderador"
                control={<Radio />}
                label="Moderador"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
        >
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Registrarse
          </Button>
        </Box>

        <Box sx={{ textAlign: "center", paddingTop: 2, color: "white" }}>
          <Typography variant="body2" color="inherit">
            ¿Ya tienes una cuenta? <br />
            <Link
              onClick={() => {
                navigate("/");
              }}
              underline="hover"
              sx={{ cursor: "pointer" }}
              color="inherit"
            >
              Inicia sesión aquí
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
