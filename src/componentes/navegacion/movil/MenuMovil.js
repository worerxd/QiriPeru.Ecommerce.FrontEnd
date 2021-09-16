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
import { Link } from "react-router-dom";
import useStyles from "../../../theme/useStyles";

const MenuMovil = (props) => {
  const classes = useStyles();

  const [openCliente, setOpenCliente] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const handleClickCliente = () => {
    setOpenCliente((prevOpen) => !prevOpen);
  };
  const handleClickAdmin = () => {
    setOpenAdmin((prevOpen) => !prevOpen);
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
            src="https://scontent.flim19-1.fna.fbcdn.net/v/t1.6435-9/97064433_10222786013588766_3925447160463622144_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHpffQEcUwlaeubfrw35GRVuR65ZYgwK1e5HrlliDArV2LRSBy9ZhwZb2PCk7_OyFo&_nc_ohc=0vrfgNoQgkUAX_FEp9F&tn=suglAIaarO9sWgnD&_nc_ht=scontent.flim19-1.fna&oh=71e303d0f2d8e14bb15669831178dce6&oe=61652FFD"
          />
          <ListItemText>Walther Vergaray</ListItemText>
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
              <ListItemText>Cerrar Sesión</ListItemText>
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

export default MenuMovil;
