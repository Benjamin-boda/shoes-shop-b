import React from "react";
import {Shop} from "../../components/Shop";
import {render, cleanup, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import products from "../fixtures/products";
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

const { asFragment } = render(
    <MemoryRouter>
        <Shop products={products}/>
    </MemoryRouter>)

test("should match the snapshot", () => {
    
    expect(asFragment(<Shop/>)).toMatchSnapshot()
})

test("should contain this text", () => {
    const { getByText } = render(
    <MemoryRouter>
        <Shop products={products}/>
    </MemoryRouter>)

    expect(getByText("shoes 1")).toBeTruthy()
})