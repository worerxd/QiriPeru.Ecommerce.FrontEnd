import {
  Button,
  Container,
  Grid,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { getProductos } from "../../../actions/ProductoAction";
import useStyles from "../../../theme/useStyles";
import { ProductoArray } from "../../data/dataPrueba";

const ListaProductos = (props) => {
  const classes = useStyles();

  const [requestProductos, setRequestProductos] = useState({
    pageIndex: 1,
    pageSize: 10,
    search: "",
  });

  const [paginadorProductos, setPaginadorProductos] = useState({
    count: 0,
    pageIndex: 0,
    pageSize: 0,
    pageCount: 0,
    data: [],
  });

  const handleChange = (event, value) => {
    setRequestProductos((anterior) => ({
      ...anterior,
      pageIndex: value,
    }));
  };

  useEffect(() => {
    const getListaProductos = async () => {
      const response = await getProductos(requestProductos);
      setPaginadorProductos(response.data);
    };

    getListaProductos();
  }, [requestProductos]);

  const agregarProducto = () => {
    props.history.push("/admin/agregarProducto");
  };

  const editaProducto = (id) => {
    props.history.push("/admin/editarProducto/" + id);
  };

  return (
    <Container className={classes.containermt}>
      <Grid container>
        <Grid item lg={6} sm={6} xs={12}>
          <Typography variant="h4" className={classes.text_title}>
            PRODUCTOS
          </Typography>
        </Grid>
        <Grid item lg={6} sm={6} xs={12}>
          <Button
            variant="contained"
            color="inherit"
            className={classes.buttonAgregar}
            onClick={agregarProducto}
          >
            <Icon>add</Icon>
            AGREGAR PRODUCTO
          </Button>
        </Grid>
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>PRECIO</TableCell>
              <TableCell>MATERIAL</TableCell>
              <TableCell>CATEGORIA</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginadorProductos.data.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.id}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.precio}</TableCell>
                <TableCell>{producto.materialNombre}</TableCell>
                <TableCell>{producto.categoriaNombre}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => editaProducto(producto.id)}
                    variant="contained"
                    color="primary"
                  >
                    <Icon>edit</Icon>
                  </Button>
                  <Button variant="contained" color="secondary">
                    <Icon>delete</Icon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={paginadorProductos.pageCount}
        page={paginadorProductos.pageIndex}
        size="small"
        onChange={handleChange}
      />
    </Container>
  );
};

export default ListaProductos;
