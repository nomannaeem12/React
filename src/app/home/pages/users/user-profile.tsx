import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import userService from "../../../core/services/user.service.ts";
import {User} from "../../../core/interfaces/user.ts";

export function UserProfile() {
    const {id} = useParams();
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        userService.getUserById(id)
            .then((user) => {
                setUser(user);
            })
    }, [id])

    return (
        user &&
        <>
            {user.email}

        </>
    )
}