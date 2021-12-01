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
import React, { useEffect, useState } from "react";
import useStyles from "../../../theme/useStyles";
import ImageUploader from "react-images-upload";
import {
  actualizarProducto,
  getProducto,
} from "../../../actions/ProductoAction";
import { v4 as uuidv4 } from "uuid";
import { useStateValue } from "../../../contexto/store";
import NotFound from "../../404/NotFound";

const EditarProducto = (props) => {
  const classes = useStyles();

  const imagenDefault =
    "https://sc04.alicdn.com/kf/HTB1gVNlNXXXXXX7XXXXq6xXFXXX5.jpg";
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

  const [categoria, setCategoria] = useState("");
  const [material, setMaterial] = useState("");
  const [{ sesionUsuario }, dispatch] = useStateValue();

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleMaterialChange = (event) => {
    setMaterial(event.target.value);
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

  const guardarProducto = async () => {
    producto.categoriaId = categoria;
    producto.materialId = material;
    const id = props.match.params.id;
    const resultado = await actualizarProducto(id, producto);
    console.log("resultado: ", resultado);
    props.history.push("/admin/listaProductos");
  };

  const keyImage = uuidv4();

  useEffect(() => {
    const id = props.match.params.id;

    const getProductoAsync = async () => {
      const response = await getProducto(id);

      setProducto(response.data);
      setCategoria(response.data.categoriaId);
      setMaterial(response.data.materialId);
    };

    getProductoAsync();
  }, [props.match.params.id]);

  return (
    <Container className={classes.containermt} style={{ textAlign: "center" }}>
      {sesionUsuario ? (
        sesionUsuario.usuario ? (
          sesionUsuario.usuario.admin ? (
            <div>
              <Grid container justifyContent="center">
                <Grid item sm={6} xs={12}>
                  <Typography variant="h4" className={classes.text_title}>
                    EDITAR PRODUCTO
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
                      value={producto.nombre}
                      name="nombre"
                      onChange={handleChange}
                    />
                    <TextField
                      label="Precio"
                      variant="outlined"
                      fullWidth
                      className={classes.gridmb}
                      InputLabelProps={{ shrink: true }}
                      value={producto.precio}
                      name="precio"
                      onChange={handleChange}
                    />
                    <TextField
                      label="Stock"
                      variant="outlined"
                      fullWidth
                      className={classes.gridmb}
                      InputLabelProps={{ shrink: true }}
                      value={producto.stock}
                      name="stock"
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
                      value={producto.descripcion}
                      name="descripcion"
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
                        <MenuItem value={1}>Melamine</MenuItem>
                        <MenuItem value={2}>Dry Wall</MenuItem>
                        <MenuItem value={3}>Madera Tornillo</MenuItem>
                        <MenuItem value={4}>Madera Capirona</MenuItem>
                        <MenuItem value={5}>Madera Cedro</MenuItem>
                        <MenuItem value={6}>Madera Caoba</MenuItem>
                        <MenuItem value={7}>Mdf</MenuItem>
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
                          singleImage={true}
                          key={keyImage}
                          withIcon={true}
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
                      ACTUALIZAR
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

export default EditarProducto;
