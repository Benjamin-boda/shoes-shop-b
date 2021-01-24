import React from "react";
import NotFoundPage from "../../components/NotFoundPage";
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

const { asFragment, getByText } = render(
    <MemoryRouter>
        <NotFoundPage />
    </MemoryRouter>)

test("should match the snapshot", () => {
    
    expect(asFragment(<NotFoundPage/>)).toMatchSnapshot()
})

test("should contain this text", () => {
    const { getByText } = render(
        <MemoryRouter>
            <NotFoundPage />
        </MemoryRouter>)

    expect(getByText("404!")).toBeTruthy()

    expect(getByText("Go home")).toBeTruthy()
})