import HttpCliente from "../servicios/HttpCliente";

export const getProductos = () => {
  return new Promise((resolve, eject) => {
    HttpCliente.get("/api/producto").then((response) => {
      resolve(response);
    });
  });
};
