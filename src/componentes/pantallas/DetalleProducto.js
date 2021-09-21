import {
  Button,
  CardMedia,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { addItem } from "../../actions/CarritoCompraAction";
import { getProducto } from "../../actions/ProductoAction";
import useStyles from "../../theme/useStyles";
import { useStateValue } from "../../contexto/store";

const DetalleProducto = (props) => {
  const classes = useStyles();

  const [{ sesionCarritoCompra }, dispatch] = useStateValue();
  const [cantidad, setCantidad] = useState(1);

  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    stock: 0,
    materialId: 0,
    materialNombre: "",
    categoriaId: 0,
    categoriaNombre: "",
    precio: 0.0,
    imagen: "",
  });

  useEffect(() => {
    const id = props.match.params.id;
    const getProductoAsync = async () => {
      const response = await getProducto(id);
      setProductoSeleccionado(response.data);
    };
    getProductoAsync();
  }, [productoSeleccionado, props.match.params.id]);

  const agregarCarrito = async () => {
    const item = {
      id: productoSeleccionado.id,
      producto: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      cantidad: cantidad,
      imagen: productoSeleccionado.imagen,
      material: productoSeleccionado.materialNombre,
      categoria: productoSeleccionado.categoriaNombre,
    };

    await addItem(sesionCarritoCompra, item, dispatch);

    props.history.push("/carrito");
  };

  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        {productoSeleccionado.nombre}
      </Typography>
      <Grid container spacing={4}>
        <Grid item lg={8} md={8} xs={12}>
          <Paper variant="outlined" square className={classes.paperImg}>
            <CardMedia
              style={{ width: "100%" }}
              className={classes.mediaDetalle}
              image="http://standsyexpos.com/wp-content/gallery/escritorios-gamer/Become-con-repisas.png"
              title={productoSeleccionado.descripcion}
            />
          </Paper>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">Precio</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      S/. {productoSeleccionado.precio}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">Cantidad</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      <TextField
                        id="cantidad-producto"
                        label=""
                        type="number"
                        value={cantidad}
                        onChange={(event) => setCantidad(event.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Button
                      onClick={agregarCarrito}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Agregar a carrito
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography className={classes.text_detalle}>
                Precio: S/{productoSeleccionado.precio}
              </Typography>
              <Typography className={classes.text_detalle}>
                Unidades Disponibles: {productoSeleccionado.stock}
              </Typography>
              <Typography className={classes.text_detalle}>
                Material: {productoSeleccionado.materialNombre}
              </Typography>
              <Typography className={classes.text_detalle}>
                Categoria: {productoSeleccionado.categoriaNombre}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography className={classes.text_detalle}>
                Descripcion:
              </Typography>
              <Typography className={classes.text_detalle}>
                {productoSeleccionado.descripcion}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetalleProducto;
