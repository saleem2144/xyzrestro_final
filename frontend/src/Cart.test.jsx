import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartContext } from './CartContext';
import Cart from './Cart';

// Mock CartContext for our tests
const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <CartContext.Provider {...providerProps}>{ui}</CartContext.Provider>,
        renderOptions
    );
};

describe('Cart Component', () => {

    // Test if the component renders without crashing
    test('renders without crashing', () => {
        customRender(<Cart />, { providerProps: { value: { cart: [] } } });
    });

    // Test if the "Your cart is empty" message is displayed when the cart is empty
    test('displays empty cart message when cart is empty', () => {
        customRender(<Cart />, { providerProps: { value: { cart: [] } } });
        const message = screen.getByText(/Your cart is empty/i);
        expect(message).toBeInTheDocument();
    });

    // If you wanted to remove any other test, just remove its block from this code.

});
