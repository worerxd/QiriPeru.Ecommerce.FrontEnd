import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { agregarRol, getUsuarioById } from "../../../actions/UsuarioAction";
import useStyles from "../../../theme/useStyles";
import { withRouter } from "react-router-dom";
import { useStateValue } from "../../../contexto/store";

const EditarUsuario = (props) => {
  const classes = useStyles();

  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });

  const [admin, setAdmin] = useState(false);

  const handleChange = (e) => {
    setAdmin(e.target.checked);
  };

  useEffect(() => {
    const id = props.match.params.id;

    const getUsuarioIdAsync = async () => {
      const response = await getUsuarioById(id);
      setAdmin(response.data.admin);
      setUsuario(response.data);
    };

    getUsuarioIdAsync();
  }, []);

  const actualizarRoleUsuario = async (e) => {
    e.preventDefault();
    const id = props.match.params.id;
    const role = {
      nombre: "ADMIN",
      status: admin,
    };

    const response = await agregarRol(id, role, dispatch);

    if (response.status === 200) {
      props.history.push("/admin/usuarios");
    } else {
      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: "No es posible agregar este rol admin",
        },
      });
    }
  };

  return (
    <Container className={classes.containermt}>
      <Grid container justifyContent="center">
        <Grid item lg={6} sm={12}>
          <Typography variant="h4" className={classes.text_title}>
            Editar Usuario
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <TextField
              label="Nombre"
              variant="filled"
              value={usuario.nombre + " " + usuario.apellido}
              fullWidth
              disabled
              className={classes.gridmb}
            />
            <TextField
              label="Correo Electrónico"
              variant="filled"
              value={usuario.email}
              fullWidth
              disabled
            />
            <FormControl className={classes.checkbox}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Es Administrador"
                checked={admin}
                onChange={handleChange}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={actualizarRoleUsuario}
            >
              Actualizar
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(EditarUsuario);
