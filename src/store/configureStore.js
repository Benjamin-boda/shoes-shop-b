import {createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {authReducer} from "../reducers/auth";
import {ordersReducer} from "../reducers/orders";
import filterReducer from "../reducers/filters";
import productsReducer from "../reducers/product";

// Store creation

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            orders: ordersReducer,
            products: productsReducer,
            filters: filterReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};