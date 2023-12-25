import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MyFormComponent from './Sign'; // Test edilecek bileşeni içe aktarın

// Test başlığını ve işlevini tanımlayın
test('Form submission works correctly', async () => {
    // Gerekli başlangıç durumlarını ayarlayın
    const { getByLabelText, getByText } = render(<MyFormComponent />);
    const nameInput = getByLabelText('Name');
    const surnameInput = getByLabelText('Surname');
    const emailInput = getByLabelText('Email');
    const submitButton = getByText('Submit');

    // Form öğelerine değerler girin
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    // Formu gönderin
    fireEvent.click(submitButton);

});
