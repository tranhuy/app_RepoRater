import { useContext } from "react";

import AuthStorageContext from "../contexts/AuthStorageContext";

const useAuthSorage = () => {
    return useContext(AuthStorageContext);
}

export default useAuthSorage;