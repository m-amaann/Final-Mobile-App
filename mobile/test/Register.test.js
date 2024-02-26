// Register.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '../frontend/screens/registration/RegisterScreen';

// Mock the AsyncStorage module
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'User registered successfully' }),
  })
);

// Mock the Alert module
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

// Mock the navigation prop
const mockNavigate = jest.fn();

describe('RegisterScreen', () => {
  it('handles successful registration', async () => {
    const { getByPlaceholderText, getByText } = render(
      <RegisterScreen navigation={{ navigate: mockNavigate }} />
    );

    // Fill out the registration form
    fireEvent.changeText(getByPlaceholderText('Enter Your Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Enter Your email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter Your Address'), '123 Appleseed Street');
    fireEvent.changeText(getByPlaceholderText('Mobile Number'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('Create a New Password'), 'password');

    // Submit the form
    fireEvent.press(getByText('Register'));

    // Expect an API call to be made with the input data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            address: '123 Appleseed Street',
            phone: '1234567890',
            password: 'password',
          }),
        }),
      );
    });

    // Expect AsyncStorage to store some data
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Appleseed Street',
        phone: '1234567890',
      }),
    );

    // Expect navigation to the "Login" screen
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});



