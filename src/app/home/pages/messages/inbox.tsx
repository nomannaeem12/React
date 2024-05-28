import {useContext, useEffect, useState} from "react";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";
import {User} from "../../../core/interfaces/user.ts";
import {getSignedInUser} from "../../../core/services/users.service.ts";

export function Inbox() {
    const {toggleLoading} = useContext(LoaderContext);
    const currentSignedInUser = getSignedInUser();
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        toggleLoading(true);
    }, [])
    return (
        <>
        </>
    )
}