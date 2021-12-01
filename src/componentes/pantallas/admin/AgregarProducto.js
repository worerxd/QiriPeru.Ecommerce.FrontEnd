import {
  Avatar,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../../theme/useStyles";
import ImageUploader from "react-images-upload";
import {
  getProductosPorNombre,
  registrarProducto,
} from "../../../actions/ProductoAction";
import { v4 as uuidv4 } from "uuid";
import { useStateValue } from "../../../contexto/store";
import NotFound from "../../404/NotFound";

const AgregarProducto = (props) => {
  const classes = useStyles();
  const imagenDefault =
    "https://sc04.alicdn.com/kf/HTB1gVNlNXXXXXX7XXXXq6xXFXXX5.jpg";

  const [categoria, setCategoria] = useState("");
  const [material, setMaterial] = useState("");
  const [producto, setProducto] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    stock: 0,
    materialId: 0,
    categoriaId: 0,
    precio: 0.0,
    imagen: "",
    file: "",
    imagenTemporal: null,
  });

  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [isNameValid, setIsNameValid] = useState(true);

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };
  const handleMaterialChange = (event) => {
    setMaterial(event.target.value);
  };

  const guardarProducto = async () => {
    producto.categoriaId = categoria;
    producto.materialId = material;

    const response = await getProductosPorNombre(producto.nombre);
    console.log("response", response);
    if (response.data.count > 0) {
      setIsNameValid(false);
      return;
    } else {
      setIsNameValid(true);
      const resultado = await registrarProducto(producto);
      console.log("resultado: ", resultado);
      props.history.push("/admin/listaProductos");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subirImagen = (imagenes) => {
    let foto = imagenes[0];

    let fotoUrl = "";
    try {
      fotoUrl = URL.createObjectURL(foto);
    } catch (e) {
      console.log(e);
    }
    setProducto((prev) => ({
      ...prev,
      file: foto,
      imagenTemporal: fotoUrl,
    }));
  };

  const keyImage = uuidv4();

  return (
    <Container className={classes.containermt} style={{ textAlign: "center" }}>
      {sesionUsuario ? (
        sesionUsuario.usuario ? (
          sesionUsuario.usuario.admin ? (
            <div>
              <Grid container justifyContent="center">
                <Grid item sm={6} xs={12}>
                  <Typography variant="h4" className={classes.text_title}>
                    AGREGAR PRODUCTO
                  </Typography>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className={classes.form}
                  >
                    <TextField
                      label="Nombre Producto"
                      variant="outlined"
                      fullWidth
                      className={classes.gridmb}
                      InputLabelProps={{ shrink: true }}
                      name="nombre"
                      value={producto.nombre}
                      onChange={handleChange}
                    />
                    {!isNameValid ? (
                      <span style={{ color: "red" }}>
                        El nombre está en uso, cambie de nombre al producto.
                      </span>
                    ) : (
                      ""
                    )}
                    <TextField
                      label="Precio"
                      variant="outlined"
                      fullWidth
                      className={classes.gridmb}
                      InputLabelProps={{ shrink: true }}
                      name="precio"
                      value={producto.precio}
                      onChange={handleChange}
                    />

                    <TextField
                      label="Stock"
                      variant="outlined"
                      fullWidth
                      className={classes.gridmb}
                      InputLabelProps={{ shrink: true }}
                      name="stock"
                      value={producto.stock}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Descripción"
                      variant="outlined"
                      multiline
                      minRows={4}
                      fullWidth
                      className={classes.gridmb}
                      InputLabelProps={{ shrink: true }}
                      name="descripcion"
                      value={producto.descripcion}
                      onChange={handleChange}
                    />

                    <FormControl className={classes.formControl}>
                      <InputLabel id="material-select-label">
                        Material
                      </InputLabel>
                      <Select
                        labelId="material-select-label"
                        id="material-select"
                        value={material}
                        onChange={handleMaterialChange}
                      >
                        <MenuItem value={1}>Cedro</MenuItem>
                        <MenuItem value={2}>MDF</MenuItem>
                        <MenuItem value={3}>Melamine</MenuItem>
                        <MenuItem value={4}>Caoba</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                      <InputLabel id="categoria-select-label">
                        Categoria
                      </InputLabel>
                      <Select
                        labelId="categoria-select-label"
                        id="categoria-select"
                        value={categoria}
                        onChange={handleCategoriaChange}
                      >
                        <MenuItem value={1}>Cocina</MenuItem>
                        <MenuItem value={2}>Interiores</MenuItem>
                        <MenuItem value={3}>Baño</MenuItem>
                        <MenuItem value={4}>Comedor</MenuItem>
                        <MenuItem value={5}>Sala</MenuItem>
                        <MenuItem value={6}>Dormitorio</MenuItem>
                      </Select>
                    </FormControl>

                    <Grid container spacing={2}>
                      <Grid item md={6} sm={6} xs={12}>
                        <ImageUploader
                          withIcon={true}
                          singleImage={true}
                          key={keyImage}
                          buttonText="Buscar Imagen"
                          imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                          maxFileSize={5242880}
                          onChange={subirImagen}
                        />
                      </Grid>
                      <Grid item md={6} sm={6} xs={12}>
                        <Avatar
                          variant="square"
                          className={classes.avatarProducto}
                          src={
                            producto.imagenTemporal
                              ? producto.imagenTemporal
                              : producto.imagen
                              ? producto.imagen
                              : imagenDefault
                          }
                        />
                      </Grid>
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={guardarProducto}
                    >
                      AGREGAR
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </div>
          ) : (
            <NotFound />
          )
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </Container>
  );
};

export default AgregarProducto;
