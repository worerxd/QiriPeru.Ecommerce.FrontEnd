import axios from "axios";
import { uploadImage } from "../firebase";
import HttpCliente from "../servicios/HttpCliente";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const getListaOrdenCompra = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(`/api/OrdenCompra`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getAllListaOrdenCompra = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(`/api/OrdenCompra/all`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getOrdenCompra = (id) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(`/api/OrdenCompra/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
