import HttpCliente from "../servicios/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const getProductos = (request) => {
  return new Promise((resolve, eject) => {
    instancia
      .get(
        `/api/producto?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&search=${request.search}`
      )
      .then((response) => {
        resolve(response);
      });
  });
};

export const getProducto = (id) => {
  return new Promise((resolve, eject) => {
    instancia
      .get(`/api/producto/${id}`)
      .then((response) => resolve(response))
      .catch((error) => {
        resolve(error.response);
      });
  });
};
