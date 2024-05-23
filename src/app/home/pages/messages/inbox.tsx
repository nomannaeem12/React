import {useContext, useEffect, useState} from "react";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";
import {User} from "../../../core/interfaces/user.ts";
import userService, {getSignedInUser} from "../../../core/services/user.service.ts";

export function Inbox(){
    const {toggleLoading} = useContext(LoaderContext);
    const currentSignedInUser = getSignedInUser();
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        toggleLoading(true);
        userService.getUserMessages(currentSignedInUser.id).then((response: User) => {
            setUser(response);
            toggleLoading(false);
        })
    }, [])
    console.log(user);
    return (
        <>

        </>
    )
}