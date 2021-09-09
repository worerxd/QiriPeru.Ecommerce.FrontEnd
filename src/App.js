import { ThemeProvider } from "@material-ui/core";
import React from "react";
import theme from "./theme/theme";
import Login from "./componentes/seguridad/Login";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import MenuAppBar from "./componentes/navegacion/MenuAppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Libro from "./componentes/pantallas/Libro";
import Contact from "./componentes/info/Contact";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MenuAppBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registrar" component={RegistrarUsuario} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/" component={Libro} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
