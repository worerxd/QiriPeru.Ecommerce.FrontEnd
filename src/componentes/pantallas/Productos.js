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
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { getProductos } from "../../actions/ProductoAction";
import useStyles from "../../theme/useStyles";

const Productos = (props) => {
  const classes = useStyles();

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

  const verProducto = async (id) => {
    /* await addItem(sesionCarritoCompra, item, dispatch); */
    props.history.push("/detalleProducto/" + id);
  };

  if (!paginadorProductos.data) {
    return null;
  }

  const handleSearch = (event) => {
    requestProductos.search = event.target.value.toLowerCase();
    const getListaProductos = async () => {
      const response = await getProductos(requestProductos);
      setPaginadorProductos(response.data);
    };
    getListaProductos();
  };

  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        Productos
      </Typography>
      <TextField
        id="outlined-basic"
        label="Buscar Producto"
        variant="outlined"
        onChange={(event) => handleSearch(event)}
        style={{ marginBottom: 20, width: 285 }}
      />
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
                {data.stock > 0 ? (
                  ""
                ) : (
                  <Typography
                    variant="h6"
                    style={{
                      display: "flex",
                      color: "red",
                      justifyContent: "end",
                      fontWeight: 600,
                    }}
                  >
                    Agotado
                  </Typography>
                )}
                <Typography
                  className={classes.text_card}
                  style={{ display: "flex", color: "gray" }}
                ></Typography>
              </CardContent>
              <CardActions style={{ margin: "auto 5px 5px 5px" }}>
                <Button
                  onClick={() => verProducto(data.id)}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  M??S DETALLES
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
