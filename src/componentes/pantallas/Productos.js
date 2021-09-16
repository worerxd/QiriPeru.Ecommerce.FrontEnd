import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "../../theme/useStyles";
import { ProductoArray } from "../data/dataPrueba";

const Productos = (props) => {
  const classes = useStyles();

  const miArray = ProductoArray;
  const verProducto = (id) => {
    props.history.push("/detalleProducto/" + id);
  };

  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        Productos
      </Typography>
      <Grid container spacing={4}>
        {miArray.map((data) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={data.key}>
            <Card style={{ height: 405 }}>
              <CardMedia
                className={classes.media}
                image="http://standsyexpos.com/wp-content/gallery/escritorios-gamer/Become-con-repisas.png"
                title="mi producto"
              >
                <Avatar className={classes.price} variant="square">
                  S/{data.precio}
                </Avatar>
              </CardMedia>
              <CardContent>
                <Typography variant="h6" className={classes.text_card}>
                  {data.titulo}
                </Typography>
                <Button
                  onClick={() => verProducto(data.key)}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  MÁS DETALLES
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Productos;
