import {
  Avatar,
  Button,
  Icon,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useStateValue } from "../../../contexto/store";
import useStyles from "../../../theme/useStyles";

const MenuCliente = (props) => {
  const classes = useStyles();
  const imagenDefault =
    "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png";

  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const salirSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({
      type: "SALIR_SESION",
      nuevoUsuario: null,
      autenticado: false,
    });

    props.history.push("/login");
  };

  return (
    <>
      <Button color="inherit" className={classes.buttonIcon}>
        <Link className={classes.linkAppBarDesktop} to="/carrito">
          <Icon className={classes.mr}>shopping_cart</Icon>
          MIS PEDIDOS
        </Link>
      </Button>
      <div>
        <Button
          color="inherit"
          className={classes.buttonIcon}
          onClick={handleClick}
        >
          <div className={classes.linkAppBarDesktop}>
            <Avatar
              alt="mi imagen"
              className={classes.avatarPerfilAppbar}
              src={
                sesionUsuario
                  ? sesionUsuario.usuario.imagen
                    ? sesionUsuario.usuario.imagen
                    : imagenDefault
                  : imagenDefault
              }
            />
            {sesionUsuario
              ? sesionUsuario.autenticado
                ? sesionUsuario.usuario.userName
                : "No sesion"
              : "No sesion"}
            <Icon>keyboard_arrow_down</Icon>
          </div>
        </Button>
        <Menu
          evelation={2}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem className={classes.listItem} onClick={handleClose}>
            <Link className={classes.linkAppBarMobile} to="/perfil">
              <ListItemIcon className={classes.listItemIcon}>
                <Icon>person</Icon>
              </ListItemIcon>
              <ListItemIcon>Mi Perfil</ListItemIcon>
            </Link>
          </MenuItem>
          <MenuItem className={classes.listItem} onClick={handleClose}>
            <Link className={classes.linkAppBarMobile} to="/">
              <ListItemIcon className={classes.listItemIcon}>
                <Icon>exit_to_app</Icon>
              </ListItemIcon>

              <ListItem button onClick={salirSesion}>
                <ListItemIcon>Cerrar Sesión</ListItemIcon>
              </ListItem>
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default withRouter(MenuCliente);
