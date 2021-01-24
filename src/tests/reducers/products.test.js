import productsReducer from "../../reducers/product";
import products from "../fixtures/products";

test("should set default products values", () => {
    const state = productsReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual([]);
});

test("should remove product by id", () => {
    const action = {
        type: "REMOVE_PRODUCT",
        id: products[2].id
    };
    const state = productsReducer(products, action);
    expect(state).toEqual([products[0], products[1]])
});

test("should not remove product if the id don't match", () => {
    const action = {
        type: "REMOVE_PRODUCT",
        id: "-1"
    };
    const state = productsReducer(products, action);
    expect(state).toEqual(products)
});

test("should add a product", () => {
    const product = {
        id: "4",
        image : "",
        name : "shoes4",
        size : "41",
        price : 30,
        boughtAt : 0
    };
    const action = {
        type: "ADD_PRODUCT",
        product
    };
    const state = productsReducer(products, action);
    expect(state).toEqual([...products, product])
});

test("should edit a product", () => {
    const size = "39"
    const action = {
        type: "EDIT_PRODUCT",
        id: products[1].id,
        updates: {
            size
        }
    };
    const state = productsReducer(products, action);
    expect(state[1].size).toBe(size)
});

test("should not edit a product", () => {
    const name = "shoes32"
    const action = {
        type: "EDIT_PRODUCT",
        id: "12",
        updates: {
            name
        }
    };
    const state = productsReducer(products, action);
    expect(state).toEqual(products)
});

test("should set products", () => {
    const action = {
        type: "SET_PRODUCTS",
        products: [products[1]]
    };
    const state = productsReducer(products, action);
    expect(state).toEqual([products[1]])
});

test("should reset products", () => {
    const action = {
        type: "RESET_PRODUCTS"
    };
    const state = productsReducer(products, action);
    expect(state).toEqual([])
});