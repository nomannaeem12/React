import * as React from "react";
import {useContext, useEffect, useState} from "react";
import userService from "../../../core/services/user.service.ts";
import {User} from "../../../core/interfaces/user.ts";
import {UsersTable} from "./components/usersTable.tsx";
import {Box} from "@mui/material";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";
import Button from "@mui/material/Button";

export function Users() {
    const {toggleLoading} = useContext(LoaderContext);
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        toggleLoading(true);
        userService.getUsers().then((response: User[]) => {
            setUsers(response);
            toggleLoading(false);
        })
    }, [])
    const addNewUser = (data: User) => {
        setUsers([data, ...users]);
    };
    return (
        <>
            <Box sx={{textAlign: "end"}}>
                <UsersTable users={users}/>
            </Box>
        </>
    )
}