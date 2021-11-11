import {
  AppBar,
  Button,
  Container,
  Drawer,
  Icon,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../theme/useStyles";
import { Link } from "react-router-dom";
import MenuCliente from "./desktop/MenuCliente";
import MenuAdmin from "./desktop/MenuAdmin";
import MenuMovil from "./movil/MenuMovil";
import MenuMovilPublico from "./movil/MenuMovilPublico";
import MenuPublico from "./desktop/MenuPublico";
import { useStateValue } from "../../contexto/store";

const MenuAppBar = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const [{ sesionUsuario }, dispatch] = useStateValue();

  console.log("SesionUsuario", sesionUsuario);

  const openToggle = () => {
    setOpen(true);
  };

  const closeToggle = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar
        position="static"
        className={classes.appBar}
        style={{
          background:
            "radial-gradient(circle, rgba(251,198,63,1) 0%, rgba(181,70,48,1) 100%)",
        }}
      >
        <Container>
          <Toolbar>
            <div className={classes.sectionMobile}>
              <IconButton color="inherit" onClick={openToggle}>
                <Icon fontSize="large">menu</Icon>
              </IconButton>
            </div>
            <Drawer open={open} onClose={closeToggle}>
              <div className={classes.list}>
                <List>
                  {sesionUsuario ? (
                    !sesionUsuario.autenticado ? (
                      <MenuMovilPublico clickHandler={closeToggle} />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {sesionUsuario ? (
                    sesionUsuario.autenticado ? (
                      <MenuMovil clickHandler={closeToggle} />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </List>
              </div>
            </Drawer>
            <div className={classes.grow}>
              <Link
                to="/"
                color="inherit"
                className={classes.linkAppBarLogo}
                underline="none"
              >
                <img src= "https://i.ibb.co/k3pv0JG/Sin-t-tulo.png" style={{width: 80}}/> 
                <Typography variant="h5">QIRI PERU</Typography>
              </Link>
            </div>
            <div className={classes.sectionDesktop}>
              <Button color="inherit" className={classes.buttonIcon}>
                <Link
                  to="/contact"
                  color="inherit"
                  underline="none"
                  className={classes.linkAppBarDesktop}
                >
                  <Icon className={classes.mr}>contact_page</Icon>
                  CONTACT
                </Link>
              </Button>
              {sesionUsuario ? (
                !sesionUsuario.autenticado ? (
                  <MenuPublico />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {sesionUsuario ? (
                sesionUsuario.autenticado ? (
                  <MenuCliente />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {sesionUsuario ? (
                sesionUsuario.usuario ? (
                  sesionUsuario.usuario.admin ? (
                    <MenuAdmin />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
