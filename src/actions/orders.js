import database from "../firebase/firebase";
import firebase from 'firebase/app'

//ADD ORDER

export const addOrder = (order) => ({
    type: "ADD_ORDER",
    order
})

export const startAddOrder = (orderData) => {
    return (dispatch) => {
        const uid = firebase.auth().currentUser.uid
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

//SET_ORDERS

export const setOrders = (orders) => ({
    type: "SET_ORDERS",
    orders
})

export const startSetOrders = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/orders`).once("value").then((snapshot) => {
            const orders = [];

            snapshot.forEach((childSnapshot) => {
                orders.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
        dispatch(setOrders(orders))
        })
    }
}