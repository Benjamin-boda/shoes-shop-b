import React from "react";
import { useSelector } from 'react-redux';
import configureStore from "redux-mock-store";
import {Header} from "../../components/Header";
import {AuthProvider} from "../../firebase/Auth";
import {render, cleanup, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import products from "../fixtures/products";
import {productsReducer} from "../../reducers/product";
import { MemoryRouter } from 'react-router-dom';

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

export const renderWithRedux = (ui, { initialState, ...renderOptions } = {}) => {
    const mockStore = configureStore(productsReducer, initialState);
    const store = mockStore({});
    const Wrapper = ({ children }) => (
        <MemoryRouter>
            <AuthProvider store={store}>{children}</AuthProvider>
        </MemoryRouter>
    );
    return render(ui, { wrapper: Wrapper, ...renderOptions });
  };

const { asFragment, getByTestId } = renderWithRedux(<Header />, initialState)


afterEach(cleanup)

test("should match the snapshot", () => {
    
    expect(asFragment(<Header/>)).toMatchSnapshot()
})

test("user not logged, Login must appear", () => {
    useSelector.mockImplementation((selector) => selector({
        products : products
    }))
    renderWithRedux(<Header />, initialState)
    expect(screen.getByTestId("account")).toHaveTextContent("Login")
})