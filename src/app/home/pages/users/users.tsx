import {useEffect, useState} from "react";
import {getUsersAPI} from "../../../core/services/user.service.ts";
import {User} from "../../../core/interfaces/user.ts";
import {UsersTable} from "./components/usersTable.tsx";
import {Box} from "@mui/material";
import {CustomLoader} from "../../../shared/customLoader.tsx";
import {AddUserDialog} from "./components/addUserDialog.tsx";

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setLoadingState] = useState(false);
    useEffect(() => {
        setLoadingState(true);
        getUsersAPI().then((response: User[]) => {
            setUsers(response);
            setLoadingState(false);
        })
    }, [])
    return (
        <>
            {!isLoading && <Box sx={{textAlign: "end"}}>
                <Box sx={{m: '15px'}}>
                    <AddUserDialog/>
                </Box>
                <UsersTable users={users}/>
            </Box>}
            <CustomLoader open={isLoading}/>
        </>
    )
}

