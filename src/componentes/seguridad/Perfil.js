import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "../../theme/useStyles";
import ImageUploader from "react-images-upload";

const Perfil = (props) => {
  const classes = useStyles();

  const verDetalles = () => {
    const id = "4f640d35-2b7b-423a-b4a2-b6715b9765bf";
    props.history.push("/ordenCompra/" + id);
  };

  return (
    <Container className={classes.containermt}>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <Typography variant="h5" className={classes.text_title}>
            PERFIL DE USUARIO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <ImageUploader
              withIcon={false}
              buttonStyles={{
                borderRadius: "50%",
                padding: 10,
                margin: 0,
                position: "absolute",
                bottom: 15,
                left: 15,
              }}
              className={classes.imageUploader}
              buttonText={<Icon>add_a_photo</Icon>}
              label={
                <Avatar
                  alt="mi perfil"
                  className={classes.avatarPerfil}
                  src="https://scontent.flim19-1.fna.fbcdn.net/v/t1.6435-9/97064433_10222786013588766_3925447160463622144_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHpffQEcUwlaeubfrw35GRVuR65ZYgwK1e5HrlliDArV2LRSBy9ZhwZb2PCk7_OyFo&_nc_ohc=0vrfgNoQgkUAX_FEp9F&tn=suglAIaarO9sWgnD&_nc_ht=scontent.flim19-1.fna&oh=71e303d0f2d8e14bb15669831178dce6&oe=61652FFD"
                />
              }
              imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
              maxFileSize={5242880}
            />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              value="Walther"
            />
            <TextField
              label="Apellidos"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              value="Vergaray"
            />
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              value="walther.vergaray@gmail.com"
            />
            <Divider className={classes.divider} />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
            />
            <TextField
              label="Confirmar Password"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
            />
            <Button variant="contained" color="primary">
              ACTUALIZAR
            </Button>
          </form>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant="h5" className={classes.text_title}>
            MIS PEDIDOS
          </Typography>
          <TableContainer className={classes.form}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>FECHA</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAGADO</TableCell>
                  <TableCell>ENTREGADO</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>4f640d35-2b7b-423a-b4a2-b6715b9765bf</TableCell>
                  <TableCell>2021-09-15</TableCell>
                  <TableCell>123</TableCell>
                  <TableCell>2021-09-12</TableCell>
                  <TableCell>
                    {/*<Icon className={classes.iconNotDelivered}>clear</Icon>*/}
                    <Icon className={classes.iconDelivered}>check</Icon>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={verDetalles}>
                      DETALLES
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

export default Perfil;
