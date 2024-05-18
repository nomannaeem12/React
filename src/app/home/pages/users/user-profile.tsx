import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import userService from "../../../core/services/user.service.ts";
import {User} from "../../../core/interfaces/user.ts";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";

export function UserProfile() {
    const {id} = useParams();
    const {toggleLoading} = useContext(LoaderContext);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        toggleLoading(true);
        userService.getUserById(+id!)
            .then((user) => {
                setUser(user);
                toggleLoading(false);
            })
    }, [id])

    return (
        user &&
        <>
            {user.email}

        </>
    )
}