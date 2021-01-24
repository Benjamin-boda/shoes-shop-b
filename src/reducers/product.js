//Products reducer

const productsReducerDefaultState = [];

const productsReducer = (state = productsReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_PRODUCT" :
            return [
                ...state,
                action.product
            ]
        case "REMOVE_PRODUCT":
            return state.filter(({id}) => id !== action.id)
        case "RESET_PRODUCTS":
            return []
        case "EDIT_PRODUCT":
            return state.map((product) => {
                if (product.id === action.id) {
                    return {
                        ...product,
                        ...action.updates
                    }
                } else {
                    return product
                }
            })
        case "SET_PRODUCTS":
            return action.products
        default: 
            return state;
    }
}

export default productsReducer;