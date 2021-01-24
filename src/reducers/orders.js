//Order reducer

const orderReducerDefaultState = []

export const ordersReducer = (state = orderReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_ORDER" : 
            return [
                ...state,
                action.order
            ]
        case "SET_ORDERS" : 
            return action.orders
        default : 
            return state
    }
}