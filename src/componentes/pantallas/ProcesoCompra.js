import {
  Button,
  CardMedia,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
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
import useStyles from "../../theme/useStyles";

const ProcesoCompra = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);

  const continuarProceso = () => {
    setActiveStep((prepActiveStep) => prepActiveStep + 1);
  };

  const retrocederProceso = () => {
    setActiveStep((prepActiveStep) => prepActiveStep - 1);
  };

  const realizarPedido = () => {
    const idCompra = "05d864a0-3c28-43ea-becb-283b19243cae";
    props.history.push("/ordenCompra/" + idCompra);
  };

  return (
    <Container className={classes.containermt}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Registrarse</StepLabel>
        </Step>
        <Step>
          <StepLabel>Envío</StepLabel>
        </Step>
        <Step>
          <StepLabel>Método de Pago</StepLabel>
        </Step>
        <Step>
          <StepLabel>Realizar Pedido</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 1 ? (
        <Grid md={6} xs={12} className={classes.gridPC}>
          <Typography variant="h6" className={classes.text_title}>
            ENVIO DEL PRODUCTO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  label="Dirección"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Ciudad"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="País"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
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
            MÉTODO DE PAGO
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <FormLabel>Seleccione Método</FormLabel>
                <RadioGroup>
                  <FormControlLabel
                    value="Paypal"
                    control={<Radio color="primary"></Radio>}
                    label="Paypel o Tarjeta"
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
              ENVÍO
            </Typography>
            <Typography>
              Dirección: Urb. 2da Entrada Palao - Lima - Perú.
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6" className={classes.text_title}>
              MÉTODO DE PAGO
            </Typography>
            <Typography>Método: Paypal</Typography>
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
                      <Typography className={classes.text_title}>
                        S/2
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.text_title}>
                        Impuesto
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className={classes.text_title}>
                        S/8
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
                        S/256
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button
                        onClick={realizarPedido}
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        REALIZAR PEDIDO
                      </Button>
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
