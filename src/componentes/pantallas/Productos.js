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
import React, { useEffect, useState } from "react";
import { getProductos } from "../../actions/ProductoAction";
import useStyles from "../../theme/useStyles";
import { ProductoArray } from "../data/dataPrueba";

const Productos = (props) => {
  const classes = useStyles();

  const [paginadorProductos, setPaginadorProductos] = useState({
    count: 0,
    pageIndex: 0,
    pageSize: 0,
    pageCount: 0,
    data: [],
  });

  useEffect(() => {
    const getListaProductos = async () => {
      const response = await getProductos();
      setPaginadorProductos(response.data);
    };

    getListaProductos();
  }, []);

  const miArray = ProductoArray;

  const verProducto = (id) => {
    props.history.push("/detalleProducto/" + id);
  };

  if (!paginadorProductos.data) {
    return null;
  }

  console.log(paginadorProductos.data);

  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        Productos
      </Typography>
      <Grid container spacing={4}>
        {paginadorProductos.data.map((data) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={data.id}>
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
                  {data.nombre}
                </Typography>
                <Button
                  onClick={() => verProducto(data.id)}
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
