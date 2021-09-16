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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "../../theme/useStyles";
import { ProductoArray } from "../data/dataPrueba";

const CarritoCompras = (props) => {
  const miArray = ProductoArray;
  const classes = useStyles();

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
                {miArray.map((producto) => (
                  <TableRow key={producto.key}>
                    <TableCell>
                      <CardMedia
                        className={classes.imgProductoCC}
                        image="http://standsyexpos.com/wp-content/gallery/escritorios-gamer/Become-con-repisas.png"
                        title="imagen en carrito"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        {producto.titulo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        S/{producto.precio}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField select variant="outlined" size="small">
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </TextField>
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
              SUBTOTAL ({miArray.length}) PRODUCTOS
            </Typography>
            <Typography className={classes.text_title}>S/123</Typography>
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
