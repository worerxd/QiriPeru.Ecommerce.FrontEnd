import { Button, Icon, ListItemIcon, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "../../../theme/useStyles";

const MenuAdmin = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="inherit"
        className={classes.buttonIcon}
        onClick={handleClick}
      >
        <div className={classes.linkAppBarDesktop}>
          <Icon className={classes.mr}>admin_panel_settings</Icon>
          ADMIN
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
          <Link className={classes.linkAppBarMobile} to="/admin/usuarios">
            <ListItemIcon className={classes.listItemIcon}>
              <Icon>group</Icon>
            </ListItemIcon>
            <ListItemIcon>Usuarios</ListItemIcon>
          </Link>
        </MenuItem>
        <MenuItem className={classes.listItem} onClick={handleClose}>
          <Link className={classes.linkAppBarMobile} to="/admin/listaProductos">
            <ListItemIcon className={classes.listItemIcon}>
              <Icon>storefront</Icon>
            </ListItemIcon>
            <ListItemIcon>Productos</ListItemIcon>
          </Link>
        </MenuItem>
        <MenuItem className={classes.listItem} onClick={handleClose}>
          <Link className={classes.linkAppBarMobile} to="/admin/listaPedidos">
            <ListItemIcon className={classes.listItemIcon}>
              <Icon>shopping_cart</Icon>
            </ListItemIcon>
            <ListItemIcon>Pedidos</ListItemIcon>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuAdmin;
