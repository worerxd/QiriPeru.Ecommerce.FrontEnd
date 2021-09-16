import {
  Button,
  Container,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "../../../theme/useStyles";

const ListaPedidos = (props) => {
  const classes = useStyles();

  const verDetalle = () => {
    const id = "87daaf8e-32c0-4f10-8107-9f5b214ced14";
    props.history.push("/ordenCompra/" + id);
  };

  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        PEDIDOS
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>USUARIO</TableCell>
              <TableCell>FECHA</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>PAGADO</TableCell>
              <TableCell>ENTREGADO</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>6dbbceb7-ca60-4dba-bf1b-a2ea72828469</TableCell>
              <TableCell>Raul Lavado</TableCell>
              <TableCell>2021-09-15</TableCell>
              <TableCell>239</TableCell>
              <TableCell>2021-09-08</TableCell>
              <TableCell>
                <Icon className={classes.iconDelivered}>check</Icon>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={verDetalle}
                >
                  DETALLES
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>34650731-6ea2-41df-85bf-30bf820b15f1</TableCell>
              <TableCell>Luis Baldeon</TableCell>
              <TableCell>2021-09-03</TableCell>
              <TableCell>129</TableCell>
              <TableCell>2021-08-27</TableCell>
              <TableCell>
                <Icon className={classes.iconNotDelivered}>clear</Icon>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={verDetalle}
                >
                  DETALLES
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListaPedidos;
