import {
  Container,
  Grid,
  Card,
  Typography,
  Avatar,
  Icon,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../theme/useStyles";
import { Link } from "react-router-dom";
import { loginUsuario } from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";

const Login = (props) => {
  const classes = useStyles();

  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginEventoUsuario = () => {
    loginUsuario(usuario, dispatch).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.token);
        console.log("El login fue exitoso", response.data);
        props.history.push("/");
      } else {
        console.log("Las credenciales fueron erróneas", response.data);
      }
    });

    /* const respuesta = acccesoUsuario(usuario);
    if (!respuesta.status) {
      console.log("Email y password incorrectos");
      return;
    }

    setUsuario(clearUsuario);
    console.log("Bienvenido", respuesta.miUsuario.nombre); */
  };

  return (
    <Container className={classes.containermt}>
      <Grid container justifyContent="center">
        <Grid item lg={5} md={6}>
          <Card className={classes.card} align="center">
            <Avatar className={classes.avatar}>
              <Icon className={classes.icon}>person</Icon>
            </Avatar>
            <Typography variant="h5" color="primary">
              Ingrese su Usuario
            </Typography>
            <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={2}>
                <Grid item xs={12} className={classes.gridmb}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridmb}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="password"
                    value={usuario.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridmb}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="submit"
                    onClick={loginEventoUsuario}
                  >
                    Ingresar
                  </Button>
                </Grid>
              </Grid>
              <Link className={classes.link} to="/registrar" variant="body1">
                ¿No tienes cuenta?, Regístrate.
              </Link>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
