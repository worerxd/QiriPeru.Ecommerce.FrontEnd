import {
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStateValue } from "../../contexto/store";
import useStyles from "../../theme/useStyles";
import { ProductoArray } from "../data/dataPrueba";

const CarritoCompras = (props) => {
  const classes = useStyles();
  const [{ sesionCarritoCompra }, dispatch] = useStateValue();

  console.log("sesionCarritoCompra", sesionCarritoCompra);

  const miArray = sesionCarritoCompra ? sesionCarritoCompra.items : [];
  let suma = 0;
  miArray.forEach((prod) => {
    suma += prod.precio * prod.cantidad;
  });

  const realizarCompra = () => {
    props.history.push("/procesoCompra");
  };

  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        CARRITO DE COMPRAS
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={9} md={8} sm={12} xs={12}>
          <TableContainer>
            <Table>
              <TableBody>
                {miArray.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <CardMedia
                        className={classes.imgProductoCC}
                        image={
                          item.imagen
                            ? item.imagen
                            : "http://standsyexpos.com/wp-content/gallery/escritorios-gamer/Become-con-repisas.png"
                        }
                        title={item.producto}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        {item.producto}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        S/{item.precio}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        {item.cantidad}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <Icon>delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Paper variant="outlined" square className={classes.papperPadding}>
            <Typography variant="h6" className={classes.text_title}>
              SUBTOTAL ({miArray.length}) PRODUCTO({miArray.length >1 && "S" })
            </Typography>
            <Typography className={classes.text_title}>
              S/.{Math.round(suma * 100) / 100}
            </Typography>
            <Divider className={classes.gridmb} />
            <Grid className={classes.gridPaperCarrito}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.gridPaperCarrito}
                onClick={realizarCompra}
              >
                REALIZAR COMPRA
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarritoCompras;
