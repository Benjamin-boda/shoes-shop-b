import React from "react";
import {ShopItem} from "../../components/ShopItem";
import {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import products from "../fixtures/products";
import { MemoryRouter } from 'react-router-dom';
import ReactRouter from 'react-router'
import { useSelector } from 'react-redux';
import configureStore from "redux-mock-store";
import {productsReducer} from "../../reducers/product";
import {AuthProvider} from "../../firebase/Auth";

afterEach(cleanup);

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ productnumber: '1' });

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

const { asFragment, getByText, getByTestId } = renderWithRedux(<ShopItem products={products}/>)

test("should match the snapshot", () => {
    
    expect(asFragment(<ShopItem/>)).toMatchSnapshot()
})

test("should contain this text", () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ productnumber: '1' });

    renderWithRedux(<ShopItem products={products}/>)

    expect(getByText("shoes 1")).toBeTruthy()
})

test("should contain this text", () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ productnumber: '1' });

    renderWithRedux(<ShopItem products={products}/>)

    fireEvent.click(getByTestId("button"))
    expect(getByText("You need to select a size first")).toBeTruthy()
})