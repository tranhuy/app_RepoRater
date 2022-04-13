import { useMutation } from "@apollo/client";

import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
    const [ deleteReview ] = useMutation(DELETE_REVIEW);

    const removeReview = async (reviewId) => {
        const result = await deleteReview({ variables: { id: reviewId }});

        return result;
    }

    return [ removeReview ];
}

export default useDeleteReview;