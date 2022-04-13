import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (params) => {
    const [ repositories, setRepositories ] = useState();
    //const [ loading, setLoading ] = useState(false);

    //GRAPHQL
    const { loading, data, fetchMore } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            ...params
        }
    })

    useEffect(() => {
        if (data) {
            setRepositories(data.repositories);
        }
    }, [data]);

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                ...params,
                after: data.repositories.pageInfo.endCursor,
            }
        })
    }

    //REST API
    // const fetchRepositories = async () => {
    //     setLoading(true);

        
    //     const response = await fetch('http://192.168.0.14:5000/api/repositories');
    //     const json = await response.json();

    //     setLoading(loading);
    //     setRepositories(json)
    // };

    return { repositories, loading, fetchMore: handleFetchMore }
}

export default useRepositories;