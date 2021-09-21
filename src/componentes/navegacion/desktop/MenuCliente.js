import {
  Avatar,
  Button,
  Icon,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../contexto/store";
import useStyles from "../../../theme/useStyles";

const MenuCliente = () => {
  const classes = useStyles();
  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              src="https://scontent.flim19-1.fna.fbcdn.net/v/t1.6435-9/97064433_10222786013588766_3925447160463622144_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHpffQEcUwlaeubfrw35GRVuR65ZYgwK1e5HrlliDArV2LRSBy9ZhwZb2PCk7_OyFo&_nc_ohc=0vrfgNoQgkUAX_FEp9F&tn=suglAIaarO9sWgnD&_nc_ht=scontent.flim19-1.fna&oh=71e303d0f2d8e14bb15669831178dce6&oe=61652FFD"
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
              <ListItemIcon>Cerrar Sesión</ListItemIcon>
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default MenuCliente;
