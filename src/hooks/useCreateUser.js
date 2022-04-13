import { useMutation } from "@apollo/client";

import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
    const [createUser] = useMutation(CREATE_USER);

    const addUser = async ({ username, password }) => {
        const result = await createUser({ variables: { username, password }});
        
        return result;
    }

    return [addUser];
}

export default useCreateUser;