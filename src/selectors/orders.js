//Get visible orders

const getVisibleOrders = (orders, filters) => {
    return orders.sort((a, b) => {
        if (filters.sortBy === "newDate") {
            return Date.parse(a.boughtAt) < Date.parse(b.boughtAt) ? -1 : 1;
        } else if (filters.sortBy === "oldDate") {
            return Date.parse(a.boughtAt) < Date.parse(b.boughtAt) ? 1 : -1;
        };
    })
};

export default getVisibleOrders;