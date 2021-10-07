import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const getCarritoCompra = (dispatch, id) => {
  return new Promise((resolve, eject) => {
    instancia
      .get(`/api/carritocompra?id=${id}`)
      .then((response) => {
        dispatch({
          type: "CARRITO_SESION",
          id: response.data.id,
          items: response.data.items,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const setCarritoCompra = (dispatch, carritoCompra) => {
  return new Promise((resolve, eject) => {
    instancia
      .post(`/api/carritocompra`, carritoCompra)
      .then((response) => {
        dispatch({
          type: "CARRITO_SESION",
          id: response.data.id,
          items: response.data.items,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const addItem = (carrito, item, dispatch) => {
  if (!carrito.items) {
    carrito.items = [];
  }

  const indice = carrito.items.findIndex((i) => i.id === item.id);
  if (indice === -1) {
    carrito.items.push(item);
  } else {
    carrito.items[indice].cantidad += parseInt(item.cantidad);
  }

  setCarritoCompra(dispatch, carrito);
};
