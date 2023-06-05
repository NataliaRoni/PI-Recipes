import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer/reducer";

// Para conectar con la extensión del navegador => REDUX DEVTOOLS:
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  // Para poder hacer peticiones a un servidor. Esto permite que Redux maneje acciones asíncronas:
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
