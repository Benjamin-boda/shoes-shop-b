import getVisibleOrders from "../../selectors/orders";
import orders from "../fixtures/orders";

test("should sort by old to new date", () => {
    const filters = {
        sortBy: "oldDate"
    };
    const result = getVisibleOrders(orders, filters);
    expect(result).toEqual([orders[0], orders[1], orders[2]]);
});