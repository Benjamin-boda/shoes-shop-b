import database from "../firebase/firebase";
import firebase from 'firebase/app'

//ADD_PRODUCT

export const addProduct = (product) => ({
    type: "ADD_PRODUCT",
    product
});

export const startAddProduct = (productData) => {
    return (dispatch) => {
        const uid = firebase.auth().currentUser.uid;
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

//REMOVE_PRODUCT

export const removeProduct = ({id} = {}) => ({
    type: "REMOVE_PRODUCT",
    id
});

export const startRemoveProduct = ({id}) => {
    return (dispatch) => {
        const uid = firebase.auth().currentUser.uid;
        return database.ref(`users/${uid}/products/${id}`).remove().then(() => {
            dispatch(removeProduct({id}))
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
        const uid = firebase.auth().currentUser.uid;
        return database.ref(`users/${uid}/products/${id}`).update(updates).then(() => {
            dispatch(editProduct(id, updates))
        })
    }
}

//SET_PRODUCTS

export const setProducts = (products) => ({
    type: "SET_PRODUCTS",
    products
})

export const startSetProducts = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/products`).once("value").then((snapshot) => {
            const products = [];

            snapshot.forEach((childSnapshot) => {
                products.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
        dispatch(setProducts(products))
        })
    }
}

//REMOVE ALL

export const resetProducts = () => ({
    type: "RESET_PRODUCTS"
});

export const startResetProducts = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/products`).remove()
            .then(() => {
                dispatch(resetProducts());
            });
    };
};