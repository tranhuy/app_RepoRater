import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from "@apollo/client/utilities";

import Constants from 'expo-constants';

const httpLink = createHttpLink({
    uri: Constants.manifest.extra.apolloClientUrl,
});

const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers }) => {
        try {
            const accessToken = await authStorage.getAccessToken();
            return {
                headers: {
                    authorization: accessToken ? `Bearer ${accessToken}` : '',
                }
            }
        } catch (e) {
            console.log(e);
            return {
                headers
            }
        }
    })

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        repositories: relayStylePagination(),
                    }
                },
                Repository: {
                    fields: {
                        reviews: relayStylePagination(),
                    }
                }
            }
        }),
    });
};

export default createApolloClient;