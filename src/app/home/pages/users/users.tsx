import {useContext, useEffect, useState} from "react";
import usersService from "../../../core/services/users.service.ts";
import {User} from "../../../core/interfaces/user.ts";
import {UsersTable} from "./components/usersTable.tsx";
import {Box} from "@mui/material";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";

export function Users() {
    const {toggleLoading} = useContext(LoaderContext);
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        toggleLoading(true);
        usersService.getUsers().then((response: User[]) => {
            setUsers(response);
            toggleLoading(false);
        })
    }, [])
    return (
        <>
            <Box sx={{height: '100%'}}>
                <UsersTable users={users}/>
            </Box>
        </>
    )
}