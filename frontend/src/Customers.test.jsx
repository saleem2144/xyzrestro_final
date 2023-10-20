import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Customers from './Customers';

describe('Customers Component', () => {
    beforeAll(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([
                { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St', role: 'customer' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', address: '456 Elm St', role: 'customer' }
            ]),
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays customer data when list is not empty', async () => {
        render(<Customers />);

       
        const name1 = await waitFor(() => screen.getByText(/John Doe/i));
        const name2 = await waitFor(() => screen.getByText(/Jane Smith/i));

        expect(name1).toBeInTheDocument();
        expect(name2).toBeInTheDocument();
    });
});
