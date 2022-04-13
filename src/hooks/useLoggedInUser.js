import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { SIGNED_IN_USER } from "../graphql/queries";

const useLoggedInUser = (includeReviews = false) => {
    const [ user, setUser ] = useState(null);

    const { loading, data, refetch } = useQuery(SIGNED_IN_USER, {
        fetchPolicy: 'cache-and-network',
        variables: {
            includeReviews
        }
    })

    useEffect(() => {
        if (data) {
            setUser(data.me);
        }
    }, [data]);

    return { user, loading, refetch }
}

export default useLoggedInUser;