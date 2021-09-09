import {
  AppBar,
  Button,
  Container,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../theme/useStyles";
import { Link } from "react-router-dom";

const MenuAppBar = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const openToggle = () => {
    setOpen(true);
  };

  const closeToggle = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
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
                  <ListItem
                    button
                    onClick={closeToggle}
                    className={classes.listItem}
                  >
                    <Link
                      to="/login"
                      color="inherit"
                      className={classes.linkAppBarMobile}
                      underline="none"
                    >
                      <ListItemIcon className={classes.listItemIcon}>
                        <Icon>person</Icon>
                      </ListItemIcon>
                      <ListItemText>Login</ListItemText>
                    </Link>
                  </ListItem>
                  <ListItem
                    button
                    onClick={closeToggle}
                    className={classes.listItem}
                  >
                    <Link
                      to="/contact"
                      color="inherit"
                      className={classes.linkAppBarMobile}
                      underline="none"
                    >
                      <ListItemIcon className={classes.listItemIcon}>
                        <Icon>contact_page</Icon>
                      </ListItemIcon>
                      <ListItemText>Contact</ListItemText>
                    </Link>
                  </ListItem>
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
                <Icon className={classes.mr} fontSize="large">
                  carpenter
                </Icon>
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
              <Button color="inherit" className={classes.buttonIcon}>
                <Link
                  to="/login"
                  color="inherit"
                  underline="none"
                  className={classes.linkAppBarDesktop}
                >
                  <Icon className={classes.mr}>person</Icon>
                  LOGIN
                </Link>
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
