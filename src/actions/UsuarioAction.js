import HttpCliente from "../servicios/HttpCliente";
import axios from "axios";
import { uploadImage } from "../firebase";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const actualizarUsuario = async (id, usuario, dispatch) => {
  if (usuario.file) {
    const urlImage = await uploadImage(usuario.file);
    usuario.imagen = urlImage;
  }

  return new Promise((resolve, eject) => {
    HttpCliente.put(`/api/usuario/actualizar/${id}`, usuario)
      .then((response) => {
        dispatch({
          type: "ACTUALIZAR_USUARIO",
          nuevoUsuario: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const registrarUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    instancia
      .post("/api/usuario/registrar", usuario)
      .then((response) => {
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const loginUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    instancia
      .post("/api/usuario/login", usuario)
      .then((response) => {
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getUsuario = (dispatch) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get("/api/usuario")
      .then((response) => {
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
