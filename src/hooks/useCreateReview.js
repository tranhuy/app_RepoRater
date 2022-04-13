import { useMutation } from "@apollo/client";

import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
    const [createReview] = useMutation(CREATE_REVIEW);

    const addReview = async ({ ownerName, repositoryName, rating, text }) => {
        const result = await createReview({ variables: {  ownerName, repositoryName, rating: Number(rating), text }});
    
        return result;
    }
    
    return [addReview];
}

export default useCreateReview;