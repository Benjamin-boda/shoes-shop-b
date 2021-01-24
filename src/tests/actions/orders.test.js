import {addOrder, setOrders, startSetOrders} from "../../actions/orders";
import {startAddOrder} from "./products_orders_actions";
import orders from "../fixtures/orders";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import database from "../../firebase/firebase";

const uid = "uidtest";
const defaultAuthState = {auth : {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const ordersData = {};
    orders.forEach(({ id, image, name, size, boughtAt, price }) => {
        ordersData[id] = { image, name, size, boughtAt, price};
    });
    database.ref(`users/${uid}/orders`).set(ordersData).then(() => done());
});

test("should add order action object with provided value", () => {
    const action = addOrder(orders[0]);
    expect(action).toEqual({
        type: "ADD_ORDER",
        order : orders[0]
    });
});

test("should add order to database and store" , (done) => {
    const store = createMockStore(defaultAuthState);
    const orderData = {
        image : "",
        name : "shoes5",
        size : "43",
        boughtAt : 123,
        price : 40
    }

    store.dispatch(startAddOrder(orderData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_ORDER",
            order: {
                id: expect.any(String),
                ...orderData
            }
        });

        return database.ref(`users/${uid}/orders/${actions[0].order.id}`).once("value")
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(orderData);
            done();
    });
});

test("should setup set order action object with data", () => {
    const action = setOrders(orders);
    expect(action).toEqual({
        type: "SET_ORDERS",
        orders
    });
});

test("should fetch the orders from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetOrders()).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: "SET_ORDERS",
            orders
        });
        done();
    });
});