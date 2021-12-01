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
import useStyles from "../../../theme/useStyles";
import { getUsuarios } from "../../../actions/UsuarioAction";
import { Pagination } from "@material-ui/lab";
import { withRouter } from "react-router-dom";
import NotFound from "../../404/NotFound";

const Usuarios = (props) => {
  const classes = useStyles();

  const [requestUsuarios, setRequestUsuarios] = useState({
    pageIndex: 1,
    pageSize: 5,
    search: "",
  });

  const [paginadorUsuarios, setPaginadorUsuarios] = useState({
    count: 0,
    pageIndex: 0,
    pageSize: 0,
    pageCount: 0,
    data: [],
  });

  const [isValid, setIsValid] = useState();

  const handleChange = (event, value) => {
    setRequestUsuarios((anterior) => ({
      ...anterior,
      pageIndex: value,
    }));
  };

  const editaUsuario = (id) => {
    props.history.push("/admin/usuario/" + id);
  };

  useEffect(() => {
    const getListaUsuarios = async () => {
      const response = await getUsuarios(requestUsuarios);
      if (!response) {
        setIsValid(false);
      } else {
        setIsValid(true);
        setPaginadorUsuarios(response.data);
      }
    };

    getListaUsuarios();
  }, [requestUsuarios]);

  return (
    <Container className={classes.containermt}>
      {!isValid ? (
        <NotFound />
      ) : (
        <div>
          <Typography variant="h4" className={classes.text_title}>
            USUARIOS
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>USUARIO</TableCell>
                  <TableCell>EMAIL</TableCell>
                  <TableCell>USERNAME</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginadorUsuarios.data.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.id}</TableCell>
                    <TableCell>
                      {usuario.nombre + " " + usuario.apellido}
                    </TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.userName}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => editaUsuario(usuario.id)}
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
            count={paginadorUsuarios.pageCount}
            page={paginadorUsuarios.pageIndex}
            size="small"
            onChange={handleChange}
          />
        </div>
      )}
    </Container>
  );
};

export default withRouter(Usuarios);
