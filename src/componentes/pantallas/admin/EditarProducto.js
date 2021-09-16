import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "../../../theme/useStyles";
import ImageUploader from "react-images-upload";

const EditarProducto = () => {
  const classes = useStyles();
  return (
    <Container className={classes.containermt} style={{ textAlign: "center" }}>
      <Grid container justifyContent="center">
        <Grid item sm={6} xs={12}>
          <Typography variant="h4" className={classes.text_title}>
            EDITAR PRODUCTO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <TextField
              label="Nombre Producto"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{ shrink: true }}
              value="Puerta principal en madera caoba"
            />
            <TextField
              label="Precio"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{ shrink: true }}
              value={299}
            />
            <TextField
              label="Material"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{ shrink: true }}
              value="Caoba"
            />
            <TextField
              label="Stock"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{ shrink: true }}
              value={15}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              multiline
              minRows={4}
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{ shrink: true }}
              value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            />
            <Grid container spacing={2}>
              <Grid item md={6} sm={6} xs={12}>
                <ImageUploader
                  withIcon={true}
                  buttonText="Buscar Imagen"
                  imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                  maxFileSize={5242880}
                />
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <Avatar
                  variant="square"
                  className={classes.avatarProducto}
                  src="https://sc04.alicdn.com/kf/HTB1gVNlNXXXXXX7XXXXq6xXFXXX5.jpg"
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary">
              ACTUALIZAR
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditarProducto;
