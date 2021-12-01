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
import {
  getOrdenCompra,
  updateOrdenCompraStatus,
} from "../../actions/OrdenCompraAction";
import { useStateValue } from "../../contexto/store";
import useStyles from "../../theme/useStyles";

const OrdenCompra = (props) => {
  const classes = useStyles();

  const { id } = props.match.params;
  const mensajeEnvioPendiente = "No entregado";
  const mensajePago = "Pagado en 2021-09-06";

  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [pedido, setPedido] = useState({
    id: 0,
    fullName: "",
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

    console.log("pedido", pedido);
    getOrdenCompraDetalle();
  }, []);

  const handleClickDelivered = async () => {
    await updateOrdenCompraStatus(id);
    props.history.push("/admin/listaPedidos");
  };

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
            Nombres: {pedido.fullName}
          </Typography>
          <Typography variant="body2" className={classes.text_envio}>
            Email: {pedido.compradorEmail}
          </Typography>
          <Typography variant="body2" className={classes.text_envio}>
            Dirección:{" "}
            {pedido.direccionEnvio.calle +
              " - " +
              pedido.direccionEnvio.ciudad +
              " - " +
              pedido.direccionEnvio.pais}
            .
          </Typography>

          {pedido.status === "Pendiente" && (
            <div className={classes.alertNotDelivered}>
              <Typography variant="body2" className={classes.text_title}>
                {mensajeEnvioPendiente}
              </Typography>
            </div>
          )}
          {pedido.status === "La orden fue entregada" && (
            <div className={classes.alertDelivered}>
              <Typography variant="body2" className={classes.text_title}>
                {pedido.status}
              </Typography>
            </div>
          )}
          {pedido.status === "La orden fue cancelada" && (
            <div className={classes.alertNotDelivered}>
              <Typography variant="body2" className={classes.text_title}>
                {pedido.status}
              </Typography>
            </div>
          )}
          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.text_title}>
            MÉTODO DE PAGO
          </Typography>
          <Typography>Método: Paypal</Typography>
          <div className={classes.alertDelivered}>
            <Typography variant="body2" className={classes.text_title}>
              Fecha:{" "}
              {new Date(pedido.ordenCompraFecha).toLocaleString("es-ES", {
                timeZone: "UTC",
              })}
            </Typography>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.text_title}>
            PRODUCTOS
          </Typography>
          <TableContainer className={classes.gridmb}>
            <Table>
              <TableBody>
                {pedido.ordenItems.map((item) => (
                  <TableRow key={item.productoId}>
                    <TableCell>
                      <CardMedia
                        className={classes.imgProductoPC}
                        image={item.productoImagen}
                        title="imagen en proceso compra"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        {item.productoNombre}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_detalle}>
                        {item.cantidad +
                          " x " +
                          item.precio +
                          " = " +
                          item.cantidad * item.precio}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
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
                      {pedido.subTotal}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.text_title}>
                      {pedido.tipoEnvio
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, function (str) {
                          return str.toUpperCase();
                        })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.text_title}>
                      S/ {pedido.tipoEnvioPrecio}
                    </Typography>
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
                      S/ {" " + pedido.total}
                    </Typography>
                  </TableCell>
                </TableRow>

                {sesionUsuario ? (
                  sesionUsuario.usuario ? (
                    sesionUsuario.usuario.admin ? (
                      pedido.status === "Pendiente" ? (
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Button
                              onClick={handleClickDelivered}
                              variant="contained"
                              color="primary"
                              size="large"
                              fullWidth
                            >
                              MARCAR COMO ENTREGADO
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {sesionUsuario ? (
                  sesionUsuario.usuario ? (
                    sesionUsuario.usuario.admin ? (
                      pedido.status === "La orden fue entregada" ? (
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Button
                              onClick={handleClickDelivered}
                              variant="contained"
                              color="primary"
                              size="large"
                              fullWidth
                            >
                              MARCAR COMO CANCELADO
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrdenCompra;
