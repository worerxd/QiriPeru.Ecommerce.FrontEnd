import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../../theme/useStyles";
import ImageUploader from "react-images-upload";
import { useStateValue } from "../../contexto/store";
import { v4 as uuidv4 } from "uuid";
import { actualizarUsuario } from "../../actions/UsuarioAction";
import { withRouter } from "react-router-dom";

const Perfil = (props) => {
  const classes = useStyles();

  const imagenDefault =
    "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png";

  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    imagen: "",
    email: "",
    password: "",
    file: "",
    imagenTemporal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (sesionUsuario) {
      setUsuario(sesionUsuario.usuario);
    }
  }, [sesionUsuario]);

  const subirImagen = (imagenes) => {
    let foto = imagenes[0];
    let fotoUrl = "";
    try {
      fotoUrl = URL.createObjectURL(foto);
    } catch (e) {
      console.log(e);
    }

    setUsuario((prev) => ({
      ...prev,
      file: foto,
      imagenTemporal: fotoUrl,
    }));
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    actualizarUsuario(sesionUsuario.usuario.id, usuario, dispatch).then(
      (response) => {
        if (response.status === 200) {
          window.localStorage.setItem("token", response.data.token);
          props.history.push("/");
        } else {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Errores actualizando el perfil de usuario",
            },
          });
        }
      }
    );
  };

  const keyImage = uuidv4();

  const verDetalles = () => {
    const id = "4f640d35-2b7b-423a-b4a2-b6715b9765bf";
    props.history.push("/ordenCompra/" + id);
  };

  return (
    <Container className={classes.containermt}>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <Typography variant="h5" className={classes.text_title}>
            PERFIL DE USUARIO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <ImageUploader
              key={keyImage}
              onChange={subirImagen}
              withIcon={false}
              buttonStyles={{
                borderRadius: "50%",
                padding: 10,
                margin: 0,
                position: "absolute",
                bottom: 15,
                left: 15,
              }}
              className={classes.imageUploader}
              buttonText={<Icon>add_a_photo</Icon>}
              label={
                <Avatar
                  alt="mi perfil"
                  className={classes.avatarPerfil}
                  src={
                    usuario
                      ? usuario.imagenTemporal
                        ? usuario.imagenTemporal
                        : usuario.imagen
                        ? usuario.imagen
                        : imagenDefault
                      : imagenDefault
                  }
                />
              }
              imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
              maxFileSize={5242880}
            />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              name="nombre"
              value={usuario ? usuario.nombre : ""}
              onChange={handleChange}
            />
            <TextField
              label="Apellidos"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              name="apellido"
              value={usuario ? usuario.apellido : ""}
              onChange={handleChange}
            />
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              name="email"
              value={usuario ? usuario.email : ""}
              onChange={handleChange}
            />
            <Divider className={classes.divider} />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
            />
            <TextField
              label="Confirmar Password"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={guardarUsuario}
            >
              ACTUALIZAR
            </Button>
          </form>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant="h5" className={classes.text_title}>
            MIS PEDIDOS
          </Typography>
          <TableContainer className={classes.form}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>FECHA</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAGADO</TableCell>
                  <TableCell>ENTREGADO</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>4f640d35-2b7b-423a-b4a2-b6715b9765bf</TableCell>
                  <TableCell>2021-09-15</TableCell>
                  <TableCell>123</TableCell>
                  <TableCell>2021-09-12</TableCell>
                  <TableCell>
                    {/*<Icon className={classes.iconNotDelivered}>clear</Icon>*/}
                    <Icon className={classes.iconDelivered}>check</Icon>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={verDetalles}>
                      DETALLES
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(Perfil);
