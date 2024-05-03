// DeleteUser.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteUser from '../components/DeleteUser'; // Assuming your DeleteUser component is in a file named DeleteUser.js
import axios from 'axios';

describe('DeleteUser component', () => {
  it('should render the component with labels and inputs', () => {
    const { getByText } = render(<DeleteUser />);

    expect(getByText('Supprimer un utilisateur')).toBeInTheDocument();
    expect(getByText('Mot de passe administrateur:')).toBeInTheDocument();
    expect(getByText("Id de l'utilisateur à supprimer:")).toBeInTheDocument();
  });

  it('should update state on input change', () => {
    const { getByText, getByLabelText } = render(<DeleteUser />);

    const adminPasswordInput = getByLabelText('Mot de passe administrateur:');
    const userIdInput = getByLabelText("Id de l'utilisateur à supprimer:");

    fireEvent.change(adminPasswordInput, { target: { value: 'admin' } });
    fireEvent.change(userIdInput, { target: { value: '10' } });

    expect(adminPasswordInput.value).toBe('admin');
    expect(userIdInput.value).toBe('10');
  });

  it('should show alert for empty fields on submit', () => {
    jest.spyOn(window, 'alert'); // Mock the alert function

    const { getByTestId } = render(<DeleteUser />);
    const submitButton = getByTestId('send');

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Veuillez remplir tout les champs');
  });

  // This test requires mocking the axios call
  it('should call axios.delete on submit with valid data', async () => {
    const mockAxios = jest.spyOn(axios, 'delete'); // Mock axios.delete

    const { getByTestId } = render(<DeleteUser />);
    const submitButton = getByTestId('send');

    const adminPasswordInput = getByTestId('pwd');
    const userIdInput = getByTestId('userId');

    fireEvent.change(adminPasswordInput, { target: { value: 'admin123' } });
    fireEvent.change(userIdInput, { target: { value: '10' } });

    await fireEvent.click(submitButton);

    expect(mockAxios).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}api/users/10`, { data: { adminPassword: 'admin123' } });
  });
});
