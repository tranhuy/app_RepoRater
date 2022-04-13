import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({ id, first }) => {
    const [ repository, setRepository ] = useState();
    const { loading, data, fetchMore } = useQuery(GET_REPOSITORY, {
        variables: {
            repositoryId: id,
            first
        },
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        if (data) {
            setRepository(data.repository);
        }
    }, [data]);

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                //repositoryId: id,
                after: data.repository.reviews.pageInfo.endCursor,
            }
        })
    }

    return { repository, loading, fetchMore: handleFetchMore };
}

export default useRepository;