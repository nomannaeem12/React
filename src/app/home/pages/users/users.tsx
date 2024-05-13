import {useEffect, useState} from "react";
import {getUsersAPI} from "../../../core/services/user.service.ts";
import {User} from "../../../core/interfaces/user.ts";
import {UsersTable} from "./components/usersTable.tsx";

export function Users(){
    const [users, setUsers] = useState<User[]>([]);
    useEffect(()=>{
        getUsersAPI().then((response: User[])=>{
            setUsers(response);
        })
    },[])
    return (
        <>
            <UsersTable users={users}/>
        </>
    )
}

