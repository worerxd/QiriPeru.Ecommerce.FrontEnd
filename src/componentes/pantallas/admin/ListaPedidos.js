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
import React, { useEffect, useState } from "react";
import { getAllListaOrdenCompra } from "../../../actions/OrdenCompraAction";
import useStyles from "../../../theme/useStyles";
import NotFound from "../../404/NotFound";

const ListaPedidos = (props) => {
  const classes = useStyles();

  const [pedidos, setPedidos] = useState([]);
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    const getListaPedidos = async () => {
      const response = await getAllListaOrdenCompra();
      if (!response) {
        setIsValid(false);
      } else {
        setIsValid(true);
        setPedidos(response.data);
      }
    };
    getListaPedidos();
  }, []);

  const verDetalle = (id) => {
    props.history.push("/ordenCompra/" + id);
  };

  return (
    <Container className={classes.containermt}>
      {!isValid ? (
        <NotFound />
      ) : (
        <div>
          <Typography variant="h4" className={classes.text_title}>
            PEDIDOS
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>USUARIO EMAIL</TableCell>
                  <TableCell>FECHA DE COMPRA</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>TIPO DE ENVIO</TableCell>
                  <TableCell>ENTREGA</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell>{pedido.id}</TableCell>
                    <TableCell>{pedido.compradorEmail}</TableCell>
                    <TableCell>
                      {new Date(pedido.ordenCompraFecha).toLocaleString(
                        "es-ES",
                        {
                          timeZone: "UTC",
                        }
                      )}
                    </TableCell>
                    <TableCell>{pedido.total}</TableCell>
                    <TableCell>{pedido.tipoEnvio}</TableCell>
                    <TableCell>
                      <Icon className={classes.iconDelivered}>check</Icon>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ background: "#43b609" }}
                        onClick={() => verDetalle(pedido.id)}
                      >
                        DETALLES
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Container>
  );
};

export default ListaPedidos;
