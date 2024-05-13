import {useEffect, useState} from "react";
import {getUsersAPI} from "../../../core/services/user.service.ts";
import {User} from "../../../core/interfaces/user.ts";
import {UsersTable} from "./components/usersTable.tsx";
import {Box} from "@mui/material";
import {AddUserDialog} from "./components/addUserDialog.tsx";

export function Users(){
    const [users, setUsers] = useState<User[]>([]);
    useEffect(()=>{
        getUsersAPI().then((response: User[])=>{
            setUsers(response);
        })
    },[])
    return (
        <>
            <Box sx={{textAlign: "end"}}>
                <Box sx={{m: '15px'}}><AddUserDialog/></Box>
                <UsersTable users={users}/>
            </Box>
        </>
    )
}

