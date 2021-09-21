import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../theme/useStyles";
import { Link } from "react-router-dom";
import { registrarUsuario } from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";

const RegistrarUsuario = (props) => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    userName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const guardarUsuario = () => {
    registrarUsuario(usuario, dispatch).then((response) => {
      console.log("Objeto response que envía el servidor", response);
      window.localStorage.setItem("token", response.data.token);
      props.history.push("/");
    });
  };

  const classes = useStyles();
  return (
    <Container className={classes.containermt}>
      <Grid container justify="center">
        <Grid item lg={6} md={8}>
          <Card className={classes.card} align="center">
            <Avatar className={classes.avatar}>
              <Icon className={classes.icon}>person_add</Icon>
            </Avatar>
            <Typography varian="h5" color="primary">
              Registro de Usuario
            </Typography>
            <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    name="nombre"
                    value={usuario.nombre}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item md={6} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Apellidos"
                    variant="outlined"
                    fullWidth
                    name="apellido"
                    value={usuario.apellido}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item md={12} xs={12} className={classes.gridmb}>
                  <TextField
                    label="UserName"
                    variant="outlined"
                    fullWidth
                    name="userName"
                    value={usuario.userName}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item md={12} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item md={12} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="password"
                    value={usuario.password}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                <Grid item md={12} xs={12} className={classes.gridmb}>
                  <Button
                    onClick={guardarUsuario}
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="submit"
                  >
                    REGISTRAR
                  </Button>
                </Grid>
              </Grid>
              <Link to="/login" variant="body1" className={classes.link}>
                ¿Ya tienes una cuenta?, Logueate.
              </Link>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegistrarUsuario;
