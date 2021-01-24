import {addProduct, removeProduct, editProduct, setProducts, startSetProducts, resetProducts, startResetProducts} from "../../actions/products";
import {startAddProduct, startRemoveProduct, startEditProduct} from "./products_orders_actions";
import products from "../fixtures/products";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import database from "../../firebase/firebase";

const uid = "uidtest";
const defaultAuthState = {auth : {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const productsData = {};
    products.forEach(({ id, image, name, size, boughtAt, price }) => {
        productsData[id] = { image, name, size, boughtAt, price};
    });
    database.ref(`users/${uid}/products`).set(productsData).then(() => done());
});

test("should setup add product action object with provided value", () => {
    const action = addProduct(products[0]);
    expect(action).toEqual({
        type: "ADD_PRODUCT",
        product : products[0]
    });
});

test("should add product to database and store" , (done) => {
    const store = createMockStore(defaultAuthState);
    const productData = {
        image : "",
        name : "shoes5",
        size : "44",
        boughtAt : 123,
        price : "never"
    }

    store.dispatch(startAddProduct(productData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_PRODUCT",
            product: {
                id: expect.any(String),
                ...productData
            }
        });

        return database.ref(`users/${uid}/products/${actions[0].product.id}`).once("value")
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(productData);
            done();
    });
});

test("should setup remove product action", () =>{
    const action = removeProduct({ id: "123abc" });
    expect(action).toEqual({
        type: "REMOVE_PRODUCT",
        id: "123abc"
    });
});

test("should remove expense to firebase and store" , (done) => {
    const store = createMockStore(defaultAuthState);
    const id = products[2].id
    store.dispatch(startRemoveProduct({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "REMOVE_PRODUCT",
            id
        });

        return database.ref(`users/${uid}/products/${id}`).once("value");
        }).then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
    });
});

test("should setup edit product action", () => {
    const action = editProduct("123abc", {name: "shoes77"});
    expect(action).toEqual({
        type: "EDIT_PRODUCT",
        id: "123abc",
        updates: {
            name:"shoes77" 
        }
    });
});

test("should setup start edit product action to firebase and store", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = products[0].id;
    const updates = { size: "47"};
    store.dispatch(startEditProduct(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "EDIT_PRODUCT",
            id,
            updates
        });
        return database.ref(`users/${uid}/products/${id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val().size).toBe(updates.size);
        done();
    });
});

test("should setup set product action object with data", () => {
    const action = setProducts(products);
    expect(action).toEqual({
        type: "SET_PRODUCTS",
        products
    });
});

test("should fetch the products from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetProducts()).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: "SET_PRODUCTS",
            products
        });
        done();
    });
});

test("should reset the products", () => {
    const action = resetProducts(products);
    expect(action).toEqual({
        type: "RESET_PRODUCTS"
    });
});

test("should reset the products from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startResetProducts()).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: "RESET_PRODUCTS"
        });
        done();
    });
});