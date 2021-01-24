import {ordersReducer} from "../../reducers/orders";
import orders from "../fixtures/orders";

test("should set default orders values", () => {
    const state = ordersReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual([]);
});

test("should add an order", () => {
    const order = {
        id: "4",
        image : "",
        name : "shoes4",
        size : "41",
        price : 30,
        boughtAt : 0
    };
    const action = {
        type: "ADD_ORDER",
        order
    };
    const state = ordersReducer(orders, action);
    expect(state).toEqual([...orders, order])
});

test("should set orders", () => {
    const action = {
        type: "SET_ORDERS",
        orders: [orders[1]]
    };
    const state = ordersReducer(orders, action);
    expect(state).toEqual([orders[1]])
});