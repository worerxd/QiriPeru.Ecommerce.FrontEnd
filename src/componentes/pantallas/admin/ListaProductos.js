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
  TextField,
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

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    console.log("Dato buscado", value);

    requestProductos.search = value;
    const getListaProductos = async () => {
      const response = await getProductos(requestProductos);
      setPaginadorProductos(response.data);
      console.log("respuesta", response);
    };
    getListaProductos();
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
      <Grid container>
        <Grid item lg={6} sm={6} xs={12}>
          <TextField
            id="outlined-basic"
            label="Buscar"
            variant="outlined"
            onChange={(event) => handleSearch(event)}
          />
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
              <TableRow
                key={producto.id}
                style={{
                  background: producto.stock > 0 ? "white" : "pink",
                }}
              >
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
