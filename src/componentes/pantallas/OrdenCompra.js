import {
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getOrdenCompra } from "../../actions/OrdenCompraAction";
import useStyles from "../../theme/useStyles";

const OrdenCompra = (props) => {
  const classes = useStyles();

  const { id } = props.match.params;
  const mensajeEnvio = "No entregado";
  const mensajePago = "Pagado en 2021-09-06";

  const [pedido, setPedido] = useState({
    id: 0,
    compradorEmail: "",
    ordenCompraFecha: "",
    direccionEnvio: {
      calle: "",
      ciudad: "",
      despartamento: "",
      codigoPostal: "",
      pais: "",
    },
    tipoEnvio: "",
    tipoEnvioPrecio: 0,
    ordenItems: [],
    subTotal: 0.0,
    total: 0.0,
    status: "",
  });

  useEffect(() => {
    const getOrdenCompraDetalle = async () => {
      const response = await getOrdenCompra(id);
      setPedido(response.data);
    };

    getOrdenCompraDetalle();
  }, []);

  return (
    <Container className={classes.containermt}>
      <Typography
        variant="h5"
        className={classes.text_title}
        style={{ marginLeft: 20 }}
      >
        ORDEN DE COMPRA
      </Typography>
      <Grid container spacing={2} className={classes.papperPadding}>
        <Grid item md={8} xs={12}>
          <Typography variant="h6" className={classes.text_title}>
            ENVÍO
          </Typography>
          <Typography variant="body2" className={classes.text_envio}>
            Nombres: {}
          </Typography>
          <Typography variant="body2" className={classes.text_envio}>
            Email: borisrojas@gmail.com
          </Typography>
          <Typography variant="body2" className={classes.text_envio}>
            Dirección: Urb. 2da Entrada Palao - Lima - Perú.
          </Typography>
          <div className={classes.alertNotDelivered}>
            <Typography variant="body2" className={classes.text_title}>
              {mensajeEnvio}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.text_title}>
            MÉTODO DE PAGO
          </Typography>
          <Typography>Método: Paypal</Typography>
          <div className={classes.alertDelivered}>
            <Typography variant="body2" className={classes.text_title}>
              {mensajePago}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.text_title}>
            PRODUCTOS
          </Typography>
          <TableContainer className={classes.gridmb}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <CardMedia
                      className={classes.imgProductoPC}
                      image="http://standsyexpos.com/wp-content/gallery/escritorios-gamer/Become-con-repisas.png"
                      title="imagen en proceso compra"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.text_detalle}>
                      Puerta principal en madera
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.text_detalle}>
                      2 x S/123 = S/246
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={4} xs={12}>
          <TableContainer component={Paper} square>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography className={classes.text_title} variant="h6">
                      RESUMEN DEL PEDIDO
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.text_title}>
                      Productos
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.text_title}>
                      S/246
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.text_title}>
                      Envío
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.text_title}>S/2</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.text_title}>
                      Impuesto
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.text_title}>S/8</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.text_title}>
                      Total
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.text_title}>
                      S/256
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    {/*botón para el usuario */}
                    {/* <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.gridmb}
                    >
                      Paypal
                    </Button>
                    <Button fullWidth variant="contained" size="large">
                      Tarjeta de Crédito o Débito
                    </Button> */}

                    {/* botón para el admin */}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      MARCAR COMO ENTREGADO
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrdenCompra;
