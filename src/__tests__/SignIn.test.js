import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { LogInContainer } from '../components/LogIn';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            const { getByPlaceholderText, getByText } = render(<LogInContainer handleLogin={onSubmit} />);

            fireEvent.changeText(getByPlaceholderText('Username'), 'tranhuy');
            fireEvent.changeText(getByPlaceholderText('Password'), 'password');
            fireEvent.press(getByText('Log In'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'tranhuy',
                    password: 'password'
                });
            });           
        });
    });
});