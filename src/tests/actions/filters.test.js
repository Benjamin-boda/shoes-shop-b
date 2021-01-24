import {sortByDate} from "../../actions/filters";

test("should generate sort by date default filter action object", () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: "SORT_BY_DATE",
        sortBy: undefined
    });
});