import {
  Button,
  CardMedia,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { registrarOrdenCompra } from "../../actions/OrdenCompraAction";
import { useStateValue } from "../../contexto/store";
import useStyles from "../../theme/useStyles";

import ReactDOM from "react-dom";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const ProcesoCompra = (props) => {
  const classes = useStyles();
  const [{ sesionCarritoCompra }, dispatch] = useStateValue();
  const [activeStep, setActiveStep] = useState(1);
  const [shipAddress, setshipAddress] = useState({
    calle: "",
    ciudad: "",
    departamento: "",
    codigoPostal: "",
    pais: "",
  });
  const [tipoEnvio, setTipoEnvio] = useState(1);

  const ordenCompra = {
    carritoCompraId: "",
    tipoEnvio: "",
    direccionEnvio: {
      calle: "",
      ciudad: "",
      departamento: "",
      codigoPostal: "",
      pais: "",
    },
  };

  const [isValid, setIsValid] = useState(false);

  const [tipoEnvioPrecio, setTipoEnvioPrecio] = useState(15);

  const miArray = sesionCarritoCompra ? sesionCarritoCompra.items : [];
  let suma = 0;
  miArray.forEach((prod) => {
    suma += prod.precio * prod.cantidad;
  });

  const continuarProceso = () => {
    setActiveStep((prepActiveStep) => prepActiveStep + 1);
    if (tipoEnvio === 1) {
      setTipoEnvioPrecio(15);
    } else if (tipoEnvio === 2) {
      setTipoEnvioPrecio(10);
    } else if (tipoEnvio === 3) {
      setTipoEnvioPrecio(5);
    } else setTipoEnvioPrecio(0);
  };

  const retrocederProceso = () => {
    setActiveStep((prepActiveStep) => prepActiveStep - 1);
  };

  const realizarPedido = async () => {
    ordenCompra.direccionEnvio = shipAddress;
    ordenCompra.carritoCompraId = sesionCarritoCompra.id;
    ordenCompra.tipoEnvio = tipoEnvio;

    await registrarOrdenCompra(ordenCompra);
    window.localStorage.removeItem("carrito");
    props.history.push("/perfil");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setshipAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateAddress();
  };

  const onHandleBlur = () => {
    validateAddress();
  };

  const handleChangeSelect = (e) => {
    setTipoEnvio(e.target.value);
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: Math.round(suma * 100) / 100 + tipoEnvioPrecio,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    realizarPedido();
    return actions.order.capture();
  };

  const validateAddress = () => {
    if (
      shipAddress.calle.length > 0 &&
      shipAddress.ciudad.length > 0 &&
      shipAddress.departamento.length > 0 &&
      shipAddress.pais.length > 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    console.log(isValid);
  };

  return (
    <Container className={classes.containermt} justifyContent="center">
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Registrarse</StepLabel>
        </Step>
        <Step>
          <StepLabel>Env??o</StepLabel>
        </Step>
        <Step>
          <StepLabel>M??todo de Pago</StepLabel>
        </Step>
        <Step>
          <StepLabel>Realizar Pedido</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 1 ? (
        <Grid item md={6} xs={12} className={classes.gridPC}>
          <Typography variant="h6" className={classes.text_title}>
            DIRECCI??N DE ENVIO DEL PRODUCTO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  label="Calle"
                  name="calle"
                  value={shipAddress.calle}
                  onChange={handleChange}
                  onBlur={onHandleBlur}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Ciudad"
                  name="ciudad"
                  value={shipAddress.ciudad}
                  onChange={handleChange}
                  onBlur={onHandleBlur}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Departamento"
                  name="departamento"
                  value={shipAddress.departamento}
                  onChange={handleChange}
                  onBlur={onHandleBlur}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="C??digo Postal"
                  name="codigoPostal"
                  value={shipAddress.codigoPostal}
                  onChange={handleChange}
                  onBlur={onHandleBlur}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Pa??s"
                  name="pais"
                  value={shipAddress.pais}
                  onChange={handleChange}
                  onBlur={onHandleBlur}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="tipoEnvioLabel" shrink={true}>
                  Tipo de Env??o
                </InputLabel>
                <Select
                  labelId="tipoEnvioLabel"
                  id="tipoEnvioSelect"
                  value={tipoEnvio}
                  onChange={handleChangeSelect}
                  onBlur={onHandleBlur}
                  autoWidth
                  InputLabelProps={{ shrink: true }}
                  required
                >
                  <MenuItem value={1}>Env??o R??pido</MenuItem>
                  <MenuItem value={2}>Env??o Regular</MenuItem>
                  <MenuItem value={3}>Env??o Barato</MenuItem>
                  <MenuItem value={4}>Env??o Gratis</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                  onClick={continuarProceso}
                >
                  CONTINUAR
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      ) : activeStep === 2 ? (
        <Grid md={3} xs={12} className={classes.gridPC}>
          <Typography variant="h6" className={classes.text_title}>
            M??TODO DE PAGO
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <FormLabel>Seleccione M??todo</FormLabel>
                <RadioGroup>
                  <FormControlLabel
                    value="Paypal"
                    control={<Radio color="primary"></Radio>}
                    label="Paypal"
                    checked={true}
                    disabled={true}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonAnterior}
                onClick={retrocederProceso}
              >
                ANTERIOR
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={continuarProceso}
              >
                CONTINUAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : activeStep === 3 ? (
        <Grid container className={classes.gridPC}>
          <Grid item md={8} xs={12} className={classes.gridLR}>
            <Typography variant="h6" className={classes.text_title}>
              ENV??O
            </Typography>
            <Typography>
              Direcci??n:{" "}
              {shipAddress.calle +
                " - " +
                shipAddress.ciudad +
                " - " +
                shipAddress.departamento +
                " - " +
                shipAddress.pais}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6" className={classes.text_title}>
              M??TODO DE PAGO
            </Typography>
            <Typography>M??todo: Paypal</Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6" className={classes.text_title}>
              PRODUCTOS
            </Typography>
            <TableContainer className={classes.gridmb}>
              <Table>
                <TableBody>
                  {miArray.map((item) => (
                    <TableRow>
                      <TableCell>
                        <CardMedia
                          className={classes.imgProductoPC}
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
                          {item.cantidad} x S/{item.precio} ={" "}
                          {item.precio * item.cantidad}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={retrocederProceso}
            >
              ANTERIOR
            </Button>
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
                        S/.{Math.round(suma * 100) / 100}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.text_title}>
                        Env??o
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_title}>
                        {tipoEnvioPrecio}
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
                        S/.{Math.round(suma * 100) / 100 + tipoEnvioPrecio}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <PayPalButton
                        createOrder={(data, actions) =>
                          createOrder(data, actions)
                        }
                        onApprove={(data, actions) => onApprove(data, actions)}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : null}
    </Container>
  );
};

export default ProcesoCompra;
