import {
  Avatar,
  Collapse,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useStateValue } from "../../../contexto/store";
import useStyles from "../../../theme/useStyles";

const MenuMovil = (props) => {
  const classes = useStyles();
  const imagenDefault =
    "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png";

  const [openCliente, setOpenCliente] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [{ sesionUsuario }, dispatch] = useStateValue();

  const handleClickCliente = () => {
    setOpenCliente((prevOpen) => !prevOpen);
  };
  const handleClickAdmin = () => {
    setOpenAdmin((prevOpen) => !prevOpen);
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
      <ListItem
        onClick={handleClickCliente}
        button
        className={classes.listItem}
      >
        <div className={classes.linkAppBarMobile}>
          <Avatar
            alt="mi imagen"
            className={classes.avatarPerfilAppbar}
            src={
              sesionUsuario
                ? sesionUsuario.usuario
                  ? sesionUsuario.usuario.imagen
                    ? sesionUsuario.usuario.imagen
                    : imagenDefault
                  : imagenDefault
                : imagenDefault
            }
          />
          <ListItemText>
            {sesionUsuario
              ? sesionUsuario.autenticado
                ? sesionUsuario.usuario.nombre +
                  " " +
                  sesionUsuario.usuario.apellido
                : " "
              : "No sesión"}
          </ListItemText>
          <Icon>keyboard_arrow_down</Icon>
        </div>
      </ListItem>
      <Collapse component="li" in={openCliente} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem
            button
            className={classes.listSubItem}
            onClick={props.clickHandler}
          >
            <Link className={classes.linkAppBarMobile} to="/perfil">
              <ListItemIcon className={classes.listItemIcon}>
                <Icon>person</Icon>
              </ListItemIcon>
              <ListItemText>Mi Perfil</ListItemText>
            </Link>
          </ListItem>
          <ListItem
            button
            className={classes.listSubItem}
            onClick={props.clickHandler}
          >
            <Link className={classes.linkAppBarMobile} to="/">
              <ListItemIcon className={classes.listItemIcon}>
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItem button onClick={salirSesion}>
                <ListItemText>Cerrar Sesión</ListItemText>
              </ListItem>
            </Link>
          </ListItem>
          <Divider />
        </List>
      </Collapse>
      {/* admin */}
      <ListItem onClick={handleClickAdmin} button className={classes.listItem}>
        <div className={classes.linkAppBarMobile}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>admin_panel_settings</Icon>
          </ListItemIcon>
          <ListItemText>Admin</ListItemText>
          <Icon>keyboard_arrow_down</Icon>
        </div>
      </ListItem>
      <Collapse component="li" in={openAdmin} timeout="auto" unmountOnExit>
        <List disablePadding>
          <ListItem
            button
            className={classes.listSubItem}
            onClick={props.clickHandler}
          >
            <Link className={classes.linkAppBarMobile} to="/admin/usuarios">
              <ListItemIcon className={classes.listItemIcon}>
                <Icon>group</Icon>
              </ListItemIcon>
              <ListItemText>Usuarios</ListItemText>
            </Link>
          </ListItem>
          <ListItem
            button
            className={classes.listSubItem}
            onClick={props.clickHandler}
          >
            <Link
              className={classes.linkAppBarMobile}
              to="/admin/listaProductos"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <Icon>storefront</Icon>
              </ListItemIcon>
              <ListItemText>Productos</ListItemText>
            </Link>
          </ListItem>
          <ListItem
            button
            className={classes.listSubItem}
            onClick={props.clickHandler}
          >
            <Link className={classes.linkAppBarMobile} to="/admin/listaPedidos">
              <ListItemIcon className={classes.listItemIcon}>
                <Icon>shopping_cart</Icon>
              </ListItemIcon>
              <ListItemText>Pedidos</ListItemText>
            </Link>
          </ListItem>
          <Divider />
        </List>
      </Collapse>
      {/* fin admin */}
      <ListItem
        button
        className={classes.listItem}
        onClick={props.clickHandler}
      >
        <Link className={classes.linkAppBarMobile} to="/carrito">
          <ListItemIcon className={classes.listItemIcon}>
            <Icon>shopping_cart</Icon>
          </ListItemIcon>
          <ListItemText>Mis pedidos</ListItemText>
        </Link>
      </ListItem>
    </>
  );
};

export default withRouter(MenuMovil);
