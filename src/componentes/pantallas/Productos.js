import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { addItem } from "../../actions/CarritoCompraAction";
import { getProductos } from "../../actions/ProductoAction";
import { useStateValue } from "../../contexto/store";
import useStyles from "../../theme/useStyles";

const Productos = (props) => {
  const classes = useStyles();

  const [{ sesionCarritoCompra }, dispatch] = useStateValue();

  const [requestProductos, setRequestProductos] = useState({
    pageIndex: 1,
    pageSize: 8,
    search: "",
  });
  const [paginadorProductos, setPaginadorProductos] = useState({
    count: 0,
    pageIndex: 0,
    pageSize: 0,
    pageCount: 0,
    data: [],
  });

  const handleChange = (event, value) => {
    setRequestProductos((anterior) => ({
      ...anterior,
      pageIndex: value,
    }));
  };

  useEffect(() => {
    const getListaProductos = async () => {
      const response = await getProductos(requestProductos);
      setPaginadorProductos(response.data);
    };

    getListaProductos();
  }, [requestProductos]);

  const verProducto = async (item) => {
    /* await addItem(sesionCarritoCompra, item, dispatch); */
    props.history.push("/detalleProducto/" + item.id);
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
            <Card
              style={{ height: 360, display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                className={classes.media}
                height="150"
                image={
                  data.imagen
                    ? data.imagen
                    : "http://standsyexpos.com/wp-content/gallery/escritorios-gamer/Become-con-repisas.png"
                }
                title="mi producto"
              >
                <Avatar className={classes.price} variant="square">
                  S/{data.precio}
                </Avatar>
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  className={classes.text_card}
                  // style={{
                  //   fontSize: data.nombre.length > 48 ? "1rem" : "1.5rem",
                  // }}
                >
                  {data.nombre}
                </Typography>
                <Typography
                  className={classes.text_card}
                  style={{ display: "flex", color: "gray" }}
                ></Typography>
              </CardContent>
              <CardActions style={{ margin: "auto 5px 5px 5px" }}>
                <Button
                  onClick={() => verProducto(data)}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  MÁS DETALLES
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={paginadorProductos.pageCount}
        page={paginadorProductos.pageIndex}
        onChange={handleChange}
      />
    </Container>
  );
};

export default Productos;
