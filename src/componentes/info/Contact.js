import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "../../theme/useStyles";

const Contact = () => {
  const classes = useStyles();
  return (
    <Container className={classes.containermt}>
      <Grid container justifyContent="center">
        <Grid item lg={10} md={8}>
          <Card className={classes.card} align="center">
            <Avatar className={classes.avatar}>
              <Icon className={classes.icon}>contact_page</Icon>
            </Avatar>
            <Typography variant="h5" color="primary">
              CONTACTO
            </Typography>
            <br />
            <Typography variant="h6" color="primary" align="left">
              CELULAR: 01-5285805
            </Typography>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    name="nombre"
                  ></TextField>
                </Grid>
                <Grid item md={6} xs={12} className={classes.gridmb}>
                  <TextField
                    label="Apellidos"
                    variant="outlined"
                    fullWidth
                    name="apellidos"
                  ></TextField>
                </Grid>
                <Grid item xs={12} className={classes.gridmb}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridmb}>
                  <TextField
                    label="Telefono"
                    variant="outlined"
                    fullWidth
                    type="tel"
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridmb}>
                  <TextField label="Asunto" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} className={classes.gridmb}>
                  <TextField
                    label="Mensaje"
                    variant="outlined"
                    fullWidth
                    type=""
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridmb}>
                  <Button variant="contained" fullWidth color="primary">
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
