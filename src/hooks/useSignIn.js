import { useMutation, useApolloClient } from '@apollo/client'
import useAuthStorage from './useAuthStorage'

import { USER_SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const [signIn] = useMutation(USER_SIGN_IN, {
        onCompleted: async data => {
            const accessToken = data.authenticate.accessToken;
            await authStorage.setAccessToken(accessToken);
            apolloClient.resetStore();
        }
    });

    const signInUser = async ({ username, password }) => {
        const result = await signIn({ variables: { username, password } });

        return result;
    }

    return [signInUser];
}

export default useSignIn;