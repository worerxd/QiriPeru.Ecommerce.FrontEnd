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

const Usuarios = (props) => {
  const classes = useStyles();

  const editaUsuario = () => {
    const id = "a646154d-9dcc-41ab-87d6-f6bd751e7bf9";
    props.history.push("/admin/usuario/" + id);
  };

  return (
    <Container className={classes.containermt}>
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
              <TableCell>ADMIN</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>a646154d-9dcc-41ab-87d6-f6bd751e7bf9</TableCell>
              <TableCell>Walther Vergaray</TableCell>
              <TableCell>walther.vergaray@gmail.com</TableCell>
              <TableCell>
                <Icon className={classes.iconDelivered}>check</Icon>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={editaUsuario}
                >
                  <Icon>edit</Icon>
                </Button>
                <Button variant="contained" color="secondary">
                  <Icon>delete</Icon>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>da042fc2-7776-4179-8ec6-5214acfa49bf</TableCell>
              <TableCell>Luis Baldeon</TableCell>
              <TableCell>luis.baldeon@gmail.com</TableCell>
              <TableCell>
                <Icon className={classes.iconNotDelivered}>clear</Icon>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={editaUsuario}
                >
                  <Icon>edit</Icon>
                </Button>
                <Button variant="contained" color="secondary">
                  <Icon>delete</Icon>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Usuarios;
