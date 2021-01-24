import React from "react";
import {Contact} from "../../components/Contact";
import {render, cleanup, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

const { asFragment } = render(<Contact />)

test("should match the snapshot", () => {
    
    expect(asFragment(<Contact/>)).toMatchSnapshot()
})

test("should change input value inputChange", () => {
    const { getByTestId } = render(<Contact />)
    fireEvent.change(screen.getByTestId("input"), {
        target : {value : "new value"}
    })

    expect(getByTestId("input").value).toBe("new value")
})


test("should change textarea value inputChange", () => {
    const { getByTestId } = render(<Contact />)
    fireEvent.change(screen.getByTestId("textarea"), {
        target : {value : "new value"}
    })

    expect(getByTestId("textarea").value).toBe("new value")
})
