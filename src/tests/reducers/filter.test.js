import filterReducers from "../../reducers/filters";

test("should setup sort by date filter", () => {
    const sortBy = "newDate";
    const action = {
        type: "SORT_BY_DATE",
        sortBy
    };
    const state = filterReducers(undefined, action);
    expect(state.sortBy).toBe("newDate");
});