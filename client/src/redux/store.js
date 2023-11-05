import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea sirve para conectar nuestra App con la extensión REDUX DEVTOOLS DEL NAVEGADOR

const store = createStore(
  reducer,
  composeEnhacer(applyMiddleware(thunkMiddleware)) //esta línea sirve para que podamos hacer peticiones asíncronas a una Api/servidor.
);

export default store;
