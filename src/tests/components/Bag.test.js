import React from "react";
import {Bag} from "../../components/Bag";
import configureStore from "redux-mock-store";
import { useSelector } from 'react-redux';
import {AuthProvider} from "../../firebase/Auth";
import {render, cleanup, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import products from "../fixtures/products";
import {productsReducer} from "../../reducers/product";
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

const initialState = {
    state : {
        products: products
    }
};

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

useSelector.mockImplementation((selector) => selector({
    products : products
}))

const renderWithRedux = (ui, { initialState, ...renderOptions } = {}) => {
    const mockStore = configureStore(productsReducer, initialState);
    const store = mockStore({});
    const Wrapper = ({ children }) => (
        <MemoryRouter>
            <AuthProvider store={store}>{children}</AuthProvider>
        </MemoryRouter>
    );
    return render(ui, { wrapper: Wrapper, ...renderOptions });
  };

const { asFragment, getByTestId } = renderWithRedux(<Bag />, initialState)

test("should match the snapshot", () => {

    expect(asFragment(<Bag/>)).toMatchSnapshot()
})

test("should contain this text", () => {
    useSelector.mockImplementation((selector) => selector({
        products : products
    }))

    renderWithRedux(<Bag />, initialState)
    expect(screen.getByTestId("shoes1")).toHaveTextContent(products[0].name)
})