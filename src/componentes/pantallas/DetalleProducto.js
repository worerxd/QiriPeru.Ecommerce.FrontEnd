import {
  Button,
  CardMedia,
  Container,
  Grid,
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

const DetalleProducto = (props) => {
  const classes = useStyles();

  const agregarCarrito = () =>{
    props.history.push("/carrito")
  }

  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        PUERTA PRINCIPAL EN MADERA
      </Typography>
      <Grid container spacing={4}>
        <Grid item lg={8} md={8} xs={12}>
          <Paper variant="outlined" square className={classes.paperImg}>
            <CardMedia
              style={{ width: "100%" }}
              className={classes.mediaDetalle}
              image="http://standsyexpos.com/wp-content/gallery/escritorios-gamer/Become-con-repisas.png"
              title="mi producto"
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
                    <Typography variant="subtitle2">S/229</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">Cantidad</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField size="small" select variant="outlined">
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Button onClick={agregarCarrito} variant="contained" color="primary" size="large">
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
                Precio: S/229
              </Typography>
              <Typography className={classes.text_detalle}>
                Unidades Disponibles: 15
              </Typography>
              <Typography className={classes.text_detalle}>
                Material: Caoba
              </Typography>
              <Typography className={classes.text_detalle}>
                Categoria: Comedor
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography className={classes.text_detalle}>
                Descripcion:
              </Typography>
              <Typography className={classes.text_detalle}>
                Puerta de caoba, con medidas personalizadas, luis se la come y
                raul también, alex es un chivato y esppero no la cagues
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetalleProducto;
