import React from "react";
import {Homepage} from "../../components/Homepage";
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

const { asFragment } = render(<Homepage />)

test("should match the snapshot", () => {
    
    expect(asFragment(<Homepage/>)).toMatchSnapshot()
})

test("should contain this text", () => {
    const { getByText } = render(<Homepage />)

    expect(getByText("Check out our new products")).toBeTruthy()
})