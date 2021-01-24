import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {login, logout} from "./actions/auth";
import {firebase} from "./firebase/firebase";
import AppRouter from './routers/AppRouter';
import {startSetProducts} from "./actions/products";
import {startSetOrders} from "./actions/orders";
import "./styles/styles.scss";
import reportWebVitals from './reportWebVitals';

const store = configureStore()

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
)

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("root"));
        hasRendered = true;
    }
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      store.dispatch(login(user.uid));
      store.dispatch(startSetProducts());
      store.dispatch(startSetOrders()).then(() => {
          renderApp();
      });
  } else {
      store.dispatch(logout());
      renderApp();
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
