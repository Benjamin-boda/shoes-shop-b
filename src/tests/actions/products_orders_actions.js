import database from "../../firebase/firebase";
import * as firebase from "firebase";

//ADD_PRODUCT

export const addProduct = (product) => ({
    type: "ADD_PRODUCT",
    product
});

export const startAddProduct = (productData) => {
    return (dispatch) => {
        const uid = "uidtest";
        const {
            image = "",
            name = "",
            size = "",
            price = 0,
            boughtAt = 0
        } = productData;
        const product = {image, name, size, price, boughtAt};

        return database.ref(`users/${uid}/products`).push(product).then((ref) => {
            dispatch(addProduct({
                id: ref.key,
                ...product
            }))
        })
    }
}

//ADD ORDER

export const addOrder = (order) => ({
    type: "ADD_ORDER",
    order
})

export const startAddOrder = (orderData) => {
    return (dispatch) => {
        const uid = "uidtest";
        const {
            image = "",
            name = "",
            size = "",
            price = 0,
            boughtAt = 0
        } = orderData;
        const order = {image, name, size, price, boughtAt};

        return database.ref(`users/${uid}/orders`).push(order).then((ref) => {
            dispatch(addOrder({
                id: ref.key,
                ...order
            }))
        })
    }
}

//EDIT_PRODUCT

export const editProduct = (id, updates) => ({
    type: "EDIT_PRODUCT",
    id,
    updates
});

export const startEditProduct = (id, updates) => {
    return (dispatch) => {
        const uid = "uidtest";
        return database.ref(`users/${uid}/products/${id}`).update(updates).then(() => {
            dispatch(editProduct(id, updates))
        })
    }
}


//REMOVE_PRODUCT

export const removeProduct = ({id} = {}) => ({
    type: "REMOVE_PRODUCT",
    id
});

export const startRemoveProduct = ({id}) => {
    return (dispatch) => {
        const uid = "uidtest";
        return database.ref(`users/${uid}/products/${id}`).remove().then(() => {
            dispatch(removeProduct({id}))
        })
    }
}