import {useEffect, useState} from "react";
import {getUsers} from "../../../core/services/user.service.ts";
import {User} from "../../../core/interfaces/user.ts";
import {UsersTable} from "./components/usersTable.tsx";
import {Box} from "@mui/material";
import {AddUserButton} from "./components/addUserButton.tsx";

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        getUsers().then((response: User[]) => {
            setUsers(response);
        })
    }, [])
    const addNewUser = (data: User) => {
        setUsers([data,...users]);
    };
    return (
        <>
            <Box sx={{textAlign: "end"}}>
                <Box sx={{m: '15px 0'}}>
                    <AddUserButton addNewUser={addNewUser}/>
                </Box>
                <UsersTable users={users}/>
            </Box>
        </>
    )
}

