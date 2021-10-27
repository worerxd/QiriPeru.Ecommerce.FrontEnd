import React from "react";
import ReactDOM from "react-dom";
import paypal from "paypal-checkout";

const PaypalCheckoutButton = (suma, miArray, realizarPedido) => {
  const paypalConf = {
    currency: "PEN",
    env: "sandbox",
    client: {
      sandbox:
        "Ae4wL2xdfzVWgl8HLVdB9WpHGDxWWGrwgSRdpiCu5DD4mrrYbncvgq71Y_J4JX-tWRGxevHCsd8n8Cpq",
      production: "-- id--",
    },
    style: {
      label: "pay",
      size: "medium",
      shape: "pill",
      color: "gold",
    },
  };

  const PaypalButton = paypal.Button.driver("react", { React, ReactDOM });

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: suma,
            currency: paypalConf.currency,
          },
          description: "Compra en Qiri Perú",
          custom: "",
          item_list: {
            items: miArray,
          },
        },
      ],
      note_to_payer: "Contáctanos para cualquier aclaración",
    };

    return actions.payment.create({ payment });
  };

  const onApprove = (data, actions) => {
    return actions.payment
      .execute()
      .then((response) => {
        console.log("response: ", response);
        alert(`El pago fue procesado correctamente, ID: ${response.id}`);
        // realizarPedido();
      })
      .catch((error) => {
        console.log(error);
        alert("Ocurrió un error al procesar el pago con PayPal");
      });
  };

  const onError = (error) => {
    console.log("array:", miArray);
    console.log("suma:", suma);
    console.log(error);
    alert("El pago no fue realizado, vuelva a intentarlo");
  };

  const onCancel = (data, actions) => {
    alert("Pago no realizado, el usuario canceló el proceso");
  };

  return (
    <PaypalButton
      env={paypalConf.env}
      client={paypalConf.client}
      payment={(data, actions) => payment(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onCancel={(data, actions) => onCancel(data, actions)}
      onError={(error) => onError(error)}
      style={paypalConf.style}
      commit
      locale="es_PE"
    />
  );
};

export default PaypalCheckoutButton;
