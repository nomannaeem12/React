import {useContext, useEffect, useState} from "react";
import {getUsers} from "../../../core/services/user.service.ts";
import {User} from "../../../core/interfaces/user.ts";
import {UsersTable} from "./components/usersTable.tsx";
import {Box} from "@mui/material";
import {AddUserDialog} from "./components/addUserDialog.tsx";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";

export function Users() {
    const {toggleLoading} = useContext(LoaderContext);
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        toggleLoading(true);
        getUsers().then((response: User[]) => {
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
                <Box sx={{m: '15px 0'}}>
                    <AddUserDialog addNewUser={addNewUser}/>
                </Box>
                <UsersTable users={users}/>
            </Box>
        </>
    )
}

